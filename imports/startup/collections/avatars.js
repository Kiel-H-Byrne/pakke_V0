import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { FilesCollection } from 'meteor/ostrio:files';
import stream from 'stream';

import S3 from 'aws-sdk/clients/s3'; /* http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html */
/* See fs-extra and graceful-fs NPM packages */
/* For better i/o performance */
import fs from 'fs';

const s3Conf = Meteor.settings.public.keys.s3 || {};
const bound  = Meteor.bindEnvironment((callback) => {
  return callback();
});

/* Check settings existence in `Meteor.settings` */
/* This is the best practice for app security */
if (s3Conf && s3Conf.key && s3Conf.secret && s3Conf.bucket) {
  // Create a new S3 object
  const s3 = new S3({
    secretAccessKey: s3Conf.secret,
    accessKeyId: s3Conf.key,
    // sslEnabled: true, // optional
    httpOptions: {
      timeout: 6000,
      agent: false
    }
  });
  // const uid = Meteor.userId();
  // Declare the Meteor file collection on the Server
  Avatars = new FilesCollection({
    debug: false, // Change to `true` for debugging
    storagePath: 'assets/app/uploads/avatars',
    collectionName: 'avatars',
    // Disallow Client to execute remove, use the Meteor.method
    allowClientCode: false,
    onBeforeUpload() {
      if (this.userId) {
        return true;
      }
      return 'Must be logged in to upload a file!';
    },
    // Start moving files to AWS:S3
    // after fully received by the Meteor server
    onAfterUpload(fileRef) {
      // Run through each of the uploaded file
      _.each(fileRef.versions, (vRef, version) => {
        // We use Random.id() instead of real file's _id
        // to secure files from reverse engineering on the AWS client
        const filePath = `avatars/${fileRef.meta.userId}_${fileRef._id}.${fileRef.extension}`;
        // const filePath = `avatars/${(Random.id())}-${version}.${fileRef.extension}`;
        // const filePath = `${module}/${id}/${Random.id()}-${version}.${fileRef.extension}`
        //where module is event, venue, avatar & id  = eventId, venueId, userId
        
        // Create the AWS:S3 object.
        // Feel free to change the storage class from, see the documentation,
        // `STANDARD_IA` is the best deal for low access files.
        // Key is the file name we are creating on AWS:S3, so it will be like files/XXXXXXXXXXXXXXXXX-original.XXXX
        // Body is the file stream we are sending to AWS
        s3.putObject({
          ServerSideEncryption: 'AES256', // Optional
          StorageClass: 'STANDARD',
          Bucket: s3Conf.bucket,
          Key: filePath,
          Body: fs.createReadStream(vRef.path),
          ContentType: vRef.type,
          ACL: "public-read"
        }, (error) => {
          bound(() => {
            if (error) {
              console.error(error);
            } else {
              // Update FilesCollection with link to the file at AWS
              const upd = { $set: {} };
              upd['$set']['versions.' + version + '.meta.pipePath'] = filePath;

              this.collection.update({
                _id: fileRef._id
              }, upd, (updError) => {
                if (updError) {
                  console.error(updError);
                } else {
                  // Unlink original files from FS after successful upload to AWS:S3
                  //I ODNT THINK 'UNLINK' IS A FUNCTION OF THIS.
                  //I TRIED 'REMOVE' BUT THAT REMOVES THE S3 FILE
                  this.unlink(this.collection.findOne(fileRef._id), version);
                }
              });
            }
          });
        });
        let url = `https://s3.us-east-2.amazonaws.com/pakke-images/${filePath}`;
        // console.log(url)
 
        Meteor.users.update(
          {_id: fileRef.userId}, 
          {$set: {
            "profile.avatar": url
          }
        });
        //   ... /avatars/vKhgc74cjEtc3y2P5-original.jpg
      });
    },


    // Intercept access to the file
    // And redirect request to AWS:S3
    interceptDownload(http, fileRef, version) {
      let path;

      if (fileRef && fileRef.versions && fileRef.versions[version] && fileRef.versions[version].meta && fileRef.versions[version].meta.pipePath) {
        path = fileRef.versions[version].meta.pipePath;
      }

      if (path) {
        console.log(path)
        // If file is successfully moved to AWS:S3
        // We will pipe request to AWS:S3
        // So, original link will stay always secure

        // To force ?play and ?download parameters
        // and to keep original file name, content-type,
        // content-disposition, chunked "streaming" and cache-control
        // we're using low-level .serve() method
        const opts = {
          Bucket: s3Conf.bucket,
          Key: path
        };

        if (http.request.headers.range) {
          const vRef  = fileRef.versions[version];
          let range   = _.clone(http.request.headers.range);
          const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
          const start = parseInt(array[1]);
          let end     = parseInt(array[2]);
          if (isNaN(end)) {
            // Request data from AWS:S3 by small chunks
            end       = (start + this.chunkSize) - 1;
            if (end >= vRef.size) {
              end     = vRef.size - 1;
            }
          }
          opts.Range   = `bytes=${start}-${end}`;
          http.request.headers.range = `bytes=${start}-${end}`;
        }

        const fileColl = this;
        s3.getObject(opts, function (error) {
          if (error) {
            console.error(error);
            if (!http.response.finished) {
              http.response.end();
            }
          } else {
            if (http.request.headers.range && this.httpResponse.headers['content-range']) {
              // Set proper range header in according to what is returned from AWS:S3
              http.request.headers.range = this.httpResponse.headers['content-range'].split('/')[0].replace('bytes ', 'bytes=');
            }

            const dataStream = new stream.PassThrough();
            fileColl.serve(http, fileRef, fileRef.versions[version], version, dataStream);
            dataStream.end(this.data.Body);
          }
        });

        return true;
      }
      // While file is not yet uploaded to AWS:S3
      // It will be served file from FS
      return false;
    }
  });

  // Intercept FilesCollection's remove method to remove file from AWS:S3
  const _origRemove = Avatars.remove;
  Avatars.remove = function (search) {
    const cursor = this.collection.find(search);
    cursor.forEach((fileRef) => {
      _.each(fileRef.versions, (vRef) => {
        if (vRef && vRef.meta && vRef.meta.pipePath) {
          // Remove the object from AWS:S3 first, then we will call the original FilesCollection remove
          s3.deleteObject({
            Bucket: s3Conf.bucket,
            Key: vRef.meta.pipePath,
          }, (error) => {
            bound(() => {
              if (error) {
                console.error(error);
              }
            });
          });
        }
      });
    });

    //remove original file from database
    _origRemove.call(this, search);
  };

  export default Avatars;

} else {
  throw new Meteor.Error(401, 'Missing Meteor file settings');
}

if (Meteor.isServer) {
  Meteor.publish('avatars', function () {
    return Avatars.collection.find({
      userId: Meteor.userId()
    }, {
      fields: {
        name: 1,
        size: 1,
        extension: 1,
        _downloadRoute: 1,
        _collectionName: 1,
        'versions.original.extension': 1 // <-- Required only for file's version .link(version), and if extension is different from original file
      }
    });
  });


  /* Set deny/allow rules:
   * Deny all
   * @see http://docs.meteor.com/#/full/deny
   */
  // Avatars.denyClient();

  /* Allow all
   * @see http://docs.meteor.com/#/full/allow
   */
  Avatars.allowClient();

  /* Deny per action
   * @see http://docs.meteor.com/#/full/deny
   */
  // Avatars.deny({
  //   insert: function() {
  //     return false;
  //   },
  //   update: function() {
  //     return true;
  //   },
  //   remove: function() {
  //     return false;
  //   }
  // });

  /* Allow per action
   * @see http://docs.meteor.com/#/full/allow
   */
  Avatars.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return false;
    },
    remove: function() {
      return !!Meteor.user();
    }
  });

}




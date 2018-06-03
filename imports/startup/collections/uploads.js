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

  // Declare the Meteor file collection on the Server
  Uploads = new FilesCollection({
    debug: false, // Change to `true` for debugging
    storagePath: 'assets/app/uploads/uploadedFiles',
    collectionName: 'uploads',
    // Disallow Client to execute remove, use the Meteor.method
    allowClientCode: false,

    // Start moving files to AWS:S3
    // after fully received by the Meteor server
    onAfterUpload(fileRef) {
      console.log('fire 1')
      // Run through each of the uploaded file
      _.each(fileRef.versions, (vRef, version) => {
        // We use Random.id() instead of real file's _id
        // to secure files from reverse engineering on the AWS client
        const filePath = 'pakke-images/' + (Random.id()) + '-' + version + '.' + fileRef.extension;
        // Create the AWS:S3 object.
        // Feel free to change the storage class from, see the documentation,
        // `STANDARD_IA` is the best deal for low access files.
        // Key is the file name we are creating on AWS:S3, so it will be like files/XXXXXXXXXXXXXXXXX-original.XXXX
        // Body is the file stream we are sending to AWS
        s3.putObject({
          // ServerSideEncryption: 'AES256', // Optional
          StorageClass: 'STANDARD',
          Bucket: s3Conf.bucket,
          Key: filePath,
          Body: fs.createReadStream(vRef.path),
          ContentType: vRef.type,
          ACL: "public-read"
        }, (error) => {
          bound(() => {
            console.log('fire 2')
            if (error) {
              console.error(error);
            } else {
              console.log('fire 3')
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
                  this.unlink(this.collection.findOne(fileRef._id), version);
                }
              });
            }
          });
        });
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
  const _origRemove = Uploads.remove;
  Uploads.remove = function (search) {
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

  export default Uploads;
} else {
  throw new Meteor.Error(401, 'Missing Meteor file settings');
}

if (Meteor.isServer) {
  Meteor.publish('uploads', function () {
    return Uploads.collection.find({}, {
      fields: {
        extension: 1,
        _downloadRoute: 1,
        _collectionName: 1,
        'versions.versionName.extension': 1 // <-- Required only for file's version .link(version), and if extension is different from original file
      }
    });
  });


  /* Set deny/allow rules:
   * Deny all
   * @see http://docs.meteor.com/#/full/deny
   */
  // Uploads.denyClient();

  /* Allow all
   * @see http://docs.meteor.com/#/full/allow
   */
  Uploads.allowClient();

  /* Deny per action
   * @see http://docs.meteor.com/#/full/deny
   */
  // Uploads.deny({
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
  Uploads.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return false;
    },
    remove: function() {
      return true;
    }
  });

}




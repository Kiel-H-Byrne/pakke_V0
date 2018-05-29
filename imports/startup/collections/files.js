import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';

// UserFiles = new FilesCollection({collection: new Mongo.Collection('userfiles')});
// UserFiles = new Mongo.Collection('userfiles');

Images = new FilesCollection({collectionName: 'Images'});

// Images.collection.find({}).forEach(function (fileRef) {
//   Images.link(fileRef);
// });

// Example: Subscribe:
if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}


if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.collection.find({}, {
      fields: {
        extension: 1,
        _downloadRoute: 1,
        _collectionName: 1,
        'versions.versionName.extension': 1 // <-- Required only for file's version .link(version), and if extension is different from original file
      }
    });
  });
}

export default Images;
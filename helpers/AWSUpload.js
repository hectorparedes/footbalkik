const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({

});

const s0 = new AWS.S3({region: 'us-east-1', signatureVersion: 'v4'});
const upload = multer({
	storage: multerS3({
		s3: s0,
		bucket:'footballkiktest',
		acl:'public-read',

		metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldName });
    	},
		//metadata: undefined,
		key: function(req,file,cb){
			cb(null,file.originalname);
		},
		rename: function(fieldName,fileName){
			return fileName.replace(/\W+/g,'-');
		}
	})
});

exports.Upload = upload;

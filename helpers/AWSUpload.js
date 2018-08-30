const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
	accessKeyId:process.env.AWS_ACCESSKEYID,
	secretAccessKey:process.env.SECRET_ACCESS_KEY,
	region:process.env.AWS_REGION
});

const s0 = new AWS.S3({region: 'us-east-1', signatureVersion: 'v4'});
const upload = multer({
	storage: multerS3({
		s3: s0,
		bucket:'footballkiktest',
		acl:'public-read',
//si descomento metadata no funciona y marca el error InvalidHeader: Header x-amz-meta-fieldname contains invalid value
		/*metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldName });
    	},*/
		metadata: undefined,
		key: function(req,file,cb){
			cb(null,file.originalname);
		},
		rename: function(fieldName,fileName){
			return fileName.replace(/\W+/g,'-');
		}
	})
});

exports.Upload = upload;

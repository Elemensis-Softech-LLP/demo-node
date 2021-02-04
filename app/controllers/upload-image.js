module.exports = {
    upload
}

async function upload(req, res) {
    try {
        var multer = require('multer');   //FOR FILE UPLOAD
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb) {
                cb(null, './app/public/'); //image storage path
            },
            filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, file.originalname);
            }
            
        });

        var upload = multer({ //multer settings
            storage: storage
        }).single('image');
          
        upload(req, res, function (err) {
            // console.log("my error============", err)
            const path = req.file.path;
            if (err) {
                res.send({
                    'success': false,
                    'message': 'an Error occured'
                });
            } else {
                res.send({
                    'success': true,
                    path: path,
                    'message': 'image upload successfully'
                });
            }

        });
    } catch (error) {

        res.status(500).send({
            'success': false,
            'message': 'Error! invalid',
            'error': error
        });
    }
}

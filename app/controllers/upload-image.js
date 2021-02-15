module.exports = {
    uploadImage
}

async function uploadImage(req, res) {
    try {
        console.log("Upload Image....");
        var multer = require('multer');   //FOR FILE UPLOAD
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb) {
                cb(null, './app/public/'); //image storage path
            },
            filename: function (req, file, cb) {
                // var datetimestamp = Date.now();
                var d = Date(); 
    
                // Converting the number value to string 
                datetimestamp = d.toString()  
                  
                // Printing the current date 
                // document.write("The current date is: " + datetimestamp)              
                   console.log("date...",datetimestamp);
                cb(null,'binali_'+datetimestamp+file.originalname);
            }
        });

        var upload = multer({ //multer settings
            storage: storage
        }).single('file');

        upload(req, res, function (err) {
            // console.log("my error============", req.file)
            const path = req.file;
            console.log("file....", req.file);
            if (err) {
                console.log("error", err);
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
        console.log("error", error);
        res.status(500).send({
            'success': false,
            'message': 'Error! invalid',
            'error': error
        });
    }
}

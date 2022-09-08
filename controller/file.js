const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cd )=>{
        cd(null, 'uploads');
    },
    filename: (req, file, cd) =>{
        cd(null, new Date().getTime().toISOSrting().replace(/:/g, '/') + '-' + file.originalname);
    },
});




// const filefilter = (req, file, cd) =>{
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
//         cb(null, true)
//     }else {
//         cb
//     }
// }


 const upload = multer({ storage: storage})
 module.exports = upload;

 
import fs from 'fs';
import multer from 'multer';

const imageUpload = async (req:any,res:any): Promise<any> => {

  // const destination=req.body.destination ||'misc'
  
  const storage = multer.diskStorage({ 
    
    // destination:`./uploads/${destination}`,
    destination: (req, file, cb) => {
      const  destination  = req.query.destination || 'misc'
      const directory = `./uploads/${destination}`

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
      }

      cb(null, directory)
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage }).single('file');

  upload(req, res, (err)=> {
    if (err ){
      console.log('UPLOAD ERR--->',err);
      res.json({ uploaded: false, error: 'Upload failed' });
      
    }
    else {
      console.log('else eecuted')
  
     console.log('else eecuted')  };
     const fileName = req.body.filename;
     console.log('fileName--->',fileName)
     return ({"uploaded": true,
     "url":`http://localhost:5000/misc/${fileName}`,
     "fileName":fileName});
  
  });
};
export const FileUploadService = {


  imageUpload
};

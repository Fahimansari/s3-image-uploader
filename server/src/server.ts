//Package Imports
import express, { Request, Response }  from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import multer, { Multer, File } from "multer";
import { v4 as uuidv4 } from "uuid";
//Function Imports
import uploadImage from "./functions/uploader";
import getLink from "./functions/getLink";

//Interface and Type Declarations and Initializations
declare global {
  namespace Express {
    interface Request {
      file: File;
    }
  }
}

dotenv.config();
const app = express();
const storage: Multer["storage"] = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const extension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage });
const PORT = process.env.PORT;


//////////                     API Routes Starts Here               ///////////



/////                           GET Routes Start Here                      /////

app.get('/', (req, res) => {
  res.send('This API Route is a TEST ROUTE and it is working fine');
});

app.get('/upload', async (req, res) => {
  uploadImage().then((data) => {
    console.log(`File uploaded successfully. File URL: ${data}`);
    res.json(data.$metadata)
  })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/link', (req, res) => {
  getLink().then((data) => {
    console.log(data);
    res.json(data)
  }).catch((error) => {
    console.error(error);
  })
})

app.get('/test', (req, res) => {
  console.log(`test url called`);  
  res.send(`The front end is connected with the backend`)
})


/////                          POST Routes Starts Here                    /////

app.post('/test-form', upload.single('image'), (req: Request, res: Response) => {
  const value1 =  req.body.data1;
  const value2 =  req.body.data2;
  if (!req.file) {
    res.status(400).json({ error: "No file received" });
    return;
  }
  
  console.log("Received file:", req.file);
  console.log("Value 1:", value1);
  console.log("Value 2:", value2);

  res.status(200).json({ message: "File received" });
}); 


//SERVER LISTENING

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

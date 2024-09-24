const express = require('express');
const port = 8080;
const app = express();
const cors = require('cors');
const UserModel = require('./models/user');
const multer = require('multer');
require('./db');
require('dotenv').config();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/files");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });
const upload = multer({ storage });

app.post('/upload', upload.single("aa"), async (req, res) => {
  console.log("hello");
  try {
    // Access the uploaded file from req.file
    const file = req.file;

    // Check if the file exists
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Upload file buffer to Cloudinary
    const url = await uploadonCloudinary(file.buffer);
    const user = new UserModel({
      url: url
    });
    await user.save();
    res.json(1);
  } catch (error) {
    console.log("Error in uploading file", error);
    res.json(0);
  }
});

app.get('/urls', async (req, res) => {
  try {
    const users = await UserModel.find({}, 'url');
    const urls = users.map(user => user.url); 
    res.json(urls); 
  } catch (error) {
    console.log("Error fetching URLs", error);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Cloudinary configuration and upload function
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: "dexcarf4x", 
  api_key: "761455659629295", 
  api_secret: "asVoYAabBE-uJbPjeToMRXVp_Iw"
});

// Define uploadonCloudinary function only once
const uploadonCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      return null;
    }

    // Upload the file buffer to Cloudinary
    const response = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
      
      // Create a readable stream from the buffer
      const streamBuffer = require('stream').PassThrough();
      streamBuffer.end(fileBuffer); // End the stream with the file buffer
      streamBuffer.pipe(stream);
    });

    console.log("File uploaded successfully on Cloudinary", response.url);
    return response.url;
  } catch (err) {
    console.log("Error in uploading file on Cloudinary", err);
    return null;
  }
};

module.exports = { uploadonCloudinary };

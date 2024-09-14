
const cloudinary = require('cloudinary').v2;
const fs=require('fs')
cloudinary.config({ 
    cloud_name: "dexcarf4x", 
    api_key: "761455659629295", 
    api_secret: "asVoYAabBE-uJbPjeToMRXVp_Iw"
  });

  const uploadonCloudinary=async(localfilepath)=>{
    try {
        if(!localfilepath){
            return null
        }
        const response= await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
         fs.unlinkSync(localfilepath)
        console.log("File uploaded successfully on cloudinary",response.url)
        return response.url;
    } catch (err) {
        console.log("Error in uploading file on cloudinary",err)
        fs.unlinkSync(localfilepath) //remove the locally saved temp file
    }
  }


  module.exports ={uploadonCloudinary}
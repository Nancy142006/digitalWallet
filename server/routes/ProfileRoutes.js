const express = require("express");
const multer = require("multer"); //includes multers files
const User = require("../models/User");
const router = express.Router();

// Multer Storage Configuration
// Tells multer to directly store the uploaded file on the disk
const storage = multer.diskStorage({
    // where the stored files should be stored
           //cb: fxn used to pass values inside the storage config
           //req: represent the HTTP request, details abt incoming request 
           //file: represents the uploaded files
    destination:(req, file, cb)=>{
        cb(null, "uploads/")
    },
    // determines the name of the uploaded file
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage});

// Updated Profile
// put request used to update existing user data
router.put("/update-profile/:id",upload.single("profilePicture"),async(req,res)=>{
    try{
        const {name} = req.body;
        let profilePicture = req.file ? req.file.filename : undefined;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {name, profilePicture},
            {new: true}
        );
        
        res.json(updatedUser);
    }catch(error){
        res.status(500).json({error: "Failed to update profile"});
    }
});

module.exports = router;
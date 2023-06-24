const mongoose = require(`mongoose`)

let blogsSchema = new mongoose.Schema(
   {
        title: {type: String},
        message: {type: String},
        author: {type: String},
        tags: {type: [String]},
       // selectedFile: {type:String, default:""},
        likeCount: {type: Number, default: 0},
        datePosted: {type: Date, default: new Date()},
        profilePhotoFilename: {type:String, default:""}
   },
   {
       collection: `blogs`
   })

module.exports = mongoose.model(`blogs`, blogsSchema)
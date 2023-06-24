const router = require(`express`).Router()

const blogsModel = require(`../models/blogs`)

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

const jwt = require('jsonwebtoken')
//const fs = require('fs')
//const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')


// read all records
router.get(`/`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    blogsModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/get_blog/:id`, (req, res) => 
{
    blogsModel.findById(req.params.id, (error, data) => 
    {
        res.json(data)
    })
})


// Add new record
//router.post(`/add_blog`, upload.single("profilePhoto"), (req, res) => 
router.post(`/add_blog`, (req, res) => 
{   
    blogsModel.create(req.body, (error, data) => 
    {
        res.json(data)
    })
    
})


// Update one record
router.put(`/update_blog/:id`, (req, res) => 
{
    blogsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        res.json(data)
    })        
})


// Delete one record
router.delete(`/delete_blog/:id`, (req, res) => 
{
    blogsModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        res.json(data)
    })       
})

module.exports = router
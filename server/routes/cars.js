const router = require(`express`).Router()

const carsModel = require(`../models/cars`)


// read all records
router.get(`/`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    carsModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/get_car/:id`, (req, res) => 
{
    carsModel.findById(req.params.id, (error, data) => 
    {
        res.json(data)
    })
})


// Add new record
router.post(`/add_car`, (req, res) => 
{
    carsModel.create(req.body, (error, data) => 
    {
        res.json(data)
    })
})


// Update one record
router.put(`/update_car/:id`, (req, res) => 
{
    carsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        res.json(data)
    })        
})


// Delete one record
router.delete(`/delete_car/:id`, (req, res) => 
{
    carsModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        res.json(data)
    })       
})

module.exports = router
const router = require('express').Router()
const dbJSON = require('../helpers/dbJSON')

router.get('/', (req, res) => {
    res.send('Server is listening for events from the worker.');
});

router.post('/new',(req,res)=>{
    try {
        let {dateOfBirth,name} = req.body
        
    if(dateOfBirth !== undefined && name !== undefined){
        let data = {
            name: name,
            dateOfBirth: dateOfBirth
        }

        if(dbJSON.addDataToDB(data)){
            res.status(201).send({"Success":"Birthday added"})
        } else {
            res.status(500).send({"Error":"Server error when writing the birthday"})
        }
        
    } else {
        res.status(400).send({'Missing parameters':"Either name or birthday parameters are missing"})
    }
    } catch (error) {
        res.status(500).send({'Error while uploading the new birthday':error})
    }
})


module.exports = router
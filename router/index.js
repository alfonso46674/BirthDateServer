const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Server is listening for events from the worker.');
});


module.exports = router
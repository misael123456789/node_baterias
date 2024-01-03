const {Router} = require('express')
const router = Router()

router.get('/', (req, res)=>{
    res.json({"title":"Node server for google sheets",
    "Version":"1.0.0",
    "Node Version":process.version
    })
})

module.exports = router
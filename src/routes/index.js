const {Router} = require('express')
const request = require('request');
const axios = require('axios');
const router = Router()

router.get('/', (req, res)=>{
    axios.get('https://www.lth.com.mx/api/fitment/years?type=Automotriz')
  .then(response => {
    const data = response.data;
    console.log(data);
    res.send(data)
  })
  .catch(error => {
    console.log(error);
  });
    
})

module.exports = router
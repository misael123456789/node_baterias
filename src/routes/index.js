const {Router} = require('express')
const request = require('request');
const axios = require('axios');
const router = Router()

LTH_URL = 'https://www.lth.com.mx';

router.get('/years', (req, res)=>{
    axios.get(LTH_URL+'/api/fitment/years?type=Automotriz', { params: { type: req.query.type } })
  .then(response => {
    const data = response.data;
    res.json(data)
  })
  .catch(error => {
    console.log(error);
  });
    
})

module.exports = router
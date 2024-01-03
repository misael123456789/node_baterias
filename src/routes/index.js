const {Router} = require('express')
const request = require('request');
const axios = require('axios');
const router = Router()

LTH_URL = 'https://www.lth.com.mx';

router.get('/years', (req, res)=>{
    axios.get(LTH_URL+'/api/fitment/years', { params: { type: req.query.type } })
  .then(response => {
    const data = response.data;
    res.json(data)
  })
  .catch(error => {
    console.log(error);
  });
    
});

router.get('/makes', (req, res)=>{
    axios.get(LTH_URL+'/api/fitment/makes', { params: { type: req.query.type, year: req.query.year} })
  .then(response => {
    const data = response.data;
    res.json(data)
  })
  .catch(error => {
    console.log(error);
  });
    
});


router.get('/models', (req, res)=>{
    axios.get(LTH_URL+'/api/fitment/models', { params: { type: req.query.type, year: req.query.year, make: req.query.make} })
  .then(response => {
    const data = response.data;
    res.json(data)
  })
  .catch(error => {
    console.log(error);
  });
    
});

router.get('/find', (req, res)=>{
    axios.get(LTH_URL+'/api/products/find', { params: { type: req.query.type, year: req.query.year, make: req.query.make, model: req.query.model, engine: req.query.engine} })
  .then(response => {
    const data = response.data;
    res.json(data)
  })
  .catch(error => {
    console.log(error);
  });
    
});

module.exports = router
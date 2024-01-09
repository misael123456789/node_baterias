const {Router} = require('express')
const request = require('request');
var Minio = require('minio')
const multer = require("multer");
var upload = multer({ dest: '../upload/'});
var type = upload.single('file');
const router = Router()
var fs = require('fs');
const {Pool, Client} = require('pg');
const optionPG = {
  user: 'freelance',
  host: '54.218.22.68',
  database: 'mum',
  password: '123456',
  port: 5432,
}



var minioClient = new Minio.Client({
  endPoint: '54.218.22.68',
  port: 8080,
  useSSL: false,
  accessKey: 't9oqddedrcktiHpgiCSI',
  secretKey: 'ojg4TQrJ3ocThDAA4uxP1XlFvSomWjuMz5LnGiew',
})

var metaData = {
  'Content-Type': 'application/octet-stream',
  'X-Amz-Meta-Testing': 1234,
  example: 5678,
}


router.post('/mum/week', async (req, res)=>{
  result = await insertWeek(req.body.titulo,req.body.semana, req.body.desc, req.body.url)
  result ? res.json({status: true}) : res.json({status: false})
  
})

router.post('/mum/upload',type,(req,res,next)=>{
  var tmp_path = req.file.path;
  var target_path = 'src/upload/' + req.file.filename+'.png';
  console.log(req.file.fieldname);
  fs.readFile(tmp_path, function(err, data){
    fs.writeFile(target_path, data, (err) => {
      const fileName = makeid(50);
      minioClient.fPutObject('mum', fileName, target_path, metaData, function (err, etag) {
        if (err) return console.log(err)
        fs.unlink(target_path, (err) => {
          if (err) {
            res.json({"error":err})
          } else {
            res.json({"file": fileName})
          }
        })
      })
    })
  })
})

async function insertWeek(title, week, description, url){
  client = new Client(optionPG);
  await client.connect()
  const query = {
    text: 'INSERT INTO weeks(id, title, week, description, image) VALUES($1, $2, $3, $4, $5)',
    values: [makeidNumber(10),title, week, description, url],
  }
  
  const res = await client.query(query)
  
  await client.end()
  return res.rowCount
}

async function deleteWeek(id){
  client = new Client(optionPG);
  await client.connect()
  const query = {
    text: 'DELETE FROM weeks WHERE id = $1',
    values: [id],
  }
  
  const res = await client.query(query)
  
  await client.end()
  return res.rowCount
}

async function gettWeeks(){
  client = new Client(optionPG);
  await client.connect()
  const query = {
    text: 'SELECT * FROM weeks ORDER BY week DESC',
  }
  
  const res = await client.query(query)
  
  await client.end()
  return res.rows
}

router.get('/mum/weeks',async  (req, res)=>{
  const rows = await gettWeeks();
  rows ? res.json({status:true, data: rows}) :  res.json({status:false})
})

router.post('/mum/deleteWeek',async  (req, res)=>{
  const row = await deleteWeek(req.body.id);
  row ? res.json({status:true}) :  res.json({status:false})
})


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result+'.png';
}

function makeidNumber(length) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

module.exports = router
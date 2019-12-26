const express = require ('express')
const fitpadrouter = express.Router()
const jsonbodyparser = express.json()


fitpadrouter.post('/',jsonbodyparser, (req,res) =>{
  console.log(req.body)

})

module.exports = fitpadrouter
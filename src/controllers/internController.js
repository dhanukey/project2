const {count} = require("console");
const collegeModel = require("../models/collegeModel");

 const internModel = require("../models/internModel");


//------------------------------------------------intern Validation------------------------------------------------------------------------

const handleError= (err) =>{

let errors = { name:'', email:'', mobile:'' }

if(err.code ===11000){

    
   if(err.message.includes('mobile_1')){

    errors.mobile =' the mobile is registered'
   }
   
   if(err.message.includes('email_1')){
       errors.email='the email is already registered'
   }
  

    Object.keys(errors).forEach(k => (!errors[k] && errors[k] !== undefined) && delete errors[k]);
    return errors;
  }

 if (err.message.includes('intern validation failed')){

  

  Object.values(err.errors).forEach(({properties}) => {
   errors[properties.path]= properties.message;
  });

  Object.keys(errors).forEach(k => (!errors[k] && errors[k] !== undefined) && delete errors[k]);

  return errors;
 }}


//------------------------------------------------Create intern------------------------------------------------------------------------

const createintern = async function (req, res) {
try{

  let data = req.body;
 
  if(!data.collegeName){

    return res.status(400).send({msg: 'collegeName is required'})}

    let name= data.collegeName

  let blogid= await collegeModel.find({$and:[{name: name}, {isDeleted:false}]})

  if(blogid.length<=0){

    return res.status(400).send({msg: "no college found with such name in our DB"})
  }
  let blogid1= await collegeModel.find({name: name}).select({_id:1})

  k=blogid1[0]._id;

  // console.log(k)

 data.collegeId = k;

  let internCreated = await internModel.create(data);
  res.status(201).send({ data:internCreated });
 } catch (error) {

  
  const errors = handleError(error)
  res.status(400).send({errors})
 }
};

module.exports.createintern= createintern;

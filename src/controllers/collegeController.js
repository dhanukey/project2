const {count} = require("console")
const collegeModel= require("../models/collegeModel");
const internModel = require("../models/internModel");




//------------------------------------------------college Validation------------------------------------------------------------------------

const handleError= (err) =>{

let errors = {name: '',fullName: '', logoLink: ''}

 if(err.code ===11000){

  errors.name= 'college name should be unique'
  Object.keys(errors).forEach(k => (!errors[k] && errors[k] !== undefined) && delete errors[k]);
  return errors;
 }

 if (err.message.includes('college validation failed')){



  Object.values(err.errors).forEach(({properties}) => {
   errors[properties.path]= properties.message;
  });

 Object.keys(errors).forEach(k => (!errors[k] && errors[k] !== undefined) && delete errors[k]);

  return errors;
 }}


//------------------------------------------------Create college------------------------------------------------------------------------

const createcollege = async function (req, res) {
try{

  let data = req.body;
 
  

  let collegeCreated = await collegeModel.create(data);
  res.status(201).send({ data: collegeCreated });
 } catch (error) {
  const errors = handleError(error)
  res.status(400).send({errors})
 }
};

//------------------------------------------------get college------------------------------------------------------------------------


let getcollege=  async function(req,res){

let data= req.query
if(!data.collegeName){

  return res.status(400).send({msg: "please provide a college name "})
}

let collegematch= await collegeModel.find({$and:[{name: data.collegeName}, {isDeleted: false}]})
// console.log(collegematch)

if(collegematch.length<=0){
  return res.send({msg: "no such college exist in our DB"})
}

// console.log(collegematch[0]._id)

let search=collegematch[0]._id

let Interested = await internModel.find({$and:[{collegeId: search},{isDeleted: false}]}).select({name:1,email:1,mobile:1})

// console.log(Interested)

if(Interested.length >0){

  const finaldata= {
   name: collegematch[0].name,
   fullName: collegematch[0].fullName,
   logoLink: collegematch[0].logoLink,
   interests: Interested}
//  collegematch.push(Interested)

res.status(200).send({data:finaldata})


}
if(Interested.length <=0){

  const finaldata= {
   name: collegematch[0].name,
   fullName: collegematch[0].fullName,
   interests: " no student has applied for internship"}
//  collegematch.push(Interested)

res.status(200).send({data:finaldata})


}





}













module.exports.createcollege= createcollege;
module.exports.getcollege= getcollege;


const mongoose = require("mongoose");

 const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {


     name:{
      type: String,
      required: [true,'please provide a username'],
      trim:true,
      match: [/^[a-zA-Z, ]*$/,'only strings are allowed for name']


    },


    email: {
      type: String,
      // type: mongoose.SchemaTypes.Email,
      required: [true, 'email should be present'],
      unique: true,
      trim:true,
      lowercase:true,

      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    
      // validate: {
      //   validator: function(email) {
      //       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      //   },
      //   message: "Please enter a valid email", isAsync: false
    
    },

    mobile:{
      type: Number,

      required: [true, 'mobile no is required'],
      //  match: [/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, 'Please fill a valid mobile address'],

     validate: {
        validator: function(mobile) {
            return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(mobile);
        },
        message: "Please enter a valid mobile no", isAsync: false
    },
      unique:true
    },

    collegeId:{
      type:ObjectId,
      ref:'College'
    }, 

    isDeleted: {
      
      type: Boolean, 
      default: false}}

    


    

  // { timestamps: true }
);

module.exports = mongoose.model("intern", internSchema);

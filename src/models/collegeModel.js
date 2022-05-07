const mongoose = require("mongoose");


const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[true, 'plese enter college'],
      trim: true,
      unique: true,
      match: [/^[a-zA-Z, ]*$/,'only strings are allowed for college name']
    },
    fullName: {
      type: String,
      required: [true, 'Do not forget fullname'],
      trim: true,
      match:[/^[a-zA-Z,\-. ]+$/, 'only strings are accepted as Full name ']
    },

     logoLink:{
       type: String,
       required: [true, 'please insert a logo'],
       match:[/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, 'please provide valid URL' ],
     },
    
    
    isDeleted: {
      
      type: Boolean, 
      default: false}}
      // ,{ timestamps: true }
);

module.exports = mongoose.model("college", collegeSchema);

var slugify = require("slugify");
const nodemailer = require("nodemailer");
const adminModel = require("../model/adminModel");
const saltRounds = 10;
const bcrypt = require("bcrypt");

let createSlug = (title) => {
  return slugify(title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "pradeep.9997@gmail.com",
    pass: "krynyyvkbsiuowsc",
  },
});


let adminCreate=async ()=>{

  let adminData=await adminModel.find()
  const hash = bcrypt.hashSync("pradeep123", saltRounds);
  if(adminData.length===0){
      adminModel.insertOne(
      {
        email:"pradeep.9997@gmail.com",
        password: hash

      }
    )

  }
  
}

module.exports={createSlug,transporter,adminCreate}
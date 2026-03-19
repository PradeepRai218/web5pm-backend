const bcrypt = require("bcrypt");
const { userModel } = require("../../model/userModel");
let jwt = require('jsonwebtoken');
const saltRounds = 10;

let createUser = async (req, res) => {
  let { name, email, phone, password } = req.body;

  try {
    const hash = bcrypt.hashSync(password, saltRounds);
    let insertObj = {
      name,
      email,
      phone,
      password: hash,
    };

    let user = await userModel.insertOne(insertObj); //

    let obj = {
      _status: true,
      _message: " user Created",
      user,
    };
    res.send(obj);
  } catch (err) {
    let error = [];
    for (let key in err.errors) {
      let obj = {};
      obj[key] = err.errors[key].message;
      error.push(obj);
    }
    // console.log(err.errors);
    let obj = {
      _status: false,
      error,
    };
    res.send(obj);
  }
};

let login = async (req, res) => {
  let { email, password } = req.body;

  let checkEmail = await userModel.findOne({ email }); //OBject Database Store

  if (checkEmail) {
    let dbPassword = checkEmail.password;

    if (bcrypt.compareSync(password, dbPassword)) {

      let token= jwt.sign({userId:checkEmail._id},process.env.TOKENKEY)
      
         let obj = {
        _status: true,
       
        token
      };
       res.send(obj);
    } // true
    else {
      let obj = {
        _status: false,
        _message: " Invalid Password....",
      };
      res.send(obj);
    }
  } else {
    let obj = {
      _status: false,
      _message: " Email Id Not Exist....",
    };
    res.send(obj);
  }

  //password -- pradeep123
};

let changePassword=async (req,res)=>{
   let {oldPassword,newPassword}=req.body //pradeep123456
   let token=req.headers.authorization.split(" ")[1]; 

   let deCode=jwt.decode(token,process.env.TOKENKEY)
   let {userId}=deCode

   //userDataGet
      let userData = await userModel.findOne({ _id:userId }); 
      let dbPassword=userData.password //#password
    if (bcrypt.compareSync(oldPassword, dbPassword)) {

        const hash = bcrypt.hashSync(newPassword, saltRounds);

      await userModel.updateOne(
        {
         
            _id:userId
         
        },
        {
          $set:{
            password:hash
          }
        }
      )
      let obj={
        _status:true,
        _message:"Password Change Successfully...."
      }
      res.send(obj)

    }
    else{
       let obj = {
        _status: false,
        _message: " Invalid Old Password....",
      };
      res.send(obj);
    }
   
   //[ "Bearer" ," eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWJhN2JlMjliNjcyNzcwNDY1Y2RlMzMiLCJpYXQiOjE3NzM5MTUxMTR9.vEGc5p4cqplRK_DetdzS1zzQr_ex_BV5v--uHfJ_1BU"]
   res.send("hello")
   
}

// let s="welcome to ws"

// let l=s.split(" ")//[ "welcome","to","ws" ]

// let lastValue=l[l.length-1]

module.exports = { createUser,login,changePassword };

const bcrypt = require("bcrypt");
const { userModel } = require("../../model/userModel");
let jwt = require("jsonwebtoken");
const { transporter } = require("../../config/helper");
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
      let token = jwt.sign({ userId: checkEmail._id }, process.env.TOKENKEY);

      let obj = {
        _status: true,

        token,
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

let changePassword = async (req, res) => {
  let { oldPassword, newPassword } = req.body; //pradeep123456
  let token = req.headers.authorization.split(" ")[1];

  let deCode = jwt.decode(token, process.env.TOKENKEY);
  let { userId } = deCode;

  //userDataGet
  let userData = await userModel.findOne({ _id: userId });
  let dbPassword = userData.password; //#password
  if (bcrypt.compareSync(oldPassword, dbPassword)) {
    const hash = bcrypt.hashSync(newPassword, saltRounds);

    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          password: hash,
        },
      },
    );
    let obj = {
      _status: true,
      _message: "Password Change Successfully....",
    };
    res.send(obj);
  } else {
    let obj = {
      _status: false,
      _message: " Invalid Old Password....",
    };
    res.send(obj);
  }

  //[ "Bearer" ," eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWJhN2JlMjliNjcyNzcwNDY1Y2RlMzMiLCJpYXQiOjE3NzM5MTUxMTR9.vEGc5p4cqplRK_DetdzS1zzQr_ex_BV5v--uHfJ_1BU"]
  res.send("hello");
};

let forgotPassword = async (req, res) => {
  let { email } = req.body;

  let checkEmail = await userModel.findOne({ email });

  if (checkEmail) {
    //Reset Pasword Link
    const info = await transporter.sendMail({
      from: '"Ecom App" <pradeep.9997@gmail.com>',
      to: email,
      subject: "Ecom App | Reset Password Link",
      text: "Reset your password using the link provided",
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
      <tr>
        <td align="center">
          
          <!-- Main Container -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td style="background:#4CAF50; padding:20px; text-align:center; color:#ffffff;">
                <h1 style="margin:0;">Ecom App</h1>
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td style="padding:30px; text-align:center;">
                <h2 style="color:#333;">Reset Your Password</h2>
                <p style="color:#555; font-size:16px;">
                  We received a request to reset your password. Click the button below to set a new password.
                </p>
                
                <!-- Button -->
                <a href="http://localhost:3000/reset-password/${checkEmail._id}" 
                   style="display:inline-block; margin-top:20px; padding:12px 25px; background:#4CAF50; color:#ffffff; text-decoration:none; border-radius:5px; font-size:16px;">
                  Reset Password
                </a>

                <p style="margin-top:20px; font-size:14px; color:#999;">
                  If you did not request this, please ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#777;">
                © ${new Date().getFullYear()} Ecom App. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `,
    });
    let obj = {
      _status: true,
      _message: "Reset Password Link Sent Your Email Id....",
    };
    res.send(obj);
  } else {
    let obj = {
      _status: false,
      _message: " Email Id Not Exist....",
    };
    res.send(obj);
  }

  res.send("hello");
};

let resetPassword=async (req,res)=>{
  let {userId}=req.params
  let {newPassword,confirmPassword}=req.body

  let checkUser=await userModel.findOne({_id:userId})

  if(!checkUser){
      let obj={
          _status:false,
          _message:"User Not Found...."
      }
      return res.send(obj)
  }
  else if(newPassword!=confirmPassword){
     let obj={
          _status:false,
          _message:"New Password and Confirm Password Not Match...."
      }
       return res.send(obj)
  }
  else{
      const hash = bcrypt.hashSync(newPassword, saltRounds);
      await userModel.updateOne(
          {
              _id:userId
          },
          {
              $set: {
                  password: hash
              }
          }
      );
      let obj={
          _status:true,
          _message:"Password Reset Successfully...."
      }
      return res.send(obj)
  }

  res.send("Hello")
}

let getuserData=async (req,res)=>{
  let token = req.headers.authorization.split(" ")[1];

  let deCode = jwt.decode(token, process.env.TOKENKEY);
  let { userId } = deCode;

  //userDataGet
  let userData = await userModel.findOne({ _id: userId });
  let obj={
      _status:true,
      userData
  }
  res.send(obj)


}

// let s="welcome to ws"

// let l=s.split(" ")//[ "welcome","to","ws" ]

// let lastValue=l[l.length-1]

module.exports = { createUser, login, changePassword, forgotPassword,resetPassword,getuserData };

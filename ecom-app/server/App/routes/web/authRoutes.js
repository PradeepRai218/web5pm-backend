let express=require("express")
const { createUser, login, changePassword } = require("../../controller/web/authController")

let authRoute=express.Router()


authRoute.post('/create',createUser)


authRoute.post('/login',login)

authRoute.post('/change-password',changePassword)


module.exports={authRoute}
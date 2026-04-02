let express=require("express")
const { createUser, login, changePassword, forgotPassword, resetPassword, getuserData } = require("../../controller/web/authController")

let authRoute=express.Router()


authRoute.post('/create',createUser)


authRoute.post('/login',login)

authRoute.post('/change-password',changePassword)


authRoute.post('/forgot-password',forgotPassword)


authRoute.put('/reset-password/:userId',resetPassword)



authRoute.post('/get-data',getuserData)


module.exports={authRoute}
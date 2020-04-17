//登录和注册
const express = require("express");
const router = express.Router(); //接口请求
var jwt = require('jsonwebtoken'); //token
const keys = require("../../config/keys"); //目的调用 secretOrkey
const mongoHelper=require("../../models/mongoHelper"); //替代数据模型的调用
const axios = require('axios')
//$route GET api/wxusers/test
//@desc 返回的请求的json数据
//@access public
router.get("/test",(req,res) => {
    res.json({msg:"login works"})
})
//token
let generateToken = function(user) { //token生成
    return jwt.sign(user,keys.secretOrkey,{
        expiresIn: 7200
    })
}
//$route POST api/wxusers/login
//@desc 返回的请求的json数据
//@access public
router.post("/login",async(req,res) => {
    const queryString = `appid=${keys.appID}&secret=${keys.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`
    const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
    axios.get(wxAPI) 
        .then(response => {
            console.log(response.data)
            const openid = response.data.openid;
            mongoHelper.findOne("wxuser",{openid}).then(user_id => {
                if(user_id) {
                    return res.json ({
                        token: generateToken({openid:response.data.openid})
                    })
                } else {
                    mongoHelper.insertOne("wxuser",{openid}).then(user_add=> {
                        return res.json ({
                            token: generateToken({openid:response.data.openid})
                        })
                    })
                }
            }).catch(error => {console.log(error)})
        })
})
//$route POST api/wxusers/checkToken
//@desc 返回的请求的json数据
//@access public
router.post("/checkToken",async(req,res) => {
    let token = req.headers.token;
    console.log(token)
    if(token) {
        jwt.verify(token,keys.secretOrkey,(err,decoded) => {
            console.log(err);
            if(err) {
               if(err.name == 'TokenExpiredError') {
                   console.log('认证码失败，请重新登录');
                   return res.status(401).json({error:'认证码失败，请重新登录',errorCode: 1002})
               } else {
                   console.log('认证失败')
                   return res.status(401).json({error:'认证码失败',errorCode: 1003})
               }
            } else {
                return res.status(200).json({message:'已登录',errorCode: 1004})
            }
        })
    } else {
        return res.status(403).json({
            error:'请提供认证码',
            errorCode: 1001
        })
    }
})

module.exports = router;
//登录和注册
const express = require("express");
const router = express.Router(); //接口请求
const bcrypt  =require("bcryptjs"); //加密和密码验证
const gravatar = require('gravatar'); //获取头像数据
const User = require("../../models/User"); //数据模型 暂时调用不到
var jwt = require('jsonwebtoken'); //token
const keys = require("../../config/keys"); //目的调用 secretOrkey
const mongoHelper=require("../../models/mongoHelper"); //替代数据模型的调用
const passport = require("passport");
//$route GET api/users/test
//@desc 返回的请求的json数据
//@access public
router.get("/test",(req,res) => {
    res.json({msg:"login works"})
})
//$route POST api/users/register
//@desc 返回的请求的json数据
//@access public
//post 请求需要安装第三方  npm i body-parser

router.post("/register",async(req,res) => {
  var userFind = mongoHelper.findOne("test",{email: req.body.email});
  console.log(req.body)
  //查询数据库中是否拥有邮箱
  userFind.then((user) => {
       if(user) {
            return res.status(400).json('邮箱已被注册!')
       } else {
           const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
           const newUser = new User({
               name: req.body.name,
               email: req.body.email,
               avatar,
               password:req.body.password,
               identity:req.body.identity
           })
           //npm install bcrypt -S 密码加密操作
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, async(err, hash) => {
                    // Store hash in your password DB.
                    if(err) throw err;
                    newUser.password = hash;
                    console.log('000')
                    await mongoHelper.insertOne("test",newUser);
                    // newUser.save().then(user => res.json(user))
                    //               .catch(err => console.log(err+',mmmm'));
                    return res.status(200).json(newUser)
                });
            });
       }
    }).catch(err => console.log(err+',mmmm')).finally(console.log(2));
})
//登录验证
router.post("/login",async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    // User.findOne({email}).then(user => {
    mongoHelper.findOne("test",{email}).then(user => {
        if(!user){
            return res.status(404).json('用户不存在')
        }
        //密码匹配
        bcrypt.compare(password, user.password).then(isMatch =>{
            console.log(isMatch);
            if(isMatch) {
                const rule = {
                    id:user.id,
                    name:user.name,
                    avatar:user.avatar,
                    identity: user.identity,
                };
                 // jwt.sign("规则","加密名字","过期时间","箭头函数") npm install jsonwebtoken
                jwt.sign(rule,keys.secretOrkey,{expiresIn: 3600},(err,token) => {
                    if(err) throw err;
                    res.json({
                        success: true,
                        token: "Bearer "+token
                    })
                })
                // res.json({msg:"success"});
            } else {
                return res.status(400).json("密码错误！");
            }
        })
    })
})

//$route GET api/users/current
//@desc 返回的请求的json数据
//@access Private
//token 验证  npm i passport-jwt passport
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    res.json(req.user);
})

//$route GET api/users
//@desc 返回的请求的json数据
//@access 查询出所有的用户数据
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    mongoHelper.find('test','').then(userlist => {
        if(!userlist) {
            return res.status(404).json('没有任何内容');
        }
        res.json(userlist);
    })
    .catch(err => res.status(404).json(err));
})

//$route POST api/users/edit
//@desc 编辑用户信息接口
//@access Private
router.post("/edit",passport.authenticate("jwt",{session:false}),
  (req,res)=> {
    const _id = req.body.id
    // const _id = req.params.id
    console.log(req.body.id)
    const UserFields = {};
    if (req.body.name) UserFields.name = req.body.name;
    if (req.body.email) UserFields.email = req.body.email;
    if (req.body.password) UserFields.password = req.body.password;
    if (req.body.identity) UserFields.identity = req.body.identity;
    console.log(JSON.stringify(UserFields))
    mongoHelper.findOneById("test",_id).then(user_id=> {
        console.log(JSON.stringify(user_id))
        if(!user_id){
            return res.status(404).json('当前用户信息异常')
        }
        //密码匹配 输入的密码
        if(user_id.password == req.body.password) {
            console.log(1)
            mongoHelper.updateOneById("test",req.body.id,UserFields)
            .then(user_edit => {
                res.json(user_edit);
            })
            .catch(err => res.status(404).json(err));
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(UserFields.password, salt, async(err, hash) => {
                    if(err) throw err;
                    UserFields.password = hash;
                    console.log(hash)
                    mongoHelper.updateOneById("test",req.params.id,UserFields)
                    .then(user_edit => {
                        res.json(user_edit);
                    })
                    .catch(err => res.status(404).json(err));
                });
            });
        }
    })
    
})
//$route POST api/users/delete:id
//@desc 删除信息接口
//@access Private
//第一种
// router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
//     // {_id:req.params.id}
//     mongoHelper.deleteOneById("test",req.params.id).then(profile_delet => {
//         res.json('删除成功') 
//     })
//     .catch(err => res.status(404).json("删除失败"));
// })
// 第二种
router.delete("/delete",passport.authenticate("jwt",{session:false}),(req,res) => {
    // {_id:req.params.id}
    const _id = req.body.id;
    console.log(req.body)
    mongoHelper.deleteOneById("test",_id).then(profile_delet => {
        res.json('删除成功') 
    })
    .catch(err => res.status(404).json("删除失败"));
})
//$route POST api/users/screen
//@desc 查询信息接口
//@access Private
//查询
router.post("/screen",passport.authenticate("jwt",{session:false}),(req,res) => {
    const name = req.body.name;
    // 查询数据库
    mongoHelper.find("test",{name:eval("/"+name+"/i")}).then(user => {
        console.log(req.body)
        if(!user){
            return res.status(404).json('用户不存在')
        }
        res.json(user);
    })
    .catch(err => res.status(404).json("查询失败"));
})
module.exports = router;
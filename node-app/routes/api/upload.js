const express = require('express');
const router = express.Router();
const ueditor = require("ueditor");
const path = require('path');
//获取时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate.toString();
}

var datatime = 'public/images/'+getNowFormatDate();
//将图片放到服务器
var multer = require('multer')
var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: datatime,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
     }
}); 
var upload = multer({
    storage: storage
});

//单个图片上传
router.post('/addPicture',upload.single('file'),function(req,res,next){
    console.log(req.body.picTitle)//console.log(req.query.picTitle);//get
    console.log(req.file)//req.file文件的具体信息
    // res.send({ret_code: '/'+req.file.destination+'/'+req.file.originalname});
    res.send({name: req.file.filename,url: 'http://localhost:5000/'+req.file.destination+'/'+req.file.originalname});
});

//多图
// router.post('/morePicture',upload.array('file',10),function(req,res,next){
//     console.log(req.body.picTitle)//console.log(req.query.picTitle);//get
//     console.log(req.files)//req.file文件的具体信息
//     res.send({ret_code: datatime});
// });
   
// ueditor(path.join(__dirname, '../public/')
router.use("/morePicture",ueditor(path.join(process.cwd(),'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url = '/ueditor/business';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/ueditor/business';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/UEditor/php/config.json');
    }
}));

// router.use("/morePicture",ueditor(path.join(process.cwd(),'public'),function (req,res,next){
//     //客户端上传文件设置
//     //console.log(req.query.action);
//     let ActionType = req.query.action;
//     if(ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo'){
//         let file_url = '/img/ueditor/';//默认图片上传地址
//         /*其他上传格式的地址*/
//         if(ActionType === 'uploadfile'){
//             file_url = '/file/ueditor/'; //附件
//         }
//         if(ActionType === 'uploadvideo'){
//             file_url = '/video/ueditor/'; //视频
//         }
//         res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
//         res.setHeader('Content-Type','text/html');
//     }
//     //  客户端发起图片列表请求
//     else if(req.query.action === 'listimage'){
//         let dir_url = '/img/ueditor/';
//         res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
//     }else if(req.query.action === 'listfile'){
//         let dir_url = '/file/ueditor/';
//         res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
//     }
//     // 客户端发起其它请求
//     else{
//         // console.log('config.json')
//         res.setHeader('Content-Type','application/json');
//         res.redirect('/ueditor/nodejs/config.json');
//     }
// }));


// var cpUpload = upload.fields([{name:'user2',maxCount:4},{name:'user',maxCount:2}])
// router.post('/addPicture',cpUpload,function(req,res,next){
//     console.log(JSON.stringify(cpUpload))
//     console.log(req.body.picTitle)//console.log(req.query.picTitle);//get
//     console.log(req.files.user2)//req.file文件的具体信息
//     console.log(req.files.user)
//     res.send({ret_code: datatime});
// });
module.exports = router;
//技术分享
const express = require("express");
const router = express.Router(); //接口请求
const mongoHelper=require("../../models/mongoHelper"); //替代数据模型的调用
const passport = require("passport");
const nodeExcel = require('excel-export');
var flag = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
router.get("/test",(req,res) => {
    res.json({msg:"技术分享"})
})
//$route GET api/news/add
//@desc 返回的请求的json数据
//@access news
/*
商家图片，标题，副标题，经纬度，详细，地址
*/ 
router.post("/add",passport.authenticate("jwt",{session:false}),async(req,res) => {
    console.log(555)
    const news_list = {};
    news_list.data = date(); //时间
    news_list.give = '0' //点赞个数
    news_list.reads = '0' //阅读量
    news_list.Top = '0' //是否置顶
    if (req.body.name) news_list.name = req.body.name; //作者
    if (req.body.category) news_list.category = req.body.category; //类别
    if (req.body.title) news_list.title = req.body.title; //标题
    if (req.body.sub_title) news_list.sub_title = req.body.sub_title; //副标题
    if (req.body.img) news_list.img = req.body.img; //图片
    if (req.body.content) news_list.content = req.body.content; //内容
    console.log(news_list);
    try {
        await mongoHelper.insertOne('news',news_list);
        return res.status(200).json(news_list);
    } catch(error) {
        return res.status(404).json(error);
    }
    
})
//$route GET api/news/edit
//@desc 根据id修改数据
//@access news
router.post("/edit",passport.authenticate("jwt",{session:false}),(req,res) => {
    const news_list = {};
    if (req.body.Top) news_list.Top = req.body.Top; //置顶
    if (req.body.name) news_list.name = req.body.name; //作者
    if (req.body.category) news_list.category = req.body.category; //类别
    if (req.body.title) news_list.title = req.body.title; //标题
    if (req.body.sub_title) news_list.sub_title = req.body.sub_title; //副标题
    if (req.body.img) news_list.img = req.body.img; //图片
    if (req.body.content) news_list.content = req.body.content; //内容
    console.log(JSON.stringify(news_list))
    mongoHelper.updateOneById('news', req.body.id, news_list).then(edit_list => {
        res.json(edit_list)
    })
   .catch(err => res.status(404).json(err))
})
//$route GET api/news/
//@desc 根据id修改数据
//@access news
router.post("/",async(req,res) => {
    //分页数据
    const page = req.body.page;
    const title = req.body.title || '';
    const SizeChange = req.body.SizeChange || '5';
    console.log(req.body)
    try {
        console.log(flag.test(title))
        if(flag.test(title)) {
            res.status(404).json({status: 0,msg: "获取失败",result: '当前输入包含了特殊字符'})
            return;
        }
        let news_list = [];
        //根据page为0则查出全部数据
        if(page == 0 && title=='') {
            news_list = await mongoHelper.find('news','');
        } else if(page == 0 && title!='') {
            news_list = await mongoHelper.find('news',condition);
        } else if(page!=0 && title==''){
            news_list = await mongoHelper.find_limit('news','',page,SizeChange);
        } else {
            news_list = await mongoHelper.find_limit('news',{title:eval("/"+title+"/i")},page,SizeChange);
        }
        //查询总条数 聚合操作
        let total ='';
        if(title=='') {
            total = await mongoHelper.find_count('news','');
        } else {
            total = await mongoHelper.find_count('news',{title:eval("/"+title+"/i")});
        }
         
        res.json({status: 1,msg: "获取成功",result: {news_list,pagination:{total,page}}})//请求到的JSON
    } catch (error) {
        console.log(error)
    }
})
//$route GET api/news
//@desc 获取单个的数据
//@access news
router.post("/search",(req,res) => {
    const title = req.body.title;
    const category_list = {$or:[{title:eval("/"+title+"/i")},{ category:eval("/"+title+"/i")}]}
    console.log(title)
    mongoHelper.find("news",category_list).then(search_list => {
        console.log(search_list)
        res.json({status: 1,msg: "获取成功",result: search_list});
    })
    .catch(err => res.status(404).json("查询失败"));
})
//$route POST api/news/delete
//@desc 删除信息接口
//@access Private
router.delete("/delete",passport.authenticate("jwt",{session:false}),(req,res) => {
    const _id = req.body.id;
    mongoHelper.deleteOneById("news",_id).then(news_delet => {
        res.json('删除成功') 
    })
    .catch(err => res.status(404).json("删除失败"));
})


// 时间格式化
function date() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    let nowDate =year + "-" + month + "-" + day;
    return nowDate
}
module.exports = router;
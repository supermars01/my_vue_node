//商家入驻
const express = require("express");
const router = express.Router(); //接口请求
const mongoHelper=require("../../models/mongoHelper"); //替代数据模型的调用
const passport = require("passport");
//$route GET api/business_category/add
//@desc 添加数据
//@access business_category
router.post('/add',(req,res) => {
    const category_list = {};
    console.log(14144)
    category_list.date = date(); 
    if (req.body.name) category_list.name = req.body.name; //标题
    mongoHelper.insertOne('business_category',category_list).then(cat_list => {
        res.json({status: 1,msg: "添加成功",result: cat_list})//请求到的JSON
    })
    .catch(err => res.status(404).json('添加失败'));
})
//$route GET api/business_category/delete
//@desc 删除数据
//@access business_category
router.delete('/delete',(req,res) => {
    const _id = req.body.id;
    mongoHelper.deleteOneById("business_category",_id).then(business_delet => {
        res.json({status: 1,msg: "删除成功"})//请求到的JSON
    })
    .catch(err => res.status(404).json('删除失败'));
})
//$route GET api/business_category/edit
//@desc 编辑数据
//@access business_category
router.post('/edit',(req,res) => {
    const category_list = {};
    if (req.body.name) category_list.name = req.body.name; //标题
    mongoHelper.updateOneById('business_category',req.body.id, category_list).then(cat_list => {
        res.json({status: 1,msg: "编辑成功",result: cat_list})//请求到的JSON
    })
    .catch(err => res.status(404).json('编辑失败'));
})
//$route GET api/business_category/list
//@desc 查询列表
//@access business_category
router.get('/list',(req,res) => {
    mongoHelper.find('business_category','').then(cat_list => {
        res.json({status: 1,msg: "获取成功",result: cat_list})//请求到的JSON
    })
    .catch(err => res.status(404).json('暂无内容'));
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
module.exports = router
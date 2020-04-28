//商家入驻
const express = require("express");
const router = express.Router(); //接口请求
const mongoHelper=require("../../models/mongoHelper"); //替代数据模型的调用
const passport = require("passport");
const nodeExcel = require('excel-export');
var flag = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
router.get("/test",(req,res) => {
    res.json({msg:"商家入驻"})
})
//$route GET api/business/Excel
//@desc 表格下载
//@access business
//导出所有用户信息到excel
router.get('/exportExcel', function (req, res) {
    //创建一个写入格式map，其中cols(表头)，rows(每一行的数据);
    let conf = {};
    conf.name = "mysheet";
    //手动创建表头中的内容
    let cols = ['合作商家', '类型','手机号','省份','城市','地址'];
    //在conf中添加cols
    conf.cols = [];
    for(let i = 0; i < cols.length; i++) {
        //创建表头数据所对应的类型,其中包括 caption内容 type类型
        let tits = {};
        //添加内容
        tits.caption = cols[i];
        //添加对应类型，这类型对应数据库中的类型，入number，data但一般导出的都是转换为string类型的
        tits.type = 'string';
        //将每一个表头加入cols中
        conf.cols.push(tits);
    }
    //mongoose查询数据库的用户信息
    mongoHelper.find('business','').then(data=>{
            //创建一个和表头对应且名称与数据库字段对应数据，便于循环取出数据
            let rows = ['title','category','phone','province','city','address'];
            //用于承载数据库中的数据
            let datas =[];
            //循环数据库得到的数据
            for(let i = 0; i < data.length; i++){
                let row =[];//用来装载每次得到的数据
                //内循环取出每个字段的数据
                for(let j = 0; j < rows.length; j++){
                    row.push(data[i][rows[j]].toString());
                }
                //将每一个{ }中的数据添加到承载中
                datas.push(row);
            }
            conf.rows = datas;
            //将所有数据写入nodeExcel中
            let result =nodeExcel.execute(conf);
            //设置响应头，在Content-Type中加入编码格式为utf-8即可实现文件内容支持中文
            res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
            //设置下载文件命名，中文文件名可以通过编码转化写入到header中。
            res.setHeader("Content-Disposition", "attachment; filename="+ encodeURI('商家信息表') + ".xlsx");
            //将文件内容传入
            res.end(result,'binary');
            
        }).catch(err => res.status(404).json(err))
})
//$route GET api/business/add
//@desc 返回的请求的json数据
//@access business
/*
商家图片，标题，副标题，经纬度，详细，地址
*/ 
router.post("/add",passport.authenticate("jwt",{session:false}),async(req,res) => {
    const business_list = {};
    business_list.data = date(); 
    business_list.handle = req.body.handle; //操作人
    if (req.body.phone) business_list.phone = req.body.phone; //类别
    if (req.body.category) business_list.category = req.body.category; //类别
    if (req.body.title) business_list.title = req.body.title; //标题
    if (req.body.sub_title) business_list.sub_title = req.body.sub_title; //备注
    if (req.body.locs) business_list.locs = req.body.locs; //经度纬度
    if (req.body.imgList) business_list.imgList = req.body.imgList; //商家轮播图
    if (req.body.goodsLogo) business_list.goodsLogo = req.body.goodsLogo; //商家logo
    if (req.body.address) business_list.address = req.body.address; //地址
    if (req.body.content) business_list.content = req.body.content; //内容
    if (req.body.province) business_list.province = req.body.province; //省份
    if (req.body.city) business_list.city = req.body.city; //城市

    // console.log(JSON.stringify(Business))
    // new Business(business_list).save().then(business_list=> {
    //     res.json(business_list);
    // })
    // .catch(error => console.log(error))
    console.log(business_list);
    try {
        await mongoHelper.insertOne('business',business_list);
        return res.status(200).json(business_list);
    } catch(error) {
        console.log(error)
        return res.status(404).json(error);
    }
    
})
//$route GET api/business/edit
//@desc 根据id修改数据
//@access business
router.post("/edit",(req,res) => {
    const business_list = {};
    
    if (req.body.title) business_list.title = req.body.title; //标题
    if (req.body.phone) business_list.phone = req.body.phone; //类别
    if (req.body.category) business_list.category = req.body.category; //类别
    if (req.body.sub_title) business_list.sub_title = req.body.sub_title; //备注
    if (req.body.locs) business_list.locs = req.body.locs; //经度
    if (req.body.imgList) business_list.imgList = req.body.imgList; //商家轮播图
    if (req.body.goodsLogo) business_list.goodsLogo = req.body.goodsLogo; //商家logo
    if (req.body.address) business_list.address = req.body.address; //地址
    if (req.body.content) business_list.content = req.body.content; //内容
    if (req.body.province) business_list.province = req.body.province; //省份
    if (req.body.city) business_list.city = req.body.city; //城市
    console.log(req.body)
    console.log(JSON.stringify(business_list))
   mongoHelper.updateOneById('business', req.body.id, business_list).then(edit_list => {
       res.json(edit_list)
   })
   .catch(err => res.status(404).json(err))
})
//$route GET api/business
//@desc 获取所有的数据
//@access business
// router.post("/",async(req,res) => {
//     //分页数据
//     const stime = req.body.stime || ''; //开始时间
//     const etime = req.body.etime || ''; // 结束时间
//     const page = req.body.page;  // 页码
//     const title = req.body.title;
//     const category = req.body.category || ''; //类别
//     const SizeChange = req.body.SizeChange || '5'; //一页展示页码
//     console.log(req.body)
//     try {
//         console.log(flag.test(category))
//         if(flag.test(category)) {
//             res.status(404).json({status: 0,msg: "获取失败",result: '当前输入包含了特殊字符'})
//             return;
//         }
//         //都不为空

//         const condition ={'$or':[
//             {data: stime},
//             {data:etime},
//             {"$and":[{data:{"$gt":stime}},{data:{"$lt":etime}}]},
//             {title:eval("/"+title+"/i")},
//             {category:eval("/"+category+"/i")},
//         ]};
//         let business_list = await mongoHelper.find_limit('business',condition,page,SizeChange);
//         //查询总条数 聚合操作
//         let total ='';
//         if(category=='') {
//             total = await mongoHelper.find_count('business','');
//         } else {
//             total = await mongoHelper.find_count('business',condition);
//         }
         
//         res.json({status: 1,msg: "获取成功",result: {business_list,pagination:{total,page}}})//请求到的JSON
//     } catch (error) {
//         console.log(error)
//     }
// })
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
        let business_list = [];
        //根据page为0则查出全部数据
        if(page == 0 && title=='') {
            business_list = await mongoHelper.find('business','');
        } else if(page == 0 && title!='') {
            business_list = await mongoHelper.find('business',{category:title});
        } else if(page!=0 && title==''){
            console.log(555555)
            business_list = await mongoHelper.find_limit('business','',Number(page),Number(SizeChange));
        } else {
            business_list = await mongoHelper.find_limit('business',{category:eval("/"+title+"/i")},Number(page),Number(SizeChange));
        }
        //查询总条数 聚合操作
        let total ='';
        if(title=='') {
            total = await mongoHelper.find_count('business','');
        } else {
            total = await mongoHelper.find_count('business',{title:eval("/"+title+"/i")});
        }
         
        res.json({status: 1,msg: "获取成功",result: {business_list,pagination:{total,page}}})//请求到的JSON
    } catch (error) {
        console.log(error)
    }
    // mongoHelper.find('business','').then(list => {
    //     if(!list) {
    //         return res.status(404).json('暂无内容');
    //     }
    //     res.json(list);
    // })
    // .catch(err => res.status(404).json(err));
})
//$route GET api/business
//@desc 获取单个的数据
//@access business
router.post("/search",(req,res) => {
    const title = req.body.title;
    const category_list = {$or:[{title:eval("/"+title+"/i")},{ category:eval("/"+title+"/i")}]}
    mongoHelper.find("business",category_list).then(search_list => {
        console.log(search_list)
        if(!search_list){
            return res.status(404).json('暂无此商家');
            // {status: 1,msg: "获取成功",result: {business_list,pagination:{total,page}}}
        }
        res.json({status: 1,msg: "获取成功",result: search_list});
    })
    .catch(err => res.status(404).json("查询失败"));
})
//$route POST api/business/delete
//@desc 删除信息接口
//@access Private
router.delete("/delete",(req,res) => {
    const _id = req.body.id;
    mongoHelper.deleteOneById("business",_id).then(business_delet => {
        res.json('删除成功') 
    })
    .catch(err => res.status(404).json("删除失败"));
})
//$route GET api/business/distance
//@desc 获取距离远近的商家
//@access business
router.post("/distance",async(req,res) => {
    let x = req.body.x //当前你的坐标经度
    let y = req.body.y //当前你的坐标纬度
    let distance = req.body.distance //距离
    console.log(x)
    try {
        let r = await mongoHelper.find("business",{locs: {
        $nearSphere: {
            $geometry: { //地理定位
                type: 'Point', //类型，点
                coordinates:[Number(x),Number(y)] //指定坐标 体育西路小学
            },
            $maxDistance: Number(distance)//接受最远的距离 1公里
        }
    }})
    res.json({status: 1,msg: "获取成功",result: r});
    } catch (error) {
        console.log(error)
    }
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
//1. 设置端口号
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const passport = require("passport"); //对请求进行身份验证
const app = express(); 
const path = require('path')
//引入users.js
const users = require("./routes/api/users"); //用户信息
const profile = require("./routes/api/profile"); //资金流水
const business = require("./routes/api/business"); //商家
const business_category = require("./routes/api/business_category"); //商家分类
const upload = require("./routes/api/upload"); //上传
const news = require("./routes/api/news"); //技术列表
const news_category = require("./routes/api/news_category"); //技术列表类别

//DB config
const conf = require("./config/keys");

 //使用body-parser中间件
 app.use(bodyParser.urlencoded({extended:false})); //开启往post传送数据
 app.use(bodyParser.json());

//Connect to mongodb
class Mongodb{
    constructor(conf) { //class原型下的构造函数
        //保存conf到构造的集合中
        this.conf=conf //成员变量
        //连接
        this.client = new MongoClient(conf.url,{useNewUrlParser:  true}) //创建客户端
        this.client.connect( err => { //有自动重连的机制
            if(err) {
                throw err
            }
            console.log('连接数据库成功');
        });
    }
}
module.exports = new Mongodb(conf);
// mongoose.connect(db)
//     .then(()=>console.log("MongoDB Connected"))
//     .catch(err => console.log(err));
app.use(passport.initialize()); //初始化
require("./config/passport")(passport); //传对象过去（代码抽离模式）

//2. 发送一个请求 ，全局安装（npm install nodemon -g）可以不用每次初始执行
//运行 nodemon server.js
app.get("/",(req,res) => {
    res.send("Hellow World!")
})



//使用routes 
app.use("/api/users",users);
app.use("/api/profile",profile);
app.use("/api/business",business);
app.use("/api/upload",upload);

app.use("/api/news",news);
app.use("/api/news_category",news_category);
//图片处理
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/business_category",business_category);
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
//3. npm install mongoose
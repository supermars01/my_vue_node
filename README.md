## 小程序+Vue+Node
#### 产品介绍：
主要是实现一套技术推文的实现已经对商家引入，小程序和后端的登录。
技术推文的实现。主要结合在小程序中列表页和详情页的互动上，凸显出阅读，点赞，置顶，搜索，分页加载等功能，后台主要是列表和类别的增删改查
商家引入的实现。结合小程序主要是实现列表和搜索的实现，列表上主要是附近商家可根据距离筛选，类别筛选，分页等功能特点，后台上主要有表格导出，多图片单图片的上传生成不同时间文件夹的格式存放图片，地图和富文本的功能引入。
小程序和后端登录。比较多的是响应拦截和Token获取，小程序通过code获取到openid授权到生成哈希值Token的登录获取数据，而后端主要是传统的登录注册功能获取token，由于请求的共性，token的鉴权一致性。


#### 技术栈：
此次开发中主要是实现一套由Node实现的后台涉及运用mongodb和express，实现的功能不限于增删改查，表格导出，运用结合了multer进行单图和多图上传，地图和百度富文本的引用等，对用户登录注册的jwt应用,分页等功能
后台页面的搭建主要是以VueCli3.0+Element-Ui为技术栈，以表单功能为主，父子组件的传值，路由的监听，Token的请求，请求和响应拦截，组件的封装，axios数据请求等功能
前端主要是以小程序开发，不限于小程序的登录openid的获取，对Token的返回，组件和页面的通信(包括数据，样式，插槽，自定义事件的实现)，对小程序自带的wx.request的封装结合promise对请求接口的封装等实现

#### 文档介绍
1. 主要实现登录注册 [实现全栈收银系统（Node+Vue）（上）](https://juejin.im/post/5e202fbff265da3e0163eb09)
2. 主要实现第一版前后端的一个功能点资金管理 [实现全栈收银系统（Node+Vue）（下）](https://juejin.im/post/5e5e2dcdf265da5726610b7f)
3. 主要对小程序的补充 [小程序实际开发](https://juejin.im/post/5e675bf0f265da57337d15a0)
4. 主要在第一版的基础上进行拓展开发，以及小程序实现 [实现全栈收银系统（Node+Vue+小程序）（拓展开发）](https://juejin.im/post/5e71923151882549331d0b9d)



#### 图片展示
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/1.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/2.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/3.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/4.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/5.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/x1.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/x2.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/x3.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/x4.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/x5.png)
![](https://github.com/lin593/my_vue_node/blob/master/node-app/public/page_img/x6.png)


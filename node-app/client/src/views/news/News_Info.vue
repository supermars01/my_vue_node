<template>
    <div class="fillcontain">
        <div class="title_nav">{{operation}}</div>
        <div class="form">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="form_rules" ref="formLabelAlign">
                <el-form-item label="类型操作">
                  <el-row :gutter="10">
                     <el-col :span="2"><el-button type="primary" plain @click="dialogTableVisible = true">功能操作</el-button></el-col>
                  </el-row>
                  <!-- 弹窗 -->
                  <el-dialog title="技术类型操作" :visible.sync="dialogTableVisible">
                    <el-row :gutter="10">
                        <el-col :span="6"><el-input v-model="add_category_title" name="title"></el-input></el-col>
                        <el-col :span="1.5"><el-button type="primary" plain @click="add_category">添加</el-button></el-col>
                    </el-row>
                    <el-table :data="gridData" height="500">
                      <el-table-column type="index" label="序号"  width="100"></el-table-column>
                      <el-table-column property="date" label="日期"  width="200"></el-table-column>
                      <el-table-column property="name" label="技术类型" width="300"></el-table-column>
                      <el-table-column  label="操作" >
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            @click="category_Edit(scope.$index, scope.row)">编辑</el-button>
                          <el-button
                            size="mini"
                            type="danger"
                            @click="category_Delete(scope.$index, scope.row)">移除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-dialog>
                  <!-- 弹窗 end -->
                </el-form-item>  
                <el-form-item prop="category" label="文章类型" >
                    <el-select v-model="formLabelAlign.category" placeholder="文章类型">
                        <el-option
                          v-for="(formtype, index) in news_category_list"
                          :key="index" 
                          :label="formtype" :value="formtype"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="title" label="文章标题" >
                  <el-input v-model="formLabelAlign.title" name="title"></el-input>
                </el-form-item>
                <el-form-item  label="副标题">
                  <el-input v-model="formLabelAlign.sub_title"></el-input>
                </el-form-item>
                <el-form-item prop="Top" label="置顶">
                  <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0">
                  </el-switch>
                </el-form-item>
                <el-form-item prop="name" label="作者">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                 <el-form-item label="文章图片">
                   <div class="goods_logo">
                     <img :src="news_img" alt="" >
                     <input type="file" name="file" class="form-control" @change="news_img_btn" >
                   </div>
                 </el-form-item>
                <el-form-item label="详情">
                  <vue-ueditor-wrap v-model="formLabelAlign.content" :config="myConfig"></vue-ueditor-wrap>
                </el-form-item>
                <el-form-item  class="text_right">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("formLabelAlign")'>提  交</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>
<script>
import {news_add,news_edit,category_list,category_add,category_delete,category_edit} from '../../api/news'
import {upload} from '../../api/upload'
import '../../../public/css/form.styl'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    name: 'NewsInfo',
      data() {
        return {
            content_msg: '',
            labelPosition: 'right',
            value: '0', //是否置顶
            formLabelAlign: { },
            gridData: [], //
            news_category_list: [], //类别
            operation: '',//标题
            news_img: '',
            add_category_title: '', //添加类型
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 340,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                serverUrl: '/api/upload/morePicture',
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: '/UEditor/' 
            },
            form_rules: {
              category: [
                 { required: true, message: "文章类型必选！", trigger: "change" }
              ],
              title: [
                { required: true, message: "文章标题不能为空！", trigger: "blur" }
              ],
            },
            dialogTableVisible: false,  //类型弹窗
        }
    },
    components: {
      VueUeditorWrap
    },
    methods: {
    category_arr(){
      this.news_category_list=[];
      //类别获取
      category_list().then(res=> {
        let arr = res.data.result
        this.gridData = res.data.result
        console.log(arr)
        for(let i=0;i<arr.length;i++) {
          this.news_category_list.push(arr[i].name)
        }
      })
    },
    onSubmit(formLabelAlign) {
      console.log(this.formLabelAlign)
      this.formLabelAlign.Top = this.value;
      this.formLabelAlign.img = this.news_img;
      console.log(formLabelAlign);
      this.$refs[formLabelAlign].validate(valid => {
        if (valid) {
          console.log(this.formLabelAlign)
          const url = this.$route.params.state == "add" ? news_add : news_edit;
          url(this.formLabelAlign).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.$router.push("/news");
            this.$emit("update");
          });
        }
      });
    },

    beforeUpload(file) {
        return true;
    },
    cancel() {
       this.$router.push("/Business");
    },
    //上传后的回调
    handleAvatarSuccess(res, file) {
      this.List2.push(res)
      console.log(this.List2);
    },
    //删除的回调
    handleRemove(file, fileList) {
      this.List2=[];
      console.log(file)
      console.log(fileList);
      this.List2 = fileList;
    },
    //点击放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //商家头像
    news_img_btn(e) {
      console.log(this.List2)
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var imgdata = new FormData();
      imgdata.append('file',files[0]);
      console.log(imgdata)
      upload(imgdata).then(res => {
        console.log(JSON.stringify(res))
        this.news_img = res.data.url;
      })
    },
    //类型添加
    add_category() {
      category_add({name: this.add_category_title}).then(res => {
          console.log(res);
          this.category_arr();
          this.$message({
              type: 'success',
              message: '添加成功'
          });
      })
    },
    //类型编辑
    category_Edit(index, row) {
        console.log(index, row);
        this.open(row._id,row.name); // 打开修改弹窗
    },
    // 类型删除
    category_Delete(index, row) {
        console.log(index, row);
        category_delete({data:{id: row._id}}).then(res => {
            this.category_arr(); //重新加载类别数据
            this.$message({
              type: 'success',
              message: '删除成功'
            });
        })
    },
    // 修改弹窗
    open(id,value) {
      console.log(value)
        this.$prompt('请输入技术类型', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: value,
          inputPattern: /\S/,
          inputErrorMessage: '不能为空'
        }).then(({ value }) => {
          category_edit({id: id,name:value}).then(res => { //修改成功返回
            this.category_arr(); //重新加载类别数据
            this.$message({
              type: 'success',
              message: '修改成功'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      }
  },
  created() {
      console.log(this.$route.params.state);
      if(this.$route.params.form) { //编辑进去进行赋值
      console.log()
        this.operation = this.$route.params.form.operation;
        this.formLabelAlign = this.$route.params.form;
        console.log(this.$route.params.form.imgList)
        this.List2 = this.$route.params.form.imgList;
        this.goods_logo = this.$route.params.form.goodsLogo;
      }
      this.category_arr();
  },
}
</script>
<style scoped>
.el-dialog__body {
  padding: 6px 20px 30px !important;
}
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
input {
  width: 50%;
}
.title_nav{
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
.edui-combox-body.edui-default {
  height: 22px;
}
.edui-button-wrap.edui-default {
  height: 22px;
}
.goods_logo {
  background-color: #fbfdff;

  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  
  vertical-align: top;
}
.goods_logo img{
  width: 100%;
  height: 148px;
  line-height: 146px;
    border: 1px dashed #c0ccda;
  display: inline;
}
</style>
<template>
    <div class="fillcontain">
        <div class="title_nav">{{operation}}</div>
        <div class="form">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="form_rules" ref="formLabelAlign">
                <el-form-item prop="category" label="商家类别" >
                    <el-select v-model="formLabelAlign.category" placeholder="商家类别">
                        <el-option
                          v-for="(formtype, index) in busine_category_list"
                          :key="index" 
                          :label="formtype" :value="formtype"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="title" label="商家名称" >
                  <el-input v-model="formLabelAlign.title" name="title"></el-input>
                </el-form-item>
                <el-form-item  label="备注">
                  <el-input v-model="formLabelAlign.sub_title"></el-input>
                </el-form-item>
                <el-form-item prop="jindu" label="经度">
                  <el-input v-model="formLabelAlign.jindu"></el-input>
                </el-form-item>
                <el-form-item prop="weidu" label="纬度">
                  <el-input v-model="formLabelAlign.weidu"></el-input>
                </el-form-item>
                <el-form-item  label="电话">
                  <el-input v-model="formLabelAlign.phone"></el-input>
                </el-form-item>
                <el-form-item  label="省份">
                  <el-input v-model="formLabelAlign.province"></el-input>
                </el-form-item>
                 <el-form-item  label="城市">
                  <el-input v-model="formLabelAlign.city"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                  <el-input v-model="formLabelAlign.address"></el-input>
                </el-form-item>
                 <el-form-item label="商家展示">
                   <el-upload
                    action="/api/upload/addPicture"
                    list-type="picture-card"
                    multiple
                    name='file'
                    :file-list="List2"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleAvatarSuccess"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
                 <el-form-item label="商家头像">
                   <div class="goods_logo">
                     <img :src="goods_logo" alt="" >
                     <input type="file" name="file" class="form-control" @change="user_logo" >
                   </div>
                 </el-form-item>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
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
import {good_add,good_edit,category_list} from '../api/business'
import {upload} from '../api/upload'
import '../../public/css/form.styl'
import VueUeditorWrap from 'vue-ueditor-wrap'
import Uetor from "../components/Uetor";
export default {
    name: 'BusinessInfo',
      data() {
        var checkPhone = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            console.log(reg.test(value));
            if (reg.test(value)) {
              callback();
            } else {
              return callback(new Error('请输入正确的手机号'));
            }
          }
        };
        return {
            content_msg: '',
            labelPosition: 'right',
            formLabelAlign: { },
            busine_category_list: [], //类别
            operation: '',//标题
            goods_logo: '',
            List2: [],
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
                 { required: true, message: "商家类型必选！", trigger: "change" }
              ],
              title: [
                { required: true, message: "商家名称不能为空！", trigger: "blur" }
              ],
              jindu: [
                { required: true, message: "经度不能为空！", trigger: "blur" }
              ],
              weidu: [
                { required: true, message: "纬度不能为空！", trigger: "blur" }
              ],
              // phone: [
              //    {validator: checkPhone, message: "电话格式不正确",trigger: 'blur'}
              // ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        }
    },
    components: {
      Uetor,
      VueUeditorWrap
    },
    methods: {
    onSubmit(formLabelAlign) {
      console.log(this.formLabelAlign)
      this.formLabelAlign.imgList = this.List2;
      this.formLabelAlign.goodsLogo = this.goods_logo;
      console.log(formLabelAlign);
      this.$refs[formLabelAlign].validate(valid => {
        if (valid) {
          console.log(this.formLabelAlign)
          const url = this.$route.params.state == "add" ? good_add : good_edit;
          url(this.formLabelAlign).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.$router.push("/Business");
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
    user_logo(e) {
      console.log(this.List2)
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var imgdata = new FormData();
      imgdata.append('file',files[0]);
      console.log(imgdata)
      upload(imgdata).then(res => {
        console.log(JSON.stringify(res))
        this.goods_logo = res.data.url;
      })
    },
    handleDownload(file) {
      console.log(file);
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
      //类别获取
      category_list().then(res=> {
        let arr = res.data.result
        for(let i=0;i<arr.length;i++) {
           this.busine_category_list.push(arr[i].name)
        }
      })
      
  },
}
</script>
<style scoped>

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
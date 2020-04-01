<template>
    <div>
        <div class="form">
           <form action="/api/upload/addPicture" method="post" enctype="multipart/form-data">
                <h2>单图上传</h2>
                <input type="text" name="picTitle" placeholder="必填" class="form-control" required="">
                <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                multiple
                name='user2'
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                    <input type="file" name="user" class="form-control">
                <input type="submit" value="提交" >
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Upload',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            formLabelAlign:{} ,
            imageUrl:''
        }
    },
    methods: {
       
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
         handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
    
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return  isLt2M;
        }
    },
}
</script>
<style scope>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
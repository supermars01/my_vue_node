<template>
<!-- 用户信息 -->
    <div class="infoshow">
       <el-row type="flex" class="row-bg" justify="center">
           <el-col :span='8'>
               <div class="user">
                    <img :src="user.avatar" class='avatar' alt="">
                    <input type="file" name="头像更改" id="user_btn" @change="user_change">
               </div>
           </el-col>
           <el-col :span='16'>
               <div class="userinfo">
                  <div class="user-item">
                    <i class="fa el-icon-user-solid"></i>
                   <span>{{user.name}}</span>
                  </div>
                  <div class="user-item">
                    <i class="fa el-icon-s-tools"></i>
                    <span>{{user.identity == 'manager' ? '管理员' : '普通员工'}}</span>
                  </div>
               </div>
           </el-col>
       </el-row>
    </div>
</template>
<script>
import {upload} from '../api/upload'
import {edit} from '../api/users'
export default {
  name: "infoshow",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    user_change(e) {
      console.log( this.$store.getters.user)
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let imgdata = new FormData();
      imgdata.append('file',files[0]);
      console.log(imgdata)
      upload(imgdata).then(res => {
        console.log(JSON.stringify(res))
        this.$store.getters.user.avatar = res.data.url;

        this.edit_set()
      })
    },
    edit_set() {
      var obj = {
        id: this.$store.getters.UserId,
        avatar: this.$store.getters.user.avatar
      }
      console.log(obj)
      edit(obj).then(res => {
        this.$message({
          message: "保存成功！",
          type: "success"
        });
      })
    }
  },
};
</script>
<style scoped>
#user_btn {
  width: 74px;
  display:block;
  margin: 20px auto;
}
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
  
}
.user img {
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>

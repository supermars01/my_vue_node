<template>
    <div class="logFund">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">
                    <el-form-item prop='name' label="用户名:">
                        <el-input type="name" v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item prop='email'  label="邮箱:">
                        <el-input type="email" v-model="form.email"></el-input>
                    </el-form-item>

                    <el-form-item prop='password' label="密码:">
                      <!-- <el-input type="password" v-model="pass" v-if="this.form.password"></el-input> -->
                      <el-input type="password"  v-model="form.password" ></el-input>
                    </el-form-item>
                    <el-form-item label="权限选择:" prop="identity">
                        <el-select v-model="form.identity" placeholder="权限选择">
                            <el-option
                             v-for="(formtype, index) in format_type_list"
                             :key="index" 
                             :label="formtype" :value="formtype"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {register_edit} from '../api/users'
export default {
  name: "Dialog",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      format_type_list: [
        "root",
        "manager",
        "employee"
      ],
      form_rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "请输入6位密码", trigger: "blur" }
        ],
        identity: [
          { required: true, message: "权限必选", trigger: 'change' },
        ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          let reg = this.dialog.option == "register" ? "register" : "edit";
          console.log(register_edit[reg])
          register_edit[reg](this.form).then(res => {
              // 注册成功
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                this.dialog.show = false;
                this.$emit("update");
          })

          // // this.$axios.post(`/api/users/${url}`, this.form)
          //   .then(res => {
          //     // 注册成功
          //     this.$message({
          //       message: "保存成功！",
          //       type: "success"
          //     });
          //     this.dialog.show = false;
          //     this.$emit("update");
          // });
        }
      });
    }
  },
};

</script>


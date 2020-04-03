<template>
<!-- 用户管理 -->
    <div class="fillcontain">
        <div>
            <el-form
                :inline="true"
                ref="search_data" 
                :model='search_data' >
                <el-form-item>
                    <el-input v-model="screen_name" placeholder="请选择输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size ="small" icon="search" @click='onScreeoutUser()'>筛选</el-button>
                </el-form-item>
                 <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" @click="onAddMoney()" v-if="user.identity == 'root'" >添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                v-if="tableData.length > 0"
                :data='tableData'
                border
                :default-sort = "{prop: 'date', order: 'descending'}" 
                style="width: 100%">
                 <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="创建时间"
                    align='center'
                    width="250"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名"
                    align='center'
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    align='center'
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="password"
                    label="密码"
                    align='center'
                    width="300">
                    <template >  
                        <span>••••••</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="user.identity == 'root'" 
                    prop="identity"
                    label="权限"
                    align='center'
                    width="200"> 
                    <template slot-scope="scope">  
                        <span style="color:#00d053">{{ scope.row.identity }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operation"
                    v-if="user.identity == 'root'" 
                    align='center'
                    label="操作"
                    fixed="right"
                    width="200">
                    <template slot-scope='scope'>
                        <el-button 
                            type="warning" 
                            icon='edit' 
                            size="small"
                            @click='onEditMoney(scope.row)'
                        >编辑</el-button>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="small"
                            @click='onDeleteMoney(scope.row,scope.$index)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 弹框页面 -->
        <DialogFound :dialog='dialog' :form='form' @update="getProfile"></DialogFound>
    </div>
</template>

<script>
import DialogFound from "../components/UserDialog";
import {users,screen,delete_user} from "../api/users"
export default {
  name: "userlist",
  data() {
    return {
      screen_name: '',//筛选
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        handle:'', //操作人
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  components: {
    DialogFound
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      users().then(res => {
        this.tableData = res.data;
        console.log(JSON.stringify(res.data))
      });
    },
    onEditMoney(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "密码修改",
        option: "edit"
      };
      this.form = {
        name: row.name, //操作人
        email: row.email,
        password: row.password,
        identity: row.identity,
        id: row._id,
        avatar: row.avatar
      };
    },
    onDeleteMoney(row, index) {
      // 删除
      console.log(JSON.stringify(row._id))
      // this.$axios.delete(`/api/users/delete/${row._id}`).then(res => {
     delete_user({data:{id:row._id}}).then(res => {
          console.log(JSON.stringify(res));
        this.$message("删除成功");
        this.getProfile();
      });
    },
    onAddMoney() {
      // 添加
      this.dialog = {
        show: true,
        title: "用户添加",
        option: "register"
      };
      this.form = {
        name: "",
        email: "",
        password: "",
        identity: "",
        id: ""
      };
    },
    onScreeoutUser() {
      if(!this.screen_name) {
        this.$message({
          type: "warning",
          message: "请输入用户名"
        });
        this.getProfile();
        return;
      }
      this.tableData = [];
      screen({name: this.screen_name}).then(res => {
        console.log(JSON.stringify(res))
        this.tableData.push(...res.data);
      })
    }
  },
  computed: {
      user() {
          return this.$store.getters.user;
      }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
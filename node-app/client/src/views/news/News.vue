<template>
<!-- 技术列表 -->
    <div class="fillcontain">
        <div>
            <el-form
                :inline="true"
                ref="search_data" 
                :model='search_data' >
                 <el-form-item label="文章搜索">
                  <el-input v-model="search_data.title" placeholder="文章搜索"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
                </el-form-item>
                 <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view"   @click='onAddMoney()'>添加</el-button>
                </el-form-item>
            </el-form> 
        </div>
        <div class="table_container">
            <el-table
                v-if="tableData.length > 0"
                :data='tableData'
                max-height="auto"
                border
                :default-sort = "{prop: 'date', order: 'descending'}" 
                style="width: 100%">
                 <el-table-column
                    type="index"
                    label="序号"
                    :index='indexMethod'
                    align='center'
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="data"
                    label="创建时间"
                    align='center'
                    width="180"
                    sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.data }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="文章名称"
                    align='center'
                    width="300">
                     <template slot-scope="scope">
                        <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="文章类别"
                    align='center'
                    width="200">
                     <template slot-scope="scope">
                        <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ scope.row.category }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="作者"
                    align='center'
                    width="180">
                     <template slot-scope="scope">
                        <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="give"
                    label="点赞"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="reads"
                    label="阅读量"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="Top"
                    label="是否置顶"
                    align='center'
                    width="180"
                   >
                    <template slot-scope="scope">
                      <span v-if="scope.row.Top==0">否</span>
                      <span v-if="scope.row.Top==1">是</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    width="180">
                    <template slot-scope='scope'>
                        <el-button 
                            type="warning" 
                            icon='edit' 
                            size="small"
                            @click='onEditGood(scope.row)'
                        >编辑</el-button>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="small"
                            @click='onDeleteGood(scope.row,scope.$index)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
             <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="paginations.page_index"
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            :layout="paginations.layout"
                            :total="paginations.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {news_list,news_delete} from '../../api/news';
export default {
  name: "news",
  data() {
    return {
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        name:'', 
        category: "",
        title: "",
        sub_title: "",
        img: '',
        content: "",
        Top: "",
        reads: "",
        give: "",
        data: '',
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 15, // 1页显示多少条
        page_sizes: [15, 30, 45, 60], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      search_data: {
        startTime: "", //开始时间
        endTime: "", //结束时间
        title: "",
      }
    };
  },
  components: {
  },
  created() {
    this.getProfile(); //请求数据
  },
  methods: {
    ToText(HTML){
      var input = HTML;
      return input.innerText;  
    },
    getProfile() {
      // 页码，需要一页展示几条数据
      let obj = {
          page: this.paginations.page_index,
          SizeChange: this.paginations.page_size,
          title: this.search_data.title
      }
      news_list(obj).then(res => {
          let news_list = res.data.result.news_list
          console.log(JSON.stringify(res.data.result))
          this.tableData = news_list;
          this.paginations.total = res.data.result.pagination.total;  // 总页数
      });
    },
    //element序号重写叠加，不然会出现序号重拍
    indexMethod (index) {
      let curpage = this.paginations.page_index   //单前页码，具体看组件取值
      let limitpage = this.paginations.page_size  //每页条数，具体是组件取值
      return (index+1) + (curpage-1)*limitpage
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.paginations.page_size = val
      this.getProfile();
    },
    handleCurrentChange(val) {
      console.log(val)
      this.paginations.page_index = val;
      this.getProfile();
      console.log(`当前页: ${val}`);
    },
    onEditGood(row) {
      //编辑
      this.form={
        operation: '文章修改',
        title: row.title, 
        sub_title: row.sub_title,
        content: row.content,
        category: row.category,
        name:row.name,
        id: row._id,
        Top: row.Top,
        img: row.img
      };
      this.$router.push({name:'newsinfo',params:{form: this.form,state: 'edit'}})
    },
    onDeleteGood(row, index) {
      // 删除
     news_delete({data: {id:row._id}}).then(res => {
       console.log(row._id);
        this.$message("删除成功");
        this.getProfile();
     })
    },
    onAddMoney() {
      // 添加
      this.form={
        operation: '文章添加',
        name:'', 
        category: "",
        title: "",
        sub_title: "",
        img: '',
        content: "",
        Top: "",
       };
      this.$router.push({name:'newsinfo',params:{form: this.form,state: 'add'}})
      // this.$router.push({path:'/info',query:{id: 1}})
    },
    //搜索
    onScreeoutMoney() {
      if (!this.search_data.title ) {
        this.$message({
          type: "warning",
          message: "请填写文章标题"
        });
        this.getProfile();
        return;
      }
      this.getProfile();
    },
    date(e) { //时间格式转换
      let date = e;
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
  },
  computed: {
  }
}
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
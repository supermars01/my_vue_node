<template>
    <div class="fillcontain">
        <el-form
            :inline="true"
            >
            <el-form-item>
                <el-button type="primary" size ="small" icon="search" @click='onScreeoutClassfix()'><i class="el-icon-circle-plus-outline" style="padding-right: 6px"></i>添加内容</el-button>
            </el-form-item>
        </el-form>
        <div class="table_container">
            <el-table
                v-if="tableData.length > 0"
                :data='tableData'

                max-height="450"
                border
                :default-sort = "{prop: 'date', order: 'descending'}" 
                style="width: 100%">
                 <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
                </el-table-column>
                 <el-table-column
                    prop="name"
                    label="标题"
                    align='center'
                    width="600">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="创建时间"
                    align='center'
                    width="600">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    width="400">
                    <template slot-scope='scope'>
                        <el-button 
                           plain
                            icon='edit' 
                            size="small"
                            @click='onEditClassfix(scope.row)'
                        ><i class="el-icon-edit" style="padding-right: 6px"></i>编辑</el-button>
                        <el-button 
                            type="danger"
                            icon='delete' 
                            size="small"
                            @click='onDeleteClassfix(scope.row,scope.$index)'
                        ><i class="el-icon-delete" style="padding-right: 6px"></i>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
     <ClassfixDialog :dialog='dialog' :form='form' @update='get_list'></ClassfixDialog>
    </div>
    
</template>
<script>
import ClassfixDialog from '../../components/ClassfixDialog'
import {category_delete,category_list} from '../../api/business'
export default {
    name: 'BusinessClassfix',
    data() {
        return {
            tableData: [],
            dialog: {
                option: '',
                title: '',
                show: false
            },
            form: {
                name: '',
            }
        }
    },
    methods: {
        get_list() {
            category_list().then(res=> {
                console.log(JSON.stringify(res));
                this.tableData = res.data.result
            })
        },
        //编辑
        onEditClassfix(row) {
            this.dialog={
                option: 'edit',
                title: '类别修改',
                show: true
            }
            this.form={
                id:row._id,
                name: row.name,
            }
        },
        //增加
        onScreeoutClassfix() {
            this.dialog={
                option: 'add',
                title: '新增类别',
                show: true
            }
            this.form={
                name: '',
            }
        },
        //删除
        onDeleteClassfix(row, index) {
            category_delete({data: {id:row._id}}).then(res=> {
                this.$message("删除成功");
                this.get_list();
            })
        }
    },

    created() {
        this.get_list();
    },
    components: {
        ClassfixDialog
    }
}
</script>
<style >
 .fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
</style>
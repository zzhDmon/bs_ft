<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-search"></i>搜索管理</el-breadcrumb-item>
                <el-breadcrumb-item>排行管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
           
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 100%" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="Search" label="搜索关键词" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Id" sortable label="位次" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Title" label="排行显示内容" min-width="150">
            </el-table-column>
            <el-table-column align="center" label="操作" width="150">
                <template scope="scope">
                    <el-button type="primary" size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-dialog title="设置搜索界面排行榜" :visible.sync="dialogFormVisible">
		  <el-form :model="subform">
		    <el-form-item label="搜索关键词：" :label-width="formLabelWidth">
		      <el-input v-model="subform.Search" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="位次：" :label-width="formLabelWidth">
		      <el-input :disabled="true" v-model="subform.Id" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="排行显示内容：" :label-width="formLabelWidth">
		      <el-input v-model="subform.Title" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveEdit">保存</el-button>
		  </div>
		</el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                testData: [],
                cur_page: 1,
                
                dialogFormVisible: false,
                subform:{},
                formLabelWidth: '130px'
            }
        },
        created(){
            this.myaxios();
        },
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.get(this.HOST+"/HotSearch/Query")  
                .then(response => { 
                	this.testData=response.data;
                }, response => {   
                })  
				
            },
            handleEdit(index, row) {
                this.dialogFormVisible=true;
                this.subform=row;
            },
            saveEdit(){
            	this.dialogFormVisible=false;
            	this.$http.post(this.HOST+"/HotSearch/Save",this.subform)  
                .then(response => { 
                	this.$message({
                		message:'编辑成功',
                		type:'success'
                	})
                }, response => { 
                	this.$message.error('编辑失败')
                }) 
            },
            
            
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>模板设置</el-breadcrumb-item>
                <el-breadcrumb-item>问候模板</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <router-link to="/template/3/-1">
            	<el-button type="primary" class="handle-del mr10">新增问候模板</el-button>
            </router-link>
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 100%" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="CreateTime" label="发布日期" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Name" label="模板名称" min-width="150">
            </el-table-column>
            <el-table-column align="center" label="模板图片" min-width="150">
            	<template scope="scope">
                    <img :src="scope.row.ShowImages" width="70" height="60" class="head_pic"/>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="Hits" sortable label="点击量" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Score" sortable label="所需积分" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="PromoteStatus" label="推广状态" min-width="150">
            </el-table-column>
           
           
         
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <router-link :to="'/template/3/'+scope.row.Id">
	                    <el-button size="small" type="primary"
	                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </router-link>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <div class="pagination">
            <el-pagination
            		background
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                testData: [],
                cur_page: 1
            }
        },
        created(){
            this.myaxios();
        },
        computed: {},
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.post(this.HOST+"/template/Query",{qu:{index:this.cur_page,size:10},TemplateType:3})  
                .then(response => {  
                	this.testData=response.data.rows 
                }, response => {  
                    console.log(response);  
                })  
				
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.myaxios();
            },
            handleEdit(index, row) {
               
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
	            	this.$http.post(this.HOST+"/template/Delete",{ID:row.Id})  
	                .then(response => {  
	                    this.$message({
				          message: '删除成功',
				          type: 'success'
				        }); 
				        this.myaxios();
	                }, response => {  
	                    this.$message.error('删除失败');
	                })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
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
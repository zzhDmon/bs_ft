<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload"></i>兑换商品</el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
        	<router-link to="/productedit/-1">
        		<el-button type="primary" icon="plus" class="handle-del mr10">新增商品</el-button>
        	</router-link>
            
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 100%" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="Name" label="兑换奖励名称" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Score" sortable label="兑换积分消耗" min-width="150">
            </el-table-column>
            <el-table-column align="center" label="兑换奖励图片" width="150">
            	<template scope="scope">
                    <img :src="scope.row.ShowImage" width="40" height="40" class="head_pic"/>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="Description" label="兑换奖励介绍" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Message" label="兑换备注输入提示" min-width="150">
            </el-table-column>
           
           
         
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                	<router-link :to="'/productedit/'+scope.row.Id">
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
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                testData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
//          this.getData();
            this.myaxios();
        },
        computed: {
            data(){},
        },
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.get(this.HOST+"/Product/Query",{params:{index:1,size:10}})  
                .then(response => {  
                	this.testData=response.data.rows  
                }, response => {  
                    this.$message.error("获取信息失败");   
                })  
				
            },
            handleCurrentChange(val){
                this.cur_page = val;
//              this.getData();
            },
            getData(){},
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                
            },
            handleDelete(index, row) {
            	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
	                this.$http.post(this.HOST+"/Product/Delete",{Id:row.Id})  
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
            delAll(){},
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
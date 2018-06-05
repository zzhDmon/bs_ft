<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-search"></i>搜索管理</el-breadcrumb-item>
                <el-breadcrumb-item>关键词分布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 100%" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="Search" label="搜索关键词" min-width="200">
            </el-table-column>
            <el-table-column align="center" prop="Phone" sortable label="搜索用户" min-width="200">
            </el-table-column>
            <el-table-column align="center" prop="CreateTime" label="搜索时间" min-width="200">
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
        
        <div>热门搜索</div>
        <el-table :data="hottestData" border style="width: 100%" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="KeyWord" label="搜索关键词" min-width="200">
            </el-table-column>
            <el-table-column align="center" prop="Count" sortable label="搜索次数" min-width="200">
            </el-table-column>
            <el-table-column align="center" prop="Time" label="上次搜索时间" min-width="200">
            </el-table-column>
           
            <!--<el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>-->
            
        </el-table>
        <!--<div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                testData: [],
                hottestData: [],
                cur_page: 1
            }
        },
        created(){
            this.myaxios();
        },
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.get(this.HOST+"/HouseSearch/Query",{params:{index:1,size:10}})  
                .then(response => {
                	this.testData=response.data.rows;
                }, response => {
                	this.$message.error('获取失败！') 
                }) 
                this.$http.get(this.HOST+"/HouseSearch/Count")  
                .then(response => {  
                	this.hottestData=response.data; 
                }, response => {  
                    this.$message.error('获取失败！') 
                })  
				
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.$http.get(this.HOST+"/HouseSearch/Query",{params:{index:this.cur_page,size:10}})  
                .then(response => {  
                	this.testData=response.data.rows;
                }, response => {  
                }) 
            },
            
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
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
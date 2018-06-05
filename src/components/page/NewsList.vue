<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>咨询新闻</el-breadcrumb-item>
                <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
        	<router-link to="/newsdetail/-1">
            	<el-button type="primary" class="handle-del mr10">新增文章</el-button>
           	</router-link>
           <el-select v-model="select_type" @change="selChange" placeholder="筛选类型" class="handle-select mr10">
                
                <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
            </el-select>
            <el-input v-model="select_word" @input="search" placeholder="输入文章标题" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 100%" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="Title" label="文章标题" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="NewsType" label="文章类型" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Time" sortable label="文章发布时间" min-width="150">
            	
            </el-table-column>
            <el-table-column align="center" prop="Source" label="文章来源" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Sort" label="文章排序" min-width="120">
            </el-table-column>
           
           
         
            <el-table-column align="center" label="操作" width="150">
                <template scope="scope">
                	<router-link :to="'/newsdetail/'+scope.row.Id">
                    	<el-button size="small"
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
                visible2: false,//确认删除？
                testData: [],
                cur_page: 1,
                select_type: 1,
                select_word: '',
                
                options: [{
		          value: 1,
		          label: '楼市'
		        }, {
		          value: 2,
		          label: '厦门'
		        }, {
		          value: 3,
		          label: '娱乐'
		        }, {
		          value: 4,
		          label: '销售'
		        }, {
		          value: 5,
		          label: '首页推荐'
		        }, {
		          value: 6,
		          label: '发现推荐'
		        }]
            }
        },
        created(){
            this.myaxios();
        },
        computed: {},
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.get(this.HOST+"/News/Query",{params:{index:this.cur_page,size:10,type:this.select_type,query:this.select_word}})  
                .then(response => {  
                	this.testData=response.data.rows;
                }, response => {   
                })  
				
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.myaxios();
            },
            selChange(){
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
	            	this.$http.post(this.HOST+"/News/Delete",row)  
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
            search(){
                this.myaxios();
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
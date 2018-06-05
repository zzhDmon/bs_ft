<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>兑换记录</el-breadcrumb-item>
                <el-breadcrumb-item>兑换记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-row>
            	<el-col :span="20">
	            <el-breadcrumb separator="|">
	                <el-breadcrumb-item><span :class="{ 'activestatus': status==null}" @click="changestatus(null)">全部</span></el-breadcrumb-item>
	                <el-breadcrumb-item><span :class="{ 'activestatus': status==0}" @click="changestatus(0)">只看已兑换</span></el-breadcrumb-item>
	                <el-breadcrumb-item><span :class="{ 'activestatus': status==1}" @click="changestatus(1)">只看未兑换</span></el-breadcrumb-item>
	            </el-breadcrumb>
            		
            	</el-col>
            	<el-col :span="4">
            		<el-button type="primary" class="handle-del mr10"><a :href="excelurl">导出EXCEL</a></el-button>            		
            	</el-col>
            </el-row>
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 100%" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="UserPhone" label="兑换用户电话" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="ProductName" sortable label="兑换奖品名称" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="CreateTime" sortable label="兑换时间" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Mark" label="兑换备注" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Status" label="兑换状态" min-width="150">
            </el-table-column>
           
           
         
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button :disabled="scope.row.Status=='已兑换'" size="small" type="primary"
                            @click="handleEdit(scope.$index, scope.row)">设为已兑换</el-button>
                    <!--<el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
                cur_page: 1,
                status:null,
                excelurl:this.HOST+'/Exchange/Excel?status=-1'
            }
        },
        created(){
            this.myaxios();
//          this.excelurl=this.HOST+'/Exchange/Excel?status=-1'
        },
        computed: {},
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.get(this.HOST+"/Exchange/Query",{params:{index:this.cur_page,size:10,other:this.status}})  
                .then(response => {  
                	this.testData=response.data.rows 
                }, response => {  
                    this.$message.error("获取记录失败");  
                })  
				
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.myaxios();
            },
            changestatus(status){
            	this.status=status;
            	this.myaxios();
            	if(this.status==0||this.status==1){
            		this.excelurl=this.HOST+'/Exchange/Excel?status='+this.status
            	}else{
            		this.excelurl=this.HOST+'/Exchange/Excel?status=-1'
            	}
            },
            
            handleEdit(index, row) {
              this.$http.post(this.HOST+"/Exchange/Enabled",row)  
	                .then(response => { 
	                	this.$message({
				          message: '设置成功',
				          type: 'success'
				        });
				        this.myaxios();
	                }, response => {  
	                  this.$message.error('设置失败');
	                }) 
            },
            handleDelete(index, row) {
               
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
.activestatus{
	color: rgb(29,140,224);
}
</style>
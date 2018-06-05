<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>实名认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
          	<template>
			  <el-select v-model="check_value" @change="pullChoose()" placeholder="请选择">
			    <el-option
			      v-for="item in checkOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</template>
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 100%" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="UserName" label="注册账号" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="CreateTime" sortable label="提交时间" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Name" label="姓名" min-width="150">
            </el-table-column>
            <el-table-column align="center" label="身份证缩略图" min-width="150">
            	<template scope="scope">
                    <img v-if="scope.row.VCard" :src="scope.row.VCard" width="40" height="40" class="head_pic"/>
                </template>
            </el-table-column>
            
            <!--<el-table-column align="center" prop="BankType" label="银行名称" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="BankNum" label="银行卡号" min-width="180">
            </el-table-column>-->
            <el-table-column align="center" prop="VStatus" label="审核状态" min-width="120">
            </el-table-column>
            <!--<el-table-column align="center" prop="EnableTime" label="通过时间" min-width="150">
            </el-table-column>-->
           
            <el-table-column align="center" label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" type="primary"
                            @click="handleEdit(scope.$index, scope.row)">审核</el-button>
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
        
        
        <el-dialog title="积分设置" :visible.sync="dialogFormVisible">
		  <div>
		  	<span>身份证</span><img style="display: block;margin:auto;width: 50%;height: auto;" :src="cardDetail.VDetail" alt="" />
		  	<!--<span>名片或工作证</span><img style="display: block;margin:auto;width: 50%;height: auto;" :src="cardDetail.BusinessDetail" alt="" />-->
		  </div>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="ifPass(2)">通过</el-button>
		    <el-button type="primary" @click="ifPass(3)">不通过</el-button>
		  </div>
		</el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                testData: [],
                checkOptions:[{
		          value: 1,
		          label: '待审核'
		        },{
		          value: 2,
		          label: '已认证'
		        },{
		          value: 3,
		          label: '未通过'
		        }],
		        check_value:1,
                cur_page: 0,
                
                dialogFormVisible: false,
                cardDetail:{
                	VDetail:'',
                	BusinessDetail:''
                },
                subId:''
            }
        },
        created(){
            this.myaxios();
        },
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.post(this.HOST+"/Auth/Query",{pagenum:this.cur_page,pagesize:10,type:this.check_value})  
                .then(response => {  
                	this.testData=response.data.rows; 
                }, response => {  
                    this.$message.error("获取信息失败"); 
                })  
				
            },
            handleEdit(index, row) {
            	this.cardDetail.VDetail=row.VCard;
            	this.subId=row.AccountId;
              	this.dialogFormVisible=true;
            },
            ifPass(status){
            	this.dialogFormVisible=false;
                this.$http.post(this.HOST+"/Auth/Save",{Id:this.subId,status:status})  
                .then(response => { 
                	this.$message('保存成功');
                }, response => {  
                    this.$message.error('操作失败');
                }) 
            },
            pullChoose(){
            	this.myaxios();
            },
                     
            handleCurrentChange(val){
                this.cur_page = val-1;
				this.myaxios();
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
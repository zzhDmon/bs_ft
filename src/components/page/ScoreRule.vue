<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 积分规则</el-breadcrumb-item>
                <el-breadcrumb-item>积分列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" class="handle-del mr10" @click="dialogDescFormVisible=true">编辑积分细则</el-button>
            <el-checkbox v-model="change_checked" v-on:change="changeStatus">开启积分兑换</el-checkbox>
            
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 832px" @selection-change="handleSelectionChange">
            
            <el-table-column align="center" prop="Name" label="用户触发行为" width="150">
            </el-table-column>
            <el-table-column align="center" prop="Value" sortable label="积分增加数量" width="150">
            </el-table-column>
            <el-table-column align="center" prop="Times" sortable label="每日获取限制次数" width="170">
            </el-table-column>
            <el-table-column align="center" prop="ModifyTime" label="上次修改时间" width="180">
            </el-table-column>
           
           
         
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!--<el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
            
        </el-table>
       

		<el-dialog title="积分设置" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="用户触发行为：" :label-width="formLabelWidth">
		      <el-input :disabled="true" v-model="form.Name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="积分增加数量：" :label-width="formLabelWidth">
		      <el-input v-model="form.Value" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="每日获取限制次数：" :label-width="formLabelWidth">
		      <el-input v-model="form.Times" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveEdit">保存</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="积分设置" :visible.sync="dialogDescFormVisible">
		  <el-form :model="formDesc">
		    <el-form-item label="积分规则">
			    <el-input  :rows="10" type="textarea" v-model="formDesc.desc"></el-input>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogDescFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveDescEdit">保存</el-button>
		  </div>
		</el-dialog>
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
                del_list: [],
                
                change_checked:true,
                dialogFormVisible: false,
                editId:'',
		        form: {},
		        formLabelWidth: '130px',
		        dialogDescFormVisible: false,
		        formDesc:{
		        	desc:''
		        }
            }
        },
        created(){
//          this.getData();
            this.myaxios();
            this.getDesc();
        },
        computed: {
           
        },
        
        
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.get(this.HOST+"/Score/Query")  
                .then(response => {  
                	this.testData=response.data 
                }, response => {  
                    console.log("获取信息失败");
                })  
                
            },
            getDesc(){
            	this.$http.get(this.HOST+"/Score/GetDesription")  
                .then(response => { 
                    if(response.data.Status){
                    	this.change_checked=false;
                    }else{
                    	this.change_checked=true;
                    }
                    this.formDesc.desc=response.data.Description
                }, response => {  
                    
                })
            },
            handleEdit(index, row) {
            	this.$http.get(this.HOST+"/Score/Get",{params:{Id:row.Id}})  
                .then(response => { 
                	this.editId=row.Id;
                	this.dialogFormVisible=true;
                	if(response.data.Id>=0){
                		this.form=response.data
                	}else{
                		this.form={
                			Id:'',
                			ModifyTime:'',
                			Name:'',
                			Times:'',
                			Value:''
                		}
                	}
                }, response => {  
                    this.$message.error('获取失败');
                })  
            },
            saveEdit(){
            	this.dialogFormVisible = false
            	this.$http.post(this.HOST+"/Score/Save",this.form)   
                .then(response => {  
                    this.$message({
			          message: '编辑成功',
			          type: 'success'
			        }); 
			        this.myaxios();
                }, response => {  
                    this.$message.error('编辑失败');
                })
            },
            editScoreDesc(){
            	this.dialogDescFormVisible=true;
            },
            saveDescEdit(){
            	this.dialogDescFormVisible = false
            	this.$http.post(this.HOST+"/Score/Description",{Desc:this.formDesc.desc})  
                .then(response => {  
                    this.$message({
			          message: '编辑成功',
			          type: 'success'
			        }); 
			        this.getDesc();
                }, response => {  
                    this.$message.error('编辑失败');
                })
            },
            changeStatus(){
            	if(this.change_checked){
            		var subSatatus=0;
            	}else{
            		var subSatatus=1;
            	}
            	
            	this.$http.post(this.HOST+"/Score/Status",{Status:subSatatus})  
                .then(response => {  
                    this.$message({
			          message: '编辑成功',
			          type: 'success'
			        }); 
			        this.getDesc();
                }, response => {  
                    this.$message.error('操作失败');
                })
            },
            
            
            
            handleCurrentChange(val){
                this.cur_page = val;
//              this.getData();
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
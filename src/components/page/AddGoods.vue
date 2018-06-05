<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>兑换商品</el-breadcrumb-item>
                <el-breadcrumb-item v-if="paramsId<0">商品新增</el-breadcrumb-item>
                <el-breadcrumb-item v-else>商品修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" style="width: 100%;">
            <el-form ref="form" :model="form" label-width="100px">
            	<el-row>
	            	<el-col :span="12">
	            		<el-form-item label="奖品名称：">
		                    <el-input v-model="form.Name" placeholder="请输入奖品名称"></el-input>
		                
	            		</el-form-item>
	            	</el-col>
	            	<el-col :span="12">
	            		<el-form-item label="所需积分：">
		                    <el-input v-model="form.Score" placeholder="请输入所需积分"></el-input>
		                
		                </el-form-item>
	            	</el-col>
            	</el-row>
            	
            	<el-form-item label="奖品介绍：">
	                    <el-input type="textarea" :rows="5" v-model="form.Description" placeholder="请输入奖品介绍"></el-input>	                
                </el-form-item>
            	<el-form-item label="输入提示：">
	                    <el-input v-model="form.Message" placeholder="请输入提示内容"></el-input>	                
                </el-form-item>
            	<el-form-item label="奖品图片：">
	                    <el-upload
						  :action="HOST+'/Upload/Save'"
						  :data="{path:'Product'}"
						  :show-file-list="false"
						  list-type="picture-card"
						  :on-success="handleAvatarSuccess">
						  <img style="width: 148px;height: 148px;" v-if="form.ShowImage" :src="form.ShowImage" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>  
						
                </el-form-item>
                
                
                
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
            
        </div>

    </div>
</template>


<script>
    export default {
        data(){
            return {
            	paramsId:'',
            	form:{},
                
            }
        },
        watch: {
	        '$route'(){
		        	this.paramsId=this.$route.params.id;
		        	this.myaxios();
	    	}
        },
        created(){
        	this.paramsId=this.$route.params.id;
        	this.myaxios();
        },
        update(){
        	this.paramsId=this.$route.params.id;
        	this.myaxios();
        },
        methods: {
        	myaxios() { 
        		if(this.paramsId<0){
        			var subId=''
        		}else{
        			var subId=this.paramsId
        		}
                this.$http.get(this.HOST+"/Product/Get",{params:{Id:subId}})  
                .then(response => { 
                	this.form=response.data;
                }, response => {  
                   
                })  
            },
        	
            onSubmit() {
            	this.$http.post(this.HOST+"/Product/Save",this.form)  
	                .then(response => { 
	                	this.$message.success('提交成功！');
	                	this.$router.back()
	                }, response => {  
	                   this.$message.error('提交失败！');
	                }) 
            },
            cancel(){
            	this.$router.back()
            },
            //图片
            handleAvatarSuccess(res){
            	if(res.error==0){
            		this.form.ShowImage=res.view;
            		this.form.Image=res.url;            		
            	}else{
            		this.$message.error(res.msg);
            	}
            }
           
            
       }
    }
</script>
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>模板设置</el-breadcrumb-item>
                <el-breadcrumb-item>
                	<span v-if="paramsType==5">首页Banner</span>
                	<span v-if="paramsType==6">朋友圈大字报</span>
                	<span v-if="paramsType==7">幽默图</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="paramsId<0">
                	<span v-if="paramsType==5">Banner新增</span>
                	<span v-if="paramsType==6">大字报新增</span>
                	<span v-if="paramsType==7">幽默图新增</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else>
                	<span v-if="paramsType==5">Banner修改</span>
                	<span v-if="paramsType==6">大字报修改</span>
                	<span v-if="paramsType==7">幽默图修改</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" style="width: 100%;">
            <el-form ref="AddBLFform" :model="form" :rules="rules" label-width="100px">
            	
                <el-form-item label="模板图片：">
	                    <el-upload
						  :action="HOST+'/Upload/Save'"
            			  :data="{path:'bannerlinefun'}"
						  :show-file-list="false"
						  list-type="picture-card"
						  :on-success="handleAvatarSuccess">
						  <img style="width: 148px;height: 148px;" v-if="form.ShowImages" :src="form.ShowImages" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>  
                </el-form-item>
                
            	<el-form-item v-if="paramsType==5" label="链接：">
	                    <el-input v-model="form.Url" placeholder="请输入链接"></el-input>	                
                </el-form-item>
            	
            	<el-form-item v-if="paramsType==5" label="备注：">
	                    <el-input type="textarea" :rows="5" v-model="form.Mark" placeholder="请输入备注信息"></el-input>	                
                </el-form-item>
                <el-form-item v-if="paramsType==6" label="类别：" prop="LineImageType">
				            <el-select v-model="form.LineImageType" placeholder="请选择类别">
		                        <el-option key="1" label="小区" value="1"></el-option>
		                        <el-option key="2" label="房屋" value="2"></el-option>
		                        <el-option key="3" label="结构" value="3"></el-option>
		                        <el-option key="4" label="位置" value="4"></el-option>
		                        <el-option key="5" label="附加" value="5"></el-option>
		                    </el-select>
	            </el-form-item>
            	<el-form-item v-if="paramsType==6||paramsType==7" label="标题：" prop="Name">
	                    <el-input v-model="form.Name" placeholder="请输入标题"></el-input>	                
                </el-form-item>
            	
                
                
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('AddBLFform')">提交</el-button>
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
            	paramsType:'',
            	form:{},
                rules: {
		          Name: [
		            { required: true, message: '请输标题', trigger: 'blur' }
		          ],
		          LineImageType: [
		            { required: true, message: '请选择类型', trigger: 'blur' }
		          ],}
            }
        },
        watch: {
	        '$route'(){
		        	this.paramsId=this.$route.params.id;
		        	this.paramsType=this.$route.params.type;
		        	this.myaxios();
	    	}
        },
        created(){
        	this.paramsId=this.$route.params.id;
        	this.paramsType=this.$route.params.type;
        	this.myaxios();
        },
        methods: {
        	myaxios() { 
                this.$http.get(this.HOST+"/template/Get",{params:{Id:this.paramsId,TemplateType:this.paramsType}})  
                .then(response => { 
                	this.form=response.data;
                	if(!response.data.LineImageType){
                		this.form.LineImageType=null;
                	}
                }, response => {  
                   
                })  
            },
        	
            onSubmit(formName) {
            	var data=JSON.stringify(this.form);
            	this.$refs[formName].validate((valid) => {
			        if (valid) {
			            this.$http.post(this.HOST+"/template/Save",{TemplateType:this.paramsType,data:data})  
		                .then(response => { 
		                	this.$message.success('提交成功！');
		                	this.$router.back()
		                }, response => {  
		                   this.$message.error('提交失败！');
		                }) 
			          } else {
			            this.$message.error('请将信息填写完整！');
			        }
				 });
            	
            },
            cancel(){
            	this.$router.back()
            },
            //图片
            handleAvatarSuccess(res){
            	if(res.error==0){
            		this.form.ShowImages=res.view;
            		this.form.Images=res.url;            		
            	}else{
            		this.$message.error(res.msg);
            	}
            }
           
            
       }
    }
</script>
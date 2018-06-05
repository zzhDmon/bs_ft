<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>资讯新闻</el-breadcrumb-item>
                <el-breadcrumb-item v-if="paramsId<0">新闻新增</el-breadcrumb-item>
                <el-breadcrumb-item v-else>新闻修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" style="width: 100%;">
            <el-form ref="form" :model="form" label-width="100px">
            	<el-row>
	            	<el-col :span="12">
	            		<el-form-item label="文章标题：">
		                    <el-input v-model="form.Title" placeholder="请输入文章标题"></el-input>
		                </el-form-item>
	            	</el-col>
	            	<el-col :span="12">
	            		<el-form-item label="文章类型：">
		                    <el-select v-model="form.NewsType" placeholder="请选择">
		                        <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
		                    </el-select>
		                </el-form-item>
	            	</el-col>
            	</el-row>
            	
            	<el-row>
	            	<el-col :span="12">
	            		<el-form-item label="来源：">
		                    <el-input v-model="form.Source" placeholder="请输入文章来源"></el-input>
		                </el-form-item>
	            	</el-col>
	            	<el-col :span="12">
	            		<el-form-item label="排序(越高越前)：">
		                    <el-input v-model="form.Sort" placeholder="请输入排序"></el-input>
		                </el-form-item>
	            	</el-col>
            	</el-row>
            	<el-row>
	                <el-col :span="12">
	                	<el-form-item label="首页排序：">
		                    <el-input type="number" v-model="form.MSort" placeholder="请输入首页排序"></el-input>
		                </el-form-item>
	                </el-col>
            		
            	</el-row>
                
                
                
                <el-form-item label="摘要：">
                    <el-input :rows="5" type="textarea" v-model="form.Brief" placeholder="请输入摘要"></el-input>
                </el-form-item>
                <el-form-item label="缩略图：">
                    <el-upload
					  :action="HOST+'/Upload/Save'"
					  :data="{path:'Product'}"
					  :show-file-list="false"
					  list-type="picture-card"
					  :on-success="handleAvatarSuccess">
					  <img style="width: 148px;height: 148px;" v-if="form.Thumb" :src="form.Thumb" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>  
                </el-form-item>
                <el-form-item label="正文：">
                    <quill-editor ref="myTextEditor" v-model="form.Article" :config="editorOption"></quill-editor>
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
	import { quillEditor } from 'vue-quill-editor';
    export default {
        data(){
            return {
            	paramsId:'',
            	form:{},
                
                editorOption: {
                    // something config
                },
                options: [{
		          value: 1,
		          label: '楼市'
		        }, {
		          value: 2,
		          label: '厦门'
		        }, {
		          value: 3,
		          label: '娱乐'
		        }]
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
        methods: {
        	myaxios() { 
        		if(this.paramsId<0){
        			var subId=''
        		}else{
        			var subId=this.paramsId
        		}
                this.$http.get(this.HOST+"/News/Get",{params:{id:subId}})  
                .then(response => { 
                		this.form=response.data;
                		if(!response.data.NewsType){
                			this.form.NewsType=1
                		}
                }, response => {  
                   
                })  
            },
            onSubmit() {
                this.$http.post(this.HOST+"/News/Save",this.form)  
	                .then(response => { 
	                		if(response.data.status==0){
	                			this.$message.success('提交成功！');
	                			this.$router.back()	                			
	                		}else{
	                			this.$message.error('提交失败！');
	                		}
		                }, response => {  
		                   this.$message.error('提交失败！');
		                }) 
            },
            cancel(){
            	this.$router.back()	
            },
            //图片上传
            handleAvatarSuccess(res) {
		        if(res.error==0){
            		this.form.Thumb=res.view;         		
            	}else{
            		this.$message.error(res.msg);
            	}
		    }
        },
        components:{
        	quillEditor
        }
    }
</script>
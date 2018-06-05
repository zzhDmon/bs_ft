<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>模板设置</el-breadcrumb-item>
                <el-breadcrumb-item v-if="paramsId<0">
                	<span v-if="paramsType==1">房源模板</span>
                	<span v-if="paramsType==3">问候模板</span>
                	<span v-if="paramsType==2">节日模板</span>新增
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else>
                	<span v-if="paramsType==1">房源模板</span>
                	<span v-if="paramsType==3">问候模板</span>
                	<span v-if="paramsType==2">节日模板</span>修改
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" style="width: 100%;">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            	<div>模板图片</div>
            	<el-form-item label="">
	                    <el-upload
						  :action="HOST+'/Upload/Save'"
            			  :data="{path:imagePath}"
						  :show-file-list="false"
						  list-type="picture-card"
						  :on-success="handleAvatarSuccess">
						  <img style="width: 148px;height: 148px;" v-if="form.ShowImages" :src="form.ShowImages" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>  
                </el-form-item>
                <div>模板缩略图</div>
            	<el-form-item label="">
	                    <el-upload
						  :action="HOST+'/Upload/Save'"
                		  :data="{path:thumbImagePath}"
						  :show-file-list="false"
						  list-type="picture-card"
						  :on-success="thumHandleAvatarSuccess">
						  <img style="width: 148px;height: 148px;" v-if="form.ShowThumImages" :src="form.ShowThumImages" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>  
                </el-form-item>
                
                <div>模板信息</div>
                <el-row>
                	<el-col :span="6">
                		<el-form-item label="标题：">
						    <el-input v-model="form.Name"></el-input>
						</el-form-item>
                	</el-col>
                	<el-col :span="6">
                		<el-form-item label="状态：">
                			<el-select v-model="form.PromoteStatus" placeholder="状态" class="handle-select mr10">
				                <el-option
							      v-for="item in types.PromoteStatus"
							      :key="item.Id"
							      :label="item.Name"
							      :value="item.Id">
							    </el-option>
				            </el-select>
						</el-form-item>
                	</el-col>
                	<el-col v-if="paramsType==1" :span="6">
                		<el-form-item label="类别：">
                			<el-select v-model="form.HouseType" placeholder="类别" class="handle-select mr10">
				                <el-option
							      v-for="item in types.HouseTypes"
							      :key="item.Id"
							      :label="item.Name"
							      :value="item.Id">
							    </el-option>
				            </el-select>
						</el-form-item>
                	</el-col>
                	<el-col v-if="paramsType==2" :span="6">
                		<el-form-item label="月份：">
                			<el-select v-model="form.Month" placeholder="月份" class="handle-select mr10">
				                <el-option
							      v-for="item in months"
							      :key="item"
							      :label="item"
							      :value="item">
							    </el-option>
				            </el-select>
						</el-form-item>
                	</el-col>
                	<el-col :span="6">
                		<el-form-item prop="Score" label="积分：">
						    <el-input v-model="form.Score"></el-input>
						</el-form-item>
                	</el-col>
                </el-row>
                
                <!--图片预览-->
	        	<el-dialog :before-close="closeDiaolg" :visible.sync="dialogVisible" size="tiny">
				  <img width="100%" :src="preImageUrl" alt="">
				</el-dialog>
				
                <template v-for="(item,index) in form.Config.DrawingPart" v-if="index!==11&&index!==13">
                	<div>{{item.Name}}</div>
                	<el-row>
                		<el-col v-if="index!==0" :span="4">
                			<el-form-item label="X：">
							    <el-input type="number" v-model="item.X"></el-input>
							</el-form-item>
                		</el-col>
                		<el-col v-if="index!==0" :span="4">
                			<el-form-item label="Y：">
							    <el-input type="number" v-model="item.Y"></el-input>
							</el-form-item>
                		</el-col>
                		<el-col v-if="item.Width!==undefined" :span="4">
                			<el-form-item label="宽：">
							    <el-input type="number" v-model="item.Width"></el-input>
							</el-form-item>
                		</el-col>
                		<el-col v-if="item.Height!==undefined" :span="4">
                			<el-form-item label="高：">
							    <el-input type="number" v-model="item.Height"></el-input>
							</el-form-item>
                		</el-col>
                		<el-col v-if="index==1||index==7" :span="4">
                			<el-form-item label="绘制顺序：">
							    <el-select v-model="item.Sort" placeholder="绘制顺序" class="handle-select mr10">
					                <el-option
								      v-for="item in form.Config.SortData"
								      :key="item.Id"
								      :label="item.Name"
								      :value="item.Id">
								    </el-option>
					            </el-select>
							</el-form-item>
                		</el-col>
                		<el-col v-if="item.TextColor!==undefined" :span="4">
                			<el-form-item label="字体颜色：">
							    <el-input v-model="item.TextColor"></el-input>
							</el-form-item>
                		</el-col>
                		<el-col v-if="item.EmSize!==undefined" :span="4">
                			<el-form-item label="文字大小：">
							    <el-input type="number" v-model="item.EmSize"></el-input>
							</el-form-item>
                		</el-col>
                		<el-col v-if="item.TextLength!==undefined" :span="4">
                			<el-form-item label="最大字数：">
							    <el-input type="number" v-model="item.TextLength"></el-input>
							</el-form-item>
                		</el-col>
                		<el-col v-if="item.Family!==undefined" :span="4">
                			<el-form-item label="字体：">
							    <el-input v-model="item.Family"></el-input>
							</el-form-item>
                		</el-col>
                		<el-col v-if="item.IsDrawing!==undefined" :span="4">
                			<el-form-item label="是否绘制：">
							    <el-select v-model="item.IsDrawing" placeholder="是否绘制" class="handle-select mr10">
					                <el-option
								      v-for="(item,index) in form.Config.IsDrawData"
								      :key="index"
								      :label="item.Name"
								      :value="item.Id">
								    </el-option>
					            </el-select>
							</el-form-item>
                		</el-col>
                	</el-row>
                </template>
                
                
                
                <el-form-item>
                	<p>Tips：字体颜色默认白色（rgb(255,250,250)填 250|250|250），最大字数0不限制</p>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                    <el-button type="primary" @click="preSubmit('form')">保存并预览</el-button>
                    <el-button  @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
            
            
        </div>

    </div>
</template>


<script>
    export default {
        data(){
            return {
            	paramsType:'',
            	paramsId:'',
            	form:{Config:{DrawingPart:[]}},
            	imagePath:'',
            	thumbImagePath:'',
                types:'',
                months:[1,2,3,4,5,6,7,8,9,10,11,12],
                dialogVisible:false,
                preImageUrl:'http://imgs.wujiuyun.com//Images//template/poster//C158D7DBAD0B4095B63ABB8BECC09823.png',
                rules: {
		          Score: [
		            { required: true, message: '请输入积分', trigger: 'blur' }
		          ]
		          }
            }
        },
        watch: {
	        '$route'(){
		        	this.paramsId=this.$route.params.id;
		        	this.paramsType=this.$route.params.templatetype;
		        	this.myaxios();
	    	}
        },
        created(){
        	this.paramsId=this.$route.params.id;
        	this.paramsType=this.$route.params.templatetype;
        	this.myaxios();		            
        	setTimeout(() => {
		          this.$nextTick(() => {
		          })
		    },100)
        },
        methods: {
        	myaxios() { 
        		if(this.paramsId<0){
        			var subId=''
        			
        		}else{
        			var subId=this.paramsId
        		}
                this.$http.get(this.HOST+"/template/Get",{params:{TemplateType:this.paramsType,Id:subId}})  
                .then(response => {
                	response.data.Config=JSON.parse(response.data.Config)
                	
                	
                	if(!response.data.Config){
                		response.data.Config={DrawingPart:[]};
                		this.form=response.data;
                		this.$http.get(this.HOST+"/template/GetConfig",{params:{TemplateType:this.paramsType}})  
		                .then(response => {
		                	//新增未配Config
		                	this.form.Config=response.data;
		                	this.imagePath=this.form.Config.ImagePath;
                			this.ThumbImagePath=this.form.Config.ImagePath+"/thumb/";
		                }, response => {  
		                   this.$message.error("获取失败！")
		                })
                	}else{
                		this.form=response.data;
                		//修改已配Config
                		this.imagePath=this.form.Config.ImagePath;
                		this.ThumbImagePath=this.form.Config.ImagePath+"/thumb/";
                	}
                }, response => {  
                   
                }) 
                 
                this.$http.get(this.HOST+"/template/GetTPlEnums")  
                .then(response => { 
                	this.types=response.data;
                }, response => {  
                   
                })  
            },
        	
            onSubmit(formName) {
            	this.$refs[formName].validate((valid) => {
		          if (valid) {
                	var subData=this.form;
	            	subData.Config=JSON.stringify(subData.Config);
	            	subData=JSON.stringify(subData);
	            	
	            	this.$http.post(this.HOST+"/template/Save",{TemplateType:this.paramsType,data:subData})  
		                .then(response => {
		                	if(response.data.status==0){
		                    	this.$message.success('成功'); 
		                    	this.$router.back();
		                	}
		                }, response => {  
		                    this.$message.error('失败');
		                })
				   } else {
				            this.$message({
					          showClose: true,
					          message: '请将信息填写完整',
					          type: 'error'
					        });
				            return false;
				          }
		        });
  	          	
            },
            preSubmit(formName) {
            	this.$refs[formName].validate((valid) => {
		          if (valid) {
	            	var subData=this.form;
	            	subData.Config=JSON.stringify(subData.Config);
	            	subData=JSON.stringify(subData);
	            	this.$http.post(this.HOST+"/template/Save",{TemplateType:this.paramsType,data:subData})  
		                .then(response => {
		                	if(response.data.status==0){
		                    	this.$message.success('成功'); 
		                    	
								
		                        var t = Date.now();
		                        if (this.paramsType === '1') {
		                            this.preImageUrl = 'http://app.fang-tian.com/Images/Poster?aid=1&hId=1&tId=' + response.data.id + '&time=' + t;
		                        	this.dialogVisible = true;
		                        } else {
		                            this.preImageUrl = 'http://app.fang-tian.com/Images/Greet?aid=1&TemplateType=' + this.paramsType + '&tId=' + response.data.id + '&time=' + t;
		                        	this.dialogVisible = true;
		                        }
		                        
		                       
		                	}
		                }, response => {  
		                    this.$message.error('失败');
		                })
		            
				   } else {
				            this.$message({
					          showClose: true,
					          message: '请将信息填写完整',
					          type: 'error'
					        });
				            return false;
				          }
		        });
  	          	
            },
            cancel(){
            	this.$router.back();
            },
            closeDiaolg(){
            	this.$router.back();
            },
            //图片
            handleAvatarSuccess(res){
            	if(res.error==0){
            		this.form.ShowImages=res.view;
            		this.form.Images=res.url;            		
            	}else{
            		this.$message.error(res.msg);
            	}
            },
            thumHandleAvatarSuccess(res){
            	if(res.error==0){
            		this.form.ShowThumImages=res.view;
            		this.form.ThumImages=res.url;            		
            	}else{
            		this.$message.error(res.msg);
            	}
            }
           
            
       }
    }
</script>
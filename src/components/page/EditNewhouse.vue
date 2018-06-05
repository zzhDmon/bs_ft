<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 一手楼盘</el-breadcrumb-item>
                <el-breadcrumb-item v-if="paramsId<0">一手房新增</el-breadcrumb-item>
                <el-breadcrumb-item v-else>一手房修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" style="width: 80%;margin: auto;">
        	
            <el-form ref="form" :rules="rules" :model="form" label-width="100px" >
	            	<!--图片-->	
		        	<el-form-item label="楼盘图片：">
		        		<el-upload
						  :action="HOST+'/Upload/Save'"
						  :data="{path:'Newhouse'}"
						  list-type="picture-card"
						  :file-list="firstFileList"
						  :on-success="firstSuccess"
						  :on-preview="firsthandlePictureCardPreview"
						  :on-remove="firsthandleRemove">
						  <i class="el-icon-plus"></i>
						</el-upload>
		        	</el-form-item>
		        	<el-form-item label="户型图片：" class="myself">
		        		<ul class="myimglist">
							<li v-for="item in secondFileList" >
								<img :src="item.url"/>
								<div class="mask">
									<span class="preview" @click="secondhandlePictureCardPreview(item)">
										<i class="el-icon-zoom-in"></i>
									</span>
									<span class="delete" @click="secondhandleRemove(item)">
										<i class="el-icon-delete"></i>
									</span>
								</div>
								<el-input v-model="item.Des"></el-input>
							</li>
						</ul>
		        		
		        		<el-upload  id="myself"
						  :action="HOST+'/Upload/Save'"
						  :data="{path:'NewshouseFloor'}"
						  list-type="picture-card"
						  :file-list="secondFileList"
						  :on-success="secondSuccess"
						  :on-preview="secondhandlePictureCardPreview"
						  :on-remove="secondhandleRemove">
						  <i class="el-icon-plus"></i>
						</el-upload>
						
		        	</el-form-item>
		        	<!--图片预览-->
		        	<el-dialog :visible.sync="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
	            	<el-row>
	            		
	            	<el-col :span="12">
		                <el-form-item label="楼盘名称：" prop="NewHouseName">
						    <el-input v-model="form.NewHouseName" placeholder="请输入楼盘名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
		                <el-form-item label="开发商：">
						    <el-input v-model="form.LandAgent" placeholder="请输入开发商名称"></el-input>
						</el-form-item>
					</el-col>
            	</el-row>
            	<el-row>
            		<el-col :span="12">
            			<el-form-item label="房期：" prop="HousePeriod">
			                <el-select v-model="form.HousePeriod" placeholder="房期类型" class="handle-select mr10">
				                <el-option
							      v-for="item in form.HousePeriods"
							      :key="item.Id"
							      :label="item.Name"
							      :value="item.Id">
							    </el-option>
				            </el-select>
			            </el-form-item>
            		</el-col>
            		<el-col :span="12">
            			<el-form-item label="所属城市：" prop="City">
			                <el-select v-model="form.City" placeholder="选择城市" class="handle-select mr10">
				                <el-option
							      v-for="item in form.Cities"
							      :key="item.Id"
							      :label="item.Name"
							      :value="item.Id">
							    </el-option>
				            </el-select>
			            </el-form-item>
            		</el-col>
            	</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="均价：">
						    <el-input v-model="form.Price" placeholder="0"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="商业片区：">
						    <el-input v-model="form.BusinessArea" placeholder="请输入签约片区"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="开盘时间：">
						      <el-date-picker type="date" placeholder="选择日期" v-model="form.OpenTime" style="width: 100%;"></el-date-picker>
						    
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="交房时间：">
						      <el-date-picker type="date" placeholder="选择日期" v-model="form.DeliverDate" style="width: 100%;"></el-date-picker>
						    
						</el-form-item>
					</el-col>
				</el-row>
	            <el-row>
	            	<el-col :span="12">
	            		<el-form-item label="装修状况：" prop="DecorateSituation">
			                <el-select v-model="form.DecorateSituation" placeholder="选择装修类型" class="handle-select mr10">
				                <el-option
							      v-for="item in form.DecorateSituations"
							      :key="item.Id"
							      :label="item.Name"
							      :value="item.Id">
							    </el-option>
				            </el-select>
			            </el-form-item>
	            	</el-col>
	            	<el-col :span="12">
	            		<el-form-item label="容积率：">
						    <el-input v-model="form.PlotRatio" placeholder="请输入容积率"></el-input>
						</el-form-item>
	            	</el-col>
	            </el-row>
	            	
				<el-form-item label="建筑类型：" prop="BuildingType">
				    <template v-for="item in form.BuildingType">
					  <el-checkbox v-model="item.IsChecked" name="IsChecked">{{item.Name}}</el-checkbox>
					</template>
				</el-form-item>
				<el-row>
                	<el-col :span="12">
                		<el-form-item label="规划户数：">
						    <el-input v-model="form.NumberOfHouseholds" placeholder="0"></el-input>
						</el-form-item>
                	</el-col>
                	<el-col :span="12">
                		<el-form-item label="绿化：">
						    <el-input v-model="form.Green" placeholder="请输入绿化"></el-input>
						</el-form-item>
                	</el-col>
                </el-row>
                <el-row>
                	<el-col :span="12">
                		<el-form-item label="签约日期：">
						      <el-date-picker type="date" placeholder="选择日期" v-model="form.SigningDate" style="width: 100%;"></el-date-picker>
						    
						</el-form-item>
                	</el-col>
                	<el-col :span="12">
                		<el-form-item label="截止日期：">
						      <el-date-picker type="date" placeholder="选择日期" v-model="form.Deadline" style="width: 100%;"></el-date-picker>
						    
						</el-form-item>
                	</el-col>
                </el-row>
                
                
				
				
                
                <el-form-item label="楼盘简介:">
                    <el-input :rows="5" type="textarea" v-model="form.Description" placeholder="请输入楼盘简介"></el-input>
                </el-form-item>
                <el-form-item label="配套:">
                    <el-input :rows="5" type="textarea" v-model="form.SupportingFacilities" placeholder="请输入配套"></el-input>
                </el-form-item>
                <el-form-item label="地段:">
                    <el-input :rows="5" type="textarea" v-model="form.Remark" placeholder="请输入地段"></el-input>
                </el-form-item>
                <el-form-item label="教育:">
                    <el-input :rows="5" type="textarea" v-model="form.Education" placeholder="请输入教育"></el-input>
                </el-form-item>
                <el-form-item label="环境:">
                    <el-input :rows="5" type="textarea" v-model="form.Environment" placeholder="请输入环境"></el-input>
                </el-form-item>
                <el-form-item label="交通:">
                    <el-input :rows="5" type="textarea" v-model="form.Transportation" placeholder="请输入交通"></el-input>
                </el-form-item>
                
                <el-form-item label="位置：">
                	<!--<v-map :par-address="form.Address" :par-latitude="form.Latitude" :par-longitude="form.Longitude"></v-map>-->
                	<map-two :my-message="form.Address" :par-address="form.Address" :par-latitude="form.Latitude" :par-longitude="form.Longitude" @changeloc="getLocation"></map-two>
					
                </el-form-item>
				
				<el-form-item label="销售标识：" prop="SellMark">
	                <el-select v-model="form.SellMark" placeholder="销售标示类型" class="handle-select mr10">
		                <el-option
					      v-for="item in form.SellMarks"
					      :key="item.Id"
					      :label="item.Name"
					      :value="item.Id">
					    </el-option>
		            </el-select>
	           </el-form-item>
	           <el-row>
	            	<el-col :span="11">
			            <el-form-item label="佣金点数：" prop="CommisionType">
			                <el-select v-model="form.CommisionType" placeholder="佣金点数类型" class="handle-select mr10">
				                <el-option
							      v-for="item in form.CommisionTypes"
							      :key="item.Id"
							      :label="item.Name"
							      :value="item.Id">
							    </el-option>
				            </el-select>
			            </el-form-item>
		            </el-col>
		            <el-col :span="2">
		            	&#x3000;
	            	</el-col>
            		<el-col :span="11">
            			<el-form-item label="佣金点数：" prop="Commision">
            				<el-input v-model="form.Commision"  placeholder="佣金点数"></el-input>
            			</el-form-item>
        			</el-col>
	           	
	           </el-row>
	            <el-form-item>
	           		<el-button type="primary" @click="addUser">新增置业顾问</el-button>
	            </el-form-item>
	            <el-form-item
				    v-for="(user, index) in form.Users"
				    :label="'置业顾问' + index+'：'"
				    :key="user.key" >
				    <el-col :span="10">
				    	<el-input v-model="user.Name" placeholder="姓名"></el-input>
				    </el-col>
			    	<el-col :span="4">
			    		&#x3000;
				    </el-col>
			    	<el-col :span="10">
				    	<el-input v-model="user.Phone" placeholder="手机"></el-input>
				    </el-col>
				</el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    <el-button>取消</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
	import vMap from '../common/Map.vue';
	import MapTwo from '../common/MapTwo.vue';
    export default {
        data: function(){
        	var checkArr = (rule, value, callback) => {
        		for(let i=0;i<value.length;i++){
        			if(value[i].IsChecked){
        				callback();
        				return
        			}
        		}
        		callback(new Error('请至少选择一个建筑类型'));
		      };
            return {
            	paramsId:'',
                form: {
                	
                },
                rules: {
		          NewHouseName: [
		            { required: true, message: '请输入楼盘名称', trigger: 'blur' },
		            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		          ],
		          LandAgent: [
		            { required: true, message: '请输入开发商名称', trigger: 'blur' }
		          ],
		          HousePeriod: [
		            { type: 'number', required: true, message: '请选择房期', trigger: 'blur' }
		          ],
		          City: [
		            { type: 'number', required: true, message: '请选择城市', trigger: 'blur' }
		          ],
		          DecorateSituation: [
		            { type: 'number', required: true, message: '请选择装修状况', trigger: 'blur' }
		          ],
		          SellMark: [
		            { type: 'number', required: true, message: '请选择销售标识', trigger: 'blur' }
		          ],
		          CommisionType: [
		            { required: true, message: '请选择佣金类型', trigger: 'blur' }
		          ],
		          Commision: [
		            { required: true, message: '请输入佣金', trigger: 'blur' }
		          ],
		          BuildingType: [
		            { validator: checkArr, trigger: 'blur' }
		          ],
		        },
		        //图片
		        dialogImageUrl: '',
		        dialogVisible: false,
		        firstFileList:[],
		        secondFileList:[],
            }
        },
        components:{
        	vMap,MapTwo
        },
        created(){
        	this.paramsId=this.$route.params.id;
        	this.myaxios();
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
		          if (valid) {
                	//图片相关
                	this.form.ShowBuildingImg=[]
                	this.form.BuildingImg=[]
                	this.form.ShowFloorPlanImg=[]
                	this.form.FloorPlanImg=[]
                	for(let i=0;i<this.firstFileList.length;i++){
                		this.form.ShowBuildingImg.push(this.firstFileList[i].url)
                		this.form.BuildingImg.push(this.firstFileList[i].cuturl)
                	}
                	for(let i=0;i<this.secondFileList.length;i++){
                		this.form.ShowFloorPlanImg.push({Img:this.secondFileList[i].url})
                		this.form.FloorPlanImg.push({Img:this.secondFileList[i].cuturl,Des:this.secondFileList[i].Des})
                	}
                	
                	
		            this.$http.post(this.HOST+"/NewHouse/Save",this.form)  
		                .then(response => { 
			                	this.$message.success('提交成功！');
			                	this.$router.back()
			                }, response => {  
			                   this.$message.error('提交失败！');
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
            resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
            myaxios() { 
                this.$http.get(this.HOST+"/NewHouse/Get",{params:{id:this.paramsId}})  
                .then(response => {  
                	this.form=response.data;
                	if(response.data.City==0){
                		this.form.City=null;
                	}
                	if(response.data.CommisionType==0){
                		this.form.CommisionType=null;
                	}
                	if(response.data.DecorateSituation==0){
                		this.form.DecorateSituation=null;
                	}
                	if(response.data.HousePeriod==0){
                		this.form.HousePeriod=null;
                	}
                	if(response.data.SellMark==0){
                		this.form.SellMark=null;
                	}
                	for(let i=0;i<response.data.ShowBuildingImg.length;i++){
                		this.firstFileList.push({url:response.data.ShowBuildingImg[i],cuturl:response.data.BuildingImg[i]});
                	}
                	for(let i=0;i<response.data.ShowFloorPlanImg.length;i++){
                		this.secondFileList.push({url:response.data.ShowFloorPlanImg[i].Img,cuturl:response.data.FloorPlanImg[i].Img,Des:response.data.ShowFloorPlanImg[i].Des})
                	}
                }, response => {  
                   
                }) 
                
            },
            addUser(){
            	this.form.Users.push({
		          Name: '',
		          Phone: ''
		        });
            },
            //图片
            firstSuccess(res, file) {
            	if(res.error==0){
            		this.firstFileList.push({url:res.view,cuturl:res.url})            		           		
            	}else{
            		this.$message.error(res.msg);
            	}
		      },
		    
	      	firsthandlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
	      	},
	      	secondSuccess(res, file) {
	      		if(res.error==0){
	      			this.secondFileList.push({url:res.view,cuturl:res.url,Des:''})            		           		
            	}else{
            		this.$message.error(res.msg);
            	}
	      	},
	      	secondhandlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
	      	},
	      	//删除
	      	contains(arr, obj) {  
			    var i = arr.length;  
			    while (i--) {  
			        if (arr[i].url === obj) { 
			        	arr.splice(i,1)
			            return;  
			        }  
			    }  
			    return;  
			},
	      	firsthandleRemove(file) {
		        this.contains(this.firstFileList,file.url)
	      	},
	      	secondhandleRemove(file) {
	      		this.contains(this.secondFileList,file.url)
	      	},
	      	showMask(){
	      		console.log(2)
	      	},
	      	
	      	//地图信息
	      	getLocation(adr,lng,lat){
	      		this.form.Address=adr;
	      		this.form.Latitude=lat;
	      		this.form.Longitude=lng;
	      	}
	      	
        }
    }
</script>
<style>
	
	.myself .myimglist{
		width: 100%;
		list-style: none;
	}
	.myself .myimglist li{
		width: 146px;
		height: 146px;
		float: left;
		margin: 0 8px 8px 0;
		border-radius: 5px;
		overflow: hidden;
		position: relative;
	}
	.myself .myimglist li img{
		width: 100%;
		height: 100%;
	}
	.myself .myimglist li .mask{
		visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
	}
	.myself .myimglist li:hover .mask{
		color: red;
		visibility: visible;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
	}
	.myself .myimglist li .mask .preview{
		display: block;
		width: 20px;
		height: 22px;
		position: absolute;
		top: 50px;
		left: 48px;
		z-index: 100;
		font-size: 20px;
		color: white;
		cursor: pointer;
	}
	.myself .myimglist li .mask .delete{
		display: block;
		width: 20px;
		height: 22px;
		position: absolute;
		top: 50px;
		left: 78px;
		z-index: 100;
		font-size: 20px;
		color: white;
		cursor: pointer;
	}
	.myself .myimglist li .el-input{
		position: absolute;
		top: 90px;
		left: 0;
		z-index: 999;
	}
</style>
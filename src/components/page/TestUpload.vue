<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>模板设置</el-breadcrumb-item>
                <el-breadcrumb-item>上传图片
                </el-breadcrumb-item>
               
            </el-breadcrumb>
        </div>
        
           
        <div class="upload-container">
		    <el-upload
			  action="/myurl/Upload/Save"
			  :data="{path:'test'}"
			  list-type="picture-card"
			  :file-list="firstFileList"
			  :on-success="firstSuccess"
			  :on-preview="firsthandlePictureCardPreview"
			  :on-remove="firsthandleRemove">
			  <i class="el-icon-plus"></i>
			</el-upload>
			
		    <el-upload
			  action="/myurl/Upload/Save"
			  :data="{path:'test'}"
			  list-type="picture-card"
			  :file-list="secondFileList"
			  :on-success="secondSuccess"
			  :on-preview="secondhandlePictureCardPreview"
			  :on-remove="secondhandleRemove">
			  <i class="el-icon-plus"></i>
			</el-upload>
			
			<el-dialog :visible.sync="dialogVisible" size="tiny">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			
			<el-button @click="out">out</el-button>
		</div>
        

    </div>
</template>


<script>
	export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        firstFileList:[{url:'http://imgs.wujiuyun.com//Images//test//91D60B5B76A14C3F8D46CC948278231C.jpg'}],
        secondFileList:[{url:'http://imgs.wujiuyun.com//Images//test//91D60B5B76A14C3F8D46CC948278231C.jpg'}],
       
      };
    },
    methods: {
      firstSuccess(res, file) {
        this.firstFileList.push({url:res.view})
      },
      firsthandleRemove(file, fileList) {
        console.log(file, fileList);
      },
      firsthandlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      secondSuccess(res, file) {
        this.secondFileList.push({url:res.view})
      },
      secondhandleRemove(file, fileList) {
        console.log(file, fileList);
      },
      secondhandlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      out(){
      	console.log(this.firstFileList)
      }
    }
  }
</script>
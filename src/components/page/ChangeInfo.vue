<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="密码" prop="Password">
			    <el-input type="password" v-model="ruleForm.Password"></el-input>
			  </el-form-item>
			  <el-form-item label="新密码" prop="NewPassword">
			    <el-input type="password" v-model="ruleForm.NewPassword"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="NewTwo">
			    <el-input type="password" v-model="ruleForm.NewTwo" @keyup.enter.native="submitForm('ruleForm')"></el-input>
			  </el-form-item>
			  
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </el-form-item>
			</el-form>
        </div>

    </div>
</template>

<script>
  export default {
    data() {
    	var checkPass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.ruleForm.NewPassword) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	    };
      	return {
	        ruleForm: {
	          Password: '',
	          NewPassword: '',
	          NewTwo: ''
	        },
	        
	        rules: {
	          NewPassword: [
	            { required: true, message: '请输入密码', trigger: 'blur' },
	            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
	          ],
	          NewTwo: [
	            {  validator: checkPass, trigger: 'blur' }
	          ],
	          Password: [
	            { required: true, message: '请输入原始密码', trigger: 'blur' }
	          ]
	        }
      	};
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          	if (valid) {
            	this.$http.post(this.HOST+"/Server/RePasswd",{Password:this.ruleForm.Password,NewPassword:this.ruleForm.NewPassword})  
	                .then(response => {
		                    this.$http.post(this.HOST+"/Server/LogOut")  
				                .then(response => {   
				                     	this.$confirm('修改成功请重新登陆, 是否继续?', '提示', {
																confirmButtonText: '确定',
																cancelButtonText: '取消',
																type: 'warning'
															}).then(() => {
																	localStorage.removeItem('ms_username')
																			this.$router.push('/login');
															}).catch(() => {
																this.$message({
																	type: 'info',
																	message: '已取消'
																});
																localStorage.removeItem('ms_username')
																		this.$router.push('/login');
															});
				                }, response => {  
				                     
				                })
	                }, response => {    
	                    this.$message.error('修改密码失败！')
	                })
          	} else {
          		this.$message.error('请输入有效信息！')
	            return;
          	}
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

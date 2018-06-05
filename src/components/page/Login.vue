<template>
    <div class="login-wrap">
        <div class="ms-title">房田后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="Account">
                    <el-input v-model="ruleForm.Account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="Password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.Password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    Account: '',
                    Password: ''
                },
                rules: {
                    Account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    Password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
//              const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    	this.$http.post(this.HOST+"/Server/Login",this.ruleForm)  
			                .then(response => { 
			                	if(response.data.status==0){
			                		localStorage.setItem('ms_username',this.ruleForm.Account);
			                		this.$router.push('/readme');
			                	}else{
			                		this.$message.error(response.data.msg)
			                	}
			                }, response => {  
			                    this.$message.error('登陆失败!')
			                })
			                
                    } else {
                        this.$message.error('请将信息填写完整！')
                        return false;
                    }
                });
                
                
      			
     
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>一手楼盘</el-breadcrumb-item>
                <el-breadcrumb-item>一手房源</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
        	<router-link to="/editnewhouse/-1">
        		<el-button type="primary" class="handle-del mr10" @click="delAll">新增楼盘</el-button>        		
        	</router-link>
            
            <el-input v-model="search_word"@change="search" placeholder="楼盘名称查询" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <!-- ref="multipleTable"-->
        <el-table :data="testData" border style="width: 100%" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column align="center" prop="SigningDate" label="合作日期" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="NewHouseName" label="楼盘名称" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="OpenTime" label="开盘时间" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="DeliverDate" label="交房时间" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="City" label="所属城市" min-width="120">
            </el-table-column>
            <el-table-column align="center" prop="Price" sortable label="售价" min-width="120">
            </el-table-column>
            <el-table-column align="center" prop="HousePeriod" label="房期" min-width="120">
            </el-table-column>
            <el-table-column align="center" label="建筑类型" min-width="150">
            	<template scope="scope">
            		<span v-if="scope.row.BuildingType&&scope.row.BuildingType.length>1">
            			<span v-for="item in scope.row.BuildingType">{{item}}、</span>            			
            		</span>
            		<span v-if="scope.row.BuildingType&&scope.row.BuildingType.length<=1">
            			<span v-for="item in scope.row.BuildingType">{{item}}</span>  
            		</span>
            	</template>
            	<!--<template scope="scope" v-else>
            		<span>{{scope.row.BuildingType}}</span>
            	</template>-->
            </el-table-column>
            <el-table-column align="center" prop="LandAgent" label="开发商" min-width="150">
            </el-table-column>
            <el-table-column align="center" prop="Commision" sortable label="佣金点数" min-width="100">
            </el-table-column>
           
           
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                	<router-link :to="'/editnewhouse/'+scope.row.Id">
                	<!--<router-link to="{path:'/editnewhouse',query:{id:scope.row.Id}}">-->
                	<!--<router-link to="{name:'editnewhouse',params:{id:1}}">-->
                    	<el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </router-link>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!--<div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>-->
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
                search_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
//          this.getData();
            this.myaxios();
            
        },
        computed: {
            data(){},
        },
        methods: {
        	//get为例子  
            myaxios: function() { 
                this.$http.get(this.HOST+"/NewHouse/Query",{params:{housename:this.search_word}})  
                .then(response => {
                	this.testData=response.data;
                }, response => {  
                   
                })  
            },
            search(){
                this.myaxios();
            },
            handleCurrentChange(val){
                this.cur_page = val;
            },
            
            handleEdit(index, row) {
            	
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){},
            handleSelectionChange(val) {}
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
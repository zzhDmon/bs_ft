<template>
    <div class="sidebar">
        <el-menu
        	background-color="rgb(50,65,87)"
      		text-color="#fff" 
      		active-text-color="#ffd04b" 
      		:default-active="'/readme'" 
      		class="el-menu-vertical-demo" 
      		theme="dark" 
      		unique-opened 
      		router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-sort-up',
                        index: '/readme',
                        title: '简介'
                    },
//                  {
//                      icon: 'el-icon-menu',
//                      index: '2',
//                      title: '表格',
//                      subs: [
//                          {
//                              index: 'basetable',
//                              title: '基础表格'
//                          },
//                          {
//                              index: 'vuetable',
//                              title: 'Vue表格组件'
//                          }
//                      ]
//                  },
//                  {
//                      icon: 'el-icon-date',
//                      index: '3',
//                      title: '表单',
//                      subs: [
//                          {
//                              index: 'baseform',
//                              title: '基本表单'
//                          },
//                          {
//                              index: 'vueeditor',
//                              title: '编辑器'
//                          },
//                          {
//                              index: 'markdown',
//                              title: 'markdown'
//                          },
//                          {
//                              index: 'upload',
//                              title: '文件上传'
//                          }
//                      ]
//                  },
//                  {
//                      icon: 'el-icon-star-on',
//                      index: 'basecharts',
//                      title: '图表'
//                  },
//                  {
//                      icon: 'el-icon-upload2',
//                      index: 'drag',
//                      title: '拖拽'
//                  },
                    /**********************************/
                    {
                        icon: 'el-icon-upload2',
                        index: '4',
                        title: '模板设置',
                        subs: [
                            {
                                index: '/posterlist',
                                title: '房源海报'
                            },
                            {
                                index: '/greetinglist',
                                title: '问候模板'
                            },{
                                index: '/festivallist',
                                title: '节日模板'
                            },
                            {
                                index: '/bannerlist',
                                title: '首页Banner'
                            },{
                                index: '/lineImagelist',
                                title: '朋友圈大字报'
                            },
                            {
                                index: '/funlist',
                                title: '幽默图'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-off',
                        index: '5',
                        title: '一手楼盘',
                        subs: [
                            {
                                index: '/newhouse',
                                title: '一手房源'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-warning',
                        index: '6',
                        title: '积分规则',
                        subs: [
                            {
                                index: '/scorelist',
                                title: '积分列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-upload',
                        index: '7',
                        title: '兑换商品',
                        subs: [
                            {
                                index: '/productlist',
                                title: '商品列表'
                            },
                            {
                                index: '/productedit/-1',
                                title: '新增商品'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '8',
                        title: '兑换记录',
                        subs: [
                            {
                                index: '/exchange',
                                title: '兑换记录'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '9',
                        title: '资讯新闻',
                        subs: [
                            {
                                index: '/newslist',
                                title: '新闻列表'
                            },
                            {
                                index: '/newsdetail/-1',
                                title: '新增新闻'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-search',
                        index: '10',
                        title: '搜索管理',
                        subs: [
                            {
                                index: '/statistics',
                                title: '关键词分布'
                            },
                            {
                                index: '/hotSearch',
                                title: '排行管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '11',
                        title: '系统设置',
                        subs: [
                            {
                                index: '/repass',
                                title: '修改密码'
                            },
                            {
                                index: '/realNameVerify',
                                title: '实名认证'
                            }
                        ]
                    }
                    
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
        overflow: scroll;
    }
</style>

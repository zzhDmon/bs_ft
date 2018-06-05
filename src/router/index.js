import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                //后台新增
                {
                    path: '/testupload',//测试上传
                    component: resolve => require(['../components/page/TestUpload.vue'], resolve)
                },
                {
                    path: '/posterlist',
                    component: resolve => require(['../components/page/PosterList.vue'], resolve)
                },
                {
                    path: '/greetinglist',
                    component: resolve => require(['../components/page/GreetList.vue'], resolve)
                },
                {
                    path: '/festivallist',
                    component: resolve => require(['../components/page/FestivalList.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/bannerlist',
                    component: resolve => require(['../components/page/BannerList.vue'], resolve)
                },
                {
                    path: '/addbanlinefun/:type/:id',
                    name: 'addbanlinefun',
                    component: resolve => require(['../components/page/AddBanLineFun.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/lineImagelist',
                    component: resolve => require(['../components/page/LineImageList.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/funlist',
                    component: resolve => require(['../components/page/FunList.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/template/:templatetype/:id',
                    component: resolve => require(['../components/page/Templates.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/newhouse',
                    component: resolve => require(['../components/page/NewHouse.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/editnewhouse/:id',
                    name: 'editnewhouse',
                    component: resolve => require(['../components/page/EditNewhouse.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/scorelist',
                    component: resolve => require(['../components/page/Scorerule.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/productlist',
                    component: resolve => require(['../components/page/GoodsList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/productedit/:id',
                    component: resolve => require(['../components/page/AddGoods.vue'], resolve)
                },
                {
                    path: '/exchange',
                    component: resolve => require(['../components/page/ExchangeList.vue'], resolve)
                },
                {
                    path: '/newslist',
                    component: resolve => require(['../components/page/NewsList.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/newsdetail/:id',
                    component: resolve => require(['../components/page/AddNews.vue'], resolve)
                },
                {
                    path: '/statistics',
                    component: resolve => require(['../components/page/Statistics.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/hotSearch',
                    component: resolve => require(['../components/page/HotSearch.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/repass',
                    component: resolve => require(['../components/page/ChangeInfo.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/realNameVerify',
                    component: resolve => require(['../components/page/RealName.vue'], resolve)   // vue-schart组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})

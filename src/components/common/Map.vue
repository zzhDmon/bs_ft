<template>  
  <div>  
    <!--container-->  
    <div class="m-t-10">  
      <a class="mint-cell mint-field">  
        <div class="mint-cell-wrapper">  
          <div class="mint-cell-title">  
            <!--<span class="mint-cell-text">输入地址</span> <span>{{ParAddress}}</span> <span>{{ParLatitude}}-</span><span>{{ParLongitude}}</span>-->
          </div>  
          <div class="mint-cell-value">  
            <input v-model="address_detail" type="text" id="suggestId"  name="address_detail" class="mint-field-core text-right">  
          	<!--<el-input v-model="address_detail" type="text" id="suggestId"  name="address_detail" class="mint-field-core text-right"></el-input>-->
          </div>  
        </div>  
      </a>  
    </div> 
    <br />
    <div id="allmap" style="width: 100%;height:600px;border: 1px solid gray;overflow:hidden;"></div>  
    <!--container end-->  
  </div>  
</template>  
  
<script>  

import BMap from 'BMap'  
  
export default {  
  components: {  
   
  },  
  props:['parAddress','ParLatitude','ParLongitude'],//地址，维度，经度
  data: () => ({  
    headerData: {  
      title: '办公地址',  
      toLink: ''  
    },  
    address_detail:this.parAddress, // 详细地址  
    userlocation: {lng: this.ParLongitude, lat: this.ParLatitude} 
//  address_detail: null, // 详细地址  
//  userlocation: {lng: '', lat: ''}  
  }),  
  created () {  
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子  
    this.loadMap()  
    // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图  
  },  
  mounted () { 
  	console.log(this.parAddress)
    this.ready()   
  },  
  methods: {  
    loadMap: function () {  
      // setTimeout(this.ready, 0)  
    },  
    
    ready: function () {  
//    this.address_detail=this.ParAddress;	
//    this.userlocation={lng: this.ParLongitude, lat: this.ParLatitude}	
    	
      var th = this  
      var map = new BMap.Map('allmap')  
//    var point = new BMap.Point(114.0552, 22.55) // 创建点坐标  
      var point = new BMap.Point(this.ParLongitude, this.ParLatitude) // 创建点坐标 
      map.addOverlay(new BMap.Point(this.ParLongitude, this.ParLatitude))    // 添加标注 
      map.centerAndZoom(point, 12)  
      map.enableScrollWheelZoom()    // 启用滚轮放大缩小，默认禁用  
      map.enableContinuousZoom()    // 启用地图惯性拖拽，默认禁用  
      map.addControl(new BMap.NavigationControl())  // 添加默认缩放平移控件  
      map.addControl(new BMap.OverviewMapControl()) // 添加默认缩略地图控件  
      map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT' }))   // 右下角，打开  
      // 建立一个自动完成的对象  
      var ac = new BMap.Autocomplete({'input': 'suggestId', 'location': map})  
      var myValue  
      ac.addEventListener('onconfirm', function (e) {    // 鼠标点击下拉列表后的事件  
        var _value = e.item.value  
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business  
        this.address_detail = myValue  
        alert(this.address_detail)  
        setPlace()  
      })  
  
      function setPlace () {  
        map.clearOverlays()   // 清除地图上所有覆盖物  
        function myFun () { 
          th.userlocation = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 19)  
          map.addOverlay(new BMap.Marker(th.userlocation))    // 添加标注 
          alert(JSON.stringify(th.userlocation))  
        }  
        var local = new BMap.LocalSearch(map, { // 智能搜索  
          onSearchComplete: myFun  
        })  
        local.search(myValue)  
      } 
//    function firstSetPlace () {  
//      map.clearOverlays()   // 清除地图上所有覆盖物  
//      function myFun () {  
//        th.userlocation = local.getResults().getPoi(0).point    // 获取第一个智能搜索的结果  
//        map.centerAndZoom(th.userlocation, 19)  
//        map.addOverlay(new BMap.Marker(th.userlocation))    // 添加标注  
//        alert(JSON.stringify(th.userlocation))  
//      }  
//      var local = new BMap.LocalSearch(map, { // 智能搜索  
//        onSearchComplete: myFun  
//      })  
//      local.search(myValue)  
//    }  
//    
//    firstSetPlace ()
      /* var map = new BMap.Map('allmap')  
      map.enableScrollWheelZoom(true)  
      console.log(map)  
      var localSearch = new BMap.LocalSearch(map)  
      // localSearch.enableAutoViewport() // 允许自动调节窗体大小  
      map.clearOverlays() // 清空原来的标注  
      localSearch.setSearchCompleteCallback(function (searchResult) {  
        var poi = searchResult.getPoi(0)  
        map.centerAndZoom(poi.point, 20)  
        var point = new BMap.Point(poi.point.lng, poi.point.lat)  
        var marker = new BMap.Marker(point) // 创建标注，为要查询的地方对应的经纬度  
        map.addOverlay(marker)  
      })  
      localSearch.search('广东省深圳市南山区深圳软件园二期') */  
    }  
  }  
}  
</script>  
  
<style>  
  /* 去掉地图左下角的百度LOGO */  
  .anchorBL {  
    display:none  
  }  
</style> 
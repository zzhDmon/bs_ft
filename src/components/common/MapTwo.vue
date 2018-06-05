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
            <!--<input  v-model="address_detail" type="text" id="suggestId"  name="address_detail" class="mint-field-core text-right">-->  
          	<!--<el-input v-model="address_detail" type="text" id="suggestId"  name="address_detail" class="mint-field-core text-right"></el-input>-->
          </div>  
        </div>  
      </a>  
    </div> 
    
    <el-row>
    	<el-col :span="21">
    		<el-input  v-model="address_detail" type="text" id="suggestId"  name="address_detail" class="mint-field-core text-right"></el-input>    		
    	</el-col>
    	<el-col :span="3">
    		<el-button type="primary" @click="location(address_detail)">定位</el-button>
    	</el-col>
    </el-row>
    <br />
    
    <div id="allmap" style="width: 100%;height:600px;border: 1px solid gray;overflow:hidden;"></div>  
    <!--container end-->  
  </div>  
</template>  
  
<script>
import BMap from "BMap";

export default {
  props: ["myMessage"], //地址
  data: () => ({
    address_detail: "", // 详细地址
    userlocation: { lng: "", lat: "" }
  }),
  created() {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadMap();
    // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图
  },
  mounted() {
    var self = this;
    setTimeout(function() {
      self.address_detail = self.myMessage ? self.myMessage : "厦门市";
    }, 500);
    setTimeout(function() {
      self.ready(self.address_detail);
    }, 500);
  },
  methods: {
    loadMap: function() {
      // setTimeout(this.ready, 0)
    },
    location(location) {
      this.ready(location);
    },

    ready: function(location) {
      var self = this;

      var map = new BMap.Map("allmap");
      map.enableScrollWheelZoom(true); // 启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom(); // 启用地图惯性拖拽，默认禁用
      map.addControl(new BMap.NavigationControl()); // 添加默认缩放平移控件
      map.addControl(new BMap.OverviewMapControl()); // 添加默认缩略地图控件
      map.addControl(
        new BMap.OverviewMapControl({
          isOpen: true,
          anchor: "BMAP_ANCHOR_BOTTOM_RIGHT"
        })
      ); // 右下角，打开

      //    var localSearch = new BMap.LocalSearch(map)
      //    // localSearch.enableAutoViewport() // 允许自动调节窗体大小
      //    map.clearOverlays() // 清空原来的标注
      //    localSearch.setSearchCompleteCallback(function (searchResult) {
      //      var poi = searchResult.getPoi(0)
      //      if(!poi){
      //      	self.$alert('定位有误，请重新输入！', '警告', {
      //		          confirmButtonText: '确定',
      //		          type: 'error',
      //        		  center: true,
      //		          callback: action => {
      //
      //		          }
      //		       });
      //      }else{
      //      	map.centerAndZoom(poi.point, 20)
      //      	var point = new BMap.Point(poi.point.lng, poi.point.lat)
      //      	var marker = new BMap.Marker(point) // 创建标注，为要查询的地方对应的经纬度
      //      	map.addOverlay(marker)
      //
      //      	self.$emit('changeloc',self.address_detail,poi.point.lng, poi.point.lat)
      //
      //      }
      //
      //    })
      //    localSearch.search(location)

      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(
        location,
        function(point) {
          if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
            self.$emit("changeloc", self.address_detail, point.lng, point.lat);
          } else {
            self.$alert("定位有误，请重新输入！", "警告", {
              confirmButtonText: "确定",
              type: "error",
              center: true,
              callback: action => {}
            });
          }
        },
        "厦门市"
      );
    }
  }
};
</script>  
  
<style>
/* 去掉地图左下角的百度LOGO */
.anchorBL {
  display: none;
}
</style> 
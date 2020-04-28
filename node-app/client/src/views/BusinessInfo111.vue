<template>
  <div>
    <div class="baiduMap">


                  <el-form :inline="true" :model="centerStr" class="demo-form-inline">
                      <el-form-item label="审批人">
                        <el-input v-model="centerStr.lng" placeholder="审批人"></el-input>
                      </el-form-item>
                     <el-form-item label="审批人">
                        <el-input v-model="centerStr.lat" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                      </el-form-item>
                    </el-form>

　　　　　　　　　　<baidu-map
　　　　　　　　　　　　class="bm-view"
　　　　　　　　　　　　ak="你的百度地图ak"
　　　　　　　　　　　　center="广州市"
　　　　　　　　　　　　:zoom="12"
　　　　　　　　　　　　:scroll-wheel-zoom="true"
　　　　　　　　　　　　@click="getClickInfo"
　　　　　　　　　　　　@moving="syncCenterAndZoom"
　　　　　　　　　　　　@moveend="syncCenterAndZoom"
　　　　　　　　　　　　@zoomend="syncCenterAndZoom">
　　　　　　　　　　　　　　<bm-view style="width: 100%; height:500px;"></bm-view>
　　　　　　　　　　　　　　<bm-marker
　　　　　　　　　　　　　　　　:position="{ lng: centerStr.lng, lat: centerStr.lat }"
　　　　　　　　　　　　　　　　:dragging="true"
　　　　　　　　　　　　　　　　animation="BMAP_ANIMATION_BOUNCE">
　　　　　　　　　　　　　　</bm-marker>
　　　　　　　　　　　　　　<bm-control :offset="{ width: '10px', height: '10px' }">
　　　　　　　　　　　　　　　　<bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
　　　　　　　　　　　　　　　　　　<input
　　　　　　　　　　　　　　　　　　　　type="text"
　　　　　　　　　　　　　　　　　　　　placeholder="请输入搜索关键字"
　　　　　　　　　　　　　　　　　　　　class="serachinput"/>
　　　　　　　　　　　　　　　　</bm-auto-complete>
　　　　　　　　　　　　　　</bm-control>
　　　　　　　　　　　　　　<bm-local-search
　　　　　　　　　　　　　　　:keyword="keyword"
　　　　　　　　　　　　　　　:auto-viewport="true"
　　　　　　　　　　　　　　　style="width:0px;height:0px;overflow: hidden;"
　　　　　　　　　　　　　　></bm-local-search>
　　　　　　　　　　</baidu-map>
　　　　　　　　</div>
  </div>
</template>
<script>
import {
　　　　　　　　BaiduMap,
　　　　　　　　BmControl,
　　　　　　　　BmView,
　　　　　　　　BmAutoComplete,
　　　　　　　　BmLocalSearch,
　　　　　　　　BmMarker
　　　　　　} from "vue-baidu-map";
export default {
  　//地图组件---按需引入
　　　　　　　　components: {
　　　　　　　　　　BaiduMap,
　　　　　　　　　　BmControl,
　　　　　　　　　　BmView,
　　　　　　　　　　BmAutoComplete,
　　　　　　　　　　BmLocalSearch,
　　　　　　　　　　BmMarker
　　　　　　　　},
　　　　　　　　data: function() {
　　　　　　　　　　return {
　　　　　　　　　　　　showMapComponent: this.value,
　　　　　　　　　　　　keyword: "",
　　　　　　　　　　　　mapStyle: {
　　　　　　　　　　　　　　width: "100%",
　　　　　　　　　　　　　　height: this.mapHeight + "px"
　　　　　　　　　　　　},
　　　　　　　　　　　　centerStr: {
　　　　　　　　　　　　　　lng: "",
　　　　　　　　　　　　　　lat: ""
　　　　　　　　　　　　}
　　　　　　　　　　};
　　　　　　　　},
　　　　　　　　watch: {
　　　　　　　　　　value: function(currentValue) {
　　　　　　　　　　　　this.showMapComponent = currentValue;
　　　　　　　　　　　　if (currentValue) {
　　　　　　　　　　　　　　this.keyword = "";
　　　　　　　　　　　　}
　　　　　　　　　　}
　　　　　　　　},
　　　　　　　　methods: {
　　　　　　　　　　getClickInfo(e) {
　　　　　　　　　　this.centerStr.lng = e.point.lng;
　　　　　　　　　　this.centerStr.lat = e.point.lat;
　　　　　　　　},
　　　　　　　　syncCenterAndZoom(e) {
　　　　　　　　　　const { lng, lat } = e.target.getCenter();
　　　　　　　　　　this.centerStr.lng = lng;
　　　　　　　　　　this.centerStr.lat = lat;
　　　　　　　　　　this.zoom = e.target.getZoom();
　　　　　　　　}
　　　　　　}
}
</script>
<style >
.head {
	　　margin-left: 200px;
	　　width: 100px;
}

.baiduMap {
	width: 80%;
	height: 800px;
	margin: 0 auto;
	overflow: hidden;
}

.ivu-form-item {
	　display: inline-block;
	width: 40%;
}

.bm-view > div {
	width: 100%;
	　　　　　　height: 700px !important;
}

.serachinput {
	　　　　　　width: 300px;
	　　　　　　box-sizing: border-box;
	　　　　　　padding: 9px;
	　　　　　　border: 1px solid #dddee1;
	　　　　　　line-height: 20px;
	　　　　　　font-size: 16px;
	　　　　　　height: 38px;
	　　　　　　color: #333;
	　　　　　　position: relative;
	　　　　　　border-radius: 4px;
	　　　　　　-webkit-box-shadow: #666 0px 0px 10px;
	　　　　　　-moz-box-shadow: #666 0px 0px 10px;
	　　　　　　box-shadow: #666 0px 0px 10px;
}
</style>
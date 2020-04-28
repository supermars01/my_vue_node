<template>
	<div>
		<div class="baiduMap">
			<el-form :inline="true" :model="centerStr" class="demo-form-inline">
				<el-form-item label="经度"><el-input v-model="centerStr.lng" placeholder="经度"></el-input></el-form-item>
				<el-form-item label="纬度"><el-input v-model="centerStr.lat" placeholder="纬度"></el-input></el-form-item>
				<el-form-item><el-button type="primary" @click="centerStrBtn">提交</el-button></el-form-item>
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
				　　　　　　　　　　　　@zoomend="syncCenterAndZoom"
			>
				<bm-view style="width: 100%; height:500px;"></bm-view>
				<bm-marker
					　　　　　　　　　　　　　　　　:position="{ lng: centerStr.lng, lat: centerStr.lat }"
					　　　　　　　　　　　　　　　　:dragging="true"
					　　　　　　　　　　　　　　　　animation="BMAP_ANIMATION_BOUNCE"
				></bm-marker>
				<bm-control :offset="{ width: '10px', height: '10px' }">
					<bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
						<input
							　　　　　　　　　　　　　　　　　　　　type="text"
							　　　　　　　　　　　　　　　　　　　　placeholder="请输入搜索关键字"
							　　　　　　　　　　　　　　　　　　　　class="serachinput"
						/>
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
import { BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker } from 'vue-baidu-map';
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
			keyword: '',
			mapStyle: {
				width: '100%',
				height: this.mapHeight + 'px'
			},
			centerStr: {
				lng: '',
				lat: ''
			}
		};
	},
	watch: {
		value: function(currentValue) {
			this.showMapComponent = currentValue;
			if (currentValue) {
				this.keyword = '';
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
		},
        centerStrBtn() {
            this.$emit('event',this.centerStr)
        }
	}
};
</script>
<style>
.head {
　　margin-left: 200px;
　　width: 100px;
}

.baiduMap {
	width: 80%;
	height: 500px;
	margin: 0 auto;
	overflow: hidden;
}

.ivu-form-item {
	display: inline-block;
	width: 40%;
}

.bm-view > div {
	width: 100%;
	height: 500px !important;
}

.serachinput {
	position: relative;
	box-sizing: border-box;
	padding: 9px;
	width: 300px;
	height: 38px;
	border: 1px solid #dddee1;
	border-radius: 4px;
	box-shadow: #666 0 0 10px;
	color: #333;
	font-size: 1rem;
	line-height: 1.25rem
}
</style>

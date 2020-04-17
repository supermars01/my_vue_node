Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// content: [],
		px: [], //排序列表内容
		qyopen: false, //点击区域筛选滑动弹窗显示效果，默认不显示
		qyshow: true, //用户点击闭关区域的弹窗设置，默认不显示
		nzopen: false, //筛选弹窗
		pxopen: false, //筛选弹窗
		nzshow: true,
		pxshow: true,
		isfull: false,
		select1: '',
		select2: '',

		cateList: {}, //一级分类
		cateSecondList: {}, //二级分类
		shownavindex: '',
		pxIndex: 0,
		total: 0,
		page: 1,
		loading: !0,
		params: {},
		list: [{
			"id": "296",
			"merchname": "艺雅鲜花店",
			"logo": "http://img.youlemi.net/images/2/2019/11/Uo77NcA08az7AW3cAmXhz77Bc7bxCx.jpg",
			"fav_num": "0",
			"eva_point": 5,
			"address": "广东省惠州市惠城区丽园雅苑(花边南路西)",
			"tel": "0752-2396225",
			"lat": "23.070545",
			"lng": "114.410675",
			"jointime": "2019.10.29",
			"distance": "107549",
			"percent": 0,
			"sy_percent": "95.91",
			"pay_limit": 0.96,
			"limitmoney": 1,
			"isaccept": "0"
		}, {
			"id": "227",
			"merchname": "博缘花艺坊",
			"logo": "http://img.youlemi.net/images/2/2019/05/QJ3Phvi5v48khZVp33ob5KNv2Xjo2I.jpg",
			"fav_num": "0",
			"eva_point": 5,
			"address": "惠州市隆生·半岛广场(惠州市惠城区)",
			"tel": "13719622950",
			"lat": "23.08688561981431",
			"lng": "114.427328458935",
			"jointime": "2019.05.16",
			"distance": "109160",
			"percent": 0,
			"sy_percent": "92.64",
			"pay_limit": 0.46,
			"limitmoney": 0.5,
			"isaccept": "0"
		},{
			"id": "296",
			"merchname": "艺雅鲜花店",
			"logo": "http://img.youlemi.net/images/2/2019/11/Uo77NcA08az7AW3cAmXhz77Bc7bxCx.jpg",
			"fav_num": "0",
			"eva_point": 5,
			"address": "广东省惠州市惠城区丽园雅苑(花边南路西)",
			"tel": "0752-2396225",
			"lat": "23.070545",
			"lng": "114.410675",
			"jointime": "2019.10.29",
			"distance": "107549",
			"percent": 0,
			"sy_percent": "95.91",
			"pay_limit": 0.96,
			"limitmoney": 1,
			"isaccept": "0"
		}, {
			"id": "8",
			"merchname": "博缘花艺坊",
			"fav_num": "0",
			"eva_point": 5,
			"address": "惠州市隆生·半岛广场(惠州市惠城区)",
			"tel": "13719622950",
			"lat": "23.08688561981431",
			"lng": "114.427328458935",
			"jointime": "2019.05.16",
			"distance": "109160",
			"percent": 0,
			"sy_percent": "92.64",
			"pay_limit": 0.46,
			"limitmoney": 0.5,
			"isaccept": "0"
		},{
			"id": "445",
			"merchname": "艺雅鲜花店",
			"logo": "http://img.youlemi.net/images/2/2019/11/Uo77NcA08az7AW3cAmXhz77Bc7bxCx.jpg",
			"fav_num": "0",
			"eva_point": 5,
			"address": "广东省惠州市惠城区丽园雅苑(花边南路西)",
			"tel": "0752-2396225",
			"lat": "23.070545",
			"lng": "114.410675",
			"jointime": "2019.10.29",
			"distance": "107549",
			"percent": 0,
			"sy_percent": "95.91",
			"pay_limit": 0.96,
			"limitmoney": 1,
			"isaccept": "0"
		}, {
			"id": "444",
			"merchname": "博缘花艺坊",
			"logo": "http://img.youlemi.net/images/2/2019/05/QJ3Phvi5v48khZVp33ob5KNv2Xjo2I.jpg",
			"fav_num": "0",
			"eva_point": 5,
			"address": "惠州市隆生·半岛广场(惠州市惠城区)",
			"tel": "13719622950",
			"lat": "23.08688561981431",
			"lng": "114.427328458935",
			"jointime": "2019.05.16",
			"distance": "109160",
			"percent": 0,
			"sy_percent": "92.64",
			"pay_limit": 0.46,
			"limitmoney": 0.5,
			"isaccept": "0"
		}]
	},
	// 第一栏选择内容
	selectleft: function(e) {
		console.log('用户选中左边菜单栏的索引值是：' + e.target.dataset.id);
		// console.log(e);
		// var catename = e.target.dataset.catename;
		// console.log(catename);
		var id = e.target.dataset.id;
		console.log(id);
		var list = this.data.cateList;
		var cateSecondList = {};
		for (var i = 0; i < list.length; i++) {
			if (list[i].id == id) {
				cateSecondList = list[i].second_levels;
			}
		}
		this.setData({
			select1: id - 1,
			select2: '',
			cateSecondList: cateSecondList
		});
	},
	// 中间栏选择的内容
	selectcenter: function(e) {
		var id = e.target.dataset.id;
		var params = {};
		params.cate = e.target.dataset.id;
		this.setData({
			page: 1,
			list: [],
			select2: id,
			params: params


		});
		this.getMerchList();
	},
	/**
	 * 搜索列表
	 */
	searchMerchList: function(e) {
		var params = {};
		console.log(e);
		params.order = e.target.dataset.order;
		params.by = e.target.dataset.by;
		this.setData({
			page: 1,
			list: [],
			params: params

		});
		this.getMerchList();
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getnav();
		console.log(options);
		var params = {};
		params.cate = options.id;
		this.setData({
			params: params
		});
		// this.getMerchList();
		this.data;
	},
	modalcnt: function(res) {
		console.log(res);
		var tel = res.currentTarget.dataset.id;
		wx.showModal({
			content: tel,
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	/**
	 * 商家列表
	 */
	getMerchList: function() {
		var march = this;
		// march.setData({
		//   loading: !0
		// }),
		// march.data.params.page = march.data.page,
		// march.data.params.areaid = march.data.areaid,
		// core.get("merch/get_list", march.data.params, function (res) {
		//   console.log(res);
		//   var sdata = {
		//     loading: !1,
		//     total: res.total
		//   };
		//   res.list || (res.list = []),
		//     res.list.length > 0 && (sdata.page = march.data.page + 1,
		//       sdata.list = march.data.list.concat(res.list),
		//       res.list.length < res.pagesize),
		//     march.setData(sdata);
		// });
		var Arr_res = [{
			"id": "296",
			"merchname": "艺雅鲜花店",
			"logo": "http://img.youlemi.net/images/2/2019/11/Uo77NcA08az7AW3cAmXhz77Bc7bxCx.jpg",
			"fav_num": "0",
			"eva_point": 5,
			"address": "广东省惠州市惠城区丽园雅苑(花边南路西)",
			"tel": "0752-2396225",
			"lat": "23.070545",
			"lng": "114.410675",
			"jointime": "2019.10.29",
			"distance": "107549",
			"percent": 0,
			"sy_percent": "95.91",
			"pay_limit": 0.96,
			"limitmoney": 1,
			"isaccept": "0"
		}, {
			"id": "227",
			"merchname": "博缘花艺坊",
			"logo": "http://img.youlemi.net/images/2/2019/05/QJ3Phvi5v48khZVp33ob5KNv2Xjo2I.jpg",
			"fav_num": "0",
			"eva_point": 5,
			"address": "惠州市隆生·半岛广场(惠州市惠城区)",
			"tel": "13719622950",
			"lat": "23.08688561981431",
			"lng": "114.427328458935",
			"jointime": "2019.05.16",
			"distance": "109160",
			"percent": 0,
			"sy_percent": "92.64",
			"pay_limit": 0.46,
			"limitmoney": 0.5,
			"isaccept": "0"
		}];
		march.setData({
			list: Arr_res
		});
	},
	/**
	 * 排序
	 */
	bindSort: function(e) {
		var params = {};
		console.log(e);
		params.order = e.target.dataset.order;
		params.by = e.target.dataset.by;
		this.setData({
			page: 1,
			list: [],
			params: params
		});
		this.getMerchList();
	},

	//导航列表
	getnav: function() {
		var nav = this;
		core.get("getcategory", {}, function(res) {
			console.log(res)
			var nav_res = {
				cateList: res.list
			}
			nav.setData(nav_res);
		});
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		// console.log(1);
		this.data.list.length == this.data.total || this.getMerchList();
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {
		wx.showNavigationBarLoading(),
			this.onLoad(),
			wx.stopPullDownRefresh(),
			wx.hideNavigationBarLoading();
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	// 列表下拉框是否隐藏
	listqy: function(e) {
		if (this.data.qyopen) {
			this.setData({
				qyopen: false,
				nzopen: false,
				pxopen: false,
				nzshow: true,
				pxshow: true,
				qyshow: false,
				isfull: false,
				shownavindex: 0
			})
		} else {
			this.setData({
				qyopen: true,
				pxopen: false,
				nzopen: false,
				nzshow: true,
				pxshow: true,
				qyshow: false,
				isfull: true,
				shownavindex: e.currentTarget.dataset.nav
			})
		}

	},
	// 下拉框是否隐藏
	list: function(e) {
		if (this.data.nzopen) {
			this.setData({
				nzopen: false,
				pxopen: false,
				qyopen: false,
				nzshow: false,
				pxshow: true,
				qyshow: true,
				isfull: false,
				shownavindex: 0
			})
		} else {
			this.setData({
				// content: this.data.nv,
				nzopen: true,
				pxopen: false,
				qyopen: false,
				nzshow: false,
				pxshow: true,
				qyshow: true,
				isfull: true,
				shownavindex: e.currentTarget.dataset.nav
			})
		}
	},
	// 排序下拉框是否隐藏
	listpx: function(e) {
		if (this.data.pxopen) {
			this.setData({
				nzopen: false,
				pxopen: false,
				qyopen: false,
				nzshow: true,
				pxshow: false,
				qyshow: true,
				isfull: false,
				shownavindex: 0
			})
		} else {
			this.setData({
				// content: this.data.px,
				nzopen: false,
				pxopen: true,
				qyopen: false,
				nzshow: true,
				pxshow: false,
				qyshow: true,
				isfull: true,
				shownavindex: e.currentTarget.dataset.nav
			})
		}
		// console.log(e.target)
	},

	// 清空筛选项
	quyuEmpty: function() {
		this.setData({
			select1: '',
			select2: '-1'
		})
	},

	// 排序内容下拉框筛选
	selectPX: function(e) {
		// console.log('排序内容下拉框筛选的内容是' + e.currentTarget.dataset.index);
		this.setData({
			// pxIndex: e.currentTarget.dataset.index,
			nzopen: false,
			pxopen: false,
			qyopen: false,
			nzshow: true,
			pxshow: false,
			qyshow: true,
			isfull: false,
			shownavindex: 0
		});
		// console.log('当前' + this.data.pxIndex);
	},
})

import { business_list, category_list, distance } from '../../api/business.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		page: 1,
		params: {},
		list: [],
		total: 0, //总条数
		cateSecondList: {}, //二级分类
		categoryName: '', //类别名称
		select2: '-1',
		
		
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
		cateList: {}, //一级分类
		
		shownavindex: '',
		pxIndex: 0,
		
		
		loading: !0,
		
		
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
	
	/**
	 * 搜索列表
	 */
	searchMerchList: function(e) {
    var params = {};
    console.log(e.target.dataset.by);
    params.x = 113.301849;
    params.y = 23.130853;
    params.distance = e.target.dataset.by;
    distance(params).then(res => {
      console.log(res);
      this.setData({
        list: res.result
      })
    })
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getMerchList(); //获取内容
		this.getCategoryList(); //获取列表
		
		
		// this.getnav();
		// console.log(options);
		// var params = {};
		// params.cate = options.id;
		// this.setData({
		// 	params: params
		// });
		
		// this.data;
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
	// 类别数据
	getCategoryList:function() {
		category_list().then(res => {
			console.log(res)
			this.setData({
				cateSecondList: res.result
			})
		})
	},
  
	/**
	 * 商家列表
	 */
	getMerchList: function() {
		wx.showLoading({
		  title: '加载中',
		})
		let march = this;
		march.data.params.page = march.data.page,
		console.log(march.data.params)
		business_list(march.data.params).then(res => {
			console.log(JSON.stringify(res))
			if(res.result.business_list.length >0) {
				let page = march.data.page + 1
				let list = march.data.list.concat(res.result.business_list)
				march.setData({
					list: list,
					total: res.result.pagination.total
				});
				wx.hideLoading()
			} else {
				wx.hideLoading()
			}
		})
	},
	// 中间栏选择的内容
	selectcenter: function(e) {
		let categoryName = e.target.dataset.name;
		let index = e.target.dataset.index;
		let params = {};
		params.title = e.target.dataset.name;
		this.setData({
			page: 1,
			list: [],
			categoryName: categoryName,
			total: 0,
			select2: index,
			params: params
		});
		this.getMerchList();
	},
	/**
	 * 排序
	 */
	bindSort: function(e) {
		
   
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

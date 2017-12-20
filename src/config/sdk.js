import config from './config';
export default {

	wxSignPackage: null,

	getWxSignPackage(callback) {
		const self = this;
		$.ajax({
			url: '/game/gameAjax/GetSignPackage',
			dataType: 'json',
			type: 'POST',
			async: false,
			data: {
				url: location.href.split('#')[0],
			},
			success(result) {
				const msg = result.data || result.msg;
				self.wxSignPackage = msg;
				if (callback) callback(msg);
			},
			error(xhr, errorType, error) {
                // self.error("返回结果: ", xhr, errorType);
			},
		});
	},

	configWx() {
		console.log(this.wxSignPackage);
        // 这里有个坑。用//api.24haowan.com时，nonceStr是大写。用平台时是：noncestr。切换时记得切换
		if (!this.wxSignPackage.appId || !this.wxSignPackage.timestamp
        || !this.wxSignPackage.nonceStr || !this.wxSignPackage.signature) {
			return false;
		}
            /* 微信接口 */
		wx.config({
			debug: false,
			appId: this.wxSignPackage.appId,
			timestamp: this.wxSignPackage.timestamp,
			nonceStr: this.wxSignPackage.nonceStr,
			signature: this.wxSignPackage.signature,
			jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
				'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems',
                    // 录音相关
				'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
			],
		});

		return this;
	},


	getUserOpenid(cb) {
		$.ajax({
			url: '/game/v1/userViewParams',
			async: false,
			dataType: 'json',
			type: 'POST',
			data: {
				game_id: location.href.match(/game_id\/\d+/) ? location.href.match(/game_id\/\d+/)[0].split('/')[1] : -1,
				isTest: 0,
				key: '',
			},
			success(result) {
				const data = result.data;
				if (result.code == 0) {
					cb(data.user_name);
				}
			},
			error(err) {
				console.log(err);
			},
		});
	},
	// 设置微信分享，通过传opts参数支持二次设置分享文案
	setWxShare: (opts, callback) => {
		const shareInfo = config.share;
		// 配置分享信息
		wx.ready(function () {
			// 分享朋友圈
			wx.onMenuShareTimeline({
				title: opts.title || shareInfo.title, // 分享标题
				link: opts.link || shareInfo.title, // 分享链接
				imgUrl: opts.imgUrl || shareInfo.imgUrl, // 分享图标
				success: () => {
					if (callback) callback();
				},
				cancel: () => { }
			});
			// 分享朋友
			wx.onMenuShareAppMessage({
				title: opts.title || shareInfo.title, // 分享标题
				desc: opts.desc || shareInfo.desc, // 分享描述
				link: opts.link || shareInfo.title, // 分享链接
				imgUrl: opts.imgUrl || shareInfo.imgUrl, // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: () => {
					if (callback) callback();
				},
				cancel: () => { }
			});
		})
	},
};

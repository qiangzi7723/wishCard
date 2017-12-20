import Vue from 'vue';

const setTranslate = (e, x, y, z) => {
	const v = `translate3d(${x}px,${y}px,${z}px` + ')';
	const elm = e;
	elm.style.webkitTransform = v;
	elm.style.MozTransform = v;
	elm.style.msTransform = v;
	elm.style.OTransform = v;
	elm.style.transform = v;
};

const isWeixinBrowser = () => /micromessenger/i.test(navigator.userAgent);

const bus = new Vue();

export {
    setTranslate,
    isWeixinBrowser,
    bus,
};

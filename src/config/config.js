let imgs = [];
for (let i = 1, len = 12; i < len; i++) {
    const index = i.toString().padStart(2, '0');
    const url = 'gif/' + index + '.gif';
    imgs.push(url);
}
for (let i = 1, len = 12; i < len; i++) {
    const index = i.toString().padStart(2, '0');
    const url = 'img/' + index + '.png';
    imgs.push(url);
}
let img = ['img/start-bg.png', 'img/envelope-bottom.png', 'img/envelope-top.png',
    'img/envelope-animation.png', 'img/envelope-open.png', 'img/top-logo.png', 'img/envelope.png',
    'img/start-button.png','img/start-change.png','img/share-button.png','img/wish-button.png',
    'img/share-weixin.png','img/share-finger.png'
]

imgs=imgs.concat(img);

export default {
    // 分享文案
    share: {
        title: '分享标题',
        desc: '分享描述',
        link: window.location.href,
        imgUrl: '',
    },
    imgs,
    audios: [
    ],
};

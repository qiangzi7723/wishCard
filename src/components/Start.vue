<template>
    <section class='wrap'>
        <section class='main-container'>
            <div :style="{backgroundImage:'url('+ curContentImg +')'}" class='main-img'></div>
            <div class='main-text-container'>
                <div class='change-wish' @click='changeWish' v-show='wishButtonShow'></div>
                <div class='wish-author'>来自{{name}}的心愿：</div>
                <textarea class='wish-text' v-model='wishText'></textarea>
            </div>
        </section>
        <ul class='move-container' v-show='moveContainer'>
            <li v-for='(v,index) in moveConfig'>
                <i :style="{backgroundImage:'url('+v.img+')'}" :class="{ 'high-light' : index==highLightIndex}" @click='highLight(index)'></i>
                <span>{{v.desc}}</span>
            </li>
        </ul>
        <div class='sure-button' @click='createCard' v-show='sureButton'></div>

        <!-- 结束页 -->
        <div class='envelope-bottom'></div>
        <div class='envelope-top'></div>
        <div class='envelope-animation'></div>
        <img class='save-envelope' :src="envelopeData" v-show='envelopeData' />

        <!-- 生成合图辅助 -->
        <section class="transform-bg"></section>
        <section class='transform-mask'>
            <div class='m'></div>
            <div class='qrcode'></div>
            <div class='qrcode-cache'></div>
        </section>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                moveConfig: [{
                    desc: '童心常绿',
                    img: require('@/assets/img/01.png'),
                    banner: require('@/assets/gif/01.gif'),
                    textArray: ['新的一年，新的自己，不变的是那颗炙热的童心；', '历尽千帆重浪，归来，依旧是骄阳中的花儿与少年；', '谁的青春不迷茫？记得带上好心情。',
                        '好久不见，你最近可好？ 愿你永远充满童心、快乐。', '纵使天涯，也如咫尺，愿友谊长存。', '美好的小生活一直有，简单的快乐永存留。',
                        '谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。', '祝你新年快乐。'
                    ],
                }, {
                    desc: '花与少年',
                    img: require('@/assets/img/02.png'),
                    banner: require('@/assets/gif/02.gif'),
                    textArray: ["历尽千帆重浪，归来，依旧是骄阳中的花儿与少年。", "祝你新年快乐。", "谁的青春不迷茫？记得带上好心情。",
                        "好久不见，你最近可好？ 愿你永远充满童心、快乐。", "纵使天涯，也如咫尺，愿友谊长存。 ", "美好的小生活一直有，简单的快乐永存留。",
                        "谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。", "新的一年希望你快快乐乐。"
                    ],
                }, {
                    desc: '致青春',
                    img: require('@/assets/img/03.png'),
                    banner: require('@/assets/gif/03.gif'),
                    textArray: ["谁的青春不迷茫？记得带上好心情。", "祝你新年快乐。", "谁的青春不迷茫？记得带上好心情。", "好久不见，你最近可好？ 愿你永远充满童心、快乐。",
                        "纵使天涯，也如咫尺，愿友谊长存。 ", "美好的小生活一直有，简单的快乐永存留。", "谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。",
                        "新的一年希望你快快乐乐。", "愿你拥有童年般的小美好。"
                    ]
                }, {
                    desc: '同桌的你',
                    img: require('@/assets/img/04.png'),
                    banner: require('@/assets/gif/04.gif'),
                    textArray: ["纵使天涯，也如咫尺，愿友谊长存。 ", "祝你新年快乐。", "谁的青春不迷茫？记得带上好心情。", "好久不见，你最近可好？ 愿你永远充满童心、快乐。",
                        "纵使天涯，也如咫尺，愿友谊长存。 ", "美好的小生活一直有，简单的快乐永存留。", "谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。",
                        "新的一年希望你快快乐乐。", "一年的忙忙碌碌，只为与家人的团团圆圆。"
                    ]
                }, {
                    desc: '好久不见',
                    img: require('@/assets/img/05.png'),
                    banner: require('@/assets/gif/05.gif'),
                    textArray: ["好久不见，你最近可好？ 愿你永远充满童心、快乐。", "祝你新年快乐。", "谁的青春不迷茫？记得带上好心情。",
                        "好久不见，你最近可好？ 愿你永远充满童心、快乐。", "纵使天涯，也如咫尺，愿友谊长存。 ", "美好的小生活一直有，简单的快乐永存留。",
                        "谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。", "新的一年希望你快快乐乐。", "一年的忙忙碌碌，只为与家人的团团圆圆。",
                        "愿你拥有童年般的小美好。"
                    ]
                }, {
                    desc: '妳的陪伴',
                    img: require('@/assets/img/06.png'),
                    banner: require('@/assets/gif/06.gif'),
                    textArray: ["我们总有聊不完的事，感谢妳一直以来的陪伴，有妳真好。", "祝你新年快乐。", "好久不见，你最近可好？ 愿你永远充满童心、快乐。",
                        "纵使天涯，也如咫尺，愿友谊长存。 ", "美好的小生活一直有，简单的快乐永存留。", "谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。",
                        "新的一年希望你快快乐乐。", "一年的忙忙碌碌，只为与家人的团团圆圆。", "愿你心想事成，我的好友。"
                    ]
                }, {
                    desc: '美好生活',
                    img: require('@/assets/img/07.png'),
                    banner: require('@/assets/gif/07.gif'),
                    textArray: ["美好的小生活一直有，简单的快乐永存留。", "祝你新年快乐。", "好久不见，你最近可好？ 愿你永远充满童心、快乐。",
                        "纵使天涯，也如咫尺，愿友谊长存。 ", "美好的小生活一直有，简单的快乐永存留。", "谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。",
                        "新的一年希望你快快乐乐。", "一年的忙忙碌碌，只为与家人的团团圆圆。", "愿你心想事成，我的好友。", "愿你没有烦恼，幸福快乐，新的一年加油。"
                    ]
                }, {
                    desc: '有你真好',
                    img: require('@/assets/img/08.png'),
                    banner: require('@/assets/gif/08.gif'),
                    textArray: ["谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。", "我最亲爱的，新年快乐。", "好久不见，你最近可好？ 愿你永远充满童心、快乐。",
                        "美好的小生活一直有，简单的快乐永存留。", "谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。", "新的一年希望你快快乐乐。",
                        "一年的忙忙碌碌，只为与家人的团团圆圆。", "愿你没有烦恼，幸福快乐，新的一年加油。", "你就是我的小确幸。"
                    ]
                }, {
                    desc: '暖在一起',
                    img: require('@/assets/img/09.png'),
                    banner: require('@/assets/gif/09.gif'),
                    textArray: ["无论严寒几多，温暖流淌在每一个有你的瞬间。", "我的温柔只发生在每一个有你的时刻。", "我最亲爱的，新年快乐。",
                        "好久不见，你最近可好？ 愿你永远充满童心、快乐。", "美好的小生活一直有，简单的快乐永存留。", "谢谢亲爱的，谢谢我们能相遇，希望我们一直这么幸福下去。",
                        "新的一年希望你快快乐乐。", "一年的忙忙碌碌，只为与家人的团团圆圆。", "愿你没有烦恼，幸福快乐，新的一年加油。", "你就是我的小确幸。"
                    ]
                }, {
                    desc: '相伴一生',
                    img: require('@/assets/img/10.png'),
                    banner: require('@/assets/gif/10.gif'),
                    textArray: ["淡然执手度清平, 山盟不弃白发生。", "我能想到最好的事情，就是和你白头到老。", "愿你没有烦恼，幸福快乐，新的一年加油。", "你就是我的小确幸。",
                        "累不累，都可以常回家看看。祝幸福美满，阖家团圆。", "一年的忙忙碌碌，只为与家人的团团圆圆。", "祝愿身体健康，幸福快乐。"
                    ]
                }, {
                    desc: '团圆美满',
                    img: require('@/assets/img/11.png'),
                    banner: require('@/assets/gif/11.gif'),
                    textArray: ["一年的忙忙碌碌，只为与家人的团团圆圆。", "我最亲爱的，新年快乐。", "美好的小生活一直有，简单的快乐永存留。", "新的一年希望你快快乐乐。",
                        "一年的忙忙碌碌，只为与家人的团团圆圆。", "愿你没有烦恼，幸福快乐，新的一年加油。", "幸福就是吃着火锅唱着歌。",
                        "累不累，都可以常回家看看。祝幸福美满，阖家团圆。"
                    ]
                }],
                highLightIndex: 0, // 当前选中的索引
                textIndex: 0, // 当前祝福语的索引 每次更换高亮时变回0
                curText: '', // 当前修改的祝福语。如果为空说明未做修改，使用默认的
                resultData: {},
                moveContainer: true,
                sureButton: true,
                wishButtonShow:true,
                envelopeData: '', // 信封的base64数据
                name: '脚皮哥'
            };
        },
        computed: {
            wishText: {
                get() {
                    const {
                        textArray
                    } = this.curConfig;
                    return textArray[this.textIndex];
                },
                set(newValue) {
                    this.curText = newValue;
                }
            },
            curConfig() {
                return this.moveConfig[this.highLightIndex];
            },
            curContentImg() {
                return this.moveConfig[this.highLightIndex].banner;
            }
        },
        methods: {
            highLight(i) {
                if (i != this.highLightIndex) {
                    this.textIndex = 0;
                    this.highLightIndex = i;
                    this.curText = '';
                }
            },
            changeWish() {
                if (this.textIndex == this.curConfig.textArray.length - 1) {
                    this.textIndex = 0;
                } else {
                    this.curText = '';
                    this.textIndex++;
                }
            },
            createQRcode(url) {
                const qrCache = document.getElementsByClassName("qrcode-cache")[0];
                new QRCode(qrCache, {
                    text: url,
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                const canvasCache = qrCache.getElementsByTagName('canvas')[0];
                const qrImg = this.toImage(canvasCache);
                const qrcode = document.getElementsByClassName("qrcode")[0];
                qrcode.style.backgroundImage = 'url(' + qrImg + ')';
            },
            createEnvelopeCapture() {
                const m = document.getElementsByClassName('transform-mask')[0];
                // const qrcode=document.getElementsByClassName('qrcode')[0];
                // const q=document.getElementsByClassName('m')[0];
                // qrcode.style.transform = 'scale(2)';
                // q.style.transform = 'scale(2)';
                m.style.transform = 'scale(2)';
                this.html2canvas(m).then((canvas) => {
                    const img = this.toImage(canvas);
                    this.envelopeData = img;
                });
            },
            toImage(canvas) {
                return canvas.toDataURL();
            },
            createCard() {
                this.showEnvelope();
                // this.recordData();
                // this.addToQRcode();
                // this.createEnvelopeCapture();
                this.hideElm();
            },
            recordData() {
                if (this.curText == '') {
                    this.resultData.wishText = this.wishText
                } else {
                    this.resultData.wishText = this.curText;
                }
                this.resultData.bannerIndex = this.highLightIndex;
            },
            addToQRcode() {
                // 拼接数据生成二维码
                let location = window.location.href;
                // location+='?'+this.resultData.wishText+'|'+this.resultData.bannerIndex;
                this.createQRcode(location);
            },
            hideElm() { // 隐藏相关元素
                this.moveContainer = false;
                this.sureButton = false;
                this.wishButtonShow=false;
            },
            showEnvelope() { // 显示信封
                const envelopeBottom=document.getElementsByClassName('envelope-bottom')[0];
                const envelopeTop=document.getElementsByClassName('envelope-top')[0];
                envelopeBottom.style.display='block';
                envelopeTop.style.display='block';
                setTimeout(()=>{
                    envelopeBottom.style.transform='translate3d(-50%,-60vh,0)';
                    envelopeTop.style.transform='translate3d(-50%,-60vh,0)';
                },0)

                const letter=document.getElementsByClassName('main-container')[0];
                envelopeBottom.addEventListener('transitionend',()=>{
                    letter.style.transform='translate3d(0,14vh,0)';
                })

                const envelopeAnimation=document.getElementsByClassName('envelope-animation')[0];
                letter.addEventListener('transitionend',()=>{
                    envelopeAnimation.style.display='block';
                    envelopeTop.style.display='none';
                    setTimeout(()=>{
                        envelopeAnimation.style.transform='translate3d(-50%,0,0) rotateX(-180deg)';
                    },0)
                })

            }
        },
        mounted() {

        }
    };

</script>

<style lang='scss'>
    @import '../assets/scss/extend.scss';
    .wrap {
        width: 100vw;
        height: 100vh;
        @extend .b-cover;
        background-image: url('../assets/img/start-bg.png');
        overflow: hidden;
    }

    .main-container {
        width: tr(516);
        height: tr(723);
        margin: vh(100) auto vh(32);
        position: relative;
        z-index: 5;
        box-sizing: border-box;
        border: .04rem solid #fff;
        border-radius: .1rem;
        overflow: hidden;
        transition: transform .6s ease-in-out;
        .main-img {
            width: 100%;
            height: 100%;
            @extend .b-cover;
            position: absolute;
        }

        .main-text-container {
            font-weight: bold;
            color: #fff;
            font-size: .14rem;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: tr(160);
            background-color: rgba(0, 0, 0, .5);
            padding-left: tr(25);
            padding-right: tr(30);
            box-sizing: border-box;
        }
        .wish-author{
            color: RGB(173,173,172);
            margin-top: vh(14);
            margin-bottom: vh(10);
        }
        .wish-text {
            display: block;
            width: 100%;
            background: rgba(0, 0, 0, 0);
            outline: none;
            border: none;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            padding: 0;
            padding-bottom: .1rem;
        }
        .change-wish {
            position: absolute;
            top: tr(14);
            right: tr(23);
            width: tr(123);
            height: tr(42);
            @extend .b-contain;
            background-image: url('../assets/img/start-change.png');
        }
    }

    .move-container {
        font-size: .12rem;
        display: flex;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        color: #fff;
        li {
            margin: 0 tr(27);
        }
        i {
            border-radius: .04rem;
            width: tr(107);
            height: tr(107);
            display: block;
            @extend .b-contain;
            margin-bottom: tr(10);
        }
        li {
            display: inline-block;
            text-align: center;
        }
        i::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            border: .01rem solid #fff;
            border-radius: .04rem;
            box-sizing: border-box;
        }
        .high-light::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            border: .01rem solid RGB(213, 227, 106);
            border-radius: .04rem;
            box-sizing: border-box;
        }
    }

    .sure-button {
        margin: vh(50) auto 0;
        width: tr(463);
        height: tr(88);
        font-size: 16px;
        @extend .b-contain;
        background-image: url('../assets/img/start-button.png');
    }

    .save-envelope {
        width: 2rem;
        height: 2rem;
        @extend .b-contain;
    }

    .envelope-bottom{
        display: none;
        width: tr(558);
        height: tr(756);
        @extend .b-cover;
        background-image: url('../assets/img/envelope-bottom.png');
        position: absolute;
        z-index: 10;
        top: 80vh;
        left: 50%;
        transform: translate3d(-50%,0,0);
        transition: transform 1.2s ease-in-out;
    }

    .envelope-top{
        display: none;
        width: tr(558);
        height: tr(550);
        @extend .b-cover;
        background-position: top center;
        background-image: url('../assets/img/envelope-top.png');
        position: absolute;
        z-index: 1;
        top: 60vh;
        left: 50%;
        transform: translate3d(-50%,0,0);
        transition: transform 1.2s ease-in-out;
    }

    .envelope-animation{
        display: none;
        width: tr(558);
        height: 1.5rem;
        position: absolute;
        z-index: 100;
        top: -3vh;
        left: 50%;
        transform: translate3d(-50%,0,0) rotateX(0deg);
        transform-origin: bottom;
        @extend .b-cover;
        background-image: url('../assets/img/envelope-top.png');
        background-position-y:top;
        transition: transform .8s ease-in-out;
    }

    .transform-bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -998;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
    }

    .transform-mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -999;
        .m {
            width: 2rem;
            height: 2rem;
            @extend .b-contain;
            background-image: url('../assets/img/mask.png');
        }
        .qrcode {
            position: absolute;
            top: 0;
            left: 0;
            width: .6rem;
            height: .6rem;
            @extend .b-contain;
            margin-left: .7rem;
            margin-top: .7rem;
        }
        .qrcode-cache {
            display: none;
        }
    }

</style>

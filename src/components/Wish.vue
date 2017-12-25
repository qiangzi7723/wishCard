<template>
    <section class='wish-wrap'>

        <div class='top-logo'></div>
        <div class='bottom-tip'>来自{{name}}的祝福</div>
        <router-link to='/start' tag='div' class='jump'></router-link>

        <!-- 信封以及其动画 -->
        <section class='envelope-bottom'></section>
        <section class='envelope-top'></section>
        <section class='envelope-animation'>
            <i class='envelope-img'></i>
            <span class='envelope-name'>{{name}}</span>
        </section>
        <section class='envelope-open' @click='envelopeOpen'></section>

        <!-- 信封内容 -->
        <section class='main-container'>
            <div :style="{backgroundImage:'url('+ curContentImg +')'}" class='main-img'></div>
            <div class='main-text-container'>
                <div class='wish-author'>来自{{name}}的心愿：</div>
                <textarea class='wish-text' v-model='wishText'></textarea>
            </div>
        </section>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                curContentImg: require('@/assets/gif/08.gif'),
                name: window.wish.name,
                wishText: window.wish.wishText
            }
        },
        methods: {
            envelopeOpen() {
                const envelopeTop = document.getElementsByClassName('envelope-top')[0];
                const envelopeAnimation = document.getElementsByClassName('envelope-animation')[0];
                const envelopeBottom = document.getElementsByClassName('envelope-bottom')[0];
                const envelopeOpenButton = document.getElementsByClassName('envelope-open')[0];
                const envelopeName = document.getElementsByClassName('envelope-name')[0];
                const envelopeImg=document.getElementsByClassName('envelope-img')[0];

                envelopeOpenButton.style.display = 'none';
                envelopeAnimation.style.transform = 'translate3d(-50%,0,0)';

                setTimeout(() => {
                    envelopeImg.style.display='none';
                    envelopeName.style.display = 'none';
                }, 600)

                // 信封动画
                envelopeAnimation.addEventListener('transitionend', () => {
                    envelopeAnimation.style.zIndex = '4';
                    envelopeAnimation.style.top = '-11vh';

                    envelopeBottom.style.cssText += 'transform:translate3d(-50%,120vh,0);';
                    envelopeTop.style.cssText +=
                        'transform:translate3d(-50%,120vh,0) rotateX(-180deg);';
                    envelopeAnimation.style.cssText += 'transform:translate3d(-50%,120vh,0);';

                    // 渐变消失动画
                    // envelopeBottom.style.cssText += 'transform:translate3d(-50%,120vh,0);opacity:0;';
                    // envelopeTop.style.cssText +=
                    //     'transform:translate3d(-50%,120vh,0) rotateX(-180deg);opacity:0;';
                    // envelopeAnimation.style.cssText += 'transform:translate3d(-50%,120vh,0);opacity:0;';
                })

                //
                envelopeTop.addEventListener('transitionend',()=>{
                    const tip=document.getElementsByClassName('bottom-tip')[0];
                    tip.style.display='none';

                    const jump=document.getElementsByClassName('jump')[0];
                    jump.style.display='block';
                    setTimeout(()=>{
                        jump.style.opacity=1;
                    },0)

                })
            },
        }
    };

</script>

<style lang='scss'>
    @import '../assets/scss/extend.scss';
    .wish-wrap {
        width: 100vw;
        height: 100vh;
        @extend .b-cover;
        background-image: url('../assets/img/start-bg.png');
        overflow: hidden;

        .top-logo {
            width: tr(196);
            height: tr(45);
            margin: vh(86) auto 0;
            @extend .b-contain;
            background-image: url('../assets/img/top-logo.png');
        }

        .bottom-tip{
            font-size: 16px;
            color: RGB(109,112,103);
            position: absolute;
            top: vh(1073);
            left: 50%;
            transform: translate3d(-50%,0,0);
        }

        .jump{
            display: none;
            opacity: 0;
            width: tr(464);
            height: tr(90);
            position: absolute;
            top: vh(1023);
            left: 50%;
            transform: translate3d(-50%,0,0);
            @extend .b-contain;
            background-image: url('../assets/img/wish-button.png');
            transition: opacity .8s linear;
        }

        .envelope-bottom {
            width: tr(579);
            height: tr(800);
            @extend .b-cover;
            background-image: url('../assets/img/envelope-bottom.png');
            position: absolute;
            z-index: 10;
            top: vh(192);
            left: 50%;
            transform: translate3d(-50%, 0, 0);
            transition: all 1.2s ease-in-out;
        }

        .envelope-animation {
            width: tr(579);
            height: vh(346);
            @extend .b-cover;
            background-position: top center;
            background-image: url('../assets/img/envelope-animation.png');
            position: absolute;
            z-index: 1001;
            top: vh(-136);
            left: 50%;
            transform: translate3d(-50%, 0, 0) rotateX(-180deg);
            transform-origin: bottom;
            transition: transform 1.2s ease-in-out;
            text-align: center;
        }

        .envelope-img {
            display: block;
            position: absolute;
            top: 10vh;
            left: 50%;
            width: tr(176);
            height: tr(176);
            border-radius: 50%;
            border: 2px solid #fff;
            @extend .b-contain;
            background-image: url('../assets/img/21130690.png');
            transform: translate3d(-50%,0,0) rotateX(-180deg);
        }

        .envelope-name {
            display: block;
            position: absolute;
            top: 5vh;
            left: 50%;
            color: RGB(100, 82, 69);
            font-size: 16px;
            transform: translate3d(-50%,0,0) rotateX(-180deg);
        }


        .envelope-top {
            width: tr(579);
            height: tr(350);
            @extend .b-cover;
            background-position: top center;
            background-image: url('../assets/img/envelope-top.png');
            position: absolute;
            z-index: 1;
            top: vh(210);
            left: 50%;
            transform: translate3d(-50%, 0, 0) rotateX(-180deg);
            transform-origin: center;
            transition: all 1.2s ease-in-out;
        }

        .envelope-open {
            width: tr(155);
            height: tr(165);
            @extend .b-contain;
            background-image: url('../assets/img/envelope-open.png');
            position: absolute;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
            top: vh(709);
            z-index: 101;
        }

        .main-container {
            width: tr(516);
            height: tr(723);
            position: absolute;
            z-index: 5;
            top: vh(210);
            left: 50%;
            transform: translate3d(-50%, 0, 0);
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
            .wish-author {
                color: RGB(173, 173, 172);
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
    }

</style>

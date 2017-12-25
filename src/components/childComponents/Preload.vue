<template>
    <section class='preload-wrap'>
        <div class='preload-bar'>
            <div class='bar'></div>
        </div>
    </section>
</template>

<script>
    import config from '@/config/config'
    export default {
        data() {
            return {
                loaded: 0,
                totalLen: '',
            }
        },
        mounted() {
            this.preloadImg();
            this.preloadAudio();
        },
        methods: {
            preloadImg() {
                // 资源写在@/config/config.js里
                window.imagesCache = [];
                this.totalLen = config.imgs.length;

                let percentage = 0
                const bar=document.getElementsByClassName('bar')[0];

                config.imgs.forEach((v, i) => {
                    let img = new Image();

                    img.onerror = img.onload = () => {
                        this.loaded++;

                        percentage = this.loaded / this.totalLen

                        // 因为ios没法正确触发音乐的canplaythrough方法，所以进度只算图片进度。
                        // 向父组件抛出进度事件
                        this.$emit('percentage', percentage);
                        bar.style.width=percentage*100+'%';

                        if (this.loaded >= this.totalLen) {
                            // 向父组件抛出加载完成事件
                            this.$emit('loaded', percentage);
                        }
                    }

                    // 这写法略微有点奇怪。按理来说require只能传入字符串，不能传变量。但是下面的写法又是可以的。所以将就着用着
                    img.src = require('@/assets/' + v);
                    window.imagesCache[i] = img;
                })
            },
            preloadAudio() {
                window.audioCache = [];
                config.audios.forEach((v, i) => {
                    let audio = new Audio();

                    audio.addEventListener('canplaythrough', () => {
                        audio.play();
                        audio.pause();
                    }, false)
                    document.addEventListener('WeixinJSBridgeReady', () => {
                        audio.play();
                        audio.pause();
                    }, false)

                    audio.src = require('@/assets/' + v);
                    window.audioCache[i] = audio;
                })

            }
        }
    }

</script>

<style lang="scss">
    @import '../../assets/scss/extend.scss';
    .preload-wrap{
        width: 100vw;
        height: 100vh;
        background-image: url('../../assets/img/start-bg.png');
        @extend .b-cover;
        .preload-bar{
            position: absolute;
            top: vh(704);
            left: 50%;
            transform: translate3d(-50%,0,0);
            width: tr(501);
            height: tr(20);
            background-color: #fff;
            border-radius: .2rem;
        }
        .bar{
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            border-radius: .2rem;
            background-color: RGB(64,192,159);
        }
    }
</style>

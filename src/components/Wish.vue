<template>
    <section class='wish-wrap'>
        <section class='envelope-bottom'></section>
        <section class='envelope-top'></section>
        <section class='envelope-animation'></section>
        <section class='envelope-open' @click='envelopeOpen'></section>
    </section>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            envelopeOpen(){
                const envelopeTop=document.getElementsByClassName('envelope-top')[0];
                const envelopeAnimation=document.getElementsByClassName('envelope-animation')[0];

                envelopeAnimation.style.transform='translate3d(-50%,0,0)';
            }
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
            transition: transform 1.2s ease-in-out;
        }

        .envelope-animation {
            width: tr(579);
            height: tr(350);
            @extend .b-cover;
            background-position: top center;
            background-image: url('../assets/img/envelope-animation.png');
            position: absolute;
            z-index: 100;
            top: vh(-136);
            left: 50%;
            transform: translate3d(-50%, 0, 0) rotateX(-180deg);
            transform-origin: bottom;
            transition: transform 1.2s ease-in-out;
        }

        .envelope-top{
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
            transition: transform 1.2s ease-in-out;
        }

        .envelope-open{
            width: tr(155);
            height: tr(165);
            @extend .b-contain;
            background-image: url('../assets/img/envelope-open.png');
            position: absolute;
            left: 50%;
            transform: translate3d(-50%,0,0);
            top: vh(709);
            z-index: 101;
        }
    }

</style>

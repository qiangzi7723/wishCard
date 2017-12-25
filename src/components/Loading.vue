<template>
    <section>
        <vue-preload @percentage="percentage" @loaded="loaded"></vue-preload>
    </section>
</template>

<script>
    import VuePreload from '@/components/childComponents/Preload';

    export default {
        data() {
            return {
                path: 'start'
            }
        },
        components: {
            VuePreload
        },
        mounted() {
            const sp = window.location.href.split('_id=');
            if (sp.length > 1) {
                const _id = sp[1];
                this.path = 'wish';
                this.axios({
                    method: 'get',
                    url: 'http://api.24haowan.com/get_info?info_id=' + _id,
                }).then((data) => {
                    const res = data.data.msg[0].content;
                    console.log(res);
                    window.wish = {
                        name: res.name,
                        img: res.img,
                        bannerIndex: res.bannerIndex,
                        wishText: res.wishText
                    }
                })
            }
        },
        methods: {
            percentage(data) {},
            loaded() {
                this.$router.push({
                    path: this.path
                });
            },
        },
    };

</script>

<style lang='scss'>
    @import '../assets/scss/extend.scss';

</style>

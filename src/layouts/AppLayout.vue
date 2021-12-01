<template>
    <div>
        <Header/>
        <div class="clearfix"></div>
        <div class="page">
            <div class="page-content-wrapper">
                <div class="page-content">
                    <section class="banner" v-if="hasBanner">
                        <div class="img-banner">
                            <img src="@frontend/assets/images/banner.png" alt="menu"/>
                        </div>
                    </section>
                    <router-view v-on:changeBanner="handelChangeBanner" @changeModal="handelChangeModal"></router-view>
                </div>
            </div>
        </div>
        <Footer/>
        <div v-if="hasModal" class="modal-backdrop fade in"></div>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            hasBanner: true,
            hasModal: false,
        }
    },
    methods: {
        handelChangeBanner(value) {
            this.hasBanner = value
        },
        handelChangeModal (value) {
            this.hasModal = value
        },
    },
}
</script>
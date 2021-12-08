<template>
    <div>
        <Header/>
        <div class="clearfix"></div>
        <div class="page">
            <div class="page-content-wrapper">
                <div class="page-content mypage">
                    <section class="banner">
                        <div class="img-banner">
                            <img src="@frontend/assets/images/mypage.png" alt="menu"/>
                        </div>
                    </section>
                    <section class="list-content">
                        <div class="container">
                            <div class="page-sidebar-wrapper vetical-menu">
                                <div class="page-sidebar navbar-collapse collapse">
                                    <div class="cnt-side-mypage">
                                        <div class="cnt-mypage">
                                            <h3>Mypage</h3>
                                            <span class="cnt-sub">janken1gdg6scaqe…</span>
                                        </div>
                                        <ul class="page-sidebar-mypage" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                                            <li class="menu-active" :class="classActive('mypage.mint.nft')"><router-link :to="{ name: 'mypage.mint.nft'}">Mint NFT</router-link></li>
                                            <li class="menu-active" :class="classActive('mypage.asset')"><router-link :to="{ name: 'mypage.asset'}">My ASSET</router-link></li>
                                            <li >
                                                <router-link :to="{ name: 'mypage.offers.send'}">Offers</router-link>
                                                <ul>
                                                    <li><router-link :to="{ name: 'mypage.offers.receive'}">Received Offers</router-link></li>
                                                    <li><router-link :to="{ name: 'mypage.offers.send'}">Send Offers</router-link></li>
                                                </ul>
                                            </li>
                                            <li :class="classActive('mypage.battle.result')"><router-link :to="{ name: 'mypage.battle.result'}">Battle Results</router-link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="content-wapper-page">
                                <router-view @changeModal="handelChangeModal"></router-view>
                            </div>
                        </div>
                    </section>
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
            hasModal: false,
        }
    },
    methods: {
        handelChangeModal (value) {
            this.hasModal = value
        },
        classActive(routeName) {
            return this.$route.name == routeName ? 'active' : ''
        }
    },
}
</script>
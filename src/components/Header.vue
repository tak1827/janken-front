<template>
    <div class="header-fix">
        <div class="page-header">
            <div class="page-header-inner">
                <div class="connect-links">
                    <div class="container" v-if="!address">
                        <div class="cnt-link-wallet">
                            <a href="javascript:void(0)" @click="connectWallet">CONNECT WALLET</a>
                        </div>
                    </div>
                    <div class="container" v-else>
                        <div class="cnt-link-wallet">
                            <router-link :to="{ name: 'mypage.asset'}">{{ address }}</router-link>
                        </div>
                    </div>
                </div>
                <div class="logo">
                    <router-link :to="{ name: 'home'}">
                        <img src="@frontend/assets/images/janken.png" alt="menu"/>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {connectWallet} from '@/utils/wallet'
export default {
    data() {
        return {
            address: ''
        }
    },
    mounted() {
        this.getAddress()
    },
    methods: {
        async connectWallet() {
            this.address = await connectWallet()
        },
        getAddress() {
            this.address = localStorage.getItem("address", "");
        }
    }
}
</script>
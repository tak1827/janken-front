<template>
    <div class="home">
        <div class="page-content-wrapper">
            <div class="page-content">
                <div class="connect-link" v-if="!address">
                    <a href="javascript:void(0)" @click="connectWallet">CONNECT WALLET</a>
                </div>
                <div class="connect-link" v-else>
                    <router-link :to="{ name: 'mypage.asset'}">{{ address }}</router-link>
                </div>
                <div class="content-page-home">
                    <div class="cnt-img-logo">
                        <img src="@frontend/assets/images/janken.png" alt="menu" />
                    </div>
                    <div class="cnt-img-title">
                        <img src="@frontend/assets/images/title.png" alt="menu" />
                    </div>
                    <div class="text-bit-nft">
                        <h3>Bit your NFTs or </h3>
                    </div>
                    <ul>
                        <li>
                            <router-link :to="{ name: 'bit.nft'}">
                                Bit Nft
                            </router-link> 
                        </li>
                        <li>
                            <router-link :to="{ name: 'bit.token'}">
                                Bit Token
                            </router-link> 
                        </li>
                    </ul>
                    <!-- .member-main-->
                </div>
            </div>
            <!-- .page-content-->
        </div>
    </div>
</template>
<script>
import { connectWallet, getAddress, mintNft } from '@/utils/wallet'
export default {
    data() {
        return {
            address: ""
        }
    },
    async mounted() {
        this.getAddress()
        // const response = await mintNft(this.getMintNftParam())
        // console.log(response)
    },
    methods: {
        async connectWallet() {
            this.address = await connectWallet()
        },
        getAddress() {
            this.address = getAddress();
        },
        getMintNftParam() {
            return {
                mint_nft: {
                    owner: getAddress(),
                    public_metadata: {
                        token_uri: "https://i.pinimg.com/originals/03/5a/0a/035a0ae23cae101f78259df86c36ae5b.jpg"
                    }
                }
            }
        }
    }
}
</script>


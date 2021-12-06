<template>
    <div class="content-page">
        <ul class="item-mypage" v-for="item in offers" :key="item.offerId">
            <li class="item">
                <div class="title-mypage">MINE</div>
                <Item 
                    :image="item.image"
                    :owner="item.offerorNFT.owner" 
                    :name="item.offerorNFT.name"
                />
            </li>
            <li class="item">
                <div class="item-content">
                    <div class="text-title">Win condition</div>
                    <WinCondition :timeToFight="item.offereeHands.length"/>
                </div>
            </li>
            <li class="item">
                <div class="title-mypage">Opponent's</div>
                <Item 
                    :image="item.image"
                    :owner="item.offereeNFT.owner" 
                    :name="item.offereeNFT.name"
                />
            </li>
        </ul>
    </div>
</template>
<script>
import WinCondition from "@/components/WinCondition.vue"
import Item from '@/components/bit-nft/Item.vue'
import { GET_OFFERS } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
import { getAddress } from '@/utils/wallet'
export default {
    data() {
        return {
            offers: [],
            fetchOffersModule: "fetchOffers"
        }
    },
    components: {
        WinCondition,
        Item
    },
    async mounted() {
        await this.getOffersData()
    },
    methods: {
        handelSendFight(value) {
            console.log(value)
        },
        handelDecline(value) {
            console.log(value)
        },
        async getOffersData() {
            await this.$apollo.query({
                query: GET_OFFERS,
                variables: { 
                    address: getAddress(),
                }
            }).then((response) => {
                const offers = getData(response, this.fetchOffersModule)
                this.offers = offers.find(x => x.offerorNFT.owner == getAddress())
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
    }
}
</script>
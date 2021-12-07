<template>
    <div class="content-page">
        <ul class="item-mypage" v-for="item in offers" :key="item.offerId">
            <li class="item">
                <div class="title-mypage">MINE</div>
                <Item 
                    :image="item.offerorNFT.image"
                    :owner="item.offerorNFT.owner" 
                    :name="item.offerorNFT.name"
                    :id="item.offerorNFT.tokenId"
                />
            </li>
            <li class="item">
                <div class="item-content">
                    <div class="text-title">Win condition</div>
                    <WinCondition :timeToFight="item.offerorHands.length"/>
                </div>
            </li>
            <li class="item">
                <div class="title-mypage">Opponent's</div>
                <Item 
                    :image="item.offereeNFT.image"
                    :owner="item.offereeNFT.owner" 
                    :name="item.offereeNFT.name"
                    :id="item.offereeNFT.tokenId"
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
        async getOffersData() {
            await this.$apollo.query({
                query: GET_OFFERS,
                variables: { 
                    address: getAddress(),
                    type: "SEND"
                }
            }).then((response) => {
                this.offers = getData(response, this.fetchOffersModule)

            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
    }
}
</script>
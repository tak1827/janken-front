<template>
    <div class="content-page">
        <ul class="list-item">
            <li class="item is-content" v-for="item in nfts" v-bind:key="item.tokenId">
                <Item 
                    :id="item.tokenId" 
                    :name="item.name" 
                    :owner="item.owner" 
                    :image="item.image" 
                />
            </li>
        </ul>
    </div>
</template>
<script>
import Item from '@/components/bit-nft/Item.vue'
import { GET_OWNER_NFT } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
import { getAddress } from '@/utils/wallet'
export default {
    data() {
        return {
            nfts: [],
            ownerNFTModule: "fetchNFTsByOwner"
        }
    },
    components: {
        Item
    },
    async mounted() {
        await this.getNftData()
    },
    methods: {
        async getNftData() {
            await this.$apollo.query({
                query: GET_OWNER_NFT,
                variables: { 
                    address: getAddress(),
                }
            }).then((response) => {
                this.nfts = getData(response, this.ownerNFTModule)
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
    }
}
</script>
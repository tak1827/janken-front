<template>
    <section class="list-content">
        <div class="container">
            <div class="page-sidebar-wrapper vetical-menu">
                <div class="page-sidebar navbar-collapse collapse">
                    <ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                        <li class="menu-active">
                            <h3><span class="title">
                                Collection</span></h3>
                            <div class="list-check">
                                <div class="form-check">
                                    <input class="form-check-input" id="exampleCheck1" type="checkbox"/>
                                    <label class="form-check-label" for="exampleCheck1">Hope</label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- .page-sidebar-wrapper-->
            <div class="content-wapper-page">
                <div class="content-page">
                    <ul class="list-item">
                        <li class="item is-content" v-for="item in nfts" v-bind:key="item.token_id">
                            <BitNftItem 
                                :id="item.tokenId" 
                                :name="item.name" 
                                :owner="item.owner" 
                                :image="item.image" 
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <!-- .member-main-->
        </div>
    </section>
</template>

<script>
import BitNftItem from '@/components/bit-nft/Item.vue'
import { defaultData } from '@/utils/constants'
import { getNumOfTokens } from '@/utils/wallet'
import { getErrorMessage, getData } from '@/utils/api_response'
import { GET_ALL_NFT } from '@/utils/graphql'
export default {
    components: {
        BitNftItem,
    },
    data () {
        return {
            items: defaultData,
            meta: {
                all_tokens: {
                    start_after: null,
                    limit: 6
                }
            },
            nfts: [],
            tokens: [],
            page_count: 0,
            numOfTokens: 1,
            allNftModule: "fetchAllNFTs"
        }
    },
    computed: {
        lastTokenId() {
            const length = this.tokens.length
            if(length == 0){
                return null
            }
            return this.tokens[length-1]
        }
    },
    created () {
        this.$emit('changeBanner', true)
    },
    async mounted() {
        this.getNftData()
        await this.getNumOfTokens()
        this.setPageCount()
    },
    methods: {
        clickCallback (pageNum) {
            console.log(pageNum)
        },
        async getNftData() {
            this.$apollo.query({
                query: GET_ALL_NFT,
            }).then((response) => {
                this.nfts = getData(response, this.allNftModule)
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
        async getNumOfTokens() {
            const response = await getNumOfTokens()
            this.numOfTokens = response.num_tokens.count
        },
        setPageCount() {
            this.page_count = Math.round(this.numOfTokens / this.meta.all_tokens.limit)
        }
    }
}
</script>
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
                            <label class="form-check-label" for="exampleCheck1">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck2" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck2">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck3" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck3">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck4" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck4">Axie  Infinity</label>
                        </div>
                        </div>
                    </li>
                    <li class="menu-active">
                        <h3>
                            <span class="title">
                                Collection
                            </span>
                        </h3>
                        <div class="list-check">

                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck1" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck1">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck2" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck2">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck3" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck3">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck4" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck4">Axie  Infinity</label>
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
                        <li class="item is-content" v-for="(item, index) in nfts" v-bind:key="tokens[index]">
                            <BitNftItem 
                                title="item.title"
                                :id="tokens[index]" 
                                name="item.name" 
                                :owner="item.owner" 
                                :image="item.public_metadata.token_uri" 
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
import { getAllTokens, getNumOfTokens, getNftDetail } from '@/utils/wallet'
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
            numOfTokens: 1
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
        await this.getNftData()
        await this.getNumOfTokens()
        this.setPageCount()
    },
    methods: {
        clickCallback (pageNum) {
            console.log(pageNum)
        },
        async getNftData() {
            const response = await getAllTokens(this.meta)
            const tokenList = response.token_list.tokens
            this.tokens = tokenList
            const data = []
            for (const tokenId of tokenList) {
                const nftResponse = await getNftDetail(tokenId)
                if(nftResponse.nft_dossier) {
                    data.push(nftResponse.nft_dossier)
                }
            }
            this.nfts = [...data]
            console.log(this.nfts)
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
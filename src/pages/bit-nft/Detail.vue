<template>
    <section class="list-content-detail">
        <div class="container">
            <div class="content-nft-detail">
                <TagBack :name="data.name"/>
                <div class="content-item-detail">
                    <div class="cnt-detail-left">
                        <Item
                            :image="data.image"
                            :description="data.description"
                            :owner="data.owner"
                            :title="data.name"
                        />
                    </div>
                    <div class="cnt-detai-right">
                        <div class="cnt-detail-top">
                            <h3 class="text-my-nft">{{ nftName }}</h3>
                            <button class="btn btn-chose-nft" @click="showModalNft()">CHOOSE BET NFT</button>
                        </div>
                        <div class="cnt-time">
                            <ul>
                                <UpDownTime
                                    title="Times to fight:"
                                    :value="timeToFight"
                                    state="timeToFight"
                                    @increase="handelIncrease"
                                    @decrease="handelDecrease"
                                />
                                <UpDownTime
                                    title="Draw Points:"
                                    :value="timeToWin"
                                    state="timeToWin"
                                    @increase="handelIncrease"
                                    @decrease="handelDecrease"
                                />
                            </ul>
                        </div>
                        <div class="list-chose-hand">
                            <button class="btn btn-chose-nft" @click="showModalHand()">CHOOSE YOUR HAND</button>
                            <div class="list-hand">
                                <div class="row">
                                    <div class="col-md-4" v-for="counter in timeToFight" v-bind:key="counter">
                                        <Hand :number="counter" :hand="hands[counter - 1]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cnt-send-request" v-if="!isOwner()">
                            <button class="btn btn-chose-nft" @click="sendFightRequest">Send Fight Request</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- .member-main-->
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" ref="modal" id="popup-chose-hand" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" @click="closeModal('modal')"> <span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="btn-chose-popup">
                            <button class="btn btn-chose-nft">CHOOSE YOUR HAND</button>
                        </div>
                        <div class="list-hand list-title-chose">
                            <div class="row">
                                <div class="col-md-4" v-for="hand in handConstant" :key="hand" @click="chooseHand(hand)">
                                    <div class="cnt-detail-hand">
                                        <ImageHand :hand="hand" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="list-hand">
                             <h3>Your choose</h3>
                            <div class="row">
                                <div class="col-md-4" v-for="counter in timeToFight" v-bind:key="counter">
                                    <Hand :number="counter" :hand="handInModal[counter - 1]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-chose-nft" @click="confirmHand">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" ref="modal-nft" id="popup-chose-hand-update" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" @click="closeModal('modal-nft')"> <span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="btn-chose-popup">
                            <button class="btn btn-chose-nft">CHOOSE BET NFT</button>
                        </div>
                        <div class="list-hand">
                             <h3>Your choose</h3>
                            <div class="row">
                                <div class="col-md-4" v-for="item in nfts" v-bind:key="item.tokenId" @click="chooseNft(item.tokenId)">
                                    <div class="item is-content" :class="activeClass(item.tokenId)" >
                                        <Item
                                            :id="item.tokenId"
                                            :title="item.name"
                                            :owner="item.owner"
                                            :image="item.image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-chose-nft" @click="confirmNft">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import TagBack from '@/components/TagBack.vue'
import UpDownTime from '@/components/UpDownTime.vue'
import Hand from '@/components/Hand.vue'
import Item from '@/components/bit-nft-detail/Item.vue'
import ImageHand from '@/components/ImageHand.vue'
import { defaultData, HAND } from '@/utils/constants'
import { GET_NFT_DETAIL, GET_OWNER_NFT, MAKE_OFFER } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
import { getAddress, makeOffer, appoveToken, getRandomID, connectWallet } from '@/utils/wallet'
export default {
    components: {
        TagBack,
        Item,
        UpDownTime,
        Hand,
        ImageHand,
    },
    data () {
        return {
            items: defaultData,
            data: {},
            id: this.$route.params.id.toString(),
            timeToFight: 0,
            timeToWin: 0,
            hands: [],
            handInModal: [],
            handConstant: HAND,
            fetchNftModule: "fetchNFT",

            nfts: [],
            nftName: "Select your NFT",
            tokenId: "",
            tokenIdInModal: "",
            ownerNFTModule: "fetchNFTsByOwner"
        }
    },
    created () {
        this.$emit('changeBanner', false)
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData() {
            let loader = this.$loading.show({
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                });
            await this.$apollo.query({
                query: GET_NFT_DETAIL,
                variables: {
                    tokenId: this.id,
                }
            }).then((response) => {
                this.data = getData(response, this.fetchNftModule)
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
            loader.hide()
        },
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
        async makeOffer(offerId, offeror, offeree, offerorNFTTokenId, offereeNFTTokenId, offerorHands, drawPoint) {
            this.$apollo.mutate({
                mutation: MAKE_OFFER,
                variables: {
                    offerId: offerId,
                    offeror: offeror,
                    offeree: offeree,
                    offerorNFTTokenId: offerorNFTTokenId,
                    offereeNFTTokenId: offereeNFTTokenId,
                    offerorHands: offerorHands,
                    drawPoint: drawPoint
                }
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
        handelIncrease(state) {
            if(state == "timeToWin") {
                if(this[state] == this.timeToFight) {
                    this.$toast.error("Draw Points must lower or equal to time to fights");
                    return
                }
            }
            this[state] += 1
        },
        handelDecrease(state) {
            this[state] -= 1
        },
        showModalHand() {
            if(!this.isSelectTimes()) {
                this.$toast.error("You must choose times to fight and Draw Points");
                return
            }
            this.handInModal = [...this.hands]
            this.showModal("modal")
        },
        async showModalNft() {
            try {
                await connectWallet()
                await this.getNftData()
                this.tokenIdInModal = this.tokenId
                this.showModal("modal-nft")
            } catch (error) {
                this.$toast.error(error.message);
            }
        },
        showModal(ref) {
            this.$refs[ref].classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs[ref].style.display = "block"
            this.$emit("changeModal", true)
        },
        closeModal(ref) {
            this.$refs[ref].classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs[ref].style.display = ""
            this.$emit("changeModal", false)
        },
        isSelectTimes() {
            if(this.timeToFight == 0 || this.timeToWin == 0){
                return false
            }
            return true
        },
        isSelectNft() {
            return this.tokenIdInModal !== ""
        },
        isSelectHand() {
            return this.hands.length != 0
        },
        chooseHand(hand) {
            if(this.handInModal.length == this.timeToFight){
                this.$toast.error("You haven choosen enough hand");
                return
            }
            this.handInModal.push(hand)
        },
        confirmHand() {
            this.hands = [...this.handInModal]
            this.closeModal('modal')
        },
        chooseNft(tokenId) {
            this.tokenIdInModal = tokenId
        },
        confirmNft() {
            this.tokenId = this.tokenIdInModal
            const result = this.nfts.find( ({ tokenId }) => tokenId === this.tokenIdInModal );
            this.nftName = result.name
            this.closeModal('modal-nft')
        },
        async sendFightRequest() {
            if(!this.isSelectTimes()) {
                this.$toast.error("You must choose times to fight and Draw Points");
                return
            }

            if(!this.isSelectHand()) {
                this.$toast.error("You must choose hands");
                return
            }

            if(!this.isSelectNft()) {
                this.$toast.error("You must choose bet nft");
                return
            }

            let loader = this.$loading.show({
                container: this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });
            try {
                const tokenId = this.tokenId.toString()
                const offerId = await getRandomID()
                await appoveToken(tokenId)
                await makeOffer(offerId, this.data.owner, tokenId, this.id, this.hands, this.timeToWin)
                await this.makeOffer(offerId, getAddress(), this.data.owner, tokenId, this.id, this.hands, this.timeToWin)
                this.resetForm()
                this.$toast.success('Send fight request success')
            } catch(error) {
                this.$toast.error(error.message);
            }
            loader.hide()
        },
        activeClass(tokenId) {
            return tokenId == this.tokenIdInModal ? "active" : ""
        },
        resetForm() {
            this.timeToFight = 0
            this.timeToWin= 0
            this.hands= []
            this.handInModal= []
            this.handConstant= HAND
            this.nfts= []
            this.tokenId= ""
            this.tokenIdInModal= ""
        },
        isOwner() {
            return getAddress() == this.data.owner
        }
    }
}
</script>

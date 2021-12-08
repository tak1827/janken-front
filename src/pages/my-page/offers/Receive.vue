<template>
    <div class="content-page">
        <ul class="item-mypage" v-for="item in offers" :key="item.offerId">
            <li class="item">
                <div class="title-mypage">MINE</div>
                <Item 
                    :image="item.offereeNFT.image"
                    :owner="item.offereeNFT.owner" 
                    :name="item.offereeNFT.name"
                    :id="item.offereeNFT.tokenId"
                />
            </li>
            <li class="item">
                <div class="item-content">
                    <div class="text-title">Win condition</div>
                    <WinCondition :timeToFight="item.offerorHands.length" :timeToWin="item.drawPoint"/>
                    <div class="cnt-send-request">
                        <button class="btn btn-chose-nft" @click="handelSendFight(item.offerId)">Send Fight Request</button>
                    </div>
                    <div class="cnt-btn-decline">
                        <button class="btn btn-dicline"  @click="handelDecline(item.offerId)">Decline</button>
                    </div>
                </div>
            </li>
            <li class="item">
                <div class="title-mypage">Opponent's</div>
                <Item 
                    :image="item.offerorNFT.image"
                    :owner="item.offerorNFT.owner" 
                    :name="item.offerorNFT.name"
                    :id="item.offerorNFT.tokenId"
                />
            </li>
        </ul>
        <div class="modal modal-dialog-centered fade popup_customer" ref="modal" id="popup-chose-hand" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" @click="closeModal"> <span>&times;</span></button>
                    </div>
                    <div class="modal-body" ref="formContainer">
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
    </div>
</template>
<script>
import WinCondition from "@/components/WinCondition.vue"
import Item from '@/components/bit-nft/Item.vue'
import Hand from '@/components/Hand.vue'
import ImageHand from '@/components/ImageHand.vue'
import { GET_OFFERS, ACCEPT_OFFER, DECLINE_OFFER } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
import { HAND } from '@/utils/constants'
import { getAddress, appoveToken, acceptOffer, declineOffer } from '@/utils/wallet'
export default {
    data() {
        return {
            offers: [],
            fetchOffersModule: "fetchOffers",
            handInModal: [],
            handConstant: HAND,
            timeToFight: 0,
            tokenId: "",
            offerId: "",
            fullPage: true
        }
    },
    components: {
        WinCondition,
        Item,
        Hand,
        ImageHand
    },
    async mounted() {
        await this.getOffersData()
    },
    methods: {
        handelSendFight(offerId) {
            const [offerDetail] = this.offers.filter(x => x.offerId == offerId)
            if(offerDetail == undefined) {
                this.$toast.error("Can not find offer")
                return
            }
            this.offerId = offerDetail.offerId
            this.tokenId = offerDetail.offereeNFT.tokenId
            this.timeToFight = offerDetail.offerorHands.length
            this.showModal()
            
        },
        async handelDecline(offerId) {
            if(confirm("Do you want to decline this offerr?")) {

                let loader = this.$loading.show({
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                });
                try {
                    await declineOffer(offerId)
                    await this.declineOffer(offerId)
                    this.removeOffer(offerId)
                    this.$toast.success('Success to decline')
                } catch(error) {
                    this.$toast.error(error.message);
                }
                loader.hide()
            }
        },
        async getOffersData() {
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });
            await this.$apollo.query({
                query: GET_OFFERS,
                variables: { 
                    address: getAddress(),
                    type: "RECEIVE"
                }
            }).then((response) => {
                this.offers = getData(response, this.fetchOffersModule)
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
            loader.hide()
        },
        showModal() {
            this.handInModal = []
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display="block"
            this.$emit("changeModal", true)
        },
        closeModal() {
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display=""
            this.$emit("changeModal", false)
        },
        chooseHand(hand) {
            if(this.handInModal.length == this.timeToFight){
                this.$toast.error("You haven choosen enough hand");
                return
            }
            this.handInModal.push(hand)
        },
        async acceptOffer(offerId, hands) {
            this.$apollo.mutate({
                mutation: ACCEPT_OFFER,
                variables: {
                    offerId: offerId,
                    offereeHands: hands,
                }
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
        async declineOffer(offerId) {
            await this.$apollo.mutate({
                mutation: DECLINE_OFFER,
                variables: {
                    offerId: offerId,
                }
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
            
        },
        async confirmHand() {
            let loader = this.$loading.show({
                container: this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });
            try {
                const tokenId = this.tokenId.toString()
                await appoveToken(tokenId)
                await acceptOffer(this.offerId, this.handInModal)
                await this.acceptOffer(this.offerId, this.handInModal)
                this.removeOffer(this.offerId)
                this.$toast.success('Send fight request success')
                this.closeModal()
            } catch(error) {
                this.$toast.error(error.message);
            }
            loader.hide()
        },
        removeOffer(offerId) {
            this.offers = this.offers.filter(x => x.offerId != offerId)
        }
    }
}
</script>
<template>
    <div class="content-page">
        <ul class="item-mypage" v-for="item in offers" :key="item.offerId">
            <li class="item">
                <div class="title-mypage">MINE</div>
                <Item 
                    owner="janken1gdg6scaqe..." 
                    name="Axie Infinity"
                />
            </li>
            <li class="item">
                <div class="item-content">
                    <div class="text-title">Win condition</div>
                    <WinCondition/>
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
                    owner="janken1gdg6scaqe..." 
                    name="Axie Infinity"
                />
            </li>
        </ul>
        <div class="modal modal-dialog-centered fade popup_customer" ref="modal" id="popup-chose-hand" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" @click="closeModal"> <span>&times;</span></button>
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
    </div>
</template>
<script>
import WinCondition from "@/components/WinCondition.vue"
import Item from '@/components/bit-nft/Item.vue'
import Hand from '@/components/Hand.vue'
import ImageHand from '@/components/ImageHand.vue'
import { GET_OFFERS } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
import { HAND } from '@/utils/constants'
// import { getAddress } from '@/utils/wallet'
export default {
    data() {
        return {
            offers: [],
            fetchOffersModule: "fetchOffers",
            hands: [],
            handInModal: [],
            handConstant: HAND,
            timeToFight: 0
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
            const offerDetail = this.offers.find(x => x.offerId == offerId)
            if(offerDetail == undefined) {
                this.$toast.error("Can not find offer")
                return
            }
            this.timeToFight = offerDetail.offerorHands.length
            this.showModal()
            console.log(offerId)
        },
        handelDecline(value) {
            console.log(value)
        },
        async getOffersData() {
            await this.$apollo.query({
                query: GET_OFFERS,
                variables: { 
                    address: "secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv",
                }
            }).then((response) => {
                this.offers = getData(response, this.fetchOffersModule)
                // this.offers = offers.find(x => x.offereeNFT.owner == getAddress())
                console.log(this.offers)
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
        showModal() {
            this.handInModal = [...this.hands]
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
        confirmHand() {
            this.hands = [...this.handInModal]
            this.closeModal()
        },
    }
}
</script>
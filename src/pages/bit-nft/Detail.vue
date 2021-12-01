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
                            :title="data.title"
                        />
                    </div>
                    <div class="cnt-detai-right">
                        <div class="cnt-detail-top">
                            <h3 class="text-my-nft">MyOriginalNFT fuga</h3>
                            <button class="btn btn-chose-nft">CHOOSE BIT NFT</button>
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
                                    title="Times to win:"
                                    :value="timeToWin"
                                    state="timeToWin"
                                    @increase="handelIncrease"
                                    @decrease="handelDecrease"
                                />
                            </ul>
                        </div>
                        <div class="list-chose-hand">
                            <button class="btn btn-chose-nft" @click="showModal">CHOOSE BIT NFT</button>
                            <div class="list-hand">
                                <div class="row">
                                    <div class="col-md-4" v-for="counter in timeToFight" v-bind:key="counter">
                                        <Hand :number="counter" :hand="hands[counter - 1]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cnt-send-request">
                            <button class="btn btn-chose-nft">Send Fight Request</button>
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
                        <button class="close" type="button" @click="closeModal"> <span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="btn-chose-popup">
                            <button class="btn btn-chose-nft">CHOOSE BIT NFT</button>
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
    </section>
</template>
<script>
import TagBack from '@/components/TagBack.vue'
import UpDownTime from '@/components/UpDownTime.vue'
import Hand from '@/components/Hand.vue'
import Item from '@/components/bit-nft-detail/Item.vue'
import ImageHand from '@/components/ImageHand.vue'
import { defaultData, HAND } from '@/utils/constants'
export default {
    components: {
        TagBack,
        Item,
        UpDownTime,
        Hand,
        ImageHand
    },
    data () {
        return {
            items: defaultData,
            data: {},
            id: this.$route.params.id,
            timeToFight: 0,
            timeToWin: 0,
            hands: [],
            handInModal: [],
            handConstant: HAND
        }
    },
    created () {
        this.$emit('changeBanner', false)
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData() {
            this.data = this.items.find(x => x.id == this.id)
        },
        handelIncrease(state) {
            this[state] += 1
        },
        handelDecrease(state) {
            this[state] -= 1
        },
        showModal() {
            if(!this.isSelectTimes()) {
                alert("You must choose times to find and times to wins");
                return
            }
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
        isSelectTimes() {
            if(this.timeToFight == 0 || this.timeToWin == 0){
                return false
            }
            return true
        },
        chooseHand(hand) {
            if(this.handInModal.length == this.timeToFight){
                alert("You haven choosen enough hand");
                return
            }
            this.handInModal.push(hand)
        },
        confirmHand() {
            this.hands = [...this.handInModal]
            this.closeModal()
        }
    }
}
</script>
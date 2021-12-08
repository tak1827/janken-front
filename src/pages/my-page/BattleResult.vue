<template>
    <div class="content-page">
        <ul class="item-mypage" v-for="item in data" :key="item.offerId">
            <li class="item">
                <div class="title-mypage">MINE</div>
                <Item 
                    :id="item.mine.tokenId"
                    :owner="item.mine.owner" 
                    :name="item.mine.name"
                    :image="item.mine.image"
                />
            </li>
            <li class="item">
                <div class="item-content">
                    <div class="text-title">Win condition</div>
                    <WinCondition :timeToFight="item.offerorHands.length" :timeToWin="getDrawPoint(item)" />
                    <a href="javascript:void(0)">
                        <ImageResult v-if="!isDecline(item)" :item="item" :isWin="isWin(item)" @clickResult="showModal(item)"/>
                        <ImageResult v-else :item="item" :isWin="isWin(item)"/>
                    </a>
                </div>
            </li>
            <li class="item">
                <div class="title-mypage">Opponent's</div>
                <Item 
                    :id="item.opponent.tokenId"
                    :owner="item.opponent.owner" 
                    :name="item.opponent.name"
                    :image="item.opponent.image"
                />
            </li>
        </ul>
        <div class="modal modal-dialog-centered fade popup_customer" ref="modal" id="popup-chose-win" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="title-popup"> <span>Result</span></div>
                        <div class="img-win">
                            <img v-if="win" src="@frontend/assets/images/modal-win.png" alt="menu"/>
                            <img v-else src="@frontend/assets/images/lose-title.png" alt="menu"/>
                        </div>
                        <button class="close" type="button" @click="closeModal"> <span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="title-cnt">
                            <h3>Mine</h3>
                        </div>
                        <div class="list-hand list-title-chose">
                            <div class="row">
                                <div class="col-md-3" v-for="(handResult, index) in mines" :key="index">
                                    <HandResult :hand="handResult" :number="index+1" :result="getResult(mines, opponents, index)"/>
                                </div> 
                            </div>
                        </div>
                        <div class="list-hand">
                           
                            <div class="row">
                                <div class="col-md-3" v-for="(handResult, index) in opponents" :key="index">
                                    <HandResult :hand="handResult" :number="index+1" :result="getResult(opponents, mines, index)"/>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="cnt-popup">
                            <h3>Opponent's </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HandResult from '@/components/HandResult.vue'
import WinCondition from "@/components/WinCondition.vue"
import ImageResult from "@/components/ImageResult.vue"
import Item from '@/components/bit-nft/Item.vue'
import { GET_BATTLES } from '@/utils/graphql'
import { getAddress } from '@/utils/wallet'
import { getErrorMessage, getData } from '@/utils/api_response'
import { HAND_RESULT, HAND, STATUS } from '@/utils/constants'
export default {
    components: {
        HandResult,
        WinCondition,
        ImageResult,
        Item
    },
    data () {
        return {
            data: [],
            fetchBattlesModule: "fetchBattles",

            mines: [],
            opponents: [],
            win: false
        }
    },
    created () {
        this.$emit('changeBanner', false)
    },
    async mounted () {
        await this.getBattlesData()
    },
    methods: {
        showModal(item) {
            this.mines = item.mine_hands
            this.opponents = item.opponent_hands
            this.win = this.isWin(item)
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display="block"
            this.$emit("changeModal", true)
        },
        closeModal() {
            this.mines = []
            this.opponents = []
            this.win = false
            this.$refs.modal.classList.toggle("in")
            document.body.classList.toggle("modal-open");
            this.$refs.modal.style.display=""
            this.$emit("changeModal", false)
        },
        async getBattlesData() {
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });
            await this.$apollo.query({
                query: GET_BATTLES,
                variables: { 
                    address: getAddress(),
                }
            }).then((response) => {
                const data = getData(response, this.fetchBattlesModule)
                this.formatData(data);
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
            loader.hide()
        },
        formatData(data) {
            let result = []
            for(const property in data) {
                let item = data[property]
                if(item.offeree == getAddress()) {
                    item["mine"] = item.offereeNFT
                    item["mine_hands"] = item.offereeHands
                } else {
                    item["opponent"] = item.offereeNFT
                    item["opponent_hands"] = item.offereeHands
                }
                if(item.offeror == getAddress()) {
                    item["mine"] = item.offerorNFT
                    item["mine_hands"] = item.offerorHands
                } else {
                    item["opponent"] = item.offerorNFT
                    item["opponent_hands"] = item.offerorHands
                }
                result.push(item)
            }
            this.data = result
        },
        getDrawPoint(item) {
            if(item.offereeHands) {
                return item.drawPoint
            }
            return 0
        },
        isWin(item) {
            if(item.offeror == getAddress() && item.winner == "offeror") {
                return true
            }
            if(item.offeree == getAddress() && item.winner == "offeree") {
                return true
            }
            return false
        },
        isDecline(item) {
            return item.status == STATUS.DECLINED
        },
        getResult(handArray1, handArray2, index) {
            const hand1 = handArray1[index]
            const hand2 = handArray2[index]
            if(hand1 == hand2) {
                return HAND_RESULT.DRAW
            } else {
                if(hand1 == HAND.ROCK && hand2 == HAND.PAPER) {
                    return HAND_RESULT.LOSE
                } else if (hand1 == HAND.ROCK && hand2 == HAND.SCISSORS) {
                    return HAND_RESULT.WIN
                } else if (hand1 == HAND.PAPER && hand2 == HAND.ROCK) {
                    return HAND_RESULT.WIN
                } else if(hand1 == HAND.PAPER && hand2 == HAND.SCISSORS) {
                    return HAND_RESULT.LOSE
                } else if(hand1 == HAND.SCISSORS && hand2 == HAND.ROCK) {
                    return HAND_RESULT.LOSE
                } else {
                    return HAND_RESULT.WIN
                }
            }
        }
    }
}
</script>
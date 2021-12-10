<template>
    <section class="list-content">
        <div class="container">
            <div class="content-bit-token">
                <div class="cnt-token-left">
                    <div class="cnt-token"><span class="text">Amount to Bet ({{ denom }})</span>
                        <div class="cnt-number-token"><span class="number">{{ bet_amount }}</span>
                            <div class="icon-up-down">
                                <div class="icon-up" @click="increase"><i class="fa fa-caret-up"></i></div>
                                <div class="icon-down" @click="decrease"><i class="fa fa-caret-down"></i></div>
                            </div>
                        </div>
                        <input type="text" class="entropy" v-model="entropy" value="Entropy">
                    </div>
                </div>
                <div class="cnt-token-right">
                    <div class="chose-img">
                        <div class="control-group file-upload" id="file-upload1">
                            <div class="image-box text-center" @click="showHandModal()">
                                <p>Choose Your hand</p>
                                <ImageHand :hand="hand" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cnt-send-request">
                <button class="btn btn-chose-nft" @click="sendFightRequest">Send Fight Request</button>
            </div>
            <!-- .member-main-->
        </div>
        <div class="modal modal-dialog-centered fade popup_customer" ref="modal" id="popup-chose-hand-update" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <div class="cnt-detail-hand" :class="activeClass(hand)">
                                        <ImageHand :hand="hand" />
                                    </div>
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
        <div class="modal modal-dialog-centered fade popup_customer" ref="modal-result" id="popup-chose-win" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="title-popup"> <span>RESULT</span></div>
                        <div class="img-win">
                            <img v-if="battleResult == battleConstant.WIN" src="@frontend/assets/images/modal-win.png" alt="menu"/>
                            <img v-else-if="battleResult == battleConstant.DRAW" src="@frontend/assets/images/draw-title.png" alt="menu"/>
                            <img v-else src="@frontend/assets/images/lose-title.png" alt="menu"/>
                        </div>
                        <button class="close" type="button" @click="closeModal('modal-result')"> <span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <h2 style="text-align: center; margin-top: 50px; margin-bottom: 50px;">{{ message }}</h2>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-chose-nft" @click="closeModal('modal-result')">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { BET_TOKEN, HAND, BATTLE_RESULT } from '@/utils/constants'
import ImageHand from '@/components/ImageHand.vue'
import { bitToken } from '@/utils/wallet'
import { getBattleResult, getMessageResult } from '@/utils/logHelper'
export default {
    data() {
        return {
            bet_amount: BET_TOKEN.MIN,
            denom: process.env.VUE_APP_DENOM,
            handConstant: HAND,
            battleConstant: BATTLE_RESULT,
            hand: 0,
            handInModal: 0,
            entropy: "Type your entropy",
            battleResult: 0,
            message: "",
            logs: {"logs":[{"msg_index":0,"log":"","events":[{"type":"coin_received","attributes":[{"key":"receiver","value":"secret1xwe7v4js7sma2tme535mqpv2krfyz8w0xqrdyz"},{"key":"amount","value":"1000000uscrt"}]},{"type":"coin_spent","attributes":[{"key":"spender","value":"secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv"},{"key":"amount","value":"1000000uscrt"}]},{"type":"message","attributes":[{"key":"action","value":"execute"},{"key":"module","value":"compute"},{"key":"signer","value":"secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv"},{"key":"contract_address","value":"secret1xwe7v4js7sma2tme535mqpv2krfyz8w0xqrdyz"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"secret1xwe7v4js7sma2tme535mqpv2krfyz8w0xqrdyz"},{"key":"sender","value":"secret1ux8zlapmueayed2zj7u2uddnhx3lh9hw660ddv"},{"key":"amount","value":"1000000uscrt"}]},{"type":"wasm","attributes":[{"key":"contract_address","value":"secret1xwe7v4js7sma2tme535mqpv2krfyz8w0xqrdyz"},{"key":"action","value":"bet"},{"key":"result","value":"lose"}]}]}],"transactionHash":"82DFF1CBE388584B83B28DDB025683A0AB89FF7974F0BC062E72DC94878CED6D","data":{}}
        }
    },
    components: {
        ImageHand
    },
    mounted() {
        this.battleResult = getBattleResult(this.logs)
        console.log(getMessageResult(this.battleResult))
    },
    methods: {
        increase() {
            if(this.bet_amount == BET_TOKEN.MAX) {
                this.$toast.error(`Max bet amount is ${BET_TOKEN.MAX}  ${this.denom}`);
                return
            }
            this.bet_amount += 1
        },
        decrease() {
            if(this.bet_amount == BET_TOKEN.MIN) {
                this.$toast.error(`Min bet amount is ${BET_TOKEN.MAX} ${this.denom}`);
                return
            }
            this.bet_amount -= 1
        },
        showHandModal() {
            this.handInModal = this.hand
            this.showModal('modal')
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
        activeClass(hand) {
            return this.handInModal == hand ? "active" :  ""
        },
        chooseHand(hand) {
            this.handInModal = hand
        },
        confirmHand() {
            this.hand = this.handInModal
            this.closeModal('modal')
        },
        isSelectHand() {
            if(this.hand == 0) {
                return false
            }
            return true
        },
        async sendFightRequest() {
            if(!this.isSelectHand()) {
                this.$toast.error("You must choose your hand to fight")
                return
            }
            let loader = this.$loading.show({
                container: this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });
            try {
                const response = await bitToken(this.bet_amount * 10**6, this.hand, this.entropy)
                this.battleResult = getBattleResult(response)
                this.message = getMessageResult(this.battleResult, this.bet_amount * 10**6)
                this.$toast.success("Success bet token")
                this.showModal('modal-result')
                this.resetForm()
            } catch(error) {
                this.$toast.error(error.message);
            }
            loader.hide()
        },
        resetForm() {
            this.hand = 0,
            this. handInModal = 0,
            this.entropy = ""
        }
    }
}
</script>
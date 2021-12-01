<template>
    <div class="content-page">
        <ul class="item-mypage">
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
                    <ImageResult :isWin="true" @clickResult="showModal"/>
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
        <div class="modal modal-dialog-centered fade popup_customer" ref="modal" id="popup-chose-win" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="title-popup"> <span>Result</span></div>
                        <div class="img-win"><img src="@frontend/assets/images/modal-win.png" alt="menu"/></div>
                        <button class="close" type="button" @click="closeModal"> <span>&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="title-cnt">
                            <h3>Mine</h3>
                        </div>
                        <div class="list-hand list-title-chose">
                            <div class="row">
                                <div class="col-md-3" v-for="(handResult, index) in mines" :key="index">
                                    <HandResult :hand="handResult.hand" :number="handResult.number" :result="handResult.result" />
                                </div> 
                            </div>
                        </div>
                        <div class="list-hand">
                           
                            <div class="row">
                                <div class="col-md-3" v-for="(handResult, index) in opponents" :key="index">
                                    <HandResult :hand="handResult.hand" :number="handResult.number" :result="handResult.result" />
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
export default {
    components: {
        HandResult,
        WinCondition,
        ImageResult,
        Item
    },
    data () {
        return {
            data: {},
            mines: [
                {
                    hand: 1,
                    number: 1,
                    result: 1
                },
                {
                    hand: 1,
                    number: 2,
                    result: 2
                },
                {
                    hand: 1,
                    number: 3,
                    result: 3
                }
            ],
            opponents: [
                {
                    hand: 1,
                    number: 1,
                    result: 1
                },
                {
                    hand: 1,
                    number: 2,
                    result: 2
                },
                {
                    hand: 1,
                    number: 3,
                    result: 3
                }
            ],
        }
    },
    created () {
        this.$emit('changeBanner', false)
    },
    methods: {
        showModal() {
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
    }
}
</script>
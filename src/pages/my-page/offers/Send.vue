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
                    <div class="cnt-send-request">
                        <button class="btn btn-chose-nft" @click="handelSendFight(1)">Send Fight Request</button>
                    </div>
                    <div class="cnt-btn-decline">
                        <button class="btn btn-dicline"  @click="handelDecline(1)">Decline</button>
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
    </div>
</template>
<script>
import WinCondition from "@/components/WinCondition.vue"
import Item from '@/components/bit-nft/Item.vue'
export default {
    components: {
        WinCondition,
        Item
    },
    methods: {
        handelSendFight(value) {
            console.log(value)
        },
        handelDecline(value) {
            console.log(value)
        }
    }
}
</script>
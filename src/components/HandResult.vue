<template>
    <div class="cnt-detail-hand">
        <div class="number-text" :class="className">
            <span class="number"> 
                <span>{{ number }}</span>
            </span>
        <span class="name">{{ resultText }}</span></div>
        <ImageHand :hand="hand" />
    </div>
</template>
<script>
import ImageHand from '@/components/ImageHand.vue'
import { HAND_RESULT } from '@/utils/constants'
export default {
    props: {
        number: {
            default: 0,
        },
        hand: {
            default: 0,
        },
        result: {
            type: Number,
        }
    },
    components: {
        ImageHand
    },
    computed: {
        resultText() {
            if(this.result == HAND_RESULT.WIN) {
                return "WIN";
            } else if(this.result == HAND_RESULT.LOSE) {
                return "LOSE";
            } else if(this.result == HAND_RESULT.DRAW) {
                return "DRAW";
            }
            return "";
        },
        className() {
            if(this.result == HAND_RESULT.WIN) {
                return "win";
            } else if(this.result == HAND_RESULT.LOSE) {
                return "loose";
            } else if(this.result == HAND_RESULT.TIE) {
                return "tie";
            }
            return "";
        }
    }
}
</script>
<template>
    <div class="img-hand">
        <img v-if="hand == handConstant.ROCK" src="@frontend/assets/images/rock.png" alt="menu" />
        <img v-else-if="hand == handConstant.PAPER" src="@frontend/assets/images/paper.png" alt="menu" />
        <img v-else-if="hand == handConstant.SCISSORS" src="@frontend/assets/images/scissors.png" alt="menu" />
    </div>
</template>
<script>
import { HAND } from '@/utils/constants'
export default {
    props: {
        hand: {
            default: 0
        },
    },
    data () {
        return {
            handConstant: HAND
        }
    },
}
</script>
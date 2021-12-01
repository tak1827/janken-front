<template>
    <div class="cnt-detail-hand">
        <div class="number">
        <span>{{ number }}</span>
        </div>
        <ImageHand :hand="hand" />
    </div>
</template>
<script>
import ImageHand from '@/components/ImageHand.vue'
export default {
    props: {
        number: {
            default: 0,
        },
        hand: {
            default: 0,
        }
    },
    components: {
        ImageHand
    },
}
</script>
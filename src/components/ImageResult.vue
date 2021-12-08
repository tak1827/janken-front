<template>
    <div class="images-win" @click="$emit('clickResult')">
        <img v-if="item.status == 'Declined'" src="@frontend/assets/images/decline.png" alt="menu"/>
        <img v-else-if="item.status != 'Declined' && item.winner != 'draw' && isWin" src="@frontend/assets/images/win.png" alt="menu"/>
        <img v-else-if="item.status != 'Declined' && item.winner != 'draw' && !isWin" src="@frontend/assets/images/lose.png" alt="menu"/>
        <img v-else-if="item.winner == 'draw'" src="@frontend/assets/images/draw.png" alt="menu"/>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object
        },
        isWin: {
            type: Boolean
        }
    },
}
</script>
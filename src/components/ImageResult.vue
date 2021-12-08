<template>
    <div class="images-win" @click="$emit('clickResult')">
        <img v-if="status == 'Declined'" src="@frontend/assets/images/decline.png" alt="menu"/>
        <img v-else-if="status != 'Declined' && isWin" src="@frontend/assets/images/win.png" alt="menu"/>
        <img v-else src="@frontend/assets/images/loose.png" alt="menu"/>
    </div>
</template>
<script>
export default {
    props: {
        isWin: {
            type: Boolean
        },
        status: {
            type: String
        }
    }
}
</script>
<template>
    <div class="cnt-ratio">
        <div class="left">
        <div class="number">{{ timeToWin }}</div>
        <div class="text">Wins</div>
        </div>
        <div class="center">
        <div class="number">/</div>
        </div>
        <div class="right">
        <div class="number">{{ timeToFight }}</div>
        <div class="text">Fights</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        timeToFight: {
            default: 0
        },
        timeToWin: {
            default: 0
        },
    },
}
</script>
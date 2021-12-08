<template>
    <div class="cnt-back-tag">
        <div class="back">
            <router-link :to="{ name: 'bit.nft'}">
                <i class="fa fa-caret-left" aria-hidden="true"></i>
                <span>Back</span>
            </router-link>
        </div>
        <ul>
            <li>
                <span>Hope</span>
            </li>
            <li>
                <span>{{ name }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        }
    }
}
</script>
<template>
        <router-link :to="{ name: 'bit.nft.detail', params: {id: id}}">
            <div class="item-content">
                <div class="thumbnails">
                    <div class="thumb"><img :src="image" alt="menu"/></div>
                    <div class="text-name">{{ name }}</div>
                </div>
                <div class="content">
                    <h3 class="title"> <a href="#">Hope</a></h3>
                    <div class="cnt-detail">
                        <span>Owner:</span>
                        <span class="bgr-cnt">{{ owner }}</span>
                    </div>
                </div>
            </div>
        </router-link> 
</template>
<script>
export default {
    props:{
        name: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        owner:{
            type: String,
            default: ''
        },
        id: {
            default: 0
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>
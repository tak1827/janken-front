<template>
    <div class="item">
        <div class="item-content">
            <div class="thumbnails">
                <div class="thumb">
                <img src="@frontend/assets/images/icon.png" alt="menu" />
                </div>
            </div>
            <div class="content">
                <h3 class="title">
                    <a href="#">{{ title }}</a>
                </h3>
                <div class="cnt-detail">
                    <span>Owner:</span>
                    <span class="bgr-cnt">{{ owner }}</span>
                </div>
                <div class="cnt-text-detail">
                    <p>{{ description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        image: {
            type: String,
            default: ''
        },
        owner:{
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        }
    }
}
</script>
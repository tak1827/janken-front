<template>
    <li>
        <div class="cnt">
        <span class="title">{{ title }} </span>
        <span class="cnt-time">{{ value }} times</span>
        <div class="icon-up-down">
            <div class="icon-up" @click="increase">
                <i class="fa fa-caret-up"></i>
            </div>
            <div class="icon-down" @click="decrease">
                <i class="fa fa-caret-down"></i>
            </div>
        </div>
        </div>
    </li>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            default: 0
        },
        state: {
            type: String,
        }
    },
    methods: {
        increase() {
            this.$emit("increase", this.state)
        },
        decrease() {
            if(this.value == 0){
                alert("Times value is zero cannot decrease")
                return
            }
            this.$emit("decrease", this.state)
        }
    }
}
</script>
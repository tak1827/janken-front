<template>
    <section class="list-content">
        <div class="container">
            <div class="page-sidebar-wrapper vetical-menu">
                <div class="page-sidebar navbar-collapse collapse">
                    <ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                    <li class="menu-active">
                        <h3><span class="title">
                            Collection</span></h3>
                        <div class="list-check">

                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck1" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck1">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck2" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck2">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck3" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck3">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck4" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck4">Axie  Infinity</label>
                        </div>
                        </div>
                    </li>
                    <li class="menu-active">
                        <h3>
                            <span class="title">
                                Collection
                            </span>
                        </h3>
                        <div class="list-check">

                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck1" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck1">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck2" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck2">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck3" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck3">Axie  Infinity</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" id="exampleCheck4" type="checkbox"/>
                            <label class="form-check-label" for="exampleCheck4">Axie  Infinity</label>
                        </div>

                        </div>
                    </li>
                    </ul>
                </div>
            </div>
            <!-- .page-sidebar-wrapper-->
            <div class="content-wapper-page">
                <div class="content-page">
                    <ul class="list-item">
                        <li class="item is-content" v-for="item in items" v-bind:key="item.id">
                            <BitNftItem 
                                :title="item.title"
                                :id="item.id" 
                                :name="item.name" 
                                :owner="item.owner" 
                                :image="item.image" 
                            />
                        </li>
                        <BitNftItemNoContent />
                    </ul>
                </div>
                <div class="pagination-footer">
                    <paginate
                    :page-count="20"
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="clickCallback"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                    :page-class="'page-item'">
                    </paginate>
                </div>
            </div>
            <!-- .member-main-->
        </div>
    </section>
</template>

<script>
import BitNftItem from '@/components/bit-nft/Item.vue'
import BitNftItemNoContent from '@/components/bit-nft/ItemNoContent.vue'
import { defaultData } from '@/utils/constants'
import Paginate from 'vuejs-paginate'
export default {
    components: {
        BitNftItem,
        BitNftItemNoContent,
        Paginate
    },
    data () {
        return {
            items: defaultData
        }
    },
    created () {
        this.$emit('changeBanner', true)
    },
    methods: {
        clickCallback (pageNum) {
            console.log(pageNum)
        }
    }
}
</script>
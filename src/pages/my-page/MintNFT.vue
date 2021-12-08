<template>
    <div class="content-page">
        <div class="row">
            <div class="col-md-6">
                <form>
                    <div class="form-group">
                        <div class="col">
                        <div class="input-label input-upload-file">
                            <label class="btn btn-select-file"><span class="d-block form-file-text">Upload Image</span>
                                <input class="custom-file-input" id="imgInp" type="file" @change="handleFileUpload( $event )"/>
                            </label>
                        </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label" for="input-user_name"><span>Name</span></label>
                        <div class="col">
                            <input class="form-control" v-model="form.name" type="text"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-form-label"><span>Description</span></label>
                        <div class="col">
                        <textarea class="form-control" v-model="form.description" type="text"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col">
                        <button class="btn btn-submit" type="button" @click="mintNft">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <div class="privew-cnt-mypage">
                <div class="item">
                    <h3 class="title">
                        {{ form.name }}</h3>
                    <div class="item-content">
                        <div class="thumbnails">
                            <div class="thumb">
                                <img id="blah" v-if="form.image == ''" src="@frontend/assets/images/bgr_side.png" alt="menu"/>
                                <img id="blah" v-else :src="form.image" alt="menu"/>
                            </div>
                        </div>
                        <div class="content">
                            <div class="cnt-text-detail">
                                <p>{{ form.description }}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { UPLOAD_IMAGE, MINT_NFT } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
import { getAddress } from '@/utils/wallet'
export default {
    data() {
        return {
            form: {
                name: "",
                description: "",
                image: "",
            },
            fullPage: true,
            postUploadImageModule: "postUploadImage",
            postMintNFTModule: "postMintNFT",
        }
    },
    methods: {
        async handleFileUpload(event){
            await this.upload(event)
        },
        async upload({ target }) {
            let loader = this.$loading.show({
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                });
            await this.$apollo.mutate({
                    mutation: UPLOAD_IMAGE,
                    variables: {
                        photo: target.files[0]
                    }
                }).then((response) => {
                    const data = getData(response, this.postUploadImageModule)
                    this.form.image = data.uri
                    this.$toast.success("Upload image success");
                }).catch((error) => {
                    let message = getErrorMessage(error.graphQLErrors)
                    this.$toast.error(message);
                })
            loader.hide()
        },
        async mintNft() {
            let loader = this.$loading.show({
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                });
            const {name, description, image} = this.form
            const owner = getAddress()
            await this.$apollo.mutate({
                    mutation: MINT_NFT,
                    variables: {
                        owner,
                        image,
                        name,
                        description
                    }
                }).then(() => {
                    this.$toast.success("Mint NFT success");
                    this.resetForm()
                }).catch((error) => {
                    console.log(error)
                    let message = getErrorMessage(error.graphQLErrors)
                    this.$toast.error(message);
                })
            loader.hide()
        },
        resetForm() {
            this.form = {
                name: "",
                description: "",
                image: "",
            }
        }
    }
}
</script>
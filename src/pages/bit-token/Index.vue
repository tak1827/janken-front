<template>
    <section class="list-content">
        <div class="container">
            <div class="content-bit-token">
                <div class="cnt-token-left">
                    <div class="cnt-token"><span class="text">Amount to Bit</span>
                        <div class="cnt-number-token"><span class="number">112</span>
                            <div class="icon-up-down">
                            <div class="icon-up"><i class="fa fa-caret-up"></i></div>
                            <div class="icon-down"><i class="fa fa-caret-down"></i></div>
                            </div>
                        </div>
                        <span class="text">Token</span>
                    </div>
                </div>
                <div class="cnt-token-right">
                    <div class="chose-img">
                        <div class="control-group file-upload" id="file-upload1">
                            <div class="image-box text-center">
                                <p>Upload Image</p><img src="@frontend/assets/images/bgr_side.png" alt=""/>
                            </div>
                            <div class="controls" style="display: none;">
                                <input type="file" name="contact_image_1"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cnt-send-request">
                <button class="btn btn-chose-nft">Send Fight Request</button>
            </div>
            <!-- .member-main-->
        </div>
    </section>
</template>
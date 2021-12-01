<template>
    <div class="page-footer">
        <div class="container">
            <div class="content-ft">
            <div class="logo"><router-link :to="{ name: 'home'}"><img src="@frontend/assets/images/janken.png" alt="menu"/></router-link></div>
            <div class="copy-right">
                <p>© Janken Inc. All rights reserved.</p>
                <div class="contatc-ft"><span>Contact</span><span> <a href="#">contact@janken.network</a></span></div>
            </div>
            </div>
        </div>
    </div>
</template>
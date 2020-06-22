<template>
    
    <div class="tile is-child box">

        <p class="exclusive" v-if="pExclusive === 1">EXCLUSIVE</p>
        <img :src="getImgSrc(pID)" class="pimg" />
        <p class="productName">{{ pName }}</p>
        <p class="productPrice">£{{ pPrice }}.00</p>
        <p class="productSalePrice" v-if="pSalePrice != 0">SALE £{{ pSalePrice }}.00</p>

        <div @click.prevent="storeItemID(pID)" class="enquiryBtn">
            <nuxt-link :to="{ name: 'product-id', params: { id:pID } }" class="button is-large is-rounded">
                    ENQUIRE ABOUT THIS ITEM
            </nuxt-link>
        </div>

    </div>

</template>

<script>
export default {
    
    props: {
        
        pID: Number,
        pName: String,
        pPrice: String,
        pSalePrice: String,
        pExclusive: Number,

    },

    methods: {

        getImgSrc(img) {

            return require('../static/product-images/' + img + ".jpg")
        },

        storeItemID(id) {
            this.$store.commit("saveID", id);
            console.log('added ' + id + ' to store');
        }
    }
}
</script>
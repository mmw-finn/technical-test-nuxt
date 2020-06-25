<template>
    
    <div class="tile is-child box productContainer">

        <!-- holds all the data for the product in a single tile
            item details passed through to props
         -->

        <!-- only shows exclusive strip if variable passed through is 1 -->
        <p class="exclusive" v-if="pExclusive === 1">EXCLUSIVE</p>
        <img :src="getImgSrc(pID)" class="pimg" />
        <p class="productName">{{ pName }}</p>
        <p class="productPrice" v-if="pSalePrice != 0"><strike>£{{ pPrice }}.00</strike></p>
        <p class="productPrice" v-else>£{{ pPrice }}.00</p>
        <b><p class="productSalePrice" v-if="pSalePrice != 0">SALE £{{ pSalePrice }}.00</p></b>

        <!-- button links user to enquiry page about the item they clicked on
            passes item ID as parameter
            button only displayed if the btnEnabled variable passed through as 1
         -->
        <div @click.prevent="storeItemID(pID)" class="enquiryBtn">
            <nuxt-link :to="{ name: 'product-id', params: { id:pID } }" class="button is-large is-rounded enqBtn" v-if="btnEnabled === 1">
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

        //0 = false, 1 = true
        btnEnabled: Number

    },

    methods: {

        //gets the image source in the project files
        getImgSrc(img) {

            return require('../static/product-images/' + img + ".jpg")
        },

        //stores the item ID and sets all other store variables to empty strings
        storeItemID(id) {
            this.$store.commit("saveID", id);

            this.$store.commit("saveName", '');
            console.log('added name to store');

            this.$store.commit("saveEmail", '');
            console.log('added email to store');

            this.$store.commit("saveMsg", '');
            console.log('added message to store');

            this.$store.commit("saveComp", '');
            console.log('added message to store');
                
            this.$store.commit("saveSize", '');
            console.log('added message to store');

        }
    }
}
</script>
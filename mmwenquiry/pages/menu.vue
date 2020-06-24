<template>

    <div class="pageContent">

        <div class="header">
            <pageHeader :pageTitle="'Product Enquiry Web Application'" :backButton=0 />
        </div>

        <!-- tiles hold product information and link to enquiry form about each one-->
        <div class="tile is-ancestor menuTile">

            <div class="tile lefttile">

                <DataHolder :pID="prod1id" :pName="prod1name" :pPrice="prod1price" :pSalePrice="prod1salePrice" :pExclusive="prod1ex" :btnEnabled=1 />
            </div>

            <div class="tile">

                <DataHolder :pID="prod2id" :pName="prod2name" :pPrice="prod2price" :pSalePrice="prod2salePrice" :pExclusive="prod2ex" :btnEnabled=1 />

            </div>
            
            <div class="tile righttile">

                <DataHolder :pID="prod3id" :pName="prod3name" :pPrice="prod3price" :pSalePrice="prod3salePrice" :pExclusive="prod3ex" :btnEnabled=1 />

            </div>
        </div>

    </div>

</template>

<script>

import DataHolder from '~/components/productDetails.vue'
import pageHeader from '~/components/headComponent.vue'

export default {

    components: {

        DataHolder,
        pageHeader

    },

    async asyncData({ $axios }) {

        //gets all prodct details from the website using axios
        const products = await $axios.$get('https://frontendtest.mainlinemenswear.co.uk/products')

        return {

            //assigns each product detail a variable to load into the page
            prod1id: products[0].product_id,
            prod1ex: products[0].exclusive,
            prod1name: products[0].name,
            prod1price: products[0].rrp_price,
            prod1salePrice: products[0].sale_price,

            prod2id: products[1].product_id,
            prod2ex: products[1].exclusive,
            prod2name: products[1].name,
            prod2price: products[1].rrp_price,
            prod2salePrice: products[1].sale_price,

            prod3id: products[2].product_id,
            prod3ex: products[2].exclusive,
            prod3name: products[2].name,
            prod3price: products[2].rrp_price,
            prod3salePrice: products[2].sale_price

        }

    }

}
</script>

<style lang="css" scoped>

.headTitle {

    visibility: visible;

}

</style>
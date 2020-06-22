<template>
    
        <div class="tile is-ancestor menuTile">

        <div class="tile leftTile is-3">

            <!-- Data passed in to component to create a view of the item and its details -->
            <DataHolder :pID="prodID" :pName="prodName" :pPrice="prodPrice" :pSalePrice="prodSalePrice" :pExclusive="prodExclusive" />
       
        </div>
        
        <div class="tile rightTile is-5">

                <div class="column">
                <p>Full Name: {{ enqName }}</p>
                <p>Email: {{ enqEmail }}</p>
                <p>Size of item selected: {{ enqSize }}</p>
                <p>Have you found this item cheaper on a competitor website? {{ enqComp }}</p>
                <p>Enquiry Message:</p>
                <p>{{ enqMsg }}</p>
                
                <div class="control">
                    <button class="button is-primary" id="submitEnquiry" @click="postData()">Submit</button>
                </div>

            </div>

        </div>
    </div>

</template>

<script>

import DataHolder from '~/components/productDetails.vue'

export default {

    data() {

        return {

            enqProdID: 0,
            enqName: this.$store.state.enqName,
            enqMsg: this.$store.state.enqMsg,
            enqEmail: this.$store.state.enqEmail,
            enqSize: this.$store.state.enqSize,
            enqComp: this.$store.state.enqComp,

        };
    },
    
    components: {

        DataHolder

    },

    async asyncData({app, store, params}) {
        return app.$axios.get('https://frontendtest.mainlinemenswear.co.uk/product/' + params.id)
        .then((response)=> {

            console.log(response);

            return {
            
                enqProdID: params.id,
                prodName: response.data.product[0].name,
                prodExclusive: response.data.product[0].exclusive,
                prodID: response.data.product[0].product_id,
                prodPrice: response.data.product[0].rrp_price,
                prodSalePrice: response.data.product[0].sale_price,
                sizes: response.data.sizes
            }
        });
    },

    methods: {

        postData() {

            this.$axios.post('https://frontendtest.mainlinemenswear.co.uk/submit', {
                productId: this.enqProdID,
                sizeSelected: this.enqSize,
                fullname: this.enqName,
                email: this.enqEmail,
                competitor: this.enqComp,
                competitorUrl: '',
                enquiry: this.enqMsg
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


        }

    }

}
</script>
<template>

    <div class="pageContent">

        <div class="header">
            <pageHeader :pageTitle="'Summary of your Enquiry'" :backButton=1 />
        </div>

        <div class="tile is-ancestor menuTile">

            <div class="dataTiles tile is-parent">

                <div class="tile is-child leftTile is-3">

                    <!-- Data passed in to component to create a view of the item and its details -->
                    <DataHolder :pID="prodID" :pName="prodName" :pPrice="prodPrice" :pSalePrice="prodSalePrice" :pExclusive="prodExclusive" :btnEnabled=0 />
                
                </div>
                
                <div class="tile is-child rightTile is-5">

                    <div class="column">
                        <p>Full Name: {{ enqName }}</p>
                        <p>Email: {{ enqEmail }}</p>
                        <p>Size of item selected: <b>{{ enqSize }}</b></p>
                        <p>Have you found this item cheaper on a competitor website? <b>{{ enqComp }} </b></p>
                        <p>Competitor URL: {{ enqCompURL }}</p>
                        <p>Enquiry Message:</p>
                        <p>{{ enqMsg }}</p>
                        
                        <div class="control">
                            <button class="button submitEnquiry" @click.stop.prevent="postData()">Submit</button>
                        </div>

                    </div>

                </div>
            </div>

        </div>

    </div>

</template>

<script>

import DataHolder from '~/components/productDetails.vue'
import pageHeader from '~/components/headComponent.vue'

export default {

    data() {

        return {

            enqProdID: 0,
            enqName: this.$store.state.enqName,
            enqMsg: this.$store.state.enqMsg,
            enqEmail: this.$store.state.enqEmail,
            enqSize: this.$store.state.enqSize,
            enqComp: this.$store.state.enqComp,
            enqCompURL: this.$store.state.enqCompURL,

        };
    },
    
    components: {

        DataHolder,
        pageHeader

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

            var enquiryForm = new FormData();

            const vm = this;

            enquiryForm.append('productId',this.enqProdID);
            enquiryForm.append('sizeSelected',this.enqSize);
            enquiryForm.append('fullname',this.enqName);
            enquiryForm.append('email',this.enqEmail);
            enquiryForm.append('competitor',this.enqComp);
            enquiryForm.append('competitorUrl',this.enqCompURL);
            enquiryForm.append('enquiry',this.enqMsg);

            this.$axios.post("https://frontendtest.mainlinemenswear.co.uk/submit", enquiryForm)
            .then(function (response) {
                
                console.log(response);

                vm.$router.push('/confirmation');

            })
            .catch(function (error) {

                if(error.response){
                    // Return the Error Response Data
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return error.response.status;
                }
                else if(error.request){
                    console.log(error.request);      
                }
                else {
                    console.log('Error Can\'t be defined: ', error.message);
                }
            });

        }

    }

}
</script>

<style scoped>

    .dataTiles {

        text-align: left;

    }

</style>
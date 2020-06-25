<template>

    <div class="pageContent">

        <!-- page header; passes through the page title and that the back button should be shown -->
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

                    <!-- Column displays the user's input enquiry data from the previous page -->
                    <div class="column">
                        <p>Full Name: {{ enqName }}</p>
                        <p>Email: {{ enqEmail }}</p>
                        <p>Size of item selected: <b>{{ enqSize }}</b></p>
                        <p>Have you found this item cheaper on a competitor website? <b>{{ enqComp }} </b></p>
                        <p>Competitor URL: {{ enqCompURL }}</p>
                        <p>Enquiry Message:</p>
                        <p>{{ enqMsg }}</p>
                        
                        <!-- when the button is clicked, the data is posted -->
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

//imports components
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

    //runs axios get request for the product details so they can be passed into the data container for the products
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

            //creates new form
            var enquiryForm = new FormData();

            //confines this to variable so can be used with $router.push later
            const vm = this;

            //appends all data to form
            enquiryForm.append('productId',this.enqProdID);
            enquiryForm.append('sizeSelected',this.enqSize);
            enquiryForm.append('fullname',this.enqName);
            enquiryForm.append('email',this.enqEmail);
            enquiryForm.append('competitor',this.enqComp);
            enquiryForm.append('competitorUrl',this.enqCompURL);
            enquiryForm.append('enquiry',this.enqMsg);

            //posts the enquiry
            this.$axios.post("https://frontendtest.mainlinemenswear.co.uk/submit", enquiryForm)
            .then(function (response) {
                
                //logs response to console
                console.log(response);

                //directs user to confirmation page
                vm.$router.push('/confirmation');

            })

            //catches and processes errors
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
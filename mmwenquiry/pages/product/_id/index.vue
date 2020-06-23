<template>

    <div class="pageContent">

        <div class="tile is-ancestor menuTile">

            <div class="tile leftTile is-3">

                <!-- Data passed in to component to create a view of the item and its details -->
                <DataHolder :pID="prodID" :pName="prodName" :pPrice="prodPrice" :pSalePrice="prodSalePrice" :pExclusive="prodExclusive" />
        
            </div>

            <div class="tile is-2">

                <p class="formText">SELECT YOUR SIZE: *</p>
                <div class="control">
                    <select id="sizeDropdown" v-model="enqSize">
                        <option disabled value="">Please select a size</option>
                        <option v-for="size in sizes" :value="size.size">{{size.size}}</option>
                    </select>
                </div>

            </div>
            
            <div class="tile rightTile is-5">

                <div class="column" id="enquiryForm">

                    <p class="formText">Full name: *</p><span class="errmsg" id="nameErr"></span>
                    <div class="control">
                        <input class="input" type="text" id="nameField" @keyup="validateName()" v-model="enqName" required>
                    </div>
            
                    <p class="formText">Email: *</p><span class="errmsg" id="emailErr"></span>
                        <div class="control">
                            <input class="input" type="text" id="emailField" @keyup="validateEmail()" v-model="enqEmail" required>
                        </div>
            
                    <p class="formText">Have you find this item cheaper on a competitor website? *</p>
                    <div class="field">
                        <div class="control">
                            <input type="radio" name="question" id="compYes" class="compCheck" value="yes" v-model="enqComp" @click="toggleURLentry()">
                            <label class="radio" for="compYes">Yes</label>

                            <input type="radio" name="question"  id="compNo" checked class="compCheck" value="no" v-model="enqComp" @click="toggleURLentry()">
                            <label class="radio" for="compNo">No</label>

                        </div>
                    </div>
                
                    <p class="formText compURLentry">Competitor URL: </p><span class="errmsg compURLentry" id="compURLerr"></span>
                    <div class="control compURLentry">
                        <input class="input" type="text" id="compURLfield" @keyup="validateCompURL()" v-model="enqCompURL" disabled>
                    </div>

                    <p class="formText">Enquiry message *</p><span id="msgCount">(0/200)</span><span class="errmsg" id="msgErr"></span>
                    <div class="control">
                        <input class="input" type="text" id="msgField" @keyup="validateMessage()" required minlength="50" maxlength="200" v-model="enqMsg">
                    </div>    
                
                    <p class="formText">Fields marked with an asterisk * are compulsory.</p>
                
                    <div class="control">
                        <button class="button is-primary" id="submitEnquiry" @click="validateForm()">Submit</button>
                    </div>

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
            enqCompURL: this.$store.state.enqCompURL,

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

        toggleURLentry() {

            if(document.getElementById('compYes').checked == true) {

                document.getElementById('compURLfield').disabled = false;

            } else {
                
                document.getElementById('compURLfield').innerText = "";
                document.getElementById('compURLfield').disabled = true;

            }


        },

        validateName(){

            //checks if input name string is empty
            if(this.enqName == "") {

                //displays error message and disables the submit form button
                document.getElementById("nameErr").innerHTML = " Please enter your full name";
                document.getElementById("nameErr").style = "display: visible";
                document.getElementById("nameField").style.border = "1px solid #ff5050";

                return false;

            } else {

                //hides error message
                document.getElementById("nameErr").style = "display: none";

                return true;

            }


        },

        validateMessage(){

            document.getElementById("msgCount").innerHTML = "(" + this.enqMsg.length + "/200)"

            //checks if message string is empty
            if(this.enqMsg == "") {

                //displays error message and disables the submit form button
                document.getElementById("msgErr").innerHTML = " Please enter a message in your enquiry.";
                document.getElementById("msgField").style.border = "1px solid #ff5050";

                return false;

            } else {

                //hides error message
                document.getElementById("msgErr").style = "display: none";

                return true;

            }


        },
    
        validateEmail() {

            //assigns regular expression to variable to use in checking email validity
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            //tests whether or not the input email was valid
            var validEmail = regex.test(this.enqEmail);

            //if the email was valid
            if (validEmail) {

                //hides error message
                document.getElementById("emailErr").style = "display: none";

                return true;

            } else {

                //displays error message and disables the submit form button
                document.getElementById("emailErr").innerHTML = " Please enter a valid email address";
                document.getElementById("emailField").style.border = "1px solid #ff5050";

                return false;

            }

        },

        validateCompURL() {

            if(this.enqComp == true) {

                const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;

                var validURL = regex.test(this.enqCompURL);

                //if the url was valid
                if (validURL) {

                    //hides error message
                    document.getElementById("compURLerr").style = "display: none";

                    return true;

                } else {

                    //displays error message and disables the submit form button
                    document.getElementById("compURLerr").innerHTML = " Please enter a valid web address";
                    document.getElementById("compURLfield").style.border = "1px solid #ff5050";

                    return false;

                }

            }
        },

        saveStoreData() {

            this.$store.commit("saveName", this.enqName);
            this.$store.commit("saveEmail", this.enqEmail);
             this.$store.commit("saveMsg", this.enqMsg);
            this.$store.commit("saveComp", this.enqComp);
            this.$store.commit("saveSize", this.enqSize);
            this.$store.commit("saveCompURL", this.enqCompURL);

            this.$router.push({name: 'enquiry-id', params: { id:this.enqProdID} });


        },

        validateForm() {

            //assigns values to variables
            var isNameValid = this.validateName();
            var isEmailValid = this.validateEmail();
            var isMsgValid = this.validateMessage();

            //if all the inputs are valid
            if (isNameValid && isEmailValid && isMsgValid) {

                if(document.getElementById("compYes").checked == true) {

                    var validCompURL = this.validateCompURL();

                    if(validCompURL) {

                        this.saveStoreData();


                    } else {

                        alert("plese check the URL you entered for errors.");

                    }


                } else {

                    this.saveStoreData();

                }

            } else {

                //shows error message
                alert("Please double check your enquiry for any errors.");
            
            }


        },

    },

}
</script>
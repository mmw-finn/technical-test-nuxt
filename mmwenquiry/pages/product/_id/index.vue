<template>

    <div class="pageContent">
        
        <!-- page header; passes through the page title and that the back button should be shown -->
        <div class="header">
            <pageHeader :pageTitle="prodName + ' Enquiry'" :backButton=1 />
        </div>

        <div class="tile is-ancestor menuTile">

            <div class="dataTiles tile is-parent">

            <div class="tile leftTile is-child is-3">

                <!-- Data passed in to component to create a view of the item and its details -->
                <DataHolder :pID="prodID" :pName="prodName" :pPrice="prodPrice" :pSalePrice="prodSalePrice" :pExclusive="prodExclusive" :btnEnabled=0 />
        
            </div>

            <!-- holds size selector on the form -->
            <div class="tile sizeTile is-child is-3">

                <p class="formText"><b>SELECT YOUR SIZE: * </b></p>

                <!-- checks if the colour mode is dark
                    if it is, it populates the dropdown list with the sizes
                    otherwise, it creates a button for each size that the user can select
                 -->
                <div class="control" id="sizeSelector" v-if="$colorMode.preference == 'dark'">
                    <select id="sizeDropdown" v-model="enqSize">
                        <option disabled value="">Please select a size</option>
                        <option v-for="size in sizes" :value="size.size">{{size.size}}</option>
                    </select>

                </div>

                <div class="column" v-else>
                    <div class="sizeBtnContainer" v-for="size in sizes">

                        <div class="control">
                            <button class="sizeBtn" :value="size.size" @click="updateSize(size.size)">{{ size.size }}</button>
                        </div>

                    </div>
                </div>

            </div>

            <!-- holds the enquiry form -->
            <div class="tile rightTile is-child is-5">

                <div class="column" id="enquiryForm">

                    <!-- input for user's name -->
                    <p class="formText">Full name: *</p>

                    <!-- holds the error message for the user name -->
                    <span class="errmsg" id="nameErr" style="display: none">Please enter your full name</span>

                    <!-- holds the input field for the name
                        whenever the user types, their input is checked using the subroutine
                     -->
                    <div class="control">
                        <input class="input" type="text" id="nameField" @keyup="validateName()" v-model="enqName" required>
                    </div>

            
                    <!-- input for user's email -->
                    <p class="formText">Email: *</p>

                    <!-- holds the error message for the user email -->
                    <span class="errmsg" id="emailErr" style="display: none">Please enter a valid email address</span>

                    <!-- holds the input field for the name
                        whenever the user types, their input is checked using the subroutine
                     -->
                    <div class="control">
                        <input class="input" type="text" id="emailField" @keyup="validateEmail()" v-model="enqEmail" required>
                    </div>

                    <!-- options for user to say whether they'd found the item cheaper on a different website -->
                    <p class="formText">Have you find this item cheaper on a competitor website? *</p>
                    <div class="field">
                        <div class="control">

                            <!-- radio button for the yes option for the above question -->
                            <input type="radio" name="question" id="compYes" class="compCheck" value="yes" v-model="enqComp" @click="toggleURLentry()">
                            <label class="radio" for="compYes">Yes</label>

                            <!-- radio button for the no option for the above question -->
                            <input type="radio" name="question"  id="compNo" checked class="compCheck" value="no" v-model="enqComp" @click="toggleURLentry()">
                            <label class="radio" for="compNo">No</label>

                        </div>
                    </div>

                    <!-- input for competitor URL (only necessary if the user has selected yes to the above question) -->
                    <p class="formText compURLentry">Competitor URL: </p>

                    <!-- error message for the input URL -->
                    <span class="errmsg compURLentry" id="compURLerr" style="display: none">Please enter a valid web address</span>

                    <!-- input field for the competitor URL -->
                    <!-- TODO -- THIS DOES NOT WORK! IT WILL NOT RUN THE SUBROUTINE WHEN THE USER INPUTS IN THE FIELD -->
                    <div class="control compURLentry">
                        <input class="input" type="text" id="compURLfield" @keyup="validateCompURL()" v-model="enqCompURL" disabled>
                    </div>

                    <!-- input for user's enquiry message -->
                    <p class="formText">Enquiry message *
                    
                    <!-- error message for input message -->
                    <span class="errmsg" id="msgErr" style="display: none">Please enter a message in your enquiry.</span>

                    <!-- holds the character count of the input enquiry -->
                    <span id="msgCount">(0/200)</span>
                    </p>

                    <!-- holds the input field for the user enquiry
                        whenever the user types, their input is checked using the subroutine
                     -->
                    <div class="control">
                        <input class="input" type="text" id="msgField" @keyup="validateMessage()" required minlength="50" maxlength="200" v-model="enqMsg">
                    </div>    
                
                    <!-- text about compulsory fields -->
                    <p class="formText">Fields marked with an asterisk * are compulsory.</p>
                
                    <!-- submit button
                        runs subroutine to validate form data, which alerts users of any input errors
                     -->
                    <div class="control">
                        <button class="button submitEnquiry" @click="validateForm()">Submit</button>
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

        //toggles whether the URL entry form field can be used or not
        //should also hide it but it doesn't, for whatever reason
        toggleURLentry() {

            if(document.getElementById('compYes').checked == true) {

                document.getElementById('compURLfield').visibility = "visible";
                document.getElementById('compURLfield').disabled = false;

            } else {

                document.getElementById('compURLfield').visibility = "hidden";
                document.getElementById('compURLfield').innerText = "";
                document.getElementById('compURLfield').disabled = true;
                this.enqCompURL = "";

            }


        },

        //updates the enquiry size with the value of the button
        //light mode only
        updateSize(newSize) {

            this.enqSize = newSize;

        },

        //validates the user's input name
        validateName(){

            //checks if input name string is empty
            if(this.enqName == "") {

                //displays error message and disables the submit form button
                document.getElementById("nameErr").style.display = "initial";
                document.getElementById("nameField").style.border = "1px solid #ff5050";

                return false;

            } else {

                //hides error message
                document.getElementById("nameErr").style.display = "none";
                document.getElementById("nameField").style.border = "none";

                return true;

            }


        },

        //validates the user's input message
        validateMessage(){

            //updates the message count with the current character count of the enquiry
            document.getElementById("msgCount").innerHTML = "(" + this.enqMsg.length + "/200)"

            //checks if message string is empty
            if(this.enqMsg == "") {

                //displays error message and disables the submit form button
                document.getElementById("msgErr").style.display = "initial";
                document.getElementById("msgField").style.border = "1px solid #ff5050";

                return false;

            } else {

                //hides error message
                document.getElementById("msgErr").style.display = "none";
                document.getElementById("msgField").style.border = "none";

                return true;

            }


        },
    
        //validates the user's input email
        validateEmail() {

            //assigns regular expression to variable to use in checking email validity
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            //tests whether or not the input email was valid
            var validEmail = regex.test(this.enqEmail);

            //if the email was valid
            if (validEmail) {

                //hides error message
                document.getElementById("emailErr").style.display = "none";
                document.getElementById("emailField").style.border = "none";

                return true;

            } else {

                //displays error message and disables the submit form button
                document.getElementById("emailField").style.border = "1px solid #ff5050";
                document.getElementById("emailErr").style.display = "initial";

                return false;

            }

        },

        //validates the user's input competitor URL
        validateCompURL() {

            //checks if a competitor is to be added
            if(this.enqComp == true) {

                alert("checking url");

                //declares regex test
                const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;

                var validURL = regex.test(this.enqCompURL);

                //if the url was valid
                if (validURL) {

                    //hides error message
                    document.getElementById("compURLErr").style.display = "none";
                    document.getElementById("compURLfield").style.border = "none";

                    alert("URL is all good, chief");

                    return true;

                } else {

                    //displays error message and disables the submit form button
                    document.getElementById("compURLfield").style.border = "1px solid #ff5050";
                    document.getElementById("compURLErr").style.display = "intial";

                    alert("URL sucks, chief");
                    return false;

                }

            }
        },

        //saves all the data to the store and directs the user to the summary page
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

            //0 means form isn't valid, 1 means it is
            var valid = 1;

            //if all the inputs are valid
            if (isNameValid && isEmailValid && isMsgValid) {

                if(document.getElementById("compYes").checked == true) {

                    var validCompURL = this.validateCompURL();

                    //if competitor URL valid
                    //sets variable to true
                    //else sets to false and returns error alert
                    if(validCompURL) {

                        valid = 1;

                    } else {

                        alert("plese check the URL you entered for errors.");

                        valid = 0;

                    }


                } else {

                    valid = 1;

                }

            } else {

                //shows error message
                alert("Please double check your enquiry for any errors.");

                valid = 0;
            
            }


            //checls of dark mode is being used
            if(this.$colorMode.preference == 'dark') {

                //if nothing has been selected from the size dropdown
                //shows error message
                if(document.getElementById('sizeDropdown').selectedIndex == 0) {

                    alert("please pick a size from the selection box.")
                    valid = 0;

                }

            }

            //if size variable is empty
            //shows alert asking user to select size
            if(this.enqSize == "") {

                alert("Please select a size.");
                valid = 0;

            }

            //if the enquiry message is less than 50 characters
            //shows error message
            if(this.enqMsg.length < 50){

                alert("Please ensure your enquiry is at least 50 characters long.");
                valid = 0;

            }    


            //if data is valid, saves to store
            //else shows error message
            if(valid == 1) {

                this.saveStoreData();

            } else {

                alert("Please check your form for errors.")

            }


        },

    },

}
</script>

<style scoped>

    #msgCount {

        text-align: right;

    }

</style>
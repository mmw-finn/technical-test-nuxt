<template>
    <section class="hero">
        <div class="hero-body pageHeader">
            <div class="container">
                
                <span class="iconContainer">
                    <sup><fa :icon="['fas', 'circle']" class="themeIndicator" id="lightTheme" /></sup>
                    <fa :icon="['fas', 'sun']" class="icon" @click="$colorMode.preference = 'light'"/>
                    <fa :icon="['fas', 'moon']" class="icon" @click="$colorMode.preference = 'dark'"/>
                    <sup><fa :icon="['fas', 'circle']" class="themeIndicator" id="darkTheme" /></sup>
                </span>
            
                <h1 class="headTitle">Product Enquiry Web Application</h1>
                <fa :icon="['fas', 'chevron-circle-left']" class="icon backBtn" @click="historyBack()"/>

            </div>
        </div>
    </section>
</template>

<script>
export default {

    props: {

        pageTitle: String,
        
        //0 = include, 1 = show
        backButton: Number


    },
    
    methods: {

        historyBack() {

            this.$router.go(-1);

        }

    }

}
</script>
<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
            <sup><fa :icon="['fas', 'circle']" class="themeIndicator icon lightTheme" /></sup>
            <fa :icon="['fas', 'sun']" class="icon" />
            <fa :icon="['fas', 'moon']" class="icon" />
            <sup><fa :icon="['fas', 'circle']" class="themeIndicator icon darkTheme" /></sup>
            <h1 class="title">Product Enquiry Web Application</h1>
            <fa :icon="['fas', 'chevron-circle-left']" class="icon backBtn" @click="historyBack()"/>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .icon {
       font-size: 2em;
       color: black; 
    }

    .themeIndicator {
        font-size: .75em;
        margin-left: 0;
        margin-right: 0;
        color: pink;
    }

</style>

<script>
export default {
    
    methods: {

        historyBack() {

            this.$router.go(-1);


        }


    }



}
</script>
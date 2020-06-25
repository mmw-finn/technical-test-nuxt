<template>
    <section class="hero">
        <div class="hero-body pageHeader">
            <div class="container">
                
                <!-- holds icons for changing colour themes -->
                <span class="iconContainer">
                    <sup><fa :icon="['fas', 'circle']" class="themeIndicator" id="lightTheme" /></sup>
                    <fa :icon="['fas', 'sun']" class="icon" @click="$colorMode.preference = 'light'"/>
                    <fa :icon="['fas', 'moon']" class="icon" @click="$colorMode.preference = 'dark'"/>
                    <sup><fa :icon="['fas', 'circle']" class="themeIndicator" id="darkTheme" /></sup>
                </span>
            
                <!-- holds the page title to be displayed in the header
                    is passed in as variable to page to be dynamic
                 -->
                <h1 class="headTitle">{{ pageTitle }}</h1>

                <!-- holds the icon for the back button
                    can be toggled on and off by variable passed in to form
                 -->
                <fa :icon="['fas', 'chevron-circle-left']" class="icon backBtn" @click="historyBack()" v-if="backButton === 1"/>

            </div>
        </div>
    </section>
</template>

<script>
export default {

    props: {

        pageTitle: String,
        
        //0 = hide, 1 = show
        backButton: Number


    },
    
    methods: {

        historyBack() {

            //goes back a page
            this.$router.go(-1);

        }

    }

}
</script>

<style scoped>

    /* positions the icon container in the leftmost position */
    .iconContainer {

        left: 0px;
        position: absolute;

    } 

    /* positions back button in rightmost position */
    .backBtn {

    position: absolute;
    right: 0px;

    }

</style>
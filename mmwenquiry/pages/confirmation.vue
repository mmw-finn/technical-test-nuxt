<template>

  <div class="pageContent">

    <!-- page header; passes through the page title and that the back button should not be shown -->
    <div class="header">
      <pageHeader :pageTitle="''" :backButton=0 />
    </div>

    <section class="hero is-full-height has-bg-img">
      <div class="hero-body">
        <div class="container">
          <h1>Thank You</h1>
          <h1>For Your Enquiry!</h1>
          <p>We will be in touch with you soon.</p>

          <nuxt-link to="/" class="button is-large is-rounded">RETURN TO START</nuxt-link>
        </div>
      </div>
    </section>

  </div>

</template>

<script>

import pageHeader from '~/components/headComponent.vue'

export default {
  
  components: {

    pageHeader

  }

}
</script>

<style scoped>


h1 {

  font-weight: 900;
  font-size: 4em;

}

p {

  font-size: 2em;

}


</style>
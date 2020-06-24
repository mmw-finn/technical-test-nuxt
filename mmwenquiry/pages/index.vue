<template>

  <div class="pageContent">

    <div class="header">
      <pageHeader :pageTitle="''" :backButton=0 />
    </div>

    <section class="hero is-full-height has-bg-img">
      <div class="hero-body">
        <div class="container">
          <h1>Mainline Menswear</h1>
          <h1>Front End Technical Test</h1>
          <p>Product Enquiry Web Application</p>

          <nuxt-link to="/menu" class="button is-large is-rounded">START</nuxt-link>
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
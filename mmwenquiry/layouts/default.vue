<template>
  <div>
    <headComponent />
    <main role="main">
      <nuxt/>
    </main> 
  </div>
</template>

<script>
import headComponent from "~/components/headComponent.vue";
export default {
  components: {
    headComponent
  }
};
</script>
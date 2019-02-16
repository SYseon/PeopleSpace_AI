<template>
  <div>
    <reactive-base
      app = "entity"
      url = "https://search-entity-vq4u4jfn4vzumcvld7xprjldzu.us-east-1.es.amazonaws.com/"
    >
      <h1>Hello from ReactiveBase</h1>
      <h3>Search Engine</h3>
      <div class = "container">
        <multi-list
          componentId = "sentiment"
          dataField = "summary.sentiment"
          class = "filter"
          title = "Select sentiment"
          />
      </div>
    </reactive-base>
  </div>
</template>

<script>

</script>


<style scoped>


</style>

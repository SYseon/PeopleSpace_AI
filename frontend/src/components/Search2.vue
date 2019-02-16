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
          componentId = "Sentiment"
          dataField = "summary.sentiment"
          class = "filter"
          title = "Select sentiment"
          selectAllLabel = "All sentiments"
          />
        <multi-list
          componentId = "Emotion"
          dataField = "summary.emotion"
          class = "filter"
          title = "Select emotion"
          selectAllLabel = "All emotions"
          />
        <multi-list
          componentId = "Intent"
          dataField = "summary.intent"
          class = "filter"
          title = "Select intent"
          selectAllLabel = "All intents"
          />
        <data-search
          componentId = "SearchKeyword"
          dataField = "keyword"
          />

        <reactive-list
          componentId = "SearchResult"
          dataField = "productID"
          className = "result-list-container"

          :pagination = "true"
          :from ="0"
          :size = "5"
          :react="{ and: ['Sentiment', 'Emotion', 'Intent','SearchKeyword']}"
        >
          <div slot = "renderData" slot-scope = "{ item }">
            <div class = "review-header">{{item.productID}}</div>
            <div class = "review-content">{{item.content}}</div>
            <div class = "review-url">{{item.url}}</div><br>
          </div>
        </reactive-list>
      </div>
    </reactive-base>
  </div>
</template>

<script>

</script>


<style scoped>


</style>

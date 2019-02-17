<template>
  <div>
    <reactive-base
      app = "entity"
      url = "https://search-entity-vq4u4jfn4vzumcvld7xprjldzu.us-east-1.es.amazonaws.com/"
    >

      <div class = "filters-container">
        <data-search
          componentId = "SearchKeyword"
          dataField = "keyword"
          title = "Search Keyword"
          class = "filter"
          />
        <multi-list
          componentId = "Sentiment"
          dataField = "summary.sentiment"
          class = "filter"
          title = "Select Sentiment"
          selectAllLabel = "All sentiments"
          />
        <multi-list
          componentId = "Emotion"
          dataField = "summary.emotion"
          class = "filter"
          title = "Select Emotion"
          selectAllLabel = "All emotions"
          />
        <multi-list
          componentId = "Intent"
          dataField = "summary.intent"
          class = "filter"
          title = "Select Intent"
          selectAllLabel = "All intents"
          />
        </div>

        <reactive-list
          componentId = "SearchResult"
          dataField = "productID"
          className = "result-list-container"

          :pagination = "true"
          :from ="0"
          :size = "5"
          :react="{ and: ['Sentiment', 'Emotion', 'Intent','SearchKeyword']}"
        >
          <div slot = "renderData" slot-scope = "{ item }" class = "border-review">
            <div class = "review-header"><div class="product-title">{{item.productID}}</div></div>
            <div class = "bar-summary">
              <span class = "sub-title">Sentiment:</span>
                <span class = "member">{{item.summary.sentiment}}</span>
              <span class = "sub-title">Emotion:</span>
                <span class = "member">{{item.summary.emotion}}</span>
              <span class = "sub-title">Intent:</span>
                <span class = "member">{{item.summary.intent}}</span>
            </div>
            <div class = "review-content">{{item.content}}</div>
            <div class = "review-url">{{item.url}}</div><br>
          </div>
        </reactive-list>
    </reactive-base>
  </div>
</template>

<script>
import "./style.css";


</script>


<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.product-title{
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  padding-top: 10px;
}

.border-review{
  border-bottom-style : outset;
}

.bar-summary{

}

.sub-title{
  font-weight: bolder;
  color: gray;
}

.member{
  margin-right: 4px;
  color: green;
}

.review-url{
  color: blue;
}

</style>

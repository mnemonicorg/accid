// mongodb configuration
var source = mongodb({
  "uri": "mongodb://127.0.0.1:27017/test"
})
// Elasticsearch configuration
var sink = elasticsearch({
  "uri": "http://localhost:9200/test"
})
// Get data, transform it, Then save it
t.Source("source", source, "/.*/").Transform(omit({"fields":["grades"]})).Save("sink", sink, "/.*/")  

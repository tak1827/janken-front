import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.use(VueApollo)

const uploadLink = createUploadLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    link: uploadLink,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

export default apolloProvider
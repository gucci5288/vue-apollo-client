import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000',
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  // Cache implementation
  cache:  new InMemoryCache(),
})

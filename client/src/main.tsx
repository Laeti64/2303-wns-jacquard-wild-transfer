import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { setContext } from '@apollo/client/link/context'

import App from './App.tsx'
import './index.css'

const URI = import.meta.env.DEV ? 'http://localhost:4000/graphql' : '/graphql'

const authLink = setContext(async (_, { headers }) => {
  const token = await localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = createHttpLink({
  uri: URI,
  credentials: 'same-origin',
})

const client = new ApolloClient({
  uri: URI,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache', // delete cache
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)

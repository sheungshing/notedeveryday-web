import React from 'react';
import ReactDOM from 'react-dom';

// import Apollo Client libraries
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import {setContext} from 'apollo-link-context';

// global styles
import GlobalStyle from '/components/GlobalStyle';
// import our routes
import Pages from '/pages';

// configure our API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({uri});

// check for a token and return the headers to the context
const authLink = setContext( (_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ' '
    }
  };
});

// configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  // empty resolvers object allow us to perform GraphQL queries on our local cache
  resolvers: {},
  connectToDevTools: true
});

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Pages />
  </ApolloProvider>
);

// check for a local token
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

// write the cache data on initial load
cache.writeData({data});

// write the cache data after cache is reset
client.onClearStore(()=>cache.writeData({data}));

ReactDOM.render(<App />, document.getElementById('root'));

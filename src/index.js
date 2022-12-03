import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// GraphQL
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Styles
import './Assets/fonts/fontFaces.css'


const client = new ApolloClient({
    uri: 'https://api-us-east-1.hygraph.com/v2/clb4nsf6o0a6c01ui8xjqgg4l/master',
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>
);


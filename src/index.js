import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// GraphQL
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Styles
import './Assets/fonts/fontFaces.css'


const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHCMS_URI ,
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>
);


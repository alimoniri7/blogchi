import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_POST_DATA } from '../GraphQL/gqls';

const PostPage = () => {
    const { postSlug } = useParams()

    const {loading, data, error } = useQuery(GET_POST_DATA, {
        variables: {
            slug: postSlug 
        }
    })
    console.log({loading, data, error});

    return (
        <div>
            Posts
        </div>
    );
};

export default PostPage;
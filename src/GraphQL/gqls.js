import { gql } from "@apollo/client";

const GET_CARD_INFO = gql`
    query getCardInfo {
        posts {
            author {
                avatar {
                    url
                }
                name
                slug
            }
            cover {
                url
            }
            title
            updatedAt
            id
            slug
        }
    }
`

const GET_AUTHOR_PREVIEW = gql`
    query getAuthorPreview {
        authors {
            slug
            name
            avatar {
                url
            }
            id
        }
    }
`

const GET_AUTHOR_POSTS_PREVIEW = gql`
    query getAuthorPostsPreview($slug: String!) {
        author(where: {slug: $slug}) {
            posts {
            title
            cover {
                url
            }
            slug
            }
        }
    }
`

const GET_POST_DATA = gql`
    query getPostData($slug: String!) {
        post(where: {slug: $slug}) {
            author {
                avatar {
                    url
                }
                name
                slug
            }
            content {
                html
            }
            cover {
                url
            }
            updatedAt
            title
        }
    }
`

const GET_AHTHOR_DETAILS = gql`
    query getAuthorDetails($slug: String!) {
        author(where: {slug: $slug}) {
            biography {
                html
            }
            avatar {
                url
            }
            createdAt
            name
            profession
        }
    }
`

export { GET_CARD_INFO, GET_AUTHOR_PREVIEW, GET_POST_DATA, GET_AHTHOR_DETAILS, GET_AUTHOR_POSTS_PREVIEW }
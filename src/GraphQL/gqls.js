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
            id
            name
            avatar {
            url
            }
            profession
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

export { GET_CARD_INFO, GET_AUTHOR_PREVIEW, GET_POST_DATA }
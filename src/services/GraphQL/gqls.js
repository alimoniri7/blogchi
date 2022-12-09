import { gql } from "@apollo/client";

const GET_CARD_INFO = gql`
    query MyQuery {
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
        }
    }
`

const GET_AUTHOR_PREVIEW = gql`
    query MyQuery {
    authors {
        slug
        name
        avatar {
        url
        }
        profession
    }
}
`

export { GET_CARD_INFO, GET_AUTHOR_PREVIEW }
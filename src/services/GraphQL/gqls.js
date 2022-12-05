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

export { GET_CARD_INFO }
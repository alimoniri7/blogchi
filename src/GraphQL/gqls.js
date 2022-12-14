import { gql } from "@apollo/client";

// Queries ----------------------------------------------------------------------------------------------------------------------
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
`;

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
`;

const GET_AUTHOR_POSTS_PREVIEW = gql`
  query getAuthorPostsPreview($slug: String!) {
    author(where: { slug: $slug }) {
      posts {
        title
        cover {
          url
        }
        slug
      }
    }
  }
`;

const GET_POST_DATA = gql`
  query getPostData($slug: String!) {
    post(where: { slug: $slug }) {
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
`;

const GET_AHTHOR_DETAILS = gql`
  query getAuthorDetails($slug: String!) {
    author(where: { slug: $slug }) {
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
`;

// let a= 'like_DESC'

const GET_POST_COMMENTS = gql`
  query MyQuery($slug: String!, $orderBy: CommentOrderByInput!, $skip: Int!) {
    post(where: { slug: $slug }) {
      commentS(first: 5, orderBy: $orderBy, skip: $skip) {
        avatar {
          url
        }
        fullName
        like
        description
        id
      }
    }
  }
`;

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Mutations

const POST_COMMENT = gql`
  mutation MyMutation(
    $description: String!
    $email: String!
    $fullName: String!
    $rate: Float!
    $avatar: AssetCreateOneInlineInput = null
    $postSlug: String!
  ) {
    createComment(
      data: {
        fullName: $fullName
        email: $email
        rate: $rate
        description: $description
        avatar: $avatar
        post: { connect: { slug: $postSlug } }
        like: 0
      }
    ) {
      id
    }
  }
`;

const PUBLISH_COMMENT = gql`
  mutation MyMutation($id: ID!) {
    publishComment(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const PUBLISH_AVATAR = gql`
  mutation MyMutation($id: ID!) {
    publishAsset(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const LIKE_COMMENT = gql`
  mutation MyMutation($id: ID!, $likeCount: Float!) {
    updateComment(data: { like: $likeCount }, where: { id: $id }) {
      id
    }
  }
`;

const POST_REPLY = gql`
  mutation MyMutation(
    $description: String!
    $email: String!
    $fullName: String!
    $commentId: ID!
    $avatar: AssetCreateOneInlineInput = null
  ) {
    createReply(
      data: {
        description: $description
        email: $email
        like: 0
        fullName: $fullName
        comment: { connect: { id: $commentId } }
        avatar: $avatar
      }
    ) {
      id
    }
  }
`;

const PUBLISH_REPLY = gql`
  mutation MyMutation($id: ID!) {
    publishReply(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export {
  GET_CARD_INFO,
  GET_AUTHOR_PREVIEW,
  GET_POST_DATA,
  GET_AHTHOR_DETAILS,
  GET_AUTHOR_POSTS_PREVIEW,
  GET_POST_COMMENTS,
  POST_COMMENT,
  PUBLISH_COMMENT,
  PUBLISH_AVATAR,
  LIKE_COMMENT,
  POST_REPLY,
  PUBLISH_REPLY,
};

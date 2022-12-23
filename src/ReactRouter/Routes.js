import { createBrowserRouter } from "react-router-dom";
import AuthorDetailPage from "../components/AuthorDetailPage";
import HomePage from "../components/HomePage";
import Layout from "../components/layout";
import PostPage from "../components/PostPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/posts/:postSlug',
                element: <PostPage/>
            },
            {
                path: '/authors/:authorSlug',
                element: <AuthorDetailPage/>
            }
        ]
    },
])

export default router 
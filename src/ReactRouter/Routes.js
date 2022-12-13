import { createBrowserRouter } from "react-router-dom";
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
            }
        ]
    },
])

export default router 
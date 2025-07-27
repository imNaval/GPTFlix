import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PlayVideo from './PlayVideo'
import MovieDetail from './MovieDetail'
import Error from './Error'
import NotFound from './NotFound'
import AuthForm from './AuthForm'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <AuthForm />
        },
        {
            path: "/browse",
            element: <Browse />
        },
        {
            path: "/detail/:id",
            element: <MovieDetail />
        },
        {
            path: "/watch/:id",
            element: <PlayVideo />
        },
        {
            path: "*",
            element: <NotFound />
        }
        
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';

export default function Body() {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                { path: "/", element: <Feed /> },
                { path: "/profile/:id", element: <Profile /> }  // Correctly define the route with parameter
            ]
        },
        { path: "/login", element: <Login /> },
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
}

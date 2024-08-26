import  { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/user/HomePage"
import RootLayout from "../layout/RootLayout"
import UserLayout from "../layout/UserLayout"
import ErrorPage from "../pages/user/ErrorPage"
import Home from "../pages/user/HomePage"
import LoginPage from "../pages/user/LoginPage"
import SignupPage from "../pages/user/SignupPage"
import UserProfile from "../pages/user/ProfilePage"
import BedforeDetails from "../components/ui/bfProfile"
import AboutPage from "../pages/user/AboutPage"


export const router = createBrowserRouter([

    {
        path: "/",
        element: <RootLayout />,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home />
                },
                {
                    path: "about",
                    element: <AboutPage />
                    },
                {
                    path:"login",
                    element:<LoginPage/>
                },
                {
                    path:"signup",
                    element:<SignupPage/>
                }
                ,
                {
                    path:"profile",
                    element:<UserProfile/>
                }
            ],
},
{
    path: "/user",
    element: <UserLayout />,
    errorElement:<ErrorPage/>,

    children: [
        {
            path: "home",
            element: <HomePage />
            },
            {
                path:"profile",
                element:<UserProfile/>
            },
            {
                path:"bf",
                element:<BedforeDetails/>
            }
            
        ],
    
}
])
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
import UserHomepage from '../pages/user/userHomepage'
import AnnPage from "../pages/user/AnnPage"
import {UserAuth} from "./protectedRoutes/UserAuth"


export const router = createBrowserRouter([





    
    {
        path: "/",
        element: <RootLayout />,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: "/",
                // element: <Home />
                element: <AnnPage />
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
    element:<UserAuth>
<UserLayout />
    </UserAuth> ,
    errorElement:<ErrorPage/>,

    children: [
        {
            path: "home",
            element: <UserHomepage/>
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
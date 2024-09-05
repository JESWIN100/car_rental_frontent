import  { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layout/RootLayout"
import UserLayout from "../layout/UserLayout"
import ErrorPage from "../pages/user/ErrorPage"
import LoginPage from "../pages/user/LoginPage"
import SignupPage from "../pages/user/SignupPage"
import UserProfile from "../pages/user/ProfilePage"
import BedforeDetails from "../components/ui/BfProfile"
import AboutPage from "../pages/user/AboutPage"
import UserHomepage from '../pages/user/userHomepage'
import AnnPage from "../pages/user/AnnPage"
import {UserAuth} from "./protectedRoutes/UserAuth"
import RentCars from "../pages/user/RentCars"
import CarLayout from "../layout/Carlayout"
import WhishListPage from "../pages/user/WhishListPage"
import CarsDetailsPage from "../pages/user/CarsDetailsPage"
import BookingPage from '../pages/user/BookingPage'
import PayemtSuccessPage from "../pages/user/PayemtSuccessPage"
import PaymentLayout from "../layout/PaymentLayout"
import TotalAmountDisplay from "../components/ui/TotalAmountDisplay"
import CarRentalInfo from "../components/ui/CarRentalInfo"
import LoginLayout from "../layout/LoginLayout"
import BookingList from "../pages/user/BookingList"
import AdminLoginPage from "../pages/admin/AdminLoginPage"
import AdminLayout from "../layout/AdminLayout"
import AdminDashboardPage from "../pages/admin/AdminDashboardPage"
import AdminCars from "../pages/admin/AdminCars"


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
                // {
                //     path:"login",
                //     element:<LoginPage/>
                // },
                // {
                //     path:"signup",
                //     element:<SignupPage/>
                // }
                
                // {
                //     path:"profile",
                //     element:<UserProfile/>
                // },
               
            ],
},
 
{
  path: "/",
  element: <LoginLayout />,
  errorElement:<ErrorPage/>,
  children: [
     
          {
              path:"login",
              element:<LoginPage/>
          },
          {
              path:"signup",
              element:<SignupPage/>
          }
          
         
      ],
},
{
    path: "/user",
    element: <UserAuth><UserLayout /></UserAuth>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <UserHomepage />
      },
      // {
      //   path: "profile",
      //   element: <UserProfile />
      // },
      {
        path: "bf",
        element: <BedforeDetails />
      }
    ],
  },
  {
    path: "/user",
    errorElement: <ErrorPage />,
    children: [
     
      {
        path: "profile",
        element: <UserProfile />
      }
    
    ],
  },
  {
    path: "*",
    element: <ErrorPage />, // 404 Error Page
  },
{
    path: "/car",
    element:<CarLayout />, 

    errorElement:<ErrorPage/>,

    children: [
        {
            path: "carslist",
            element: <RentCars/>

            },
            {
              path: "car-details/:id",
              element:<CarsDetailsPage/>
            },
            {
                path:"wishlist",
                element:<WhishListPage/>

            },
            {
              path: "carBookInfo/:CarId",
              element: <CarRentalInfo/>
            },
            {
              path: "bookinglist",
              element: <BookingList/>
            },
            
        ],
    
},
{
  path: "/payment",
  element:<PaymentLayout />, 
  errorElement:<ErrorPage/>,

  children: [
{
  path: "book/:id/",
  element: <BookingPage/>
},
    

      {
          path: "sucess",
          element: <PayemtSuccessPage/>

          }
          
          
      ],
  
},


{
  path: "/admin",
  element:<PaymentLayout />, 
  errorElement:<ErrorPage/>,

  children: [
{
  path: "login",
  element: <AdminLoginPage/>
},
    
          
          
      ],
  
},
{
  path: "/admin",
  element:<AdminLayout />, 
  errorElement:<ErrorPage/>,

  children: [

{
  path: "dashboard",
  element: <AdminDashboardPage/>
  },
  {
    path: "cars",
    element: <AdminCars/>
    },
          
          
      ],
  
}



])
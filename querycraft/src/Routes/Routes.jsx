import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
// import Home from "../pages/Home/Home/Home";



import HeroResiter from "../pages/HeroResister/HeroResiter";
import Courses from "../pages/Courses/Courses";
import Events from "../pages/Events/Events";
import Notifications from "../pages/Notifications/Notifications";
import ProfileSection from "../pages/ProfileSection/ProfileSection";
import Students from "../pages/Students/Student";
import AddStudent from "../pages/AddStudent/AddStudent";
import Login from "../pages/Login/Login";
import MyCourses from "../pages/MyCourses/MyCourses";

   export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        // {
        //     path:'/',
        //     element:<Home></Home>
        // },
      
        {
          path:'/students',
          element:<Students></Students>
        },
        {
          path:'/courses',
          element:<Courses></Courses>
        },
        {
          path:'/events',
          element:<Events></Events>
        },
        {
          path:'/notifications',
          element:<Notifications></Notifications>
        },
        {
          path:'/profilesection',
          element:<ProfileSection></ProfileSection>
        },
        {
          path:'/heroRegister',
          element:<HeroResiter></HeroResiter>
        },
        {
          path: '/addStudent',
          element: <AddStudent/>
        },
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: '/myCourses',
          element: <MyCourses/>
        }
      ]
    },
  ]);
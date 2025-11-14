import { createBrowserRouter } from 'react-router-dom';
import { HomeLayout } from "../components";
import Home from "../pages/Home";
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Forgotpassword from '../pages/auth/Forgotpassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';
import ProfileSetup from '../pages/auth/ProfileSetup';

const routes = [
   {
      path: '/register',
      element: <Register />
   },
   {
      path: "/login",
      element: <Login />
   },
   {
      path: "forgot-password",
      element: <Forgotpassword />
   },
   {
      path: "reset-password",
      element: <ResetPassword />
   },
   {
      path: "verify/:token",
      element: <VerifyEmail />
   },
   {
      path: "/profile-setup",
      element: <ProfileSetup />
   },
   {
      path: "/",
      element: <HomeLayout />,
      children: [
         {
            index: true,
            element: <Home />
         },
      ]
   }
];

export const Element = createBrowserRouter(routes);
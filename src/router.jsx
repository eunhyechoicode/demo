import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import LogIn from './pages/LogIn/LogIn';

const router = createBrowserRouter(
    [
        {
            path: '/',
            errorElement: <ErrorPage />,
            element: <Home />,
        },
        {
            path: '/home',
            element: <Home />,
        },
        {
            path: '/login',
            element: <LogIn />,
        },
        {
            path: '/about',
            element: <About />,
        },
    ],
    {
        future: {
            v7_startTransition: true,
            v7_normalizeFormMethod: true,
            v7_prependBasename: true,
        },
    }
);

export default router
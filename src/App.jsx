import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  }
], {
  future: {
    v7_startTransition: true,
    v7_normalizeFormMethod: true,
    v7_prependBasename: true
  }
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;

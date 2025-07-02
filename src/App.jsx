import { RouterProvider } from 'react-router-dom';
import router from './router.jsx'
import { AnalyticsProvider } from "./analytics";

function App() {
  return (
      <AnalyticsProvider>
          <RouterProvider router={router}/>
      </AnalyticsProvider>
  );
}

export default App;

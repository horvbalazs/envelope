import { Navigate, createBrowserRouter } from 'react-router-dom';
import Error from './components/Error';
import View from './components/View';
import Generate from './components/Generate';

export const router = createBrowserRouter([
  {
    path: '/generate',
    element: <Generate />,
  },
  {
    path: '/view',
    element: <View />,
  },
  {
    path: '/message-error',
    element: <Error code={400} />,
  },
  {
    path: '/',
    element: <Navigate to="/generate" replace />,
  },
  {
    path: '*',
    element: <Error code={404} />,
  },
]);

import Home from './Components/Home' ;
import { fetchData } from './Api/Api';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout';
import Today from './page/Today';

export default  function App(){
   const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: ({ request }) => {
            const url = new URL(request.url);
            const city = url.searchParams.get('city') || 'Moscow';
            return fetchData(city);
          }
        },
        {
            path:'today' ,element:<Today/>}
      ]
    }
  ]);

  return(
    <RouterProvider router={router}/>
  )
}
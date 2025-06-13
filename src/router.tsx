import {createBrowserRouter} from 'react-router-dom' 
import Layout from './layouts/Layout'
import Products, {loader as productsLoader, action as updateAvailabilityAction} from './views/Products'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, {loader as editProductLoader, action as editProductAction} from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'

// This file sets up the routing for the application using React Router.
// It defines a single route that renders the Layout component, which contains an Outlet for nested routes.
// The Products component is rendered as the default child route when the user visits the root path ('/').
// The Outlet component is used to render the child routes within the Layout component.
// The createBrowserRouter function is used to create a router instance that can be used in the application.
export const router = createBrowserRouter([ 
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, 
        // This is the default route when the user visits the root path
        element: <Products />,
        loader: productsLoader, // This function can be used to fetch data before rendering the component
        action: updateAvailabilityAction // This function handles the form submission and updates the product availability on the server
      },
      {
        path: 'products/new',
        element: <NewProduct />,
        action: newProductAction
      },
      {
        path: 'products/:id/edit', //ROA pattern for editing a product
        element: <EditProduct />,
        loader: editProductLoader, // This function can be used to fetch data before rendering the component
        // The loader function fetches the product data based on the ID from the URL parameters.
        action: editProductAction // This function handles the form submission and updates the product data on the server
      }, 
      {
        path: 'products/:id/delete',
        action: deleteProductAction // This function handles the deletion of a product
      }
    ]
  }
])
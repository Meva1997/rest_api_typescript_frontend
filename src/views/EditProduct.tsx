import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";


// This file defines the EditProduct component, which allows users to edit an existing product.
// It uses the Form component from react-router-dom to create a form for editing the product details.
// The loader function fetches the product data based on the ID from the URL parameters.
// The action function handles the form submission and updates the product data on the server.
export async function loader({params} : LoaderFunctionArgs){

  if(params.id !== undefined) { // Check if the id parameter is provided
    // If the id parameter is provided, fetch the product by its id
    // This is useful for editing an existing product, where you need to retrieve the current product details.
    const product = await getProductById(+params.id) 
    if(!product){
      throw new Response('', {status: 404, statusText: 'Product not found'})
    }

    return product 
  }
}

// This function is used to load the product data for editing based on the id parameter from the URL.
// It retrieves the product details from the server to pre-fill the form for editing.
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = '';

  // Validate fields
  if(Object.values(data).includes('')) {
    error = 'All fields are required'; // Check if any field is empty
  }

  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    // Pass the correct types directly to updateProduct
    await updateProduct(data, +params.id); // Call the service to update the product
    return redirect('/'); // Redirect to the Products page after successful update
  }
}

const availabilityOptions = [
  { name: 'Available', value: true},
  { name: 'Not Available', value: false}
]

export default function EditProduct() {

  const product = useLoaderData() as Product; // Use the loader data to get the product details for editing

  const error = useActionData() as string ; // Use the action data to handle errors or success messages
  // The useActionData hook retrieves the data returned from the action function, which can be used to display error messages or success notifications.

  // const {state} = useLocation(); // Use useLocation to access the current location
  // This hook provides information about the current URL, which can be useful for conditional rendering or navigation.

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Edit Product</h2>
        <Link
          to="/"
          className='p-3 text-sm font-bold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500'
        > {/* The Link component from react-router-dom is used to navigate to the Products page. */}
          Return to Products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="post" > {/* The Form component from react-router-dom is used to create a form that submits data to the server.*/}
 
        <ProductForm 
          product={product} // Pass the product data to the ProductForm component for pre-filling the form fields
        />

        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="availability"
            >Availability:</label>
            <select 
                id="availability"
                className="block w-full p-3 mt-2 bg-gray-50"
                name="availability"
                defaultValue={product?.availability.toString()}
            >
                {availabilityOptions.map(option => (
                  <option key={option.name} value={option.value.toString()}>{option.name}</option>
                ))}
            </select>
        </div>

        <input
          type="submit"
          className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
          value="Save Changes"
        />
      </Form>
    </>
  )
}

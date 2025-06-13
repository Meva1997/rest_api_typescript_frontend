import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData());
  let error = ''
  if(Object.values(data).includes('')) {
    error = 'All fields are required'
  }

  if(error.length){
    return error
  }

  await addProduct(data) // Call the service to add the product
  // If the product is added successfully, you can redirect or return a success message
  
  return redirect('/'); // Redirect to the Products page after successful addition
}

export default function NewProduct() {

  const error = useActionData() as string ; // Use the action data to handle errors or success messages
  // The useActionData hook retrieves the data returned from the action function, which can be used to display error messages or success notifications.

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Register Product</h2>
        <Link
          to="/"
          className='p-3 text-sm font-bold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500'
        > {/* The Link component from react-router-dom is used to navigate to the Products page. */}
          Return to Products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="post" > {/* The Form component from react-router-dom is used to create a form that submits data to the server.*/}
 
        <ProductForm />
        
        <input
          type="submit"
          className="w-full p-2 mt-5 text-lg font-bold text-white bg-indigo-600 rounded cursor-pointer"
          value="Register New Product"
        />
      </Form>
    </>
  )
}
 
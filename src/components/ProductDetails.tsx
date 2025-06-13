import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom";
import type { Product } from "../types"
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product
}

export async function action({params} : ActionFunctionArgs){
  if(params.id !== undefined){
   
    await deleteProduct(+params.id)
    return redirect("/"); // Redirect to the home page after the action is completed
  }

}

export default function ProductDetails({product} : ProductDetailsProps) {

  const fetcher = useFetcher(); // Use fetcher to handle form submissions and data fetching
  const navigate = useNavigate(); // Use useNavigate to programmatically navigate if needed
  // This hook allows you to navigate to different routes programmatically, which can be useful for redirecting after actions like editing or deleting a product.
  // Use fetcher.data to get the updated product availability after form submission
  const isAvailable = product.availability 

  return (
    
    <>
      <tr className="text-center border-b">
        <td className="p-3 text-lg text-gray-800">
          {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
          {product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </td>
        <td className="p-3 text-lg text-gray-800">

          <fetcher.Form method="POST" > 
            <button type="submit" name="id" value={product.id} className={`${isAvailable ? 'text-green-600' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}>
            {isAvailable ? (
              <span>Available</span>
                ) : (
                  <span>Unavailable</span>
                )}
            </button>
          </fetcher.Form>

          
        </td>
        <td className="p-3 text-lg text-gray-800 ">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(`/products/${product.id}/edit`)} // Use navigate to go to the edit page
              className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-500"
            >Edit</button>
            <Form className="w-full" method="post" action={`/products/${product.id}/delete`} onSubmit={(e) => {
              if(!confirm("Are you sure you want to delete this product?")) {
                e.preventDefault(); // Prevent the form submission if the user cancels
            }}
            }>
              {/* The Form component is used to handle form submissions in React Router. */}
              <input type="submit" value="Delete" className="w-full p-2 text-xs font-bold text-center text-white uppercase bg-red-600 rounded-lg cursor-pointer hover:bg-red-500"/>
            </Form>
          </div>
        </td>
      </tr> 
    </>
  )
}

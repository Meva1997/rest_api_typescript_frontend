import type { Product } from "../types"

type ProductFormProps = {
  product?: Product
}

export default function ProductForm({product}: ProductFormProps) {
  return (
    <>
      <div className="mb-4">
        <label
            className="text-gray-800"
            htmlFor="name"
        >Name of Product:</label>
        <input 
            id="name"
            type="text"
            className="block w-full p-3 mt-2 bg-gray-50"
            placeholder="Name of Product"
            name="name"
            defaultValue={product?.name} // Use defaultValue to pre-fill the input with the current product name
            // The defaultValue prop is used to set the initial value of the input field, allowing users to edit the existing product name.
        />
      </div>
      <div className="mb-4">
        <label
            className="text-gray-800"
            htmlFor="price"
        >Price:</label>
        <input 
            id="price"
            type="number"
            className="block w-full p-3 mt-2 bg-gray-50"
            placeholder="Price of the Product. ej. 200, 300"
            name="price"
            defaultValue={product?.price} // Use defaultValue to pre-fill the input with the current product price
            // The defaultValue prop is used to set the initial value of the input field, allowing users to edit the existing product price.
        />
      </div>
    </>
  )
}

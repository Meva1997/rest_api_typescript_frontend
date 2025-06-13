import { safeParse, number, parse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product} from "../types";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue; 
}

export async function addProduct(data : ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name, // Extract the name from the FormData
      price: +data.price // Convert the price to a number
    }) // Validate the data against the schema
    if(result.success){
      const url = `${import.meta.env.VITE_API_URL}/api/products` // Define the API endpoint
      axios.post(url, {
        name: result.output.name, // Use the validated name
        price: result.output.price // Use the validated price
      })
      
    } else {
      throw new Error("Invalid product data");
    }

  } catch (error) {
    console.error("Error adding product:", error);
  }
}

export async function getProducts(){
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`; // Define the API endpoint
    const {data} = await axios.get(url); // Fetch the products from the API
    const result = safeParse(ProductsSchema, data.data); // Validate the fetched data against the schema
    if(result.success){
      return result.output; // Return the validated products
    } else {
      throw new Error("Invalid products data");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function getProductById(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`; // Define the API endpoint
    const {data} = await axios.get(url); // Fetch the products from the API
    const result = safeParse(ProductSchema, data.data); // Validate the fetched data against the schema
    if(result.success){
      return result.output; // Return the validated products
    } else {
      throw new Error("Invalid products data");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function updateProduct(data: ProductData, id: Product['id']) {

  try {
    // Directly parse the price as a number
    const price = parse(number(), Number(data.price));

    const result = safeParse(ProductSchema, {
      id,
      name: data.name, // Extract the name from the FormData
      price, // Use the parsed price
      availability: toBoolean(data.availability.toString()) // Convert the availability to a boolean
    })

    if(result.success){
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`; // Define the API endpoint
      await axios.put(url, result.output); // Send the validated data to the API
    } else {
      throw new Error("Invalid product data");
    }

  } catch (error) {
    console.error("Error updating product:", error);
  }
  
} 

export async function deleteProduct(id: Product['id']){

  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`; // Define the API endpoint
    await axios.delete(url); // Send a DELETE request to the API
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

export async function updateProductAvailability(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`; // Define the API endpoint
    await axios.patch(url)
  } catch (error) {
    console.error("Error updating product availability:", error);
  }
}
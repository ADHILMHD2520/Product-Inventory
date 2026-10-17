import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError("")

            const response = await axios.get(
                `http://localhost:5000/api/products`
            )

            setProducts(response.data.products)

        } catch (error) {
            console.log(`fetching products error ==== ${error}`)
            setError("Failed to fetch products")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        )

        if (!confirmDelete) {
            return
        }

        try {

            await axios.delete(
                `http://localhost:5000/api/products/${id}`
            )

            fetchProducts()

        } catch (error) {
            console.log(`delete product error ==== ${error}`)
            setError("Failed to delete product")
        }
    }


    if (loading) {
        return <h2>Loading products...</h2>
    }


    return (
        <div>

            <h1>Product List</h1>

            {error && (
                <p>{error}</p>
            )}

            <Link to="/product/new">
                <button>
                    Add Product
                </button>
            </Link>


            {products.length === 0 ? (

                <p>No products found</p>

            ) : (

                <table border="1">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>

                        {products.map((product) => (

                            <tr key={product._id}>

                                <td>
                                    {product.name}
                                </td>

                                <td>
                                    {product.category}
                                </td>

                                <td>
                                    ₹{product.price}
                                </td>

                                <td>
                                    {product.quantity}
                                </td>

                                <td>

                                    <Link
                                        to={`/product/${product._id}/edit`}
                                    >
                                        <button>
                                            Edit
                                        </button>
                                    </Link>


                                    <button
                                        onClick={() =>
                                            handleDelete(product._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    )
}

export default ProductList
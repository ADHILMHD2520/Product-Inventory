import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchProduct = async () => {
    try {

      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      )

      const product = response.data.product

      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category
      })

    } catch (error) {
      console.log("fetch product error", error)
      setError("Failed to fetch product")
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.quantity ||
      !formData.description
    ) {
      setError("Please fill all the data")
      return
    }

    try {

      setLoading(true)

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          quantity: Number(formData.quantity)
        }
      )

      alert("Product updated successfully")

      navigate("/products")

    } catch (error) {

      console.log("update product error", error)

      setError(
        error.response?.data?.message ||
        "Failed to update product"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      <h1>Edit Product</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

      </form>

    </div>
  )
}

export default EditProduct
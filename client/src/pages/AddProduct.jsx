import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  })
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.quantity ||
      !formData.description
    ) {
      setError("plz fill the data")
      return
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/products", {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        quantity: formData.quantity,
        description: formData.description
      })
      alert("product added successfully");
    } catch (error) {
      console.log("adding product error", error);
    }
  }


  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="category">category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="price">price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="quantity">quantity</label>
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
        >
          Submit
        </button>

      </form>
    </div>
  )
}

export default AddProduct
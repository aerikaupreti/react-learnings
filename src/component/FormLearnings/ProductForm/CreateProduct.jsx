import { useState } from "react";
import "./createProductForm.css";

const initialForm = {
  name: "",
  description: "",
  category: "Electronics",
  price: "",
  stock: "",
  brand: "",
  condition: "New",
  imageUrl: "",
  available: true,
  featured: false,
};

const CreateProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [productId, setProductId] = useState(null);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "loading",
      message: "Submitting product...",
    });

    setProductId(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create product.");
      }

      const result = await response.json();

      setStatus({
        type: "success",
        message: "Product created successfully!",
      });

      setProductId(result.id);

      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <main className="product-page">
      <section className="product-intro">
        <p className="eyebrow">Admin Panel</p>

        <h1>Create Product</h1>

        <p>Add a new product by providing the required product information.</p>
      </section>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Product Name */}
          <label className="field field-wide">
            Product Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Enter product name"
              required
            />
          </label>

          {/* Product Description */}
          <label className="field field-wide">
            Product Description
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Enter product description"
              rows="5"
              required
            />
          </label>

          {/* Category */}
          <label className="field">
            Category
            <select
              name="category"
              value={form.category}
              onChange={updateField}
            >
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Grocery</option>
              <option>Furniture</option>
            </select>
          </label>

          {/* Price */}
          <label className="field">
            Price
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={updateField}
              placeholder="Enter price"
              min="0"
              required
            />
          </label>

          {/* Stock Quantity */}
          <label className="field">
            Stock Quantity
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={updateField}
              placeholder="Enter stock quantity"
              min="0"
              required
            />
          </label>

          {/* Brand */}
          <label className="field">
            Brand
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={updateField}
              placeholder="Enter brand"
              required
            />
          </label>

          {/* Product Condition */}
          <fieldset className="field field-wide">
            <legend>Product Condition</legend>

            <div className="radio-group">
              {["New", "Used", "Refurbished"].map((condition) => (
                <label className="radio-option" key={condition}>
                  <input
                    type="radio"
                    name="condition"
                    value={condition}
                    checked={form.condition === condition}
                    onChange={updateField}
                  />

                  {condition}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Product Image URL */}
          <label className="field field-wide">
            Product Image URL
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={updateField}
              placeholder="https://example.com/product.jpg"
              required
            />
          </label>

          {/* Available for Sale */}
          <label className="checkbox-option">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={updateField}
            />
            Available for Sale
          </label>

          {/* Featured Product */}
          <label className="checkbox-option">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={updateField}
            />
            Featured Product
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Submitting..." : "Create Product"}
          </button>

          {/* Status Message */}
          {status.message && (
            <div className={`form-status ${status.type}`} role="status">
              <p>{status.message}</p>

              {status.type === "success" && productId && (
                <p>
                  <strong>Demo Product ID:</strong> {productId}
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateProduct;

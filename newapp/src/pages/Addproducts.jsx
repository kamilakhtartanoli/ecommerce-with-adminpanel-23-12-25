import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dmzlakscw/upload";
const UPLOAD_PRESET = "ecommerce-admin-panel";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    gender: "",
    price: "",
    images: [],
    sizes: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

  // Handle input fields
  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setForm((prev) => {
      if (prev.sizes.includes(size)) {
        return { ...prev, sizes: prev.sizes.filter((s) => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size] };
      }
    });
  };

  // Handle file upload input
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  // Upload images → Cloudinary
  const uploadImages = async () => {
    const uploadedUrls = [];

    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "products");

      const res = await axios.post(CLOUDINARY_URL, formData);
      uploadedUrls.push(res.data.secure_url);
    }

    return uploadedUrls;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls = [];
      if (selectedFiles.length > 0) {
        imageUrls = await uploadImages();
      }

      await axios.post("http://localhost:8000/api/product", {
        ...form,
        images: imageUrls,
      });

      toast.success("Product added successfully!");

      // Reset form
      setForm({
        name: "",
        description: "",
        category: "",
        gender: "",
        price: "",
        images: [],
        sizes: [],
      });

      setSelectedFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Error adding product");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-[#050fb9] mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={updateField}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block font-medium mb-1">Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Select multiple images (20–30kb recommended)
            </p>
          </div>

          {/* Sizes */}
          <div>
            <label className="block font-medium mb-1">Available Sizes</label>
            <div className="flex flex-wrap gap-4">
              {sizesList.map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg font-semibold text-white
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#050fb9] hover:bg-[#040c8f]"}
            `}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </main>
  );
};

export default AddProduct;

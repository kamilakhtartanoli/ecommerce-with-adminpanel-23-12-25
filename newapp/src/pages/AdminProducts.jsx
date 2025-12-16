import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const getdata = async () => {
      try {
        const resp = await axios.get("http://localhost:8000/api/allproducts");
        setProducts(resp.data.products || resp.data);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    getdata();
  }, []);

  const handledelete = async (id) => {
    if (!window.confirm("are you sure, you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:8000/api/deleteproduct/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("product deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-bold text-[#050fb9] mb-6">All Products</h1>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-lg">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full table-auto">
            <thead className="bg-[#050fb9] text-white">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Sizes</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-slate-300 hover:bg-gray-100 transition"
                >
                  {/* Image */}
                  <td className="p-3">
                    <img
                      src={p.images?.[0]}
                      alt={p.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>

                  {/* Name */}
                  <td className="p-3 font-semibold">{p.name}</td>

                  {/* Category */}
                  <td className="p-3">{p.category}</td>

                  {/* Gender */}
                  <td className="p-3 capitalize">{p.gender}</td>

                  {/* Price */}
                  <td className="p-3 font-bold text-[#050fb9]">
                    Rs. {p.price}
                  </td>

                  {/* Sizes */}
                  <td className="p-3">{p.sizes.join(" , ")}</td>

                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/updatedproduct/${p._id}`)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handledelete(p._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AdminProducts;

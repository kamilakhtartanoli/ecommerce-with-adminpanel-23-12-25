import React from "react";
import { Link } from "react-router-dom";
import { FaBoxes, FaEdit, FaTrash, FaShoppingCart } from "react-icons/fa";

const Admindashboard = () => {
  return (
    <main className="min-h-screen ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#050fb9] mb-6">
          Admin Dashboard
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* All Products */}
          <Card
            title="All Products"
            desc="View and manage all products in store."
            icon={<FaBoxes className="text-3xl" />}
            to="/admin/products"
          />

          {/* Edit Product */}
          <Card
            title="Add Product"
            desc="Add products"
            icon={<FaEdit className="text-3xl" />}
            to="/admin/add"
          />
          {/* Orders */}
          <Card
            title="Orders"
            desc="Track and manage customer orders."
            icon={<FaShoppingCart className="text-3xl" />}
            to="/admin/orders"
          />
        </div>
      </div>
    </main>
  );
};

export default Admindashboard;

function Card({ title, desc, icon, to }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#dfe3ff] hover:shadow-2xl transition-shadow">
      <div className="w-14 h-14 flex items-center justify-center bg-[#dfe3ff] text-[#050fb9] rounded-xl mb-4 shadow-sm">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-[#050fb9]">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{desc}</p>

      <Link
        to={to}
        className="mt-5 inline-block bg-[#050fb9] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#040c8f] shadow-md transition"
      >
        Open
      </Link>
    </div>
  );
}

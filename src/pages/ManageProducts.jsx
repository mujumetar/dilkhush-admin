import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, ArrowLeft, Package } from 'lucide-react';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch products error:', err);
      setError(`Error fetching products: ${err.message}`);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form data
    if (!formData.name || !formData.slug || !formData.category || !formData.price || !formData.stock) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/admin/products/${editingId}`
        : `${import.meta.env.VITE_API_URL}/admin/products`;
      const method = editingId ? 'PUT' : 'POST';
      const token = localStorage.getItem('adminToken'); // Retrieve token

      let body;
      let headers = { Authorization: `Bearer ${token}` };

      if (formData.image || !editingId) {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('slug', formData.slug);
        data.append('category', formData.category);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        if (formData.description) data.append('description', formData.description);
        if (formData.image) data.append('image', formData.image);
        body = data;
      } else {
        body = JSON.stringify({
          name: formData.name,
          slug: formData.slug,
          category: formData.category,
          price: formData.price,
          stock: formData.stock,
          description: formData.description,
        });
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, { method, headers, body });

      if (!response.ok) {
        let errorMessage = 'Unknown error';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || `HTTP ${response.status}`;
        } catch {
          errorMessage = `HTTP ${response.status}: Failed to ${editingId ? 'update' : 'add'} product`;
        }
        throw new Error(errorMessage);
      }

      await fetchProducts();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error('Submit product error:', err);
      setError(`Error: ${err.message}`);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description || '',
      image: null,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete product');
      }
      await fetchProducts();
    } catch (err) {
      console.error('Delete product error:', err);
      setError(`Error deleting product: ${err.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      image: null,
    });
    setEditingId(null);
  };

  return (
    <div className="bg-transparent">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-8 h-8 text-blue-600" /> Manage Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Add, edit, and manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-6 rounded-xl text-sm flex items-start gap-3">
          <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 animate-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm"
                    required
                    min="0"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm resize-none"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium text-sm"
              >
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500 text-sm">Get started by adding a new product to your catalog.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{product.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${product.stock > 10 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{product.slug}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors bg-gray-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <p className="font-semibold text-gray-900">₹{product.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Stock</p>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${product.stock > 10 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {product.stock}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Category:</span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProducts;

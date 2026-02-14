import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Package, MessageSquare, ShoppingCart, BarChart3, Plus, Edit2, Trash2, X, ArrowLeft, Book, AlertCircle, Mail, MailCheck, Users, Users2, Send, MapPin, SendHorizonalIcon, RefreshCw, XCircle, CheckCircle2, Gift, Percent, IndianRupee, Calendar } from 'lucide-react';
import NotFound from './components/NotFound';
import axios from 'axios';
// import { AlertCircle } from 'lucide-react';

// Admin Dashboard Component
const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Manage Slider',
      icon: Package,
      color: 'from-yellow-500 to-yellow-600',
      path: '/sliders',
      description: 'Add & manage homepage slider'
    },
    { title: 'Ingredients Control', icon: Package, color: 'from-pink-500 to-pink-600', path: '/ingredients', description: 'Add Sesame, Spices, Prices, Variants' },
    { title: 'Custom Mix Orders', icon: ShoppingCart, color: 'from-teal-500 to-teal-600', path: '/custom-orders', description: 'View & manage user-built mixes' },
    { title: 'Manage Products', icon: Package, color: 'from-blue-500 to-blue-600', path: '/products', description: 'Add, edit, your product inventory' },
    { title: 'Reminders', icon: SendHorizonalIcon, color: 'from-blue-500 to-blue-600', path: '/send-emails', description: 'send emails to customers' },
    { title: 'Manage Contacts', icon: MessageSquare, color: 'from-purple-500 to-purple-600', path: '/contacts', description: 'Review and manage inquiries' },
    // Inside the cards array in AdminDashboard component, add this:
    {
      title: 'Coupon Codes',
      icon: Gift,                     // ← add this import at the top
      color: 'from-pink-500 to-pink-600',
      path: '/coupons',
      description: 'Create & manage discount coupons'
    },

    {
      title: 'Distributors',
      icon: MapPin, color: 'from-blue-500 to-blue-600',
      path: '/distributors',
      description: 'add distributors'
    },
    { title: 'Manage Orders', icon: ShoppingCart, color: 'from-green-500 to-green-600', path: '/orders', description: 'Track, update, and manage orders' },
    { title: 'Manage Blogs', icon: Book, color: 'from-indigo-500 to-indigo-600', path: '/blogs', description: 'Create and manage blog posts' },
    { title: 'Analytics Dashboard', icon: BarChart3, color: 'from-orange-500 to-orange-600', path: '/analytics', description: 'View business insights and metrics' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminLoggedIn');
              window.location.href = '/admin';   // forces a full reload → Login page
            }}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <X className="w-5 h-5" /> Logout
          </button>
          <p className="text-gray-600">Manage your e-commerce platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} onClick={() => navigate(card.path)} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                  <div className="p-6">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${card.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // ── HARD‑CODED CREDENTIALS ───────────────────────────────────────
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = 'admin123';
    // ─────────────────────────────────────────────────────────────────────

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Store a tiny flag so the rest of the app knows we’re logged‑in
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition transform hover:scale-105"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-500">
          {/* Demo credentials: <strong>admin</strong> / <strong>admin123</strong> */}
        </p>
      </div>
    </div>
  );
};


// Manage Products Component
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
              <p className="text-gray-600">Add, edit, and manage your product catalog</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.slug}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{product.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">₹{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Manage Contacts Component
const ManageContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch contacts error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingId ? `${import.meta.env.VITE_API_URL}/admin/contacts/${editingId}` : `${import.meta.env.VITE_API_URL}/admin/contacts`;
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${editingId ? 'update' : 'add'} contact`);
      }
      await fetchContacts();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error('Submit contact error:', err);
      setError(err.message);
    }
  };

  const handleEdit = (contact) => {
    setFormData({ name: contact.name, email: contact.email, message: contact.message });
    setEditingId(contact._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete contact');
      }
      await fetchContacts();
    } catch (err) {
      console.error('Delete contact error:', err);
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Contacts</h1>
              <p className="text-gray-600">Review and manage customer inquiries</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Cancel' : 'Add Contact'}
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Contact' : 'Add New Contact'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  {editingId ? 'Update Contact' : 'Add Contact'}
                </button>
                <button
                  type="button"
                  onClick={() => { resetForm(); setShowForm(false); }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-500">No contacts found.</p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div key={contact._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleEdit(contact)}
                      className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700">{contact.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
// === MANAGE INGREDIENTS ===


// === CUSTOM MIX ORDERS ===
const CustomMixOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = 'https://dilkhush-api.vercel.app';

  useEffect(() => {
    fetch(`${API}/custom/order`)
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/custom/order/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
  };

  const sendWhatsApp = (phone, name, total) => {
    const msg = `Hello ${name}! Your custom mix order (₹${total}) is ready! Collect from Dilkhush Kirana.`;
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-lg"><ArrowLeft className="w-6 h-6" /></button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Custom Mix Orders</h1>
            <p className="text-gray-600">Users built their own mix — like Domino's!</p>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? <p>Loading orders...</p> : orders.length === 0 ? <p>No custom orders yet</p> : orders.map(order => (
            <div key={order._id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{order.customerName}</h3>
                  <p>₹{order.totalPrice} • {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Phone: {order.customerPhone}</p>
                </div>
                <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)} className="px-4 py-2 border rounded-lg">
                  <option>Pending</option><option>Confirmed</option><option>Preparing</option><option>Ready</option><option>Delivered</option>
                </select>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {order.selectedIngredients.map((item, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-semibold">{item.ingredientId.name}</p>
                    <p className="text-sm">{item.variant} • {item.quantity}kg • ₹{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => sendWhatsApp(order.customerPhone, order.customerName, order.totalPrice)} className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                  WhatsApp
                </button>
                <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                  Print Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Manage Orders Component
const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    totalAmount: '',
    status: 'Pending',
    paymentStatus: 'Pending',
    shippingAddress: { street: '', city: '', state: '', zip: '', country: '' },
    billingAddress: { street: '', city: '', state: '', zip: '', country: '' },
    notes: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH FROM YOUR REAL API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch orders');

      let data = await response.json();

      // MAP & NORMALIZE DATA (this is the only new part)
      const normalizedOrders = data.map(order => ({
        ...order,
        // Capitalize status (your API returns "pending", "Shipped", etc.)
        status: order.status
          ? order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()
          : 'Pending',

        // Auto-detect payment status if missing
        paymentStatus: order.paymentStatus
          ? order.paymentStatus
          : order.razorpayPaymentId
            ? 'Paid'
            : 'Pending',
      }));

      setOrders(normalizedOrders);
      setFilteredOrders(normalizedOrders);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // FILTERING & SORTING (unchanged)
  useEffect(() => {
    let filtered = [...orders];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.customerName?.toLowerCase().includes(lower) ||
        order.customerEmail?.toLowerCase().includes(lower) ||
        order._id?.toLowerCase().includes(lower)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (sortOption === 'newest')
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortOption === 'oldest')
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sortOption === 'amountHigh')
      filtered.sort((a, b) => b.totalAmount - a.totalAmount);
    else if (sortOption === 'amountLow')
      filtered.sort((a, b) => a.totalAmount - b.totalAmount);

    setFilteredOrders(filtered);
  }, [searchTerm, sortOption, statusFilter, orders]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('Address.')) {
      const [type, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [type]: { ...prev[type], [field]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/admin/orders/${editingId}`
        : `${import.meta.env.VITE_API_URL}/admin/orders`;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Operation failed');
      }

      await fetchOrders(); // Refresh from server
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (order) => {
    setFormData({
      customerName: order.customerName || '',
      customerEmail: order.customerEmail || '',
      customerPhone: order.customerPhone || '',
      totalAmount: order.totalAmount || 0,
      status: order.status || 'Pending',
      paymentStatus: order.paymentStatus || 'Pending',
      shippingAddress: order.shippingAddress || { street: '', city: '', state: '', zip: '', country: '' },
      billingAddress: order.billingAddress || { street: '', city: '', state: '', zip: '', country: '' },
      notes: order.notes || '',
    });
    setEditingId(order._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order permanently?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/orders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Delete failed');
      await fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      totalAmount: '',
      status: 'Pending',
      paymentStatus: 'Pending',
      shippingAddress: { street: '', city: '', state: '', zip: '', country: '' },
      billingAddress: { street: '', city: '', state: '', zip: '', country: '' },
      notes: '',
    });
    setEditingId(null);
  };

  const getStatusColor = (status) => {
    const map = {
      Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Processing: 'bg-blue-100 text-blue-700 border-blue-200',
      Shipped: 'bg-purple-100 text-purple-700 border-purple-200',
      Delivered: 'bg-green-100 text-green-700 border-green-200',
      Cancelled: 'bg-red-100 text-red-700 border-red-200',
    };
    return map[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getPaymentStatusColor = (status) => {
    return status === 'Paid'
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-red-100 text-red-700 border-red-200';
  };

  const handleViewDetails = (order) => {
    navigate(`/orders/${order._id}`, { state: order });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
              <p className="text-gray-600">Search, sort, and manage all orders</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Cancel' : 'Add Order'}
          </button>
        </div>
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Order' : 'Add New Order'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Email</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Phone</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount (₹)</label>
                  <input
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Status</label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Street</label>
                      <input
                        type="text"
                        name="shippingAddress.street"
                        value={formData.shippingAddress.street}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="shippingAddress.city"
                        value={formData.shippingAddress.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="shippingAddress.state"
                        value={formData.shippingAddress.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Zip</label>
                      <input
                        type="text"
                        name="shippingAddress.zip"
                        value={formData.shippingAddress.zip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        name="shippingAddress.country"
                        value={formData.shippingAddress.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Street</label>
                      <input
                        type="text"
                        name="billingAddress.street"
                        value={formData.billingAddress.street}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="billingAddress.city"
                        value={formData.billingAddress.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="billingAddress.state"
                        value={formData.billingAddress.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Zip</label>
                      <input
                        type="text"
                        name="billingAddress.zip"
                        value={formData.billingAddress.zip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        name="billingAddress.country"
                        value={formData.billingAddress.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  {editingId ? 'Update Order' : 'Add Order'}
                </button>
                <button
                  type="button"
                  onClick={() => { resetForm(); setShowForm(false); }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by customer, email, or order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[250px] px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amountHigh">Amount: High to Low</option>
            <option value="amountLow">Amount: Low to High</option>
          </select>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900 cursor-pointer" onClick={() => handleViewDetails(order)}>
                        #{order._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.customerEmail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold">₹{order.totalAmount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(order)}
                            className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No matching orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


const ManageSliders = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    order: 0,
    isActive: true,
    image: null
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/sliders`);
      setSliders(res.data);
    } catch (err) {
      alert("Failed to fetch sliders");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.image) {
      alert("Image is required");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("buttonText", form.buttonText);
      formData.append("buttonLink", form.buttonLink);
      formData.append("order", form.order);
      formData.append("isActive", form.isActive);
      formData.append("image", form.image);

      await axios.post(`${API}/admin/sliders`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setForm({
        title: "",
        subtitle: "",
        buttonText: "",
        buttonLink: "",
        order: 0,
        isActive: true,
        image: null
      });

      fetchSliders();
    } catch (err) {
      alert("Failed to add slider");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slider?")) return;

    await axios.delete(`${API}/admin/sliders/${id}`);
    fetchSliders();
  };

  const toggleStatus = async (id, currentStatus) => {
    await axios.patch(`${API}/admin/sliders/${id}`, {
      isActive: !currentStatus
    });
    fetchSliders();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Sliders</h1>

      {/* Add Slider Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 grid md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Button Link"
          value={form.buttonLink}
          onChange={(e) => setForm({ ...form, buttonLink: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Order"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: e.target.value })}
          className="border p-2 rounded"
        />

        <select
          value={form.isActive}
          onChange={(e) =>
            setForm({ ...form, isActive: e.target.value === "true" })
          }
          className="border p-2 rounded"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
          className="border p-2 rounded md:col-span-2"
        />

        <button
          onClick={handleAdd}
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded md:col-span-2 disabled:opacity-50"
        >
          {submitting ? "Uploading..." : "Add Slider"}
        </button>
      </div>

      {/* Slider List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {sliders.map((slide) => (
            <div key={slide._id} className="bg-white shadow rounded-xl p-4">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-40 w-full object-cover rounded mb-3"
              />

              <h3 className="font-bold">{slide.title}</h3>
              <p className="text-sm text-gray-500">{slide.subtitle}</p>

              {slide.buttonText && (
                <p className="text-xs mt-1">
                  Button: {slide.buttonText}
                </p>
              )}

              <p className="text-xs mt-1">
                Order: {slide.order}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    toggleStatus(slide._id, slide.isActive)
                  }
                  className={`px-3 py-1 rounded text-white ${
                    slide.isActive
                      ? "bg-green-600"
                      : "bg-gray-500"
                  }`}
                >
                  {slide.isActive ? "Active" : "Inactive"}
                </button>

                <button
                  onClick={() => handleDelete(slide._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



const ManageIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", image: null });
  const [variants, setVariants] = useState([
    { quality: "Standard", pricePerKg: 100, minQuantity: 0.25, unit: "kg" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dilkhush-api.vercel.app/custom/ingredients");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setIngredients(data);
    } catch (err) {
      setError("Failed to load ingredients: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { quality: "Premium", pricePerKg: 150, minQuantity: 100, unit: "g" },
    ]);
  };

  const updateVariant = (i, field, value) => {
    const updated = [...variants];
    if (field === "pricePerKg" || field === "minQuantity") {
      updated[i][field] = parseFloat(value) || 0;
    } else {
      updated[i][field] = value;
    }
    setVariants(updated);
  };

  const removeVariant = (i) => setVariants(variants.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || variants.length === 0) {
      alert("Please fill all fields!");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("variants", JSON.stringify(variants));
    if (form.image) data.append("image", form.image);

    try {
      const url = editingId
        ? `https://dilkhush-api.vercel.app/admin/ingredients/${editingId}`
        : "https://dilkhush-api.vercel.app/admin/ingredients";

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Failed to save ingredient");

      alert(editingId ? "Ingredient updated!" : "Ingredient added!");
      setForm({ name: "", category: "", image: null });
      setVariants([{ quality: "Standard", pricePerKg: 100, minQuantity: 0.25, unit: "kg" }]);
      setEditingId(null);
      fetchIngredients();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const editIngredient = (ing) => {
    setForm({ name: ing.name, category: ing.category, image: null });
    setVariants(ing.variants || []);
    setEditingId(ing._id);
    window.scrollTo(0, 0);
  };

  const deleteIngredient = async (id) => {
    if (!confirm("Delete this ingredient?")) return;
    try {
      await fetch(`https://dilkhush-api.vercel.app/admin/ingredients/${id}`, { method: "DELETE" });
      fetchIngredients();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading ingredients...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-red-600 font-medium bg-red-100 p-4 rounded">{error}</div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full mx-auto mb-3 shadow-md">
            <i className="bi bi-box-seam text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-blue-600">Ingredient Manager</h1>
          <p className="text-gray-500">Easily manage your store ingredients</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className={`text-lg font-semibold mb-4 ${editingId ? "text-yellow-600" : "text-green-600"}`}>
            {editingId ? "Edit Ingredient" : "Add New Ingredient"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Ingredient Name"
              className="border p-2 rounded w-full focus:ring focus:ring-blue-200"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="border p-2 rounded w-full focus:ring focus:ring-blue-200"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              type="file"
              className="border p-2 rounded w-full"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
          </div>

          {/* Variants */}
          <div className="bg-gray-100 p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700">Variants</h3>
              <span className="text-sm text-gray-500">{variants.length} total</span>
            </div>

            {variants.map((v, i) => (
              <div key={i} className="bg-white border p-3 rounded mb-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex flex-col">
                    quality
                    <input
                      type="text"
                      placeholder="Quality"
                      className="border p-2 rounded"
                      value={v.quality}
                      onChange={(e) => updateVariant(i, "quality", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    price/kg
                    <input
                      type="number"
                      placeholder="Price per kg"
                      className="border p-2 rounded"
                      value={v.pricePerKg}
                      onChange={(e) => updateVariant(i, "pricePerKg", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    min quantity
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Min Quantity"
                      className="border p-2 rounded"
                      value={v.minQuantity}
                      onChange={(e) => updateVariant(i, "minQuantity", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    kg/g

                    <select
                      className="border p-2 rounded"
                      value={v.unit}
                      onChange={(e) => updateVariant(i, "unit", e.target.value)}
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                    </select>
                  </div>

                </div>
                {variants.length > 1 && (
                  <button
                    onClick={() => removeVariant(i)}
                    className="text-red-600 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addVariant}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              + Add Variant
            </button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 text-white rounded ${editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {editingId ? "Update Ingredient" : "Add Ingredient"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", category: "", image: null });
                  setVariants([{ quality: "Standard", pricePerKg: 100, minQuantity: 0.25, unit: "kg" }]);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Ingredient List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-600">All Ingredients</h2>
            <span className="text-sm text-gray-500">{ingredients.length} total</span>
          </div>

          {ingredients.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <i className="bi bi-inbox text-3xl mb-2 block"></i>
              No ingredients found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ingredients.map((ing) => (
                <div key={ing._id} className="border rounded-lg shadow-sm hover:shadow-md transition p-3 bg-white">
                  {ing.image && (
                    <img
                      src={ing.image}
                      alt={ing.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-blue-600">{ing.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Category: {ing.category}</p>
                  <p className="text-sm text-gray-400 mb-3">{ing.variants?.length || 0} variant(s)</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editIngredient(ing)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteIngredient(ing._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// src/admin/components/SendEmails.jsx
// import React, { useState } from 'react';
// import { Send, Mail, Users, AlertCircle } from 'lucide-react';

// import React, { useState } from 'react';

const API = import.meta.env.VITE_API_URL;


const SendEmails = () => {
  const [type, setType] = useState('all-customers');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(null);
  const [currentEmail, setCurrentEmail] = useState(''); // ← LIVE "sending to xyz@gmail.com"
  const [loading, setLoading] = useState(false);
  const evtSourceRef = useRef(null);

  const templates = {
    'payment-pending': { subject: 'Payment Pending - Complete Order #{orderId}', message: `Hi {name},\n\nYour order #{orderId} (₹{total}) is pending payment.\n\nComplete it here: {trackUrl}\n\nThanks,\nDilkhush Kirana` },
    'all-customers': { subject: 'Special 10% OFF for You, {name}!', message: `Hello {name},\n\nWe're giving you 10% OFF on your next order!\nUse code: WELCOME10\n\nShop now: https://dilkhush.shop\n\nTeam Dilkhush Kirana ❤️` }
  };

  const handleTypeChange = (t) => {
    setType(t);
    setSubject(templates[t].subject);
    setMessage(templates[t].message);
  };

  const send = async () => {
    if (!subject.trim() || !message.trim()) return alert('Subject aur message daal bhai!');

    setLoading(true);
    setProgress(null);
    setCurrentEmail('');

    if (evtSourceRef.current) evtSourceRef.current.close();

    const evtSource = new EventSource(`${API}/admin/send-emails`);
    evtSourceRef.current = evtSource;

    evtSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        if (data.currentEmail) setCurrentEmail(data.currentEmail);
        setProgress(data);

        if (data.done || data.status === 'completed') {
          evtSource.close();
          setLoading(false);
        }
      } catch (err) {
        // heartbeat ignore
      }
    };

    evtSource.onerror = () => {
      evtSource.close();
      setLoading(false);
      setCurrentEmail('');
      alert('Connection lost → but emails are still being sent in background!');
    };

    // Trigger sending
    try {
      const res = await fetch(`${API}/admin/send-emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, subject, message })
      });

      if (!res.ok) throw new Error((await res.json()).error || 'Failed');

      setProgress({ sent: 0, failed: 0, pending: 0, total: 1, percentage: 0, message: "Starting..." });

    } catch (err) {
      evtSource.close();
      setLoading(false);
      alert('Error: ' + err.message);
    }
  };

  useEffect(() => {
    return () => evtSourceRef.current?.close();
  }, []);
  // Polling se live progress milega (Vercel safe!)
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API}/admin/email-progress`);
        const data = await res.json();

        setProgress(data);
        setCurrentEmail(data.currentEmail || '');

        if (data.done || data.status === 'completed') {
          clearInterval(interval);
          setLoading(false);
        }
      } catch (err) {
        console.log("Progress check failed, retrying...");
      }
    }, 2000); // Har 2 sec me update

    return () => clearInterval(interval);
  }, [loading]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <div className="flex items-center gap-4 mb-10">
            <MailCheck className="w-12 h-12 text-teal-600" />
            <h1 className="text-4xl font-bold text-gray-900">Bulk Email Blaster</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <button onClick={() => handleTypeChange('payment-pending')}
              className={`p-8 rounded-2xl border-3 transition-all ${type === 'payment-pending' ? 'border-red-500 bg-red-50 shadow-lg' : 'border-gray-300'}`}>
              <AlertCircle className="w-14 h-14 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold">Payment Pending</h3>
            </button>
            <button onClick={() => handleTypeChange('all-customers')}
              className={`p-8 rounded-2xl border-3 transition-all ${type === 'all-customers' ? 'border-teal-500 bg-teal-50 shadow-lg' : 'border-gray-300'}`}>
              <Users2 className="w-14 h-14 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold">All Customers</h3>
            </button>
          </div>

          <input
            type="text" placeholder="Subject Line" value={subject} onChange={e => setSubject(e.target.value)}
            className="w-full px-6 py-5 text-xl border-2 rounded-2xl mb-6 focus:ring-4 focus:ring-teal-300"
            disabled={loading}
          />

          <textarea
            rows="10" placeholder="Email body → use {name}, {orderId}, {total}, {trackUrl}"
            value={message} onChange={e => setMessage(e.target.value)}
            className="w-full px-6 py-5 border-2 rounded-2xl font-mono text-base mb-8 focus:ring-4 focus:ring-teal-300"
            disabled={loading}
          />

          <button
            onClick={send} disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-blue-700 text-white py-6 rounded-2xl text-3xl font-bold hover:shadow-2xl disabled:opacity-60 flex items-center justify-center gap-5"
          >
            {loading ? <RefreshCw className="w-10 h-10 animate-spin" /> : <Send className="w-10 h-10" />}
            {loading ? 'Blasting Emails...' : 'SEND TO EVERYONE NOW'}
          </button>

          {/* LIVE TRACKING DASHBOARD */}
          {progress && (
            <div className="mt-12 p-10 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 rounded-3xl border-4 border-teal-200">

              {currentEmail && (
                <div className="text-center mb-8">
                  <p className="text-2xl font-bold text-gray-800 animate-pulse">
                    Sending to → <span className="text-teal-700">{currentEmail}</span>
                  </p>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700">
                  {progress.percentage || 0}%
                </div>
              </div>

              <div className="w-full bg-gray-300 rounded-full h-16 mb-10 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 transition-all duration-1000 flex items-center justify-end pr-6"
                  style={{ width: `${progress.percentage || 0}%` }}
                >
                  <span className="text-white text-2xl font-bold drop-shadow-lg">
                    {progress.sent || 0} / {progress.total || 0}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-3" />
                  <div className="text-5xl font-bold text-green-600">{progress.sent || 0}</div>
                  <div className="text-gray-600 text-lg">Delivered</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <RefreshCw className="w-16 h-16 text-yellow-600 mx-auto mb-3 animate-spin" />
                  <div className="text-5xl font-bold text-yellow-600">{progress.pending || 0}</div>
                  <div className="text-gray-600 text-lg">In Queue</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <XCircle className="w-16 h-16 text-red-600 mx-auto mb-3" />
                  <div className="text-5xl font-bold text-red-600">{progress.failed || 0}</div>
                  <div className="text-gray-600 text-lg">Failed</div>
                </div>
              </div>

              {progress.done && (
                <div className="text-center mt-10">
                  <p className="text-4xl font-bold text-green-700 animate-bounce">
                    ALL EMAILS SENT SUCCESSFULLY!
                  </p>
                  {progress.failed > 0 && (
                    <p className="text-xl text-red-600 mt-4">
                      {progress.failed} emails failed → check logs
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// export default SendEmails;

// export default SendEmails;
// Order Details Component
const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch order error:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-700">{error || 'No order details found.'}</p>
      </div>
    );
  }

  const { shippingAddress, billingAddress, products, customerName, customerEmail, customerPhone, totalAmount, status, paymentStatus, paymentId, razorpayOrderId, notes, createdAt } = order;

  const formatAddress = (address) => {
    if (!address || !address.street || !address.city || !address.state || !address.zip || !address.country) {
      return 'Not provided';
    }
    return `${address.street}, ${address.city}, ${address.state} - ${address.zip}, ${address.country}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12">
      <button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-gray-700 hover:text-green-600 mb-6">
        <ArrowLeft className="w-5 h-5" /> Back to Orders
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order #{order._id.slice(-8)}</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Customer Info</h2>
            <p><b>Name:</b> {customerName || 'N/A'}</p>
            <p><b>Email:</b> {customerEmail || 'N/A'}</p>
            <p><b>Phone:</b> {customerPhone || 'N/A'}</p>
            <p><b>Status:</b> {status || 'N/A'}</p>
            <p><b>Payment Status:</b> {paymentStatus || 'N/A'}</p>
            {paymentId && <p><b>Payment ID:</b> {paymentId}</p>}
            {razorpayOrderId && <p><b>Razorpay Order ID:</b> {razorpayOrderId}</p>}
            <p><b>Date:</b> {new Date(createdAt).toLocaleString()}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Order Summary</h2>
            <p><b>Total Amount:</b> ₹{totalAmount || '0'}</p>
            <p><b>Notes:</b> {notes || 'N/A'}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Shipping Address</h2>
            <p>{formatAddress(shippingAddress)}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Billing Address</h2>
            <p>{formatAddress(billingAddress)}</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products && products.length > 0 ? (
                  products.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">{item.product ? item.product.name : 'N/A'}</td>
                      <td className="px-4 py-2">{item.product ? item.product.category : '-'}</td>
                      <td className="px-4 py-2">{item.product ? `₹${item.product.price}` : '-'}</td>
                      <td className="px-4 py-2">{item.quantity || '0'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center text-gray-500">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button onClick={() => window.print()} className="btn bg-primary mt-5 border p-2 rounded">
            Print Page
          </button>
        </div>
      </div>
    </div>
  );
};

// Manage Blogs Component
const ManageBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    author: '',
    tags: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch blogs error:', err);
      setError(err.message);
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
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'tags') {
        // Ensure tags are sent as an array
        data.append('tags', JSON.stringify(value.split(',').map((tag) => tag.trim()).filter((tag) => tag)));
      } else if (key !== 'image' || value) {
        data.append(key, value);
      }
    });

    try {
      const url = editingId ? `${import.meta.env.VITE_API_URL}/admin/blogs/${editingId}` : `${import.meta.env.VITE_API_URL}/admin/blogs`;
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      if (!response.ok) {
        let errorMessage = 'Unknown error';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || `HTTP ${response.status}`;
        } catch {
          errorMessage = `HTTP ${response.status}: Failed to ${editingId ? 'update' : 'add'} blog`;
        }
        throw new Error(errorMessage);
      }
      await fetchBlogs();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error('Submit blog error:', err);
      setError(`Error: ${err.message}`);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      author: blog.author,
      tags: blog.tags.join(', '),
      image: null,
    });
    setEditingId(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete blog');
      }
      await fetchBlogs();
    } catch (err) {
      console.error('Delete blog error:', err);
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', slug: '', content: '', author: '', tags: '', image: null });
    setEditingId(null);
  };

  const handleViewDetails = (blog) => {
    navigate(`/blogs/${blog._id}`, { state: blog });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Blogs</h1>
              <p className="text-gray-600">Add, edit, and manage your blog posts</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Cancel' : 'Add Blog'}
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Blog' : 'Add New Blog'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., news, updates, tips"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  {editingId ? 'Update Blog' : 'Add Blog'}
                </button>
                <button
                  type="button"
                  onClick={() => { resetForm(); setShowForm(false); }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : blogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No blogs found.
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 cursor-pointer" onClick={() => handleViewDetails(blog)}>
                        {blog.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{blog.slug}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{blog.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          {blog.tags.join(', ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog Details Component
const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch blog details');
        }
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch blog error:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-700">{error || 'No blog details found.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12">
      <button onClick={() => navigate('/blogs')} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 mb-6">
        <ArrowLeft className="w-5 h-5" /> Back to Blogs
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-xl mb-4" />
        )}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600"><b>Author:</b> {blog.author}</p>
            <p className="text-sm text-gray-600"><b>Published:</b> {new Date(blog.createdAt).toLocaleString()}</p>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {blog.tags.join(', ')}
          </span>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700">{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

const ManageDistributors = () => {
  const navigate = useNavigate();

  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    locationUrl: '',
    city: '',
    stock: '',
    isActive: true,
  });

  // Fetch distributors
  const fetchDistributors = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/distributors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setDistributors(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = editingId
      ? `${API}/admin/distributors/${editingId}`
      : `${API}/admin/distributors`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          stock: Number(form.stock),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed');
      }

      alert(editingId ? 'Updated!' : 'Added!');
      resetForm();
      setShowForm(false);
      fetchDistributors();
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (dist) => {
    setForm({
      name: dist.name || '',
      phone: dist.phone || '',
      locationUrl: dist.locationUrl || '',
      city: dist.city || '',
      stock: dist.stock?.toString() || '',
      isActive: dist.isActive ?? true,
    });
    setEditingId(dist._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this distributor?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/distributors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      alert('Deleted!');
      fetchDistributors();
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      locationUrl: '',
      city: '',
      stock: '',
      isActive: true,
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-lg">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Distributors</h1>
              <p className="text-gray-600">Manage stock & locations</p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg"
          >
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Cancel' : 'Add Distributor'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit' : 'Add'} Distributor
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input name="name" placeholder="Name *" value={form.name} onChange={handleChange} required className="input" />
              <input name="phone" placeholder="Phone *" value={form.phone} onChange={handleChange} required className="input" />
              <input name="city" placeholder="City *" value={form.city} onChange={handleChange} required className="input" />
              <input name="stock" type="number" min="0" placeholder="Stock (units) *" value={form.stock} onChange={handleChange} required className="input" />

              <input
                name="locationUrl"
                placeholder="Google Maps URL *"
                value={form.locationUrl}
                onChange={handleChange}
                required
                className="md:col-span-2 input"
              />

              <label className="md:col-span-2 flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                />
                <span className="text-gray-700 font-medium">Active (Visible on website)</span>
              </label>

              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="flex-1 bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 font-semibold">
                  {editingId ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 font-semibold">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500 mx-auto"></div>
            </div>
          ) : distributors.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No distributors yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">City</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {distributors.map((d) => (
                    <tr key={d._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{d.name}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {d.phone}
                        <br />
                        <a href={d.locationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 hover:underline flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> View Map
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{d.city}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1">
                          <Package className="w-4 h-4 text-gray-500" />
                          {d.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${d.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {d.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(d)} className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(d._id)} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .input {
          @apply px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent;
        }
      `}</style>
    </div>
  );
};


// View Contacts Component (unchanged)
const ViewContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-gray-600">Review customer inquiries</p>
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            </div>
          ) : (
            contacts.map((contact) => (
              <div key={contact._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700">{contact.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


// Analytics Dashboard Component (updated with blog count)
const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({
    totalProducts: 0, totalOrders: 0, totalRevenue: 0, totalContacts: 0, totalBlogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [productsRes, ordersRes, contactsRes, blogsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/products`),
        fetch(`${import.meta.env.VITE_API_URL}/orders`),
        fetch(`${import.meta.env.VITE_API_URL}/contact`),
        fetch(`${import.meta.env.VITE_API_URL}/blogs`),
      ]);
      if (!productsRes.ok || !ordersRes.ok || !contactsRes.ok || !blogsRes.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      const products = await productsRes.json();
      const orders = await ordersRes.json();
      const contacts = await contactsRes.json();
      const blogs = await blogsRes.json();
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      setAnalytics({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        totalContacts: contacts.length,
        totalBlogs: blogs.length,
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Products', value: analytics.totalProducts, icon: Package,
      color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Orders', value: analytics.totalOrders, icon: ShoppingCart,
      color: 'from-green-500 to-green-600', bgColor: 'bg-green-50',
    },
    {
      title: 'Total Revenue', value: `₹${analytics.totalRevenue.toLocaleString()}`, icon: BarChart3,
      color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Contacts', value: analytics.totalContacts, icon: MessageSquare,
      color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50',
    },
    {
      title: 'Total Blogs', value: analytics.totalBlogs, icon: Book,
      color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Business insights and metrics</p>
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                  <div className="p-6">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    code: "",
    type: "percentage",
    value: "",
    minAmount: "",
    maxDiscount: "",
    usageLimit: "",
    perUserLimit: "1",
    expiresAt: "",
    isActive: true,
  };

  const [form, setForm] = useState(emptyForm);

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${API}/admin/coupons`);
      setCoupons(res.data);
    } catch (err) {
      alert("Coupons load nahi hue, server check kar!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsAdding(false);
  };

  const startAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const startEdit = (coupon) => {
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minAmount: coupon.minAmount || "",
      maxDiscount: coupon.maxDiscount || "",
      usageLimit: coupon.usageLimit || "",
      perUserLimit: coupon.perUserLimit || "1",
      expiresAt: coupon.expiresAt ? coupon.expiresAt.split("T")[0] : "",
      isActive: coupon.isActive,
    });
    setEditingId(coupon._id);
    setIsAdding(true);
  };

  // Save Coupon (ADD or UPDATE)
  const saveCoupon = async () => {
    if (!form.code || !form.value) {
      alert("Code aur value daal!");
      return;
    }

    // convert all numbers properly
    const payload = {
      ...form,
      value: Number(form.value),
      minAmount: Number(form.minAmount),
      maxDiscount: form.type === "percentage" ? Number(form.maxDiscount) : null,
      usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
      perUserLimit: Number(form.perUserLimit),
      expiresAt: form.expiresAt ? new Date(form.expiresAt) : null,
    };

    try {
      if (editingId) {
        await axios.put(`${API}/admin/coupons/${editingId}`, payload);
        alert("Coupon update ho gaya");
      } else {
        await axios.post(`${API}/admin/coupons`, payload); // FIXED: missing ${API}
        alert("Naya coupon ban gaya");
      }

      resetForm();
      fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.error || "Error aa gaya!");
    }
  };

  const deleteCoupon = async (id) => {
    if (!window.confirm("Delete karna pakka?")) return;
    try {
      await axios.delete(`${API}/admin/coupons/${id}`);
      setCoupons(coupons.filter((c) => c._id !== id));
      alert("Delete ho gaya");
    } catch {
      alert("Delete nahi hua");
    }
  };

  if (loading)
    return <div className="p-8 text-center text-2xl">Loading coupons...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Coupons</h1>
        <button
          onClick={startAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
        >
          + Add New Coupon
        </button>
      </div>

      {/* FORM */}
      {isAdding && (
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg mb-8 border">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? "Edit Coupon" : "Add New Coupon"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value.toUpperCase() })
              }
              className="p-3 border rounded-lg text-lg"
            />

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="p-3 border rounded-lg text-lg"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₹)</option>
            </select>

            <input
              type="number"
              placeholder={form.type === "percentage" ? "Discount %" : "Amount"}
              value={form.value}
              onChange={(e) =>
                setForm({ ...form, value: e.target.value })
              }
              className="p-3 border rounded-lg text-lg"
            />

            <input
              type="number"
              placeholder="Min Order Amount"
              value={form.minAmount}
              onChange={(e) =>
                setForm({ ...form, minAmount: e.target.value })
              }
              className="p-3 border rounded-lg text-lg"
            />

            {form.type === "percentage" && (
              <input
                type="number"
                placeholder="Max Discount"
                value={form.maxDiscount}
                onChange={(e) =>
                  setForm({ ...form, maxDiscount: e.target.value })
                }
                className="p-3 border rounded-lg text-lg"
              />
            )}

            <input
              type="number"
              placeholder="Usage Limit"
              value={form.usageLimit}
              onChange={(e) =>
                setForm({ ...form, usageLimit: e.target.value })
              }
              className="p-3 border rounded-lg text-lg"
            />

            <input
              type="number"
              placeholder="Per User Limit"
              value={form.perUserLimit}
              onChange={(e) =>
                setForm({ ...form, perUserLimit: e.target.value })
              }
              className="p-3 border rounded-lg text-lg"
            />

            <input
              type="date"
              value={form.expiresAt}
              onChange={(e) =>
                setForm({ ...form, expiresAt: e.target.value })
              }
              className="p-3 border rounded-lg text-lg"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={saveCoupon}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold"
            >
              {editingId ? "Update Coupon" : "Create Coupon"}
            </button>

            <button
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LIST */}
      <div className="grid gap-5">
        {coupons.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            Koi coupon nahi mila
          </p>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center border hover:border-green-500 transition"
            >
              <div>
                <h3 className="text-2xl font-bold text-green-600">
                  {coupon.code}
                </h3>

                <p>
                  <strong>Type:</strong>{" "}
                  {coupon.type === "percentage"
                    ? `${coupon.value}%`
                    : `₹${coupon.value}`}
                </p>

                <p>
                  <strong>Per User Limit:</strong> {coupon.perUserLimit}
                </p>

                <p>
                  <strong>Used:</strong> {coupon.usedCount} times
                </p>

                {coupon.expiresAt && (
                  <p>
                    <strong>Expires:</strong>{" "}
                    {new Date(coupon.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(coupon)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCoupon(coupon._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


// Main App Component
function App() {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  return (
    <Router basename="/admin">
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="sliders" element={<ManageSliders />} />
          <Route path="contacts" element={<ManageContacts />} />
          <Route path="orders" element={<ManageOrders />} />
          {/* // Inside your <Routes> block (where other admin routes are) */}
          <Route path="coupons" element={<ManageCoupons />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="distributors" element={<ManageDistributors />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="ingredients" element={<ManageIngredients />} />
          <Route path="custom-orders" element={<CustomMixOrders />} />
          <Route path="send-emails" element={<SendEmails />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
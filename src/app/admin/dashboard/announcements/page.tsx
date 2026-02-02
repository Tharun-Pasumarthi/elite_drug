'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'sale' | 'new_product' | 'update';
  link: string | null;
  link_text: string | null;
  is_active: boolean;
  priority: number;
  created_at: string;
  expires_at: string | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [useCustomLink, setUseCustomLink] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProductDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as Announcement['type'],
    link: '',
    link_text: '',
    is_active: true,
    priority: 0,
    expires_at: '',
  });

  useEffect(() => {
    fetchAnnouncements();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('🔍 Fetching products...');
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Raw products data:', data);
      
      // API returns array directly, not wrapped in object
      let productsData = Array.isArray(data) ? data : (data.products || []);
      
      // Map to just the fields we need
      productsData = productsData.map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug
      }));
      
      setProducts(productsData);
      console.log('✅ Loaded products:', productsData.length, productsData);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      alert('Failed to load products. Check console for details.');
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/admin/announcements');
      const data = await response.json();
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      alert('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/admin/announcements';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(editingId ? 'Announcement updated!' : 'Announcement created!');
        setShowForm(false);
        setEditingId(null);
        resetForm();
        fetchAnnouncements();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving announcement:', error);
      alert('Failed to save announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      title: announcement.title,
      message: announcement.message,
      type: announcement.type,
      link: announcement.link || '',
      link_text: announcement.link_text || '',
      is_active: announcement.is_active,
      priority: announcement.priority,
      expires_at: announcement.expires_at ? announcement.expires_at.split('T')[0] : '',
    });
    
    // Check if link is a product link
    if (announcement.link && announcement.link.startsWith('/products/')) {
      const slug = announcement.link.replace('/products/', '');
      const product = products.find(p => p.slug === slug);
      setSelectedProduct(slug);
      setProductSearch(product?.name || '');
      setUseCustomLink(true);
    } else if (announcement.link) {
      setUseCustomLink(true);
      setSelectedProduct('');
      setProductSearch('');
    } else {
      setUseCustomLink(false);
      setSelectedProduct('');
      setProductSearch('');
    }
    
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const response = await fetch(`/api/admin/announcements?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Announcement deleted!');
        fetchAnnouncements();
      } else {
        alert('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Failed to delete announcement');
    }
  };

  const toggleActive = async (announcement: Announcement) => {
    try {
      const response = await fetch('/api/admin/announcements', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: announcement.id,
          is_active: !announcement.is_active,
        }),
      });

      if (response.ok) {
        fetchAnnouncements();
      }
    } catch (error) {
      console.error('Error toggling announcement:', error);
    }
  };

  const handleProductSelect = (productSlug: string) => {
    setSelectedProduct(productSlug);
    const product = products.find(p => p.slug === productSlug);
    setProductSearch(product?.name || '');
    setShowProductDropdown(false);
    if (productSlug) {
      setFormData({
        ...formData,
        link: `/products/${productSlug}`,
        link_text: formData.link_text || 'View Product',
      });
    } else {
      setFormData({
        ...formData,
        link: '',
        link_text: '',
      });
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'info',
      link: '',
      link_text: '',
      is_active: true,
      priority: 0,
      expires_at: '',
    });
    setSelectedProduct('');
    setUseCustomLink(false);
    setProductSearch('');
    setShowProductDropdown(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'sale': return 'bg-purple-100 text-purple-800';
      case 'new_product': return 'bg-blue-100 text-blue-800';
      case 'update': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && announcements.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading announcements...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Announcements</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              resetForm();
            }}
            className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            {showForm ? 'Cancel' : 'New Announcement'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Announcement' : 'Create New Announcement'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Announcement['type'] })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="sale">Sale</option>
                    <option value="new_product">New Product</option>
                    <option value="update">Update</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={3}
                  required
                />
              </div>

              {/* Link Section */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useCustomLink}
                      onChange={(e) => {
                        setUseCustomLink(e.target.checked);
                        if (!e.target.checked) {
                          setSelectedProduct('');
                          setFormData({ ...formData, link: '', link_text: '' });
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Add link to announcement</span>
                  </label>
                </div>

                {useCustomLink && (
                  <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                    {/* Product Selector with Search */}
                    <div className="relative" ref={dropdownRef}>
                      <label className="block text-sm font-medium mb-1">Select Product</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={productSearch}
                          onChange={(e) => {
                            setProductSearch(e.target.value);
                            setShowProductDropdown(true);
                            if (!e.target.value) {
                              setSelectedProduct('');
                              setFormData({ ...formData, link: '', link_text: '' });
                            }
                          }}
                          onFocus={() => setShowProductDropdown(true)}
                          className="w-full border rounded-lg px-3 py-2 pr-10"
                          placeholder="Search products..."
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          🔍
                        </div>
                      </div>
                      
                      {/* Dropdown List */}
                      {showProductDropdown && products.length > 0 && filteredProducts.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredProducts.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => handleProductSelect(product.slug)}
                              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                                selectedProduct === product.slug ? 'bg-blue-50 text-blue-600 font-medium' : ''
                              }`}
                            >
                              {product.name}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Loading message */}
                      {showProductDropdown && products.length === 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 text-center text-gray-500">
                          Loading products...
                        </div>
                      )}
                      
                      {/* No results message */}
                      {showProductDropdown && products.length > 0 && productSearch && filteredProducts.length === 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 text-center text-gray-500">
                          No products found matching "{productSearch}"
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedProduct 
                          ? `Selected: ${products.find(p => p.slug === selectedProduct)?.name}` 
                          : `${products.length} products available - Search and select a product or enter custom URL below`}
                      </p>
                    </div>

                    {/* Custom URL Input */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Custom URL (optional)</label>
                      <input
                        type="text"
                        value={formData.link}
                        onChange={(e) => {
                          setFormData({ ...formData, link: e.target.value });
                          setSelectedProduct(''); // Clear product selection if typing custom URL
                        }}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="/blog/health-tips or https://example.com"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty if you selected a product above
                      </p>
                    </div>

                    {/* Link Text */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.link_text}
                        onChange={(e) => setFormData({ ...formData, link_text: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="View Product, Shop Now, Learn More, etc."
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">\n                <div>
                  <label className="block text-sm font-medium mb-1">Priority (0-10)</label>
                  <input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2"
                    min="0"
                    max="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Expires At (optional)</label>
                  <input
                    type="date"
                    value={formData.expires_at}
                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Saving...' : editingId ? 'Update Announcement' : 'Create Announcement'}
              </button>
            </form>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-white rounded-lg shadow-md p-6 ${!announcement.is_active ? 'opacity-60' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(announcement.type)}`}>
                      {announcement.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      Priority: {announcement.priority}
                    </span>
                    {!announcement.is_active && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        Inactive
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                  <p className="text-gray-700 mb-3">{announcement.message}</p>
                  {announcement.link && (
                    <a
                      href={announcement.link}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      {announcement.link_text || 'Learn More'} →
                    </a>
                  )}
                  <div className="text-xs text-gray-500 mt-3">
                    Created: {new Date(announcement.created_at).toLocaleDateString()}
                    {announcement.expires_at && (
                      <> • Expires: {new Date(announcement.expires_at).toLocaleDateString()}</>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(announcement)}
                    className={`p-2 rounded-lg transition-colors ${
                      announcement.is_active ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={announcement.is_active ? 'Deactivate' : 'Activate'}
                  >
                    {announcement.is_active ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  </button>
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No announcements yet. Create your first one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

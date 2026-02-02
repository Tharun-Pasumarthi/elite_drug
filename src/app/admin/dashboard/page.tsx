'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  LogOut,
  Search,
  Filter,
  Edit,
  Trash2,
  TrendingUp,
  ShoppingBag,
  Eye,
  Megaphone
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  images: string[];
  isPrescription: boolean;
}

interface CategoryStats {
  name: string;
  count: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      
      // Calculate category stats
      const stats = calculateCategoryStats(data);
      setCategoryStats(stats);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCategoryStats = (products: Product[]) => {
    const categoryCounts: Record<string, number> = {};
    products.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    
    return Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Elite Drug" width={40} height={40} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin <span className="text-[#FF8C00]">Dashboard</span>
                </h1>
                <p className="text-sm text-gray-500">Product Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#FF8C00] transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] hidden lg:block">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#FF8C00] to-[#E67E00] text-white rounded-lg font-medium"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/dashboard/add-product"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Add Product
            </Link>
            <Link
              href="/admin/dashboard/announcements"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              <Megaphone className="w-5 h-5" />
              Announcements
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold mt-2">{products.length}</p>
                </div>
                <Package className="w-12 h-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Categories</p>
                  <p className="text-3xl font-bold mt-2">{categoryStats.length}</p>
                </div>
                <ShoppingBag className="w-12 h-12 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Avg. Price</p>
                  <p className="text-3xl font-bold mt-2">
                    ₹{products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Category Stats */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Products by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categoryStats.map(stat => (
                <div key={stat.name} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-2xl font-bold text-[#FF8C00]">{stat.count}</p>
                  <p className="text-xs text-gray-600 mt-1">{stat.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Management Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">All Products</h2>
                <Link
                  href="/admin/dashboard/add-product"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF8C00] to-[#E67E00] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add New Product
                </Link>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none"
                  />
                </div>
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#FF8C00] focus:outline-none appearance-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">MRP</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        Loading products...
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                              {(() => {
                                const imageUrl = Array.isArray(product.images) 
                                  ? product.images[0] 
                                  : product.images?.main || product.images?.gallery?.[0];
                                return imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '' ? (
                                  <Image
                                    src={imageUrl}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-contain"
                                  />
                                ) : null;
                              })()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">₹{product.price}</td>
                        <td className="px-6 py-4 text-gray-500 line-through">₹{product.mrp}</td>
                        <td className="px-6 py-4">
                          {product.isPrescription ? (
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">Rx</span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded">OTC</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/products/${product.slug || product.id}`}
                              target="_blank"
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="View Product"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </Link>
                            <Link
                              href={`/admin/dashboard/edit-product/${product.id}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
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
        </main>
      </div>
    </div>
  );
}

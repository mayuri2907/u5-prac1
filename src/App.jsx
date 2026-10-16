import { useState } from 'react';

function App() {
  // Initial list of existing products
  const initialProducts = [
    {
      id: 1,
      name: 'Ergonomic Wireless Mouse',
      category: 'Electronics',
      price: 1499,
      stock: 45,
      createdAt: '10:00 AM',
    },
    {
      id: 2,
      name: 'Adjustable Laptop Stand',
      category: 'Accessories',
      price: 1850,
      stock: 20,
      createdAt: '10:15 AM',
    },
    {
      id: 3,
      name: 'LED Desk Lamp with USB Port',
      category: 'Office Supplies',
      price: 1200,
      stock: 35,
      createdAt: '10:30 AM',
    },
  ];

  // State for products list
  const [products, setProducts] = useState(initialProducts);

  // State for the Create Product form
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
  });

  const [notification, setNotification] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CREATE OPERATION: Add new product to state
  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.stock) {
      alert('Please fill in all product fields.');
      return;
    }

    const newProduct = {
      id: Date.now(), // Unique ID
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      createdAt: new Date().toLocaleTimeString(),
      isNew: true,
    };

    // Immutably append/prepend new product to state array
    setProducts([newProduct, ...products]);

    // Show success notification
    setNotification(`Product "${newProduct.name}" added successfully!`);
    setTimeout(() => setNotification(''), 4000);

    // Reset input fields
    setFormData({
      name: '',
      category: 'Electronics',
      price: '',
      stock: '',
    });
  };

  // Calculate quick metrics
  const totalItems = products.length;
  const totalValue = products.reduce((sum, item) => sum + item.price * item.stock, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-slate-800">
              InventoryPro<span className="text-emerald-700">.</span>
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              U5-PRAC 1
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            CRUD: Create Operation
          </span>
        </div>
      </header>

      {/* Lab Banner */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 gap-1">
          <div>
            <span className="font-semibold text-slate-800">Practical 6 (Unit 5 Prac 1):</span> Product Management (Create Operation)
          </div>
          <div className="text-emerald-700 font-medium">
            ● Unit 5 – CRUD Operations
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Total Products in Catalog</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalItems} Items</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
              📦
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Total Inventory Value</p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-1">₹{totalValue.toLocaleString('en-IN')}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold">
              ₹
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {notification && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center justify-between">
            <span>✓ {notification}</span>
            <button onClick={() => setNotification('')} className="text-emerald-700 font-bold hover:underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Create Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                Action: CREATE
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-2">
                Add New Product
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter product specifications and add it to the inventory state.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Mechanical Gaming Keyboard"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Hardware">Hardware</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="1"
                    placeholder="e.g. 2999"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    required
                    min="0"
                    placeholder="e.g. 25"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-700 text-white rounded-md text-sm font-medium hover:bg-emerald-800 transition shadow-xs"
              >
                + Add Product to Catalog
              </button>
            </form>
          </div>

          {/* Product List Table */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">
                Current Product Inventory ({products.length})
              </h2>
              <span className="text-xs text-slate-500 font-mono">React List Rendering</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3 border-b border-slate-200">Product Name</th>
                    <th className="p-3 border-b border-slate-200">Category</th>
                    <th className="p-3 border-b border-slate-200">Price</th>
                    <th className="p-3 border-b border-slate-200">Stock</th>
                    <th className="p-3 border-b border-slate-200">Added At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  {products.map((p) => (
                    <tr key={p.id} className={p.isNew ? 'bg-emerald-50/50' : 'hover:bg-slate-50'}>
                      <td className="p-3 font-semibold text-slate-800 flex items-center space-x-2">
                        <span>{p.name}</span>
                        {p.isNew && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                            NEW
                          </span>
                        )}
                      </td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3 font-semibold text-slate-800">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          p.stock > 10 ? 'bg-slate-100 text-slate-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 font-mono text-[11px]">{p.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        React Practical 6 (Unit 5 Prac 1) | CRUD: Create Operation
      </footer>
    </div>
  );
}

export default App;

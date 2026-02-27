import { useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit2, 
  Trash2, 
  ShoppingBag,
  TrendingUp,
  DollarSign,
  X
} from 'lucide-react';
import { useMerchandiseStore } from '@/store/useSocialStore';
import { useCreatorAuthStore } from '@/store/useCreatorStore';
import type { Merchandise } from '@/types/social';

export function MerchandiseManager() {
  const { creator } = useCreatorAuthStore();
  const { items, deleteMerchandise } = useMerchandiseStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Merchandise | null>(null);

  const creatorItems = items.filter(item => item.creatorId === creator?.id);
  const totalSales = creatorItems.reduce((sum, item) => sum + item.sold, 0);
  const totalRevenue = creatorItems.reduce((sum, item) => sum + (item.sold * item.price), 0);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMerchandise(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-nia-red/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-nia-red" />
            </div>
            <span className="text-nia-gray-400 text-sm">Products</span>
          </div>
          <p className="text-2xl font-bold text-white">{creatorItems.length}</p>
        </div>

        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-nia-green/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-nia-green" />
            </div>
            <span className="text-nia-gray-400 text-sm">Sales</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalSales}</p>
        </div>

        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-nia-gray-400 text-sm">Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(0)}</p>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-4 border-2 border-dashed border-nia-gray-700 rounded-2xl text-nia-gray-400 hover:text-white hover:border-nia-red transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add New Product
      </button>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {creatorItems.map((item) => (
          <div key={item.id} className="glass-card p-4 rounded-2xl">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-nia-gray-800 flex-shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-medium truncate">{item.name}</h4>
                    <p className="text-nia-red font-semibold">${item.price}</p>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center hover:bg-nia-gray-700"
                    >
                      <Edit2 className="w-4 h-4 text-nia-gray-400" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center hover:bg-nia-red/20"
                    >
                      <Trash2 className="w-4 h-4 text-nia-red" />
                    </button>
                  </div>
                </div>
                
                <p className="text-nia-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center gap-4 mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.isAvailable && item.stock > 0
                      ? 'bg-nia-green/20 text-nia-green'
                      : 'bg-nia-red/20 text-nia-red'
                  }`}>
                    {item.isAvailable && item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="text-nia-gray-400 text-xs">{item.stock} remaining</span>
                  <span className="text-nia-gray-400 text-xs">{item.sold} sold</span>
                </div>

                {item.sizes && (
                  <div className="flex gap-1 mt-2">
                    {item.sizes.map(size => (
                      <span key={size} className="text-xs px-2 py-0.5 bg-nia-gray-800 rounded text-nia-gray-400">
                        {size}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">
                {editingItem ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button 
                onClick={() => { setShowAddModal(false); setEditingItem(null); }}
                className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center"
              >
                <X className="w-5 h-5 text-nia-gray-400" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Product Name</label>
                <input 
                  type="text" 
                  defaultValue={editingItem?.name}
                  placeholder="e.g., Official T-Shirt"
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Description</label>
                <textarea 
                  defaultValue={editingItem?.description}
                  placeholder="Describe your product..."
                  rows={3}
                  className="w-full input-field resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-nia-gray-400 text-sm block mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    defaultValue={editingItem?.price}
                    placeholder="25.00"
                    className="w-full input-field"
                  />
                </div>
                <div>
                  <label className="text-nia-gray-400 text-sm block mb-1">Stock</label>
                  <input 
                    type="number" 
                    defaultValue={editingItem?.stock}
                    placeholder="100"
                    className="w-full input-field"
                  />
                </div>
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Category</label>
                <select className="w-full input-field">
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="digital">Digital</option>
                  <option value="physical">Physical</option>
                  <option value="tickets">Tickets</option>
                </select>
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Sizes (comma separated)</label>
                <input 
                  type="text" 
                  defaultValue={editingItem?.sizes?.join(', ')}
                  placeholder="S, M, L, XL"
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Product Images</label>
                <div className="border-2 border-dashed border-nia-gray-700 rounded-xl p-8 text-center">
                  <Package className="w-12 h-12 text-nia-gray-600 mx-auto mb-2" />
                  <p className="text-nia-gray-400 text-sm">Drag & drop images or click to upload</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingItem(null); }}
                  className="flex-1 py-3 border border-nia-gray-700 rounded-full text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingItem ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MerchandiseManager;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X, Plus, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import type { Product } from "@/types";

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", product: editingProduct }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setEditingProduct(null);
      }
    } catch (e) {
      alert("Failed to save product");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !editingProduct) return;
    setIsUploading(true);

    const files = Array.from(e.target.files);
    const newImageUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          newImageUrls.push(data.imageUrl);
        }
      } catch (err) {
        console.error("Upload failed", err);
      }
    }

    setEditingProduct({
      ...editingProduct,
      images: [...(editingProduct.images || []), ...newImageUrls],
    });
    
    setIsUploading(false);
  };

  const removeImage = (idx: number) => {
    if (!editingProduct) return;
    const newImages = [...(editingProduct.images || [])];
    newImages.splice(idx, 1);
    setEditingProduct({ ...editingProduct, images: newImages });
  };

  if (loading) return <div className="text-center py-20">Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Product Catalog</h2>
          <p className="text-sm text-slate-500">Edit titles, prices, descriptions, and upload images.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price (MAD)</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                    <span className="font-bold text-slate-900">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{product.discountedPrice} MAD</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-black text-slate-900">Edit {editingProduct.name}</h3>
                <button onClick={() => setEditingProduct(null)} className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
                <form id="edit-product-form" onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Product Name</label>
                      <input 
                        required 
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Price (MAD)</label>
                      <input 
                        type="number" required 
                        value={editingProduct.discountedPrice}
                        onChange={(e) => setEditingProduct({...editingProduct, discountedPrice: Number(e.target.value)})}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                    <textarea 
                      required rows={4}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-500" />
                      Product Gallery
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {/* Primary Image (Readonly here for simplicity, or we could make it editable) */}
                      <div className="relative group rounded-xl border-2 border-blue-500 overflow-hidden bg-slate-50 aspect-square">
                        <span className="absolute top-1 left-1 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase z-10">Main</span>
                        <img src={editingProduct.imageUrl} className="w-full h-full object-contain p-2" alt="Primary" />
                      </div>

                      {/* Additional Images */}
                      {editingProduct.images?.map((img, idx) => (
                        <div key={idx} className="relative group rounded-xl border border-slate-200 overflow-hidden bg-white aspect-square">
                          <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <img src={img} className="w-full h-full object-contain p-2" alt="Gallery" />
                        </div>
                      ))}

                      {/* Upload Button */}
                      <label className="relative cursor-pointer rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 transition-colors aspect-square flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-500">
                        {isUploading ? (
                          <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6" />
                            <span className="text-[10px] font-bold uppercase">Upload</span>
                          </>
                        )}
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                      </label>
                    </div>
                  </div>

                </form>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" form="edit-product-form" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

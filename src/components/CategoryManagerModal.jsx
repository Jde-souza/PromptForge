import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import './CategoryManagerModal.css';

const CategoryManagerModal = ({ categories, onClose, onAdd, onDelete }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== '') {
      onAdd(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Gestor de Categorías">
      <div className="modal-content glow-border">
        <div className="modal-header">
          <h2>Gestionar Categorías</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Cerrar modal">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleAdd} className="add-category-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nueva categoría..."
            aria-label="Nombre de la nueva categoría"
          />
          <button type="submit" className="btn-primary" disabled={!newCategory.trim()} aria-label="Añadir categoría">
            <Plus size={16} aria-hidden="true" />
            Añadir
          </button>
        </form>

        <div className="categories-list">
          {categories.map((cat, index) => (
            <div key={index} className="category-list-item">
              <span>{cat}</span>
              <button 
                className="btn-icon danger" 
                onClick={() => onDelete(cat)}
                aria-label={`Eliminar categoría ${cat}`}
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="no-categories">No hay categorías configuradas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagerModal;

import React, { useState } from 'react';
import { X, Plus, Trash2, Tags, Cpu } from 'lucide-react';
import './SettingsModal.css';

const SettingsModal = ({ 
  categories, 
  models, 
  onClose, 
  onAddCategory, 
  onDeleteCategory, 
  onAddModel, 
  onDeleteModel 
}) => {
  const [activeTab, setActiveTab] = useState('categories');
  const [newItemValue, setNewItemValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newItemValue.trim() !== '') {
      if (activeTab === 'categories') {
        onAddCategory(newItemValue.trim());
      } else {
        onAddModel(newItemValue.trim());
      }
      setNewItemValue('');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setNewItemValue(''); // Clear input when switching tabs
  };

  const activeData = activeTab === 'categories' ? categories : models;
  const handleDelete = activeTab === 'categories' ? onDeleteCategory : onDeleteModel;
  const placeholder = activeTab === 'categories' 
    ? "Nueva categoría..." 
    : "Nuevo modelo (ej. GPT-4)...";

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Configuración de Datos">
      <div className="settings-modal-content glow-border">
        
        <div className="settings-header">
          <h2>Configuración</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Cerrar configuración">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => handleTabChange('categories')}
          >
            <Tags size={16} aria-hidden="true" />
            Categorías
          </button>
          <button 
            className={`tab-btn ${activeTab === 'models' ? 'active' : ''}`}
            onClick={() => handleTabChange('models')}
          >
            <Cpu size={16} aria-hidden="true" />
            Modelos IA
          </button>
        </div>

        <div className="settings-body">
          <form onSubmit={handleAdd} className="add-item-form">
            <input
              type="text"
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              placeholder={placeholder}
              aria-label={`Añadir ${activeTab === 'categories' ? 'categoría' : 'modelo'}`}
            />
            <button type="submit" className="btn-primary" disabled={!newItemValue.trim()}>
              <Plus size={16} aria-hidden="true" />
              Añadir
            </button>
          </form>

          <div className="items-list">
            {activeData.map((item, index) => (
              <div key={index} className="item-list-item">
                <span>{item}</span>
                <button 
                  className="btn-icon danger" 
                  onClick={() => handleDelete(item)}
                  aria-label={`Eliminar ${item}`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            ))}
            {activeData.length === 0 && (
              <p className="no-items">
                No hay {activeTab === 'categories' ? 'categorías' : 'modelos'} configurados.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;

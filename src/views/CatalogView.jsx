import React from 'react';
import PromptCard from '../components/PromptCard';
import { PackageOpen } from 'lucide-react';
import './CatalogView.css';

const CatalogView = ({ prompts, activeCategory, searchQuery, onRun, onCopy, onEdit }) => {
  
  const filteredPrompts = prompts.filter(p => {
    // 1. Filtrar por categoría
    let categoryMatch = false;
    if (activeCategory === 'all' || activeCategory === 'favorites' || activeCategory === 'starred' || activeCategory === 'presets') {
      categoryMatch = true; // simplificado por ahora
    } else {
      categoryMatch = p.category === activeCategory;
    }

    // 2. Filtrar por texto de búsqueda
    let searchMatch = true;
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      searchMatch = (p.title || '').toLowerCase().includes(query) || 
                    (p.content || '').toLowerCase().includes(query) ||
                    (p.model || '').toLowerCase().includes(query);
    }

    return categoryMatch && searchMatch;
  });

  return (
    <div className="catalog-view">
      <div className="catalog-header">
        <h2 className="catalog-title">
          {activeCategory === 'all' ? 'Todos los Prompts' : 
           activeCategory.startsWith('#') ? activeCategory.substring(1) : 
           activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        <span className="catalog-count">{filteredPrompts.length} plantillas</span>
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="prompt-grid">
          {filteredPrompts.map(prompt => (
            <PromptCard 
              key={prompt.id} 
              prompt={prompt} 
              onRun={onRun}
              onCopy={onCopy}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <div className="empty-icon-wrapper" aria-hidden="true">
            <PackageOpen size={48} className="empty-icon" />
          </div>
          <h3>No se encontraron prompts</h3>
          <p>No pudimos encontrar ningún master prompt que coincida con tu búsqueda o categoría actual.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogView;

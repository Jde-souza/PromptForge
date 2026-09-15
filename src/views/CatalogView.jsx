import React from 'react';
import PromptCard from '../components/PromptCard';
import { PackageOpen } from 'lucide-react';
import './CatalogView.css';

const CatalogView = ({ prompts, activeCategory, onRun, onCopy, onEdit }) => {
  
  const filteredPrompts = prompts.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'favorites' || activeCategory === 'starred' || activeCategory === 'presets') return true; // simplified for demo
    return p.category === activeCategory;
  });

  return (
    <div className="catalog-view">
      <div className="catalog-header">
        <h2 className="catalog-title">
          {activeCategory === 'all' ? 'All Prompts' : 
           activeCategory.startsWith('#') ? activeCategory.substring(1) : 
           activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        <span className="catalog-count">{filteredPrompts.length} templates</span>
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
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <PackageOpen size={48} className="empty-icon" />
          </div>
          <h3>No prompts found</h3>
          <p>We couldn't find any master prompts matching this category.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogView;

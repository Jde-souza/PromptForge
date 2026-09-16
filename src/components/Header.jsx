import React from 'react';
import { Search, Plus } from 'lucide-react';
import './Header.css';

const Header = ({ onCreateNew, searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="search-container glow-border">
        <Search className="search-icon" size={18} aria-hidden="true" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar plantillas..." 
          aria-label="Buscar prompts"
          className="search-input"
        />
        <div className="search-shortcut">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </div>
      </div>
      
      <div className="header-actions">
        <button className="btn-primary" onClick={onCreateNew}>
          <Plus size={18} aria-hidden="true" />
          Nuevo Master Prompt
        </button>
      </div>
    </header>
  );
};

export default Header;

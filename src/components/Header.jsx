import React from 'react';
import { Search, Plus } from 'lucide-react';
import './Header.css';

const Header = ({ onCreateNew }) => {
  return (
    <header className="header">
      <div className="search-container glow-border">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="What does a world-class AI chat interface look like?" 
          className="search-input"
        />
        <div className="search-shortcut">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </div>
      </div>
      
      <div className="header-actions">
        <button className="btn-primary" onClick={onCreateNew}>
          <Plus size={18} />
          New Master Prompt
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { 
  FolderGit2, 
  Star, 
  Bookmark, 
  Variable,
  Database,
  CloudOff
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', label: 'All Prompts', icon: FolderGit2, count: 12 },
    { id: 'favorites', label: 'Favorites', icon: Star, count: 3 },
    { id: 'starred', label: 'Starred Templates', icon: Bookmark, count: 5 },
    { id: 'presets', label: 'Variable Presets', icon: Variable, count: 8 },
  ];

  const tags = [
    "System Architecture", 
    "Audio Engineering", 
    "Frontend", 
    "Copywriting"
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Database className="logo-icon" size={24} />
          <span>PromptForge</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">LIBRARY</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button 
                  className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <cat.icon size={18} className="nav-icon" />
                  <span className="nav-label">{cat.label}</span>
                  <span className="nav-count">{cat.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">CATEGORIES</h3>
          <ul className="tags-list">
            {tags.map(tag => (
              <li key={tag}>
                <button 
                  className={`tag-item ${activeCategory === tag ? 'active' : ''}`}
                  onClick={() => setActiveCategory(tag)}
                >
                  <span className="tag-hash">#</span>
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <CloudOff size={14} className="status-icon local" />
          <span>Local Storage</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

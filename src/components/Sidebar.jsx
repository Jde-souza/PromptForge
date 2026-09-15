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
    { id: 'all', label: 'Todos los Prompts', icon: FolderGit2, count: 12 },
    { id: 'favorites', label: 'Favoritos', icon: Star, count: 3 },
    { id: 'starred', label: 'Plantillas Destacadas', icon: Bookmark, count: 5 },
    { id: 'presets', label: 'Variables Guardadas', icon: Variable, count: 8 },
  ];

  const tags = [
    "System Architecture", 
    "Audio Engineering", 
    "Frontend", 
    "Copywriting"
  ];

  return (
    <aside className="sidebar" aria-label="Navegación principal">
      <div className="sidebar-header">
        <div className="logo">
          <Database className="logo-icon" size={24} aria-hidden="true" />
          <span>PromptForge</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">BIBLIOTECA</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button 
                  className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-current={activeCategory === cat.id ? 'page' : undefined}
                >
                  <cat.icon size={18} className="nav-icon" aria-hidden="true" />
                  <span className="nav-label">{cat.label}</span>
                  <span className="nav-count">{cat.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">CATEGORÍAS</h3>
          <ul className="tags-list">
            {tags.map(tag => (
              <li key={tag}>
                <button 
                  className={`tag-item ${activeCategory === tag ? 'active' : ''}`}
                  onClick={() => setActiveCategory(tag)}
                  aria-current={activeCategory === tag ? 'page' : undefined}
                >
                  <span className="tag-hash" aria-hidden="true">#</span>
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator" role="status" aria-live="polite">
          <CloudOff size={14} className="status-icon local" aria-hidden="true" />
          <span>Almacenamiento Local</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

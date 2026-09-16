import React from 'react';
import { 
  FolderGit2, 
  Star, 
  Bookmark, 
  Variable,
  Database,
  CloudOff,
  Settings,
  LifeBuoy
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ categories, activeCategory, setActiveCategory, onOpenSettings, currentView, setCurrentView }) => {
  const defaultCategories = [
    { id: 'all', label: 'Todos los Prompts', icon: FolderGit2, count: 12 },
    { id: 'favorites', label: 'Favoritos', icon: Star, count: 3 },
    { id: 'starred', label: 'Plantillas Destacadas', icon: Bookmark, count: 5 },
    { id: 'presets', label: 'Variables Guardadas', icon: Variable, count: 8 },
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
            {defaultCategories.map((cat) => (
              <li key={cat.id}>
                <button 
                  className={`nav-item ${activeCategory === cat.id && currentView !== 'help' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (setCurrentView) setCurrentView('catalog');
                  }}
                  aria-current={activeCategory === cat.id && currentView !== 'help' ? 'page' : undefined}
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
          
          <ul className="tags-list" style={{ marginTop: '4px' }}>
            {categories.map(tag => (
              <li key={tag}>
                <button 
                  className={`tag-item ${activeCategory === tag && currentView !== 'help' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(tag);
                    if (setCurrentView) setCurrentView('catalog');
                  }}
                  aria-current={activeCategory === tag && currentView !== 'help' ? 'page' : undefined}
                >
                  <span className="tag-hash" aria-hidden="true">#</span>
                  {tag}
                </button>
              </li>
            ))}
            <li>
              <button 
                className="btn-secondary" 
                onClick={onOpenSettings}
                style={{ 
                  width: 'calc(100% - 16px)', 
                  margin: '16px 8px 0 8px', 
                  justifyContent: 'center',
                  fontSize: '0.85rem'
                }}
              >
                <Settings size={16} aria-hidden="true" />
                Configuración
              </button>
            </li>
          </ul>
        </div>
        
        <div className="nav-section" style={{ marginTop: 'auto' }}>
          <ul>
            <li>
              <button 
                className={`nav-item ${currentView === 'help' ? 'active' : ''}`}
                onClick={() => setCurrentView && setCurrentView('help')}
              >
                <LifeBuoy size={18} className="nav-icon" aria-hidden="true" />
                <span className="nav-label">Centro de Ayuda</span>
              </button>
            </li>
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

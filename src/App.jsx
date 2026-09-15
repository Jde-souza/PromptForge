import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import CatalogView from './views/CatalogView';
import EditorView from './views/EditorView';
import { extractVariables } from './utils/promptUtils';

// Dummy initial data
const DUMMY_PROMPTS = [
  {
    id: '1',
    title: 'React Component Generator',
    model: 'Claude 3.7',
    category: 'Frontend',
    content: 'Create a React functional component named {{component_name}} that takes {{props_list}} as props. It should use Tailwind CSS for styling and include a basic {{state_variable}} state.',
    variables: ['component_name', 'props_list', 'state_variable'],
    lastModified: '2026-09-15'
  },
  {
    id: '2',
    title: 'System Architecture Document',
    model: 'GPT-4o',
    category: 'System Architecture',
    content: 'Write a high-level system architecture document for a {{system_type}} system. The main requirements are {{requirements}}. Include diagrams using Mermaid.js.',
    variables: ['system_type', 'requirements'],
    lastModified: '2026-09-14'
  }
];

function App() {
  const [prompts, setPrompts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Navigation State
  const [currentView, setCurrentView] = useState('catalog'); // 'catalog' | 'editor'
  const [editingPrompt, setEditingPrompt] = useState(null);

  // Toast State
  const [toast, setToast] = useState({ isVisible: false, message: '' });

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('promptforge_prompts');
    if (saved) {
      try {
        setPrompts(JSON.parse(saved));
      } catch (e) {
        setPrompts(DUMMY_PROMPTS);
      }
    } else {
      setPrompts(DUMMY_PROMPTS);
      localStorage.setItem('promptforge_prompts', JSON.stringify(DUMMY_PROMPTS));
    }
  }, []);

  // Save to local storage whenever prompts change
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('promptforge_prompts', JSON.stringify(prompts));
    }
  }, [prompts]);

  const showToast = (message) => {
    setToast({ isVisible: true, message });
  };

  const handleCreateNew = () => {
    setEditingPrompt(null);
    setCurrentView('editor');
  };

  const handleEdit = (prompt) => {
    setEditingPrompt(prompt);
    setCurrentView('editor');
  };

  const handleRun = (prompt) => {
    handleEdit(prompt); // Run currently just opens the editor for now
  };

  const handleCopy = (prompt) => {
    navigator.clipboard.writeText(prompt.content);
    showToast('¡Plantilla del prompt copiada al portapapeles!');
  };

  const handleCopyCompiled = (compiledText) => {
    navigator.clipboard.writeText(compiledText);
    showToast('¡Prompt compilado copiado al portapapeles!');
  };

  const handleSavePrompt = (savedPrompt) => {
    if (editingPrompt) {
      // Update existing
      setPrompts(prompts.map(p => p.id === savedPrompt.id ? savedPrompt : p));
    } else {
      // Create new
      setPrompts([savedPrompt, ...prompts]);
    }
    showToast('¡Prompt guardado con éxito!');
    setCurrentView('catalog');
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      <main className="main-content">
        {currentView === 'catalog' && (
          <Header onCreateNew={handleCreateNew} />
        )}
        
        {currentView === 'catalog' ? (
          <CatalogView 
            prompts={prompts}
            activeCategory={activeCategory}
            onRun={handleRun}
            onCopy={handleCopy}
            onEdit={handleEdit}
          />
        ) : (
          <EditorView 
            initialPrompt={editingPrompt}
            onSave={handleSavePrompt}
            onBack={() => setCurrentView('catalog')}
            onCopyCompiled={handleCopyCompiled}
          />
        )}
      </main>

      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}

export default App;

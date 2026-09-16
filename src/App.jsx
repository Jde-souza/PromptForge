import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import CatalogView from './views/CatalogView';
import EditorView from './views/EditorView';
import HelpView from './views/HelpView';
import SettingsModal from './components/SettingsModal';
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

const DEFAULT_CATEGORIES = [
  "Arquitectura del sistema", 
  "Ingeniería de Audio", 
  "Frontend", 
  "Copywriting"
];

const DEFAULT_MODELS = [
  "GPT-4o",
  "Claude 3.7",
  "Gemini Pro"
];

function App() {
  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation State
  const [currentView, setCurrentView] = useState('catalog'); // 'catalog' | 'editor'
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ isVisible: false, message: '' });

  // Load from local storage
  useEffect(() => {
    const savedPrompts = localStorage.getItem('promptforge_prompts');
    if (savedPrompts) {
      try {
        setPrompts(JSON.parse(savedPrompts));
      } catch (e) {
        setPrompts(DUMMY_PROMPTS);
      }
    } else {
      setPrompts(DUMMY_PROMPTS);
      localStorage.setItem('promptforge_prompts', JSON.stringify(DUMMY_PROMPTS));
    }

    const savedCategories = localStorage.getItem('promptforge_custom_categories');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        setCategories(DEFAULT_CATEGORIES);
      }
    } else {
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem('promptforge_custom_categories', JSON.stringify(DEFAULT_CATEGORIES));
    }

    const savedModels = localStorage.getItem('promptforge_custom_models');
    if (savedModels) {
      try {
        setModels(JSON.parse(savedModels));
      } catch (e) {
        setModels(DEFAULT_MODELS);
      }
    } else {
      setModels(DEFAULT_MODELS);
      localStorage.setItem('promptforge_custom_models', JSON.stringify(DEFAULT_MODELS));
    }
  }, []);

  // Save prompts to local storage whenever they change
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('promptforge_prompts', JSON.stringify(prompts));
    }
  }, [prompts]);

  // Save categories to local storage whenever they change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('promptforge_custom_categories', JSON.stringify(categories));
    }
  }, [categories]);

  // Save models to local storage whenever they change
  useEffect(() => {
    if (models.length > 0) {
      localStorage.setItem('promptforge_custom_models', JSON.stringify(models));
    }
  }, [models]);

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

  const handleAddCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      showToast('¡Categoría añadida!');
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter(cat => cat !== categoryToDelete));
    if (activeCategory === categoryToDelete) {
      setActiveCategory('all');
    }
    showToast('¡Categoría eliminada!');
  };

  const handleAddModel = (newModel) => {
    if (!models.includes(newModel)) {
      setModels([...models, newModel]);
      showToast('¡Modelo añadido!');
    }
  };

  const handleDeleteModel = (modelToDelete) => {
    setModels(models.filter(mod => mod !== modelToDelete));
    showToast('¡Modelo eliminado!');
  };

  return (
    <div className="app-container">
      <Sidebar 
        categories={categories}
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <main className="main-content">
        {currentView === 'catalog' && (
          <Header 
            onCreateNew={handleCreateNew} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        
        {currentView === 'catalog' ? (
          <CatalogView 
            prompts={prompts}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onRun={handleRun}
            onCopy={handleCopy}
            onEdit={handleEdit}
          />
        ) : currentView === 'help' ? (
          <HelpView />
        ) : (
          <EditorView 
            categories={categories}
            models={models}
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

      {isSettingsModalOpen && (
        <SettingsModal 
          categories={categories}
          models={models}
          onClose={() => setIsSettingsModalOpen(false)}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onAddModel={handleAddModel}
          onDeleteModel={handleDeleteModel}
        />
      )}
    </div>
  );
}

export default App;

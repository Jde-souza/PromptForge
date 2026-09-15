import React, { useState, useEffect } from 'react';
import { extractVariables, compilePrompt } from '../utils/promptUtils';
import { ArrowLeft, Save, Copy, Download, Play } from 'lucide-react';
import './EditorView.css';

const EditorView = ({ categories, initialPrompt, onSave, onBack, onCopyCompiled }) => {
  const [prompt, setPrompt] = useState(initialPrompt || {
    id: Date.now().toString(),
    title: 'Nuevo Prompt',
    category: 'System Architecture',
    model: 'GPT-4o',
    content: '',
    variables: [],
    lastModified: new Date().toISOString().split('T')[0]
  });

  const [variableValues, setVariableValues] = useState({});

  // When content changes, re-extract variables
  useEffect(() => {
    const extracted = extractVariables(prompt.content);
    setPrompt(prev => ({ ...prev, variables: extracted }));
    
    // Initialize empty values for new variables
    setVariableValues(prev => {
      const newValues = { ...prev };
      extracted.forEach(v => {
        if (newValues[v] === undefined) newValues[v] = '';
      });
      return newValues;
    });
  }, [prompt.content]);

  const handleContentChange = (e) => {
    setPrompt({ ...prompt, content: e.target.value });
  };

  const handleMetaChange = (field, value) => {
    setPrompt({ ...prompt, [field]: value });
  };

  const handleVarChange = (varName, value) => {
    setVariableValues({ ...variableValues, [varName]: value });
  };

  const handleSave = () => {
    onSave({
      ...prompt,
      lastModified: new Date().toISOString().split('T')[0]
    });
  };

  const compiledPrompt = compilePrompt(prompt.content, variableValues);

  return (
    <div className="editor-view">
      <div className="editor-header">
        <button className="btn-secondary back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Atrás
        </button>
        <div className="header-actions">
          <button className="btn-secondary">v1.0</button>
          <button className="btn-primary" onClick={handleSave}>
            <Save size={16} /> Guardar Cambios
          </button>
        </div>
      </div>

      <div className="split-view">
        {/* Left Panel: 60% Editor */}
        <div className="panel editor-panel">
          <div className="panel-header">
            <h3>Editor de Plantillas</h3>
          </div>
          <div className="metadata-inputs">
            <input 
              type="text" 
              value={prompt.title} 
              onChange={e => handleMetaChange('title', e.target.value)}
              className="meta-input title-input"
              placeholder="Título del Prompt"
              aria-label="Título del Prompt"
            />
            <div className="meta-row">
              <select 
                value={prompt.category} 
                onChange={e => handleMetaChange('category', e.target.value)}
                className="meta-select"
                aria-label="Categoría"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
              <select 
                value={prompt.model} 
                onChange={e => handleMetaChange('model', e.target.value)}
                className="meta-select"
                aria-label="Modelo de IA"
              >
                <option value="GPT-4o">GPT-4o</option>
                <option value="Claude 3.7">Claude 3.7</option>
                <option value="Gemini Pro">Gemini Pro</option>
              </select>
            </div>
          </div>
          
          <div className="editor-container">
            <textarea
              className="prompt-textarea mono"
              value={prompt.content}
              onChange={handleContentChange}
              placeholder="Escribe tu prompt aquí... Usa {{nombre_variable}} para agregar variables dinámicas."
              spellCheck="false"
              aria-label="Cuerpo principal del prompt"
            />
          </div>
        </div>

        {/* Right Panel: 40% Injector & Preview */}
        <div className="panel injector-panel">
          <div className="panel-header">
            <h3>Variables Dinámicas</h3>
            <span className="badge primary">{prompt.variables.length}</span>
          </div>
          
          <div className="variables-list">
            {prompt.variables.length === 0 ? (
              <p className="no-vars-msg">Agrega {'{{variables}}'} en el editor para verlas aquí.</p>
            ) : (
              prompt.variables.map(v => (
                <div key={v} className="var-input-group">
                  <label htmlFor={`var-${v}`} className="mono">{v}</label>
                  <input 
                    id={`var-${v}`}
                    type="text" 
                    value={variableValues[v] || ''}
                    onChange={(e) => handleVarChange(v, e.target.value)}
                    placeholder={`Ingresa el valor para ${v}`}
                  />
                </div>
              ))
            )}
          </div>

          <div className="preview-container">
            <h4>Vista Previa en Vivo</h4>
            <div className="preview-box mono">
              {compiledPrompt || <span className="preview-placeholder">El prompt compilado aparecerá aquí...</span>}
            </div>
          </div>

          <div className="injector-actions">
            <button className="btn-secondary" title="Exportar a Markdown" aria-label="Exportar a Markdown">
              <Download size={16} aria-hidden="true" />
            </button>
            <button className="btn-secondary" title="Prueba Directa de API">
              <Play size={16} aria-hidden="true" /> Probar
            </button>
            <button className="btn-success copy-btn" onClick={() => onCopyCompiled(compiledPrompt)}>
              <Copy size={16} aria-hidden="true" /> Copiar Compilado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorView;

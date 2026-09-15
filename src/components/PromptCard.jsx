import React from 'react';
import { Play, Copy, MoreHorizontal, Edit2, CopyPlus, Trash2, Download } from 'lucide-react';
import './PromptCard.css';

const PromptCard = ({ prompt, onRun, onCopy, onEdit }) => {
  const { title, model, variables, category, lastModified } = prompt;

  return (
    <div className="prompt-card">
      <div className="card-header">
        <span className="badge category-badge">{category}</span>
        <div className="card-actions-hover">
          <button className="btn-icon" title="Editar" aria-label="Editar prompt" onClick={() => onEdit(prompt)}><Edit2 size={14} aria-hidden="true" /></button>
          <button className="btn-icon" title="Duplicar" aria-label="Duplicar prompt"><CopyPlus size={14} aria-hidden="true" /></button>
          <button className="btn-icon" title="Exportar JSON" aria-label="Exportar a JSON"><Download size={14} aria-hidden="true" /></button>
          <button className="btn-icon danger" title="Eliminar" aria-label="Eliminar prompt"><Trash2 size={14} aria-hidden="true" /></button>
        </div>
      </div>
      
      <h3 className="card-title">{title}</h3>
      
      <div className="card-meta">
        <span className="badge model-badge">{model}</span>
        <span className="variables-count mono">
          {variables.length} variable{variables.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="card-footer">
        <span className="last-modified">Actualizado {lastModified}</span>
        <div className="card-primary-actions">
          <button className="btn-icon" title="Copia Rápida" aria-label="Copiar prompt rápidamente" onClick={() => onCopy(prompt)}>
            <Copy size={16} aria-hidden="true" />
          </button>
          <button className="btn-primary run-btn" onClick={() => onRun(prompt)}>
            <Play size={14} fill="currentColor" aria-hidden="true" />
            Compilar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;

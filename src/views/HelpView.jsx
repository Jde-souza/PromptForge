import React from 'react';
import { Variable, FolderGit2, Keyboard, Share, Sparkles } from 'lucide-react';
import './HelpView.css';

const HelpView = () => {
  return (
    <div className="help-view">
      <div className="help-header">
        <h2>Centro de Ayuda</h2>
        <p>Aprende a dominar PromptForge y crea plantillas dinámicas como un profesional.</p>
      </div>

      <div className="help-grid">
        {/* Variables Card */}
        <div className="help-card glow-border">
          <div className="help-card-header">
            <div className="help-icon-wrapper">
              <Variable size={24} aria-hidden="true" />
            </div>
            <h3>Variables Dinámicas</h3>
          </div>
          <p>
            El corazón de PromptForge. Convierte cualquier prompt estático en una plantilla reutilizable encerrando palabras clave entre dobles llaves.
          </p>
          <div className="help-card-content">
            <span className="help-code-block">
              Actúa como un experto en {'{{tema}}'}.<br/>
              Escribe un artículo con tono {'{{tono}}'}.
            </span>
          </div>
        </div>

        {/* Organization Card */}
        <div className="help-card glow-border">
          <div className="help-card-header">
            <div className="help-icon-wrapper">
              <FolderGit2 size={24} aria-hidden="true" />
            </div>
            <h3>Categorías y Modelos</h3>
          </div>
          <p>
            Mantén tu biblioteca organizada. Puedes configurar tanto las categorías de tus prompts como los modelos de IA objetivos desde la barra lateral.
          </p>
          <div className="help-card-content" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            <Sparkles size={16} className="primary-text" />
            Haz clic en <strong>Configuración</strong> en el menú lateral para gestionar tus listas.
          </div>
        </div>

        {/* Shortcuts Card */}
        <div className="help-card glow-border">
          <div className="help-card-header">
            <div className="help-icon-wrapper">
              <Keyboard size={24} aria-hidden="true" />
            </div>
            <h3>Atajos de Teclado</h3>
          </div>
          <p>Navega e interactúa rápidamente sin soltar el teclado para mantener el flujo creativo.</p>
          <div className="help-card-content">
            <div className="help-shortcut-list">
              <div className="shortcut-item">
                <span>Buscar Plantillas</span>
                <div className="kbd-group">
                  <kbd>Ctrl</kbd><kbd>K</kbd>
                </div>
              </div>
              <div className="shortcut-item">
                <span>Guardar Cambios</span>
                <div className="kbd-group">
                  <kbd>Ctrl</kbd><kbd>S</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Card */}
        <div className="help-card glow-border">
          <div className="help-card-header">
            <div className="help-icon-wrapper">
              <Share size={24} aria-hidden="true" />
            </div>
            <h3>Copiar y Exportar</h3>
          </div>
          <p>
            Una vez que hayas rellenado tus variables dinámicas en el panel derecho, puedes copiar el prompt final o exportarlo.
          </p>
          <div className="help-card-content">
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Usa el botón verde <strong>Copiar Compilado</strong> en el inyector de variables para llevarlo directo a tu IA favorita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpView;

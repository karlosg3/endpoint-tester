import React, { useRef, useEffect, useCallback } from 'react';
import './Editor.css';

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  language?: 'json' | 'text';
}

export default function Editor({ 
  value, 
  onChange, 
  placeholder, 
  readOnly = false,
  language = 'text' 
}: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, 1);

  // Función para hacer syntax highlighting de JSON
  const highlightJSON = useCallback((json: string): string => {
    if (!json.trim()) return json;
    
    try {
      // Intentamos parsear para validar si es JSON válido
      JSON.parse(json);
      
      // Si es válido, aplicamos el resaltado con spans
      return json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, 
        (match) => {
          if (match.endsWith(':')) {
            const key = match.slice(0, -1).trim();
            return `<span class="json-key">${key}</span>:`;
          } else if (match.startsWith('"')) {
            return `<span class="json-string">${match}</span>`;
          } else if (match === 'true' || match === 'false') {
            return `<span class="json-boolean">${match}</span>`;
          } else if (match === 'null') {
            return `<span class="json-null">${match}</span>`;
          } else if (!isNaN(Number(match))) {
            return `<span class="json-number">${match}</span>`;
          }
          return match;
        }
      );
    } catch {
      // Si no es válido (ej. durante la escritura de un "typo"), devolvemos texto escapado plano
      return json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  }, []);

  const getHighlightedHTML = useCallback(() => {
    if (language === 'json' && value.trim()) {
      return highlightJSON(value);
    }
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }, [value, language, highlightJSON]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;
    
    // Al usar textContent obtenemos el texto limpio sin los tags HTML del resaltado
    const newValue = e.currentTarget.textContent || '';
    onChange(newValue);
  };

  const handleScroll = () => {
    if (editorRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = editorRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // Insertar dos espacios en lugar de un tabulador real
      document.execCommand('insertText', false, '  ');
    }
  };

  // Efecto para sincronizar el valor externo con el DOM interno
  useEffect(() => {
    if (editorRef.current) {
      // IMPORTANTE: Solo actualizamos innerHTML si el texto ha cambiado realmente desde el exterior.
      // Si el texto en el DOM ya coincide con 'value', no tocamos innerHTML para evitar perder el cursor.
      if (editorRef.current.textContent !== value) {
        const highlighted = getHighlightedHTML();
        editorRef.current.innerHTML = highlighted || '<br>';
      }
    }
  }, [value, getHighlightedHTML]);

  // Efecto separado para manejar cambios de lenguaje o inicialización que requieran refrescar el resaltado
  // sin necesariamente haber cambiado el texto plano.
  useEffect(() => {
    if (editorRef.current) {
      const highlighted = getHighlightedHTML();
      // Solo forzamos la actualización si el HTML actual es diferente del que debería ser.
      // Esto ocurrirá al cambiar el prop 'language' o al cargar el componente.
      if (editorRef.current.innerHTML !== highlighted && (editorRef.current.innerHTML || highlighted)) {
        // Nota: Si el usuario está escribiendo, esto podría causar un salto de cursor,
        // pero el cambio de lenguaje suele ser una acción externa.
        editorRef.current.innerHTML = highlighted || '<br>';
      }
    }
  }, [language, getHighlightedHTML]); // Solo re-re-resaltar si cambia el lenguaje o el resaltado de base

  return (
    <div className="editor-container">
      <div className="editor-gutter" ref={gutterRef}>
        {Array.from({ length: lineCount }).map((_, i) => (
          <div key={i} className="editor-line-number">
            {i + 1}
          </div>
        ))}
      </div>
      <div
        ref={editorRef}
        className={`editor-content ${language === 'json' ? 'json-editor' : ''}`}
        contentEditable={!readOnly}
        onInput={handleInput}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
}

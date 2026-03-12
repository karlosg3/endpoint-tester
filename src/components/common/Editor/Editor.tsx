import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  const [isInternalChange, setIsInternalChange] = useState(false);

  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, 1);

  // Función para hacer syntax highlighting de JSON - memoizada con useCallback
  const highlightJSON = useCallback((json: string): string => {
    if (!json.trim()) return json;
    
    try {
      JSON.parse(json);
      
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, 
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
    
    const newValue = e.currentTarget.textContent || '';
    setIsInternalChange(true);
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
      document.execCommand('insertText', false, '  ');
    }
  };

  useEffect(() => {
    if (!isInternalChange && editorRef.current) {
      const highlighted = getHighlightedHTML();
      editorRef.current.innerHTML = highlighted || '<br>';
    }
  }, [value, language, getHighlightedHTML, isInternalChange]);

  useEffect(() => {
    if (isInternalChange) {
      const frameId = requestAnimationFrame(() => {
        setIsInternalChange(false);
      });
      
      return () => cancelAnimationFrame(frameId);
    }
  }, [isInternalChange]);

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
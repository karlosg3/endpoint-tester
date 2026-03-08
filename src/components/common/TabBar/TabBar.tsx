import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { getMethodColor } from '../../../utils/storage';
import './TabBar.css';
import { type Tab } from '../../../utils/storage';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabSwitch: (id: string) => void;
  onCloseTab: (id: string) => void;
  onCreateTab: () => void;
  onUpdateTab: (id: string, changes: Partial<Tab>) => void;
}

export default function TabBar({
  tabs,
  activeTabId,
  onTabSwitch,
  onCloseTab,
  onCreateTab,
  onUpdateTab,
}: TabBarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempLabel, setTempLabel] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  function tabHasContent(tab: Tab): boolean {
    return (
      tab.url.trim() !== '' ||
      tab.body.trim() !== '' ||
      tab.headers.some(h => h.key.trim() !== '')
    );
  }

  function handleDoubleClick(tab: Tab) {
    setEditingId(tab.id);
    setTempLabel(tab.label);
  }

  function handleSave(id: string) {
    if (!editingId) return;
    
    const trimmed = tempLabel.trim();
    if (trimmed && trimmed !== tabs.find(t => t.id === id)?.label) {
      onUpdateTab(id, { label: trimmed });
    }
    setEditingId(null);
  }

  function handleKeyDown(e: React.KeyboardEvent, id: string) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSave(id);
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      setEditingId(null);
    }
  }

  function handleCloseTab(id: string, e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const tab = tabs.find(t => t.id === id);
    if (!tab) return;

    if (tabHasContent(tab)) {
      toast.warning('Discard unsaved changes?', {
        description: 'This tab has unsaved content. Are you sure you want to close it?',
        action: {
          label: 'Close Tab',
          onClick: () => onCloseTab(id),
        },
      });
    } else {
      onCloseTab(id);
    }
  }

  return (
    <div className='tab-bar'>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab-item ${tab.id === activeTabId ? 'active' : ''} ${editingId === tab.id ? 'editing' : ''}`}
          onClick={() => editingId !== tab.id && onTabSwitch(tab.id)}
        >
          <span
            className='tab-method-badge'
            style={{ color: getMethodColor(tab.method) }}
          >
            {tab.method}
          </span>
          
          {editingId === tab.id ? (
            <input
              ref={inputRef}
              className="tab-edit-input"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onBlur={() => handleSave(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span 
              className='tab-label' 
              title={tab.url || tab.label}
              onDoubleClick={() => handleDoubleClick(tab)}
            >
              {tab.label}
            </span>
          )}

          <button
            className='tab-close'
            onClick={(event) => handleCloseTab(tab.id, event)}
            title='Close Tab'
          >
            ×
          </button>
        </div>
      ))}
      <button className='tab-add' onClick={onCreateTab} title='New Tab'>
        +
      </button>
    </div>
  );
}

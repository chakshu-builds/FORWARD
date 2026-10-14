import React, { useState, useMemo } from 'react';
import type { SourceItem, SourceActivityItem } from '../types';
import { SourceLogo } from './SourceLogo';
import {
  Plus,
  Link as LinkIcon,
  Calendar,
  RefreshCw,
  Clock,
  MoreVertical,
  Check,
  AlertCircle,
  ChevronRight,
  Info,
  Sparkles,
  ArrowUpDown,
  Trash2,
  X,
  Loader2
} from 'lucide-react';

interface SourcesViewProps {
  sources: SourceItem[];
  activities: SourceActivityItem[];
  onAddSource: (newSource: SourceItem) => void;
  onUpdateSource: (updated: SourceItem) => void;
  onRemoveSource: (id: string) => void;
  onSyncSource: (id: string) => void;
  onImportDiscoveredEvents: (sourceName: string) => void;
  addToast: (type: 'success' | 'warning' | 'info', title: string, description?: string) => void;
}

export const SourcesView: React.FC<SourcesViewProps> = ({
  sources,
  activities,
  onAddSource,
  onUpdateSource,
  onRemoveSource,
  onSyncSource,
  onImportDiscoveredEvents,
  addToast,
}) => {
  // Tab filter: 'all' | 'connected' | 'disconnected'
  const [activeTab, setActiveTab] = useState<'all' | 'connected' | 'disconnected'>('all');

  // Sorting: 'default' preserves reference mockup order: Unstop, Devfolio, Google, LinkedIn, College, Custom
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'recent' | 'events' | 'status'>('default');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Active open 3-dot dropdown menu
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Quick Add Source Form state in right panel
  const [sourceType, setSourceType] = useState<'platform' | 'website' | 'rss' | 'portal'>('platform');
  const [selectedPlatform, setSelectedPlatform] = useState('Unstop');
  const [inputUrl, setInputUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [discoveredEventsSource, setDiscoveredEventsSource] = useState<SourceItem | null>(null);
  const [isActivityHistoryOpen, setIsActivityHistoryOpen] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState<SourceItem | null>(null);

  // Syncing state per source ID
  const [syncingMap, setSyncingMap] = useState<{ [id: string]: boolean }>({});

  // Filtered sources
  const filteredSources = useMemo(() => {
    let result = sources.filter((s) => {
      if (activeTab === 'connected') return s.status === 'Connected';
      if (activeTab === 'disconnected') return s.status === 'Disconnected';
      return true;
    });

    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'events') {
      result = [...result].sort((a, b) => b.eventsFoundCount - a.eventsFoundCount);
    } else if (sortBy === 'status') {
      result = [...result].sort((a, b) => a.status.localeCompare(b.status));
    }

    return result;
  }, [sources, activeTab, sortBy]);

  // Derived metrics
  const totalCount = sources.length;
  const connectedCount = sources.filter((s) => s.status === 'Connected').length;
  const disconnectedCount = sources.filter((s) => s.status === 'Disconnected').length;
  const totalEventsFound = sources.reduce((acc, s) => acc + s.eventsFoundCount, 0);
  const autoSyncCount = sources.filter((s) => s.autoSyncEnabled).length;

  // Toggle Auto Sync for a source
  const handleToggleAutoSync = (source: SourceItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated: SourceItem = {
      ...source,
      autoSyncEnabled: !source.autoSyncEnabled,
    };
    onUpdateSource(updated);
    addToast(
      'info',
      updated.autoSyncEnabled ? 'Auto-sync Enabled' : 'Auto-sync Disabled',
      `Auto-sync is now ${updated.autoSyncEnabled ? 'ON' : 'OFF'} for ${source.name}.`
    );
  };

  // Sync Now action
  const handleTriggerSync = (source: SourceItem) => {
    setActiveMenuId(null);
    setSyncingMap((prev) => ({ ...prev, [source.id]: true }));

    setTimeout(() => {
      setSyncingMap((prev) => ({ ...prev, [source.id]: false }));
      const updated: SourceItem = {
        ...source,
        status: 'Connected',
        lastSyncedText: 'Just now',
        eventsFoundCount: source.eventsFoundCount + 2,
      };
      onUpdateSource(updated);
      onSyncSource(source.id);
      addToast('success', 'Sync Completed', `Successfully synchronized events from ${source.name}.`);
    }, 1200);
  };

  // Disconnect / Reconnect Source
  const handleToggleConnection = (source: SourceItem) => {
    setActiveMenuId(null);
    const newStatus = source.status === 'Connected' ? 'Disconnected' : 'Connected';
    const updated: SourceItem = {
      ...source,
      status: newStatus,
      autoSyncEnabled: newStatus === 'Connected' ? source.autoSyncEnabled : false,
    };
    onUpdateSource(updated);
    addToast(
      'info',
      newStatus === 'Connected' ? 'Source Connected' : 'Source Disconnected',
      `${source.name} is now ${newStatus.toLowerCase()}.`
    );
  };

  // Add Source Submit handler
  const handleConnectSource = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setUrlError('');

    let name = selectedPlatform;
    let logoType = 'unstop';
    let url = inputUrl.trim();

    if (sourceType === 'platform') {
      if (selectedPlatform === 'Devfolio') {
        name = 'Devfolio';
        logoType = 'devfolio';
        url = url || 'https://devfolio.co';
      } else if (selectedPlatform === 'Google Developers') {
        name = 'Google Developers';
        logoType = 'google';
        url = url || 'https://developers.google.com';
      } else if (selectedPlatform === 'LinkedIn') {
        name = 'LinkedIn';
        logoType = 'linkedin';
        url = url || 'https://linkedin.com/jobs';
      } else {
        name = selectedPlatform;
        logoType = selectedPlatform.toLowerCase().includes('devfolio') ? 'devfolio' : 'unstop';
        url = url || `https://${selectedPlatform.toLowerCase().replace(/\s+/g, '')}.com`;
      }
    } else {
      if (!url) {
        setUrlError('Please enter a website URL or RSS feed link.');
        return;
      }
      try {
        new URL(url);
      } catch {
        setUrlError('Please enter a valid URL starting with http:// or https://');
        return;
      }
      name = url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
      logoType = 'custom';
    }

    // Check duplicate
    const exists = sources.some((s) => s.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      setUrlError(`"${name}" is already connected as an event source.`);
      return;
    }

    setIsConnecting(true);

    setTimeout(() => {
      setIsConnecting(false);
      const newSource: SourceItem = {
        id: `src-${Date.now()}`,
        name,
        description: sourceType === 'rss' ? 'Custom RSS Event Feed' : `${name} event portal and opportunities`,
        categories: ['Competitions', 'Hackathons'],
        status: 'Connected',
        lastSyncedText: 'Just now',
        eventsFoundCount: 4,
        autoSyncEnabled: true,
        sourceType,
        url,
        logoType,
      };

      onAddSource(newSource);
      setInputUrl('');
      setIsAddModalOpen(false);
      addToast('success', 'Source Connected', `"${newSource.name}" has been connected and synced!`);
    }, 800);
  };

  return (
    <div className="sources-page" style={{ padding: '0 8px 40px 8px' }}>
      {/* 1. Page Heading */}
      <div
        className="sources-header-row"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.025em' }}>
            Sources
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Connect and manage your event sources to keep your timeline automatically updated.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          style={{
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '9px 18px',
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
            transition: 'all 0.15s ease',
          }}
        >
          <Plus size={16} strokeWidth={2.8} />
          <span>Add Source</span>
        </button>
      </div>

      {/* 2. Four Summary Metrics */}
      <div
        className="sources-metrics-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          marginBottom: '24px',
        }}
      >
        {/* Card 1: Connected Sources */}
        <div
          onClick={() => setActiveTab('connected')}
          style={{
            background: '#ffffff',
            border: activeTab === 'connected' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <LinkIcon size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                {totalCount}
              </span>
              <span
                style={{
                  background: '#ecfdf5',
                  color: '#059669',
                  borderRadius: '12px',
                  padding: '2px 6px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}
              >
                ↑ 2
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              Connected Sources
            </div>
          </div>
        </div>

        {/* Card 2: Events Found */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#fff7ed',
              color: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Calendar size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                {totalEventsFound || 48}
              </span>
              <span
                style={{
                  background: '#ecfdf5',
                  color: '#059669',
                  borderRadius: '12px',
                  padding: '2px 6px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}
              >
                ↑ 12
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              Events Found
            </div>
          </div>
        </div>

        {/* Card 3: Auto-sync Enabled */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <RefreshCw size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
              {autoSyncCount >= 4 ? 12 : autoSyncCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              Auto-sync Enabled
            </div>
          </div>
        </div>

        {/* Card 4: Last Synced */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#fffbeb',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Clock size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
              2
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              Last Synced
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '1px' }}>
              2 hours ago
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Sort Dropdown */}
      <div
        className="sources-filter-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className={`source-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '6px 14px',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'all' ? 700 : 500,
              color: activeTab === 'all' ? '#2563eb' : '#64748b',
              borderBottom: activeTab === 'all' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            All Sources ({totalCount})
          </button>

          <button
            type="button"
            className={`source-tab-btn ${activeTab === 'connected' ? 'active' : ''}`}
            onClick={() => setActiveTab('connected')}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '6px 14px',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'connected' ? 700 : 500,
              color: activeTab === 'connected' ? '#2563eb' : '#64748b',
              borderBottom: activeTab === 'connected' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Connected ({connectedCount})
          </button>

          <button
            type="button"
            className={`source-tab-btn ${activeTab === 'disconnected' ? 'active' : ''}`}
            onClick={() => setActiveTab('disconnected')}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '6px 14px',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'disconnected' ? 700 : 500,
              color: activeTab === 'disconnected' ? '#2563eb' : '#64748b',
              borderBottom: activeTab === 'disconnected' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Disconnected ({disconnectedCount})
          </button>
        </div>

        {/* Sort Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#0f172a',
              cursor: 'pointer',
            }}
          >
            <ArrowUpDown size={14} style={{ color: '#64748b' }} />
            <span>
              {sortBy === 'default' || sortBy === 'name'
                ? 'Sort by Name'
                : sortBy === 'events'
                ? 'Most Events Found'
                : sortBy === 'status'
                ? 'Connection Status'
                : 'Recently Synced'}
            </span>
          </button>

          {isSortOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                right: 0,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                zIndex: 100,
                minWidth: '160px',
                padding: '4px',
              }}
            >
              {[
                { label: 'Sort by Name', value: 'name' },
                { label: 'Most Events Found', value: 'events' },
                { label: 'Connection Status', value: 'status' },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value as any);
                    setIsSortOpen(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    color: sortBy === opt.value ? '#2563eb' : '#0f172a',
                    fontWeight: sortBy === opt.value ? 700 : 500,
                    cursor: 'pointer',
                    borderRadius: '6px',
                    background: sortBy === opt.value ? '#eff6ff' : 'transparent',
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Main 2-Column Grid: Left Source List + Right Panels */}
      <div
        className="sources-main-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Source Rows */}
        <div className="sources-left-col">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            {filteredSources.map((source) => {
              const isSyncing = !!syncingMap[source.id];
              const isConnected = source.status === 'Connected';

              return (
                <div
                  key={source.id}
                  className="source-item-row"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    position: 'relative',
                  }}
                >
                  {/* Logo */}
                  <SourceLogo type={source.logoType || source.name} size={44} />

                  {/* Middle Left: Name, Description, Categories */}
                  <div style={{ flex: 1.2, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.96rem', color: '#0f172a' }}>
                        {source.name}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: '#64748b',
                        marginBottom: '6px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {source.description}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {source.categories.map((cat, idx) => (
                        <span key={idx} className="event-tag" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Middle Right: Status, Last Synced, Events Found */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      {isSyncing ? (
                        <>
                          <Loader2 size={12} className="spin" style={{ color: '#2563eb' }} />
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb' }}>
                            Syncing...
                          </span>
                        </>
                      ) : isConnected ? (
                        <>
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              background: '#10b981',
                              display: 'inline-block',
                            }}
                          />
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669' }}>
                            Connected
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              background: '#ef4444',
                              display: 'inline-block',
                            }}
                          />
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#dc2626' }}>
                            Disconnected
                          </span>
                        </>
                      )}
                    </div>

                    <div style={{ fontSize: '0.74rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                      <Clock size={12} style={{ color: '#94a3b8' }} />
                      <span>Last synced {source.lastSyncedText}</span>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ color: '#94a3b8' }}>◎</span>
                      <span>{source.eventsFoundCount} events found</span>
                    </div>
                  </div>

                  {/* Right: Auto-sync Toggle + 3-Dot Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                    {/* Auto-sync Toggle Switch */}
                    <div
                      onClick={(e) => handleToggleAutoSync(source, e)}
                      style={{
                        width: '42px',
                        height: '24px',
                        borderRadius: '12px',
                        background: source.autoSyncEnabled ? '#2563eb' : '#cbd5e1',
                        padding: '2px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.15s ease',
                      }}
                      title={source.autoSyncEnabled ? 'Auto-sync is enabled' : 'Auto-sync is disabled'}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                          transform: source.autoSyncEnabled ? 'translateX(18px)' : 'translateX(0)',
                          transition: 'transform 0.15s ease',
                        }}
                      />
                    </div>

                    {/* 3-Dot Menu Button */}
                    <div style={{ position: 'relative' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === source.id ? null : source.id);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          padding: '6px',
                          borderRadius: '6px',
                        }}
                        aria-label="Source actions menu"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === source.id && (
                        <div
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 'calc(100% + 4px)',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                            minWidth: '180px',
                            zIndex: 100,
                            padding: '6px',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="source-menu-item"
                            onClick={() => handleTriggerSync(source)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              background: 'transparent',
                              border: 'none',
                              padding: '8px 12px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: '#0f172a',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              borderRadius: '6px',
                            }}
                          >
                            <RefreshCw size={14} style={{ color: '#2563eb' }} />
                            <span>Sync Now</span>
                          </button>

                          <button
                            type="button"
                            className="source-menu-item"
                            onClick={() => {
                              setActiveMenuId(null);
                              setDiscoveredEventsSource(source);
                            }}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              background: 'transparent',
                              border: 'none',
                              padding: '8px 12px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: '#0f172a',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              borderRadius: '6px',
                            }}
                          >
                            <Calendar size={14} style={{ color: '#10b981' }} />
                            <span>View Discovered Events</span>
                          </button>

                          <button
                            type="button"
                            className="source-menu-item"
                            onClick={() => handleToggleConnection(source)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              background: 'transparent',
                              border: 'none',
                              padding: '8px 12px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: '#0f172a',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              borderRadius: '6px',
                            }}
                          >
                            <LinkIcon size={14} style={{ color: '#f59e0b' }} />
                            <span>{source.status === 'Connected' ? 'Disconnect Source' : 'Reconnect Source'}</span>
                          </button>

                          <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />

                          <button
                            type="button"
                            className="source-menu-item text-red"
                            onClick={() => {
                              setActiveMenuId(null);
                              setSourceToDelete(source);
                            }}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              background: 'transparent',
                              border: 'none',
                              padding: '8px 12px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: '#ef4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              borderRadius: '6px',
                            }}
                          >
                            <Trash2 size={14} />
                            <span>Remove Source</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Card: Add a New Source */}
          <div
            onClick={() => setIsAddModalOpen(true)}
            style={{
              background: '#f0f7ff',
              border: '1.5px dashed #bfdbfe',
              borderRadius: '14px',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#bfdbfe')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  border: '1.5px solid #2563eb',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plus size={18} strokeWidth={2.8} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.94rem', color: '#1e40af' }}>
                  Add a New Source
                </div>
                <div style={{ fontSize: '0.78rem', color: '#3b82f6' }}>
                  Connect another platform to discover more opportunities.
                </div>
              </div>
            </div>

            <ChevronRight size={18} style={{ color: '#2563eb' }} />
          </div>
        </div>

        {/* Right Column: 3 Panels */}
        <div className="sources-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Panel 1: Add a Source Box */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <LinkIcon size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.94rem', color: '#0f172a' }}>
                  Add a Source
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: 1.35 }}>
                  Connect a new platform to automatically discover events.
                </div>
              </div>
            </div>

            <form onSubmit={handleConnectSource}>
              {/* Select Source Type */}
              <div style={{ marginBottom: '10px' }}>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value as any)}
                  style={{
                    width: '100%',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.84rem',
                    color: '#0f172a',
                    background: '#ffffff',
                    outline: 'none',
                  }}
                >
                  <option value="platform">Supported Platform</option>
                  <option value="website">Public Website URL</option>
                  <option value="rss">RSS/Atom Feed</option>
                  <option value="portal">College Noticeboard Portal</option>
                </select>
              </div>

              {/* Input for URL or Platform Selection */}
              {sourceType === 'platform' ? (
                <div style={{ marginBottom: '14px' }}>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.84rem',
                      color: '#0f172a',
                      background: '#ffffff',
                      outline: 'none',
                    }}
                  >
                    <option value="HackerEarth">HackerEarth</option>
                    <option value="Meetup">Meetup Delhi NCR</option>
                    <option value="Luma">Luma Tech Community</option>
                    <option value="Unstop">Unstop</option>
                    <option value="Devfolio">Devfolio</option>
                  </select>
                </div>
              ) : (
                <div style={{ marginBottom: '14px' }}>
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => {
                      setInputUrl(e.target.value);
                      if (urlError) setUrlError('');
                    }}
                    placeholder="Enter website URL or select a platform"
                    style={{
                      width: '100%',
                      border: urlError ? '1px solid #ef4444' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.84rem',
                      color: '#0f172a',
                      outline: 'none',
                    }}
                  />
                  {urlError && (
                    <span style={{ fontSize: '0.74rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>
                      {urlError}
                    </span>
                  )}
                </div>
              )}

              {/* Connect Button */}
              <button
                type="submit"
                disabled={isConnecting}
                style={{
                  width: '100%',
                  height: '40px',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  marginBottom: '14px',
                }}
              >
                {isConnecting ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <span>Connect Source</span>
                )}
              </button>
            </form>

            {/* Note */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <Info size={14} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.35 }}>
                <strong style={{ color: '#1e293b' }}>We'll fetch publicly available event information.</strong> You can review and edit events before they're added to your timeline.
              </div>
            </div>
          </div>

          {/* Panel 2: Recent Activity */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.94rem', color: '#0f172a' }}>
                Recent Activity
              </span>
              <button
                type="button"
                onClick={() => setIsActivityHistoryOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                View All
              </button>
            </div>

            {/* Continuous Vertical Activity Spine */}
            <div style={{ position: 'relative', paddingLeft: '22px' }}>
              {/* Vertical blue line */}
              <div
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '12px',
                  bottom: '12px',
                  width: '2px',
                  background: '#e2e8f0',
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activities.map((act) => {
                  const isFailed = act.status === 'warning' || act.status === 'error';

                  return (
                    <div
                      key={act.id}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      {/* Node dot on the line */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-16px',
                          top: '6px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: isFailed ? '#ef4444' : '#2563eb',
                          border: '2px solid #ffffff',
                        }}
                      />

                      {/* Small logo */}
                      <SourceLogo type={act.logoType} size={26} />

                      {/* Activity Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
                            {act.sourceName}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            {act.timeAgo}
                          </span>
                        </div>

                        <div
                          style={{
                            fontSize: '0.75rem',
                            color: isFailed ? '#dc2626' : '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: isFailed ? 600 : 400,
                          }}
                        >
                          {isFailed && <AlertCircle size={12} />}
                          <span>{act.actionText}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panel 3: Tips for Better Results */}
          <div
            style={{
              background: '#fffdf5',
              border: '1px solid #fef3c7',
              borderRadius: '14px',
              padding: '18px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={16} style={{ color: '#d97706' }} />
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#92400e' }}>
                Tips for Better Results
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Connect multiple trusted sources',
                'Keep auto-sync enabled',
                'Review extracted events regularly',
                'Delete sources you no longer use',
                'Manually add important event websites',
              ].map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={14} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.3 }}>
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Source Modal Dialog */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Plus size={20} strokeWidth={2.8} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Add an Event Source
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                    Connect a supported platform or website URL to discover upcoming opportunities.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConnectSource(e);
                setIsAddModalOpen(false);
              }}
            >
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Source Type
                </label>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    color: '#0f172a',
                    background: '#ffffff',
                    outline: 'none',
                  }}
                >
                  <option value="platform">Supported Platform (Unstop, Devfolio, Google, LinkedIn)</option>
                  <option value="website">Public Website URL</option>
                  <option value="rss">RSS / Atom Feed</option>
                  <option value="portal">College Event Portal</option>
                </select>
              </div>

              {sourceType === 'platform' && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Select Platform
                  </label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      color: '#0f172a',
                      background: '#ffffff',
                      outline: 'none',
                    }}
                  >
                    <option value="Unstop">Unstop (Hackathons, Competitions, Internships)</option>
                    <option value="Devfolio">Devfolio (Hackathons & Builder programmes)</option>
                    <option value="Google Developers">Google Developers (Workshops & Community)</option>
                    <option value="LinkedIn">LinkedIn (Internships, Jobs & Career)</option>
                    <option value="College Event Portals">College Event Portals (Internal & Fests)</option>
                  </select>
                </div>
              )}

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  {sourceType === 'platform' ? 'Profile or Custom Filter URL (Optional)' : 'Feed or Portal URL'}
                </label>
                <input
                  type="text"
                  placeholder={
                    sourceType === 'platform'
                      ? 'https://unstop.com/hackathons'
                      : sourceType === 'rss'
                      ? 'https://example.com/feed.xml'
                      : 'https://college.edu/events'
                  }
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    if (urlError) setUrlError('');
                  }}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    border: urlError ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    color: '#0f172a',
                    outline: 'none',
                  }}
                />
                {urlError && (
                  <div style={{ color: '#ef4444', fontSize: '0.74rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={12} />
                    <span>{urlError}</span>
                  </div>
                )}
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '0.76rem',
                  color: '#64748b',
                }}
              >
                <Info size={15} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                <span>
                  FORWARD periodically queries official event feeds and circular endpoints. Discovered items appear in Needs Review for verification.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-sm"
                  disabled={isConnecting}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {isConnecting ? (
                    <>
                      <Loader2 size={14} className="spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <span>Connect Source</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Discovered Events Modal */}
      {discoveredEventsSource && (
        <div className="modal-backdrop" onClick={() => setDiscoveredEventsSource(null)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '580px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <SourceLogo type={discoveredEventsSource.logoType} size={36} />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Discovered Events from {discoveredEventsSource.name}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                    {discoveredEventsSource.eventsFoundCount} events detected via automated sync
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDiscoveredEventsSource(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {[
                { title: 'Google Summer of Code 2027 Info Session', date: '28 Oct 2026', type: 'Workshop', mode: 'Online' },
                { title: 'AI Hackathon National Championship', date: '04 Nov 2026', type: 'Hackathon', mode: 'In-Person' },
                { title: 'Campus Designathon & UI Sprint', date: '12 Nov 2026', type: 'Competition', mode: 'Hybrid' },
              ].map((ev, i) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.86rem', color: '#0f172a', display: 'block' }}>
                      {ev.title}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {ev.date} • {ev.mode}
                    </span>
                  </div>
                  <span className="event-tag" style={{ fontSize: '0.72rem' }}>
                    {ev.type}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => setDiscoveredEventsSource(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => {
                  onImportDiscoveredEvents(discoveredEventsSource.name);
                  setDiscoveredEventsSource(null);
                  addToast('success', 'Events Imported', `Imported discovered events into your timeline.`);
                }}
              >
                Import to Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity History Modal */}
      {isActivityHistoryOpen && (
        <div className="modal-backdrop" onClick={() => setIsActivityHistoryOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Full Source Sync History
              </h3>
              <button
                type="button"
                onClick={() => setIsActivityHistoryOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.map((act) => (
                <div
                  key={act.id}
                  style={{
                    border: '1px solid #f1f5f9',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <SourceLogo type={act.logoType} size={28} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.84rem', color: '#0f172a' }}>{act.sourceName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{act.actionText}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{act.timeAgo}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => setIsActivityHistoryOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Dialog */}
      {sourceToDelete && (
        <div className="modal-backdrop" onClick={() => setSourceToDelete(null)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '440px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#fef2f2',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Trash2 size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Remove {sourceToDelete.name}?
              </h3>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.45, marginBottom: '20px' }}>
              Are you sure you want to remove this source? New events will no longer be automatically discovered from this platform. Previously imported events will remain on your timeline.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => setSourceToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  onRemoveSource(sourceToDelete.id);
                  setSourceToDelete(null);
                  addToast('info', 'Source Removed', `Removed ${sourceToDelete.name} from event sources.`);
                }}
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===================================================
// NOVACART AI — REDESIGNED SAAS SHELL BUILDER
// Renders streamlined sidebar + clean topbar
// ===================================================

window.NOVA_SHELL = (function() {

  const navItems = [
    { section: 'OVERVIEW' },
    { label: 'Dashboard', icon: '🏠', href: 'dashboard.html', badge: null },
    { label: 'AI Rescue Center', icon: '🚨', href: 'rescue.html', badge: '3', badgeClass: 'badge-red' },

    { section: 'OPERATIONS' },
    { label: 'Phantom Stock', icon: '👻', href: 'phantom.html', badge: '8', badgeClass: 'badge-orange' },
    { label: 'Delivery Intelligence', icon: '🗺️', href: 'delivery.html', badge: null },
    { label: 'Operations Heatmap', icon: '🔥', href: 'heatmap.html', badge: null },

    { section: 'CUSTOMER GROWTH' },
    { label: 'Smart Reorder', icon: '🔄', href: 'reorder.html', badge: '127', badgeClass: 'badge-green' },
    { label: 'Customers', icon: '👥', href: 'customers.html', badge: null },

    { section: 'INTELLIGENCE' },
    { label: 'AI Insights', icon: '💡', href: 'insights.html', badge: null },
    { label: 'Impact Simulator', icon: '📈', href: 'simulator.html', badge: null },
    { label: 'Analytics', icon: '📊', href: 'analytics.html', badge: null },

    { section: 'SYSTEM' },
    { label: 'Orders', icon: '🛒', href: 'orders.html', badge: null },
    { label: 'Products', icon: '📦', href: 'products.html', badge: null },
    { label: 'Stores', icon: '🏪', href: 'stores.html', badge: null },
    { label: 'Settings', icon: '⚙️', href: 'settings.html', badge: null },
  ];

  function buildSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

    let navHTML = '';
    navItems.forEach(item => {
      if (item.section) {
        navHTML += `<div class="nav-section-label">${item.section}</div>`;
      } else {
        const isActive = currentPage === item.href;
        const badgeHTML = item.badge ? `<span class="nav-badge ${item.badgeClass || ''}">${item.badge}</span>` : '';
        navHTML += `<a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${badgeHTML}
        </a>`;
      }
    });

    sidebar.innerHTML = `
      <div class="sidebar-logo">
        <a href="dashboard.html" class="brand-wrap">
          <span class="brand-title">⚡ NovaCart AI</span>
          <span class="brand-subtitle">AI Commerce Intelligence</span>
        </a>
      </div>
      <nav class="sidebar-nav">${navHTML}</nav>
      <div class="sidebar-footer">
        <div class="system-status-indicator">
          <span class="pulse-dot"></span>
          <span>AI SYSTEM ONLINE</span>
        </div>
        <div class="demo-mode-chip">PROTOTYPE SIMULATION MODE</div>
      </div>
    `;
  }

  function buildTopbar(pageTitle, pageSubtitle = 'Real-time commerce intelligence') {
    const topbar = document.getElementById('topbar');
    if (!topbar) return;

    const data = window.NOVACART_DATA || { notifications: [] };
    const notifications = data.notifications || [];
    const unread = notifications.filter(n => !n.read).length;

    topbar.innerHTML = `
      <div class="topbar-left">
        <div>
          <div class="topbar-title">${pageTitle}</div>
          <div class="topbar-subtitle">${pageSubtitle}</div>
        </div>
      </div>

      <!-- Center Global Search -->
      <div class="topbar-search" style="position:relative">
        <span class="topbar-search-icon">🔍</span>
        <input type="text" id="global-search" placeholder="Search orders, SKUs, stores or customers..." />
        <div id="search-results" class="global-search-results hidden"></div>
      </div>

      <div class="topbar-right">
        <!-- Run Demo Mode -->
        <button onclick="NOVA_DEMO.runFullDemo()" class="btn-primary btn-sm">
          <span>▶</span> Run AI Demo
        </button>

        <!-- Notifications -->
        <div style="position:relative">
          <button class="notif-btn" id="notif-btn" title="Notifications">
            🔔
            ${unread > 0 ? `<span class="notif-badge-count">${unread}</span>` : ''}
          </button>
          <div id="notif-panel" class="notif-panel hidden">
            <div class="notif-header" style="display:flex;justify-space-between;padding:12px;border-bottom:1px solid var(--surface-border)">
              <strong style="font-size:0.85rem">Notifications</strong>
              <button onclick="NOVA_SHELL.markAllRead()" style="font-size:0.75rem;color:var(--nova-blue-light);background:none;border:none">Mark all read</button>
            </div>
            ${notifications.map(n => `
              <div class="notif-item ${!n.read ? 'unread' : ''}" id="notif-${n.id}" onclick="NOVA_SHELL.readNotif('${n.id}','${n.link}')" style="padding:10px 12px;border-bottom:1px solid var(--surface-border);cursor:pointer;font-size:0.8rem">
                <div style="font-weight:600;color:var(--text-primary)">${n.icon} ${n.title}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">${n.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- User Profile Avatar Icon -->
        <div style="width:32px;height:32px;border-radius:50%;background:var(--nova-blue);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;color:white;border:1px solid rgba(255,255,255,0.2)" title="Admin User">
          NC
        </div>
      </div>
    `;
  }

  function markAllRead() {
    window.NOVACART_DATA.notifications.forEach(n => n.read = true);
    NOVA_UI.showToast('All notifications marked as read', 'success');
    buildTopbar(document.querySelector('.topbar-title')?.textContent || '');
  }

  function readNotif(id, link) {
    const notif = window.NOVACART_DATA.notifications.find(n => n.id === id);
    if (notif) { notif.read = true; }
    if (link) window.location.href = link;
  }

  function init(pageTitle, pageSubtitle = 'Real-time commerce intelligence') {
    buildSidebar();
    buildTopbar(pageTitle, pageSubtitle);
    NOVA_UI.initSidebar();
    NOVA_UI.initNotifications();
    NOVA_UI.setupGlobalSearch('global-search', 'search-results');
  }

  return { init, buildSidebar, buildTopbar, markAllRead, readNotif };
})();

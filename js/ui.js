// ===================================================
// NOVACART AI — SHARED UI UTILITIES
// ===================================================

window.NOVA_UI = (function() {

  // TOAST NOTIFICATIONS
  function showToast(message, type = 'info', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span style="font-size:1.1rem">${icons[type] || 'ℹ️'}</span><span style="font-size:0.875rem;color:var(--text-primary)">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-slide-out 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // CHARTS (using Canvas API - no dependencies)
  function drawBarChart(canvasId, labels, values, colors, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const padding = { top: 30, right: 20, bottom: 50, left: 50 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const max = Math.max(...values) * 1.2 || 100;
    const barW = Math.min(40, chartW / labels.length - 8);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.stroke();

      // Y labels
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(max - (max / 4) * i) + (options.suffix || ''), padding.left - 6, y + 4);
    }

    // Bars
    labels.forEach((label, i) => {
      const x = padding.left + (chartW / labels.length) * i + (chartW / labels.length - barW) / 2;
      const barH = (values[i] / max) * chartH;
      const y = padding.top + chartH - barH;

      // Bar gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + barH);
      const col = Array.isArray(colors) ? (colors[i] || colors[0]) : colors;
      gradient.addColorStop(0, col + 'cc');
      gradient.addColorStop(1, col + '44');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 4);
      ctx.fill();

      // Value label
      ctx.fillStyle = 'rgba(241,245,249,0.9)';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((options.prefix || '') + values[i] + (options.suffix || ''), x + barW / 2, y - 6);

      // X label
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      const labelText = label.length > 10 ? label.substring(0, 10) + '…' : label;
      ctx.fillText(labelText, x + barW / 2, padding.top + chartH + 18);
    });
  }

  function drawLineChart(canvasId, labels, datasets, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const padding = { top: 30, right: 20, bottom: 50, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    const allVals = datasets.flatMap(d => d.values);
    const max = Math.max(...allVals) * 1.15 || 100;
    const min = Math.min(0, Math.min(...allVals));

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.stroke();
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      const val = max - ((max - min) / 4) * i;
      ctx.fillText(Math.round(val) + (options.suffix || ''), padding.left - 6, y + 4);
    }

    // Lines
    datasets.forEach(dataset => {
      const points = dataset.values.map((v, i) => ({
        x: padding.left + (chartW / (labels.length - 1)) * i,
        y: padding.top + chartH - ((v - min) / (max - min)) * chartH,
      }));

      // Fill
      ctx.beginPath();
      ctx.moveTo(points[0].x, padding.top + chartH);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
      grad.addColorStop(0, dataset.color + '33');
      grad.addColorStop(1, dataset.color + '00');
      ctx.fillStyle = grad;
      ctx.fill();

      // Line
      ctx.beginPath();
      ctx.strokeStyle = dataset.color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.stroke();

      // Points
      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dataset.color;
        ctx.fill();
        ctx.strokeStyle = 'var(--bg-800, #0d1420)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });

    // X labels
    labels.forEach((label, i) => {
      const x = padding.left + (chartW / (labels.length - 1)) * i;
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, padding.top + chartH + 18);
    });
  }

  function drawDonutChart(canvasId, segments, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(cx, cy) - 20;
    const innerRadius = radius * 0.55;

    ctx.clearRect(0, 0, width, height);
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    let startAngle = -Math.PI / 2;

    segments.forEach(seg => {
      const sliceAngle = (seg.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();

      // Gap
      ctx.strokeStyle = 'rgba(8,12,20,0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      startAngle += sliceAngle;
    });

    // Inner circle
    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0d1420';
    ctx.fill();

    // Center text
    if (options.centerText) {
      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 22px Space Grotesk, Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(options.centerText, cx, cy + 4);
      if (options.centerSub) {
        ctx.fillStyle = '#64748b';
        ctx.font = '11px Inter, sans-serif';
        ctx.fillText(options.centerSub, cx, cy + 20);
      }
    }
  }

  function drawHeatCell(canvasId, value, max = 100) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pct = value / max;
    const color = pct > 0.75 ? '#ef4444' : pct > 0.5 ? '#f97316' : pct > 0.25 ? '#eab308' : '#22c55e';
    const alpha = 0.3 + pct * 0.5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0');
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, 8);
    ctx.fill();
  }

  // MODAL
  function showModal(title, content, actions = []) {
    let overlay = document.getElementById('global-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'global-modal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `<div class="modal-box"><div class="modal-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px"><h3 class="modal-title" style="font-size:1.2rem;font-weight:700"></h3><button class="modal-close" onclick="NOVA_UI.closeModal()" style="background:var(--surface-200);border:1px solid var(--surface-border);border-radius:8px;padding:6px 10px;color:var(--text-muted);cursor:pointer;font-size:1rem">✕</button></div><div class="modal-body"></div><div class="modal-footer" style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap"></div></div>`;
      document.body.appendChild(overlay);
    }

    overlay.querySelector('.modal-title').textContent = title;
    overlay.querySelector('.modal-body').innerHTML = content;
    const footer = overlay.querySelector('.modal-footer');
    footer.innerHTML = '';
    actions.forEach(action => {
      const btn = document.createElement('button');
      btn.className = action.class || 'btn-ghost btn-md';
      btn.textContent = action.label;
      btn.onclick = () => { action.onClick?.(); if (action.closeOnClick !== false) closeModal(); };
      footer.appendChild(btn);
    });
    overlay.classList.remove('hidden');
  }

  function closeModal() {
    const overlay = document.getElementById('global-modal');
    if (overlay) overlay.classList.add('hidden');
  }

  // CONFIRM DIALOG
  function confirm(message, onConfirm, onCancel) {
    showModal('Confirm Action', `<p style="color:var(--text-secondary);line-height:1.6">${message}</p>`, [
      { label: 'Confirm', class: 'btn-primary btn-md', onClick: onConfirm },
      { label: 'Cancel', class: 'btn-ghost btn-md', onClick: onCancel },
    ]);
  }

  // LOADING
  function setLoading(elementId, loading = true) {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (loading) {
      el.dataset.originalContent = el.innerHTML;
      el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:10px;padding:40px"><div class="spinner"></div><span style="color:var(--text-muted)">Analyzing data...</span></div>';
    } else if (el.dataset.originalContent) {
      el.innerHTML = el.dataset.originalContent;
    }
  }

  // NUMBER ANIMATION
  function animateNumber(el, from, to, duration = 1500, prefix = '', suffix = '') {
    if (!el) return;
    const start = Date.now();
    const diff = to - from;
    function step() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(from + diff * eased).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // RISK COLOR HELPER
  function getRiskColor(risk) {
    return { CRITICAL: '#ef4444', HIGH: '#f97316', MEDIUM: '#eab308', LOW: '#22c55e' }[risk] || '#94a3b8';
  }

  function getRiskBadgeClass(risk) {
    return { CRITICAL: 'badge-critical', HIGH: 'badge-high', MEDIUM: 'badge-medium', LOW: 'badge-low', OPPORTUNITY: 'badge-purple' }[risk] || 'badge-info';
  }

  // RELATIVE TIME
  function relativeTime(isoString) {
    const diff = (Date.now() - new Date(isoString)) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  // SETUP GLOBAL SEARCH
  function setupGlobalSearch(searchInputId, resultsId) {
    const input = document.getElementById(searchInputId);
    const resultsEl = document.getElementById(resultsId);
    if (!input || !resultsEl) return;

    const data = window.NOVACART_DATA;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      resultsEl.classList.toggle('hidden', !q);
      if (!q) return;

      const results = [];
      data.orders.filter(o => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q)).slice(0, 3).forEach(o => {
        results.push({ type: 'ORDER', text: `${o.id} — ${o.customer}`, sub: `${o.status} | ${o.storeName}`, link: `rescue.html#${o.id}` });
      });
      data.products.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)).slice(0, 3).forEach(p => {
        results.push({ type: 'SKU', text: p.name, sub: `Risk: ${p.risk} | ${p.storeId}`, link: `phantom.html#${p.id}` });
      });
      data.stores.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)).slice(0, 2).forEach(s => {
        results.push({ type: 'STORE', text: s.name, sub: `${s.activeOrders} orders | ${s.status}`, link: `stores.html#${s.id}` });
      });

      resultsEl.innerHTML = results.length
        ? results.map(r => `<div class="search-result-item" onclick="window.location='${r.link}'"><span class="search-result-type">${r.type}</span><div class="search-result-text">${r.text}<div class="search-result-sub">${r.sub}</div></div></div>`).join('')
        : '<div class="search-result-item"><span style="color:var(--text-muted);font-size:0.85rem;padding:8px">No results found</span></div>';
    });

    document.addEventListener('click', e => {
      if (!input.contains(e.target) && !resultsEl.contains(e.target)) resultsEl.classList.add('hidden');
    });
  }

  // CSV PARSER
  function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return { headers: [], rows: [] };
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i] || ''; });
      return obj;
    });
    return { headers, rows };
  }

  // SIDEBAR NAV HELPERS
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const hamburger = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('mobile-overlay');
    const mainContent = document.getElementById('main-content');

    toggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('collapsed');
      mainContent?.classList.toggle('full-width');
    });

    hamburger?.addEventListener('click', () => {
      sidebar?.classList.toggle('mobile-open');
      overlay?.classList.toggle('hidden');
    });

    overlay?.addEventListener('click', () => {
      sidebar?.classList.remove('mobile-open');
      overlay?.classList.add('hidden');
    });

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.includes(currentPage)) link.classList.add('active');
    });
  }

  // NOTIFICATION PANEL
  function initNotifications() {
    const btn = document.getElementById('notif-btn');
    const panel = document.getElementById('notif-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
    });
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !panel.contains(e.target)) panel.classList.add('hidden');
    });
  }

  // SCROLL-BASED NAV
  function initNavScroll() {
    const nav = document.getElementById('landing-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // AI PROCESSING MODAL MICRO-INTERACTION
  function showProcessingModal(actionName, callback) {
    let overlay = document.getElementById('ai-proc-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'ai-proc-overlay';
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(7,10,18,0.85);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = `
      <div style="background:var(--bg-850);border:1px solid var(--nova-blue);border-radius:var(--radius-xl);padding:32px;max-width:420px;width:90%;text-align:center;box-shadow:var(--shadow-indigo)">
        <div style="font-size:2rem;margin-bottom:12px;animation:spin 2s linear infinite">⚙️</div>
        <h3 style="font-size:1.1rem;margin-bottom:6px">ANALYZING OPERATIONAL ACTION</h3>
        <p style="font-size:0.8rem;color:var(--nova-blue-light);font-weight:600;margin-bottom:16px">${actionName}</p>
        <div style="font-size:0.78rem;color:var(--text-muted);text-align:left;background:var(--surface-100);padding:12px;border-radius:var(--radius-md);line-height:1.8">
          <div>✓ Checking store inventory level</div>
          <div>✓ Evaluating driver delivery routes</div>
          <div>✓ Computing customer risk score</div>
          <div style="color:var(--status-success);font-weight:600">→ Action optimized by AI</div>
        </div>
      </div>
    `;
    overlay.style.display = 'flex';

    setTimeout(() => {
      overlay.style.display = 'none';
      if (typeof callback === 'function') callback();
    }, 1100);
  }

  return {
    showToast, closeModal, showModal, confirm, setLoading, showProcessingModal,
    animateNumber, getRiskColor, getRiskBadgeClass, relativeTime,
    drawBarChart, drawLineChart, drawDonutChart, drawHeatCell,
    setupGlobalSearch, parseCSV, initSidebar, initNotifications, initNavScroll,
  };
})();

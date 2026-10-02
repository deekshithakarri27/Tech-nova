// ===================================================
// NOVACART AI — FULL DEMO MODE
// ===================================================

window.NOVA_DEMO = (function() {
  const steps = [
    {
      icon: '📊',
      title: 'Loading Demo Data',
      desc: 'Generating 5 stores, 12 SKUs, 500 orders, 6 riders, and 127 customers with realistic simulation data...',
      action: async () => {
        window.NOVACART_DATA.state.demoLoaded = true;
        await delay(1200);
        NOVA_UI.showToast('Demo data loaded — 500 orders, 127 customers, 12 SKUs ready', 'success');
      },
    },
    {
      icon: '👻',
      title: 'AI Detects Phantom Stock',
      desc: '"Milk 500ml" has an unusually high cancellation rate of 31% at Store #102. Risk classification: CRITICAL.',
      action: async () => {
        await delay(1500);
        NOVA_UI.showToast('⚠ Phantom Stock AI: Milk 500ml flagged as CRITICAL risk', 'warning');
      },
    },
    {
      icon: '🔍',
      title: 'AI Analyzes Evidence',
      desc: 'Main cause: Inventory mismatch. 387 cancellations from 1,248 orders. Peak risk period: 7PM–9PM.',
      action: async () => {
        await delay(1200);
      },
    },
    {
      icon: '💡',
      title: 'AI Recommends Action',
      desc: 'Recommendation: Reduce displayed inventory by 20 units at Store #102 and trigger immediate stock verification.',
      action: async () => {
        await delay(1200);
        const milk = window.NOVACART_DATA.products.find(p => p.id === 'SKU001');
        if (milk) { milk.applied = true; }
      },
    },
    {
      icon: '🗺️',
      title: 'Opening Delivery Intelligence',
      desc: 'Order NC-2048 has an 86% delay risk. Rider R-17 has 3 active deliveries and is 2.1km away.',
      action: async () => {
        await delay(1500);
        NOVA_UI.showToast('🚨 Order NC-2048: High delay risk detected', 'warning');
      },
    },
    {
      icon: '⏱',
      title: 'Honest ETA Calculated',
      desc: 'Displayed ETA was 10 minutes. Honest AI ETA is 14 minutes — accounting for one nearby stop and traffic.',
      action: async () => {
        await delay(1200);
        NOVA_UI.showToast('ETA updated: 10 min → 14 min (Honest AI ETA)', 'info');
      },
    },
    {
      icon: '🚑',
      title: 'AI Rescue Applied',
      desc: 'Nearest available rider assigned. Customer notified with honest ETA and transparency message.',
      action: async () => {
        await delay(1200);
        const order = window.NOVACART_DATA.orders.find(o => o.id === 'NC-2048') || window.NOVACART_DATA.orders.find(o => o.status === 'ON_WAY');
        if (order) { order.rescued = true; order.delayRisk = Math.max(20, order.delayRisk - 45); }
        NOVA_UI.showToast('✅ Rescue applied — delay risk reduced by 45%', 'success');
      },
    },
    {
      icon: '🔄',
      title: 'Smart Reorder AI Activated',
      desc: '127 customers are overdue for their regular grocery purchase. Breakfast Essentials bundle generated.',
      action: async () => {
        await delay(1500);
        NOVA_UI.showToast('🛒 Smart Reorder: 127 customers ready for personalized bundles', 'info');
      },
    },
    {
      icon: '🛒',
      title: '"Breakfast Essentials" Bundle Created',
      desc: 'Milk + Bread + Eggs — personalized for 82% reorder probability customers. Ready for campaign launch.',
      action: async () => {
        await delay(1200);
        window.NOVACART_DATA.state.kpis.revenueRecovered = 18400;
        window.NOVACART_DATA.state.kpis.customersRecovered = 48;
      },
    },
    {
      icon: '📈',
      title: 'Opening Impact Simulator',
      desc: 'Simulated results: Cancellations 11.3% → 7%, On-time delivery 78% → 90%, Revenue recovered: ₹18,400.',
      action: async () => {
        await delay(1500);
        NOVA_UI.showToast('📊 Impact Simulator: Showing simulated business improvements', 'success');
      },
    },
  ];

  let currentStep = -1;
  let isRunning = false;

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  function getOverlay() {
    let overlay = document.getElementById('demo-mode-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'demo-mode-overlay';
      overlay.className = 'demo-mode-overlay hidden';
      overlay.innerHTML = `
        <div class="demo-box">
          <div class="demo-step-indicator" id="demo-dots"></div>
          <div class="demo-content">
            <div class="demo-icon" id="demo-icon">🚀</div>
            <h2 class="demo-title" id="demo-title">NovaCart AI Demo</h2>
            <p class="demo-desc" id="demo-desc">Initializing the full AI demonstration...</p>
          </div>
          <div class="demo-progress-bar">
            <div class="demo-progress-fill" id="demo-progress" style="width:0%"></div>
          </div>
          <div class="disclaimer-badge" style="margin:0 auto 20px;display:inline-flex">⚠ SIMULATED DEMO — NOT REAL RESULTS</div>
          <div class="demo-controls">
            <button class="btn-ghost btn-md" onclick="NOVA_DEMO.skipDemo()">Skip Demo</button>
            <button class="btn-primary btn-md" id="demo-next-btn" onclick="NOVA_DEMO.nextStep()">Next Step →</button>
          </div>
          <div id="demo-finish-msg" class="hidden" style="margin-top:20px;padding:20px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;text-align:center">
            <div style="font-size:2rem;margin-bottom:8px">🎉</div>
            <strong style="color:var(--nova-green)">NOVACART AI HAS IDENTIFIED, EXPLAINED, AND RESCUED THE BUSINESS RISKS.</strong>
            <p style="color:var(--text-muted);font-size:0.85rem;margin-top:8px">SIMULATED IMPACT — NOT REAL NOVACART RESULTS</p>
          </div>
        </div>`;
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function renderStep(stepIndex) {
    const overlay = getOverlay();
    const step = steps[stepIndex];
    if (!step) return;

    document.getElementById('demo-icon').textContent = step.icon;
    document.getElementById('demo-title').textContent = step.title;
    document.getElementById('demo-desc').textContent = step.desc;

    const progress = ((stepIndex + 1) / steps.length) * 100;
    document.getElementById('demo-progress').style.width = progress + '%';

    // Dots
    const dotsContainer = document.getElementById('demo-dots');
    dotsContainer.innerHTML = steps.map((_, i) =>
      `<div class="demo-step-dot ${i < stepIndex ? 'done' : i === stepIndex ? 'active' : ''}"></div>`
    ).join('');

    // Finish state
    const isLast = stepIndex === steps.length - 1;
    const nextBtn = document.getElementById('demo-next-btn');
    if (isLast) {
      nextBtn.textContent = '✅ Finish Demo';
      nextBtn.onclick = () => skipDemo();
      document.getElementById('demo-finish-msg').classList.remove('hidden');
    } else {
      nextBtn.textContent = 'Next Step →';
      nextBtn.onclick = () => nextStep();
    }
  }

  async function nextStep() {
    if (isRunning) return;
    currentStep++;
    if (currentStep >= steps.length) { skipDemo(); return; }

    isRunning = true;
    const nextBtn = document.getElementById('demo-next-btn');
    if (nextBtn) { nextBtn.disabled = true; nextBtn.textContent = '⏳ Running...'; }

    renderStep(currentStep);

    try {
      await steps[currentStep].action();
    } catch (e) {}

    isRunning = false;
    if (nextBtn) {
      nextBtn.disabled = false;
      if (currentStep < steps.length - 1) nextBtn.textContent = 'Next Step →';
      else nextBtn.textContent = '✅ Finish Demo';
    }
  }

  function skipDemo() {
    const overlay = document.getElementById('demo-mode-overlay');
    if (overlay) overlay.classList.add('hidden');
    currentStep = -1;
    isRunning = false;
    NOVA_UI.showToast('Demo complete! Explore the platform to see the AI in action.', 'success', 5000);
  }

  async function runFullDemo() {
    currentStep = -1;
    isRunning = false;
    const overlay = getOverlay();
    overlay.classList.remove('hidden');
    document.getElementById('demo-finish-msg')?.classList.add('hidden');
    document.getElementById('demo-progress').style.width = '0%';
    document.getElementById('demo-icon').textContent = '🚀';
    document.getElementById('demo-title').textContent = 'NovaCart AI Full Demo';
    document.getElementById('demo-desc').textContent = 'Click "Next Step" to walk through the complete AI rescue demonstration. Each step shows a real product capability.';

    const dotsContainer = document.getElementById('demo-dots');
    if (dotsContainer) dotsContainer.innerHTML = steps.map(() => '<div class="demo-step-dot"></div>').join('');

    const nextBtn = document.getElementById('demo-next-btn');
    if (nextBtn) { nextBtn.textContent = 'Start Demo →'; nextBtn.onclick = () => nextStep(); nextBtn.disabled = false; }
  }

  return { runFullDemo, nextStep, skipDemo };
})();

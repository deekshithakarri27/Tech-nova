// ===================================================
// NOVACART AI — AI ENGINE (Mock + Gemini Ready)
// ===================================================

window.NOVACART_AI = (function() {

  // Risk scoring engine (transparent, explainable)
  function scorePhantomRisk(product) {
    let score = 0;
    const factors = [];

    if (product.cancellationRate > 25) { score += 40; factors.push({ name: 'Very high cancellation rate', weight: 40 }); }
    else if (product.cancellationRate > 15) { score += 25; factors.push({ name: 'High cancellation rate', weight: 25 }); }
    else if (product.cancellationRate > 8) { score += 12; factors.push({ name: 'Elevated cancellation rate', weight: 12 }); }

    if (product.stockStatus === 'MISMATCH') { score += 30; factors.push({ name: 'Inventory mismatch detected', weight: 30 }); }
    else if (product.stockStatus === 'LOW') { score += 15; factors.push({ name: 'Low stock level', weight: 15 }); }

    if (product.mainReason === 'Out of stock' || product.mainReason === 'Inventory mismatch') {
      score += 20; factors.push({ name: 'Stock-related cancel reason', weight: 20 });
    }

    if (product.cancellations > 200) { score += 10; factors.push({ name: 'High volume of cancellations', weight: 10 }); }

    score = Math.min(100, score);
    const risk = score >= 80 ? 'CRITICAL' : score >= 55 ? 'HIGH' : score >= 30 ? 'MEDIUM' : 'LOW';
    return { score, risk, factors };
  }

  function scoreDeliveryRisk(order, rider) {
    let score = 0;
    const factors = [];

    if (rider.activeOrders >= 3) { score += 25; factors.push({ name: 'Multiple active orders', weight: 25 }); }
    else if (rider.activeOrders >= 2) { score += 15; factors.push({ name: 'Multiple stops', weight: 15 }); }

    if (rider.distanceKm > 2.5) { score += 20; factors.push({ name: 'Long distance to customer', weight: 20 }); }
    else if (rider.distanceKm > 1.5) { score += 10; factors.push({ name: 'Moderate distance', weight: 10 }); }

    if (rider.delayRisk === 'HIGH') { score += 25; factors.push({ name: 'High traffic/workload', weight: 25 }); }
    else if (rider.delayRisk === 'MEDIUM') { score += 15; factors.push({ name: 'Moderate traffic conditions', weight: 15 }); }

    if (rider.honestETA - rider.currentETA > 5) { score += 20; factors.push({ name: 'Large ETA gap (displayed vs actual)', weight: 20 }); }
    else if (rider.honestETA - rider.currentETA > 2) { score += 10; factors.push({ name: 'ETA discrepancy detected', weight: 10 }); }

    if (order.riskLevel === 'HIGH') { score += 10; factors.push({ name: 'Order complexity / store workload', weight: 10 }); }

    score = Math.min(100, score);
    return { score, risk: score >= 70 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW', factors };
  }

  function calcHonestETA(rider) {
    const base = rider.distanceKm * 3.5; // ~3.5 min/km average
    const stopBuffer = rider.activeOrders > 1 ? (rider.activeOrders - 1) * 4 : 0;
    const trafficBuffer = rider.delayRisk === 'HIGH' ? 5 : rider.delayRisk === 'MEDIUM' ? 2 : 0;
    const prepBuffer = 2;
    const total = Math.round(base + stopBuffer + trafficBuffer + prepBuffer);
    const confidence = Math.round(95 - (rider.activeOrders * 4) - (rider.delayRisk === 'HIGH' ? 12 : rider.delayRisk === 'MEDIUM' ? 6 : 0));
    return {
      etaMinutes: total,
      confidence: Math.max(60, confidence),
      breakdown: { base: Math.round(base), stopBuffer, trafficBuffer, prepBuffer },
    };
  }

  function scoreReorderProbability(customer) {
    let score = customer.reorderProbability;
    if (customer.nextDueDays <= 0) score = Math.min(100, score + 15);
    else if (customer.nextDueDays <= 2) score = Math.min(100, score + 8);
    return { score, status: score >= 80 ? 'HIGH' : score >= 60 ? 'MEDIUM' : 'LOW' };
  }

  // Phantom Stock AI Recommendations
  function getPhantomRecommendation(product) {
    const recs = {
      CRITICAL: {
        primary: `Immediately reduce displayed inventory for "${product.name}" by 20–30 units and trigger a stock verification alert at ${product.storeId}.`,
        secondary: 'Consider temporarily hiding this product from the app until physical inventory is confirmed.',
        actions: ['HIDE_PRODUCT', 'REDUCE_STOCK', 'VERIFY_INVENTORY', 'SUGGEST_SUBSTITUTE'],
        impact: `Estimated 25–35 fewer unfulfillable orders per day. Potential cancellation rate reduction: ~${(product.cancellationRate * 0.7).toFixed(0)}%.`,
      },
      HIGH: {
        primary: `Reduce displayed stock for "${product.name}" by 10–15 units and trigger a stock alert at ${product.storeId}.`,
        secondary: 'Monitor cancellations closely for the next 24 hours.',
        actions: ['REDUCE_STOCK', 'VERIFY_INVENTORY', 'MONITOR_SKU'],
        impact: `Estimated 12–18 fewer unfulfillable orders per day. Cancellation rate may reduce by ~${(product.cancellationRate * 0.5).toFixed(0)}%.`,
      },
      MEDIUM: {
        primary: `Flag "${product.name}" for manual inventory check at ${product.storeId}. Update stock count at next opportunity.`,
        secondary: 'Set up automatic low-stock alerts for this SKU.',
        actions: ['VERIFY_INVENTORY', 'MONITOR_SKU', 'REORDER_INVENTORY'],
        impact: 'Preventive action may reduce future cancellation risk by 30–40%.',
      },
      LOW: {
        primary: `"${product.name}" is currently within acceptable risk parameters. Continue standard monitoring.`,
        secondary: 'No immediate action required.',
        actions: ['MONITOR_SKU'],
        impact: 'Maintaining current operations.',
      },
    };
    return recs[product.risk] || recs.LOW;
  }

  // Delivery AI recommendations
  function getDeliveryRecommendation(rider, delayRisk) {
    if (delayRisk.score >= 70) {
      return {
        action: 'REASSIGN_OR_PRIORITIZE',
        message: `Assign nearest available rider to cover Rider ${rider.id}'s pending stops. Prioritize picking for highest-delay orders.`,
        customerMsg: `Your rider is completing a nearby delivery. Your updated delivery estimate is ${rider.honestETA} minutes — we appreciate your patience!`,
        compensation: delayRisk.score >= 80 ? `Sorry for the delay — here's ₹30 off your next order!` : null,
      };
    } else if (delayRisk.score >= 40) {
      return {
        action: 'UPDATE_ETA',
        message: `Update displayed ETA to ${rider.honestETA} minutes. Monitor for further delays.`,
        customerMsg: `Your rider is on the way! Updated delivery estimate: ${rider.honestETA} minutes.`,
        compensation: null,
      };
    } else {
      return {
        action: 'NO_ACTION',
        message: 'Delivery is on track. No intervention needed.',
        customerMsg: `Your order is on the way! Estimated arrival: ${rider.honestETA} minutes.`,
        compensation: null,
      };
    }
  }

  // Reorder AI recommendations
  function getReorderBundle(customer) {
    return {
      bundleName: customer.category,
      items: customer.items,
      estimatedValue: customer.avgOrderValue,
      probability: customer.reorderProbability,
      message: `Hi! Your usual ${customer.category} items are waiting for you 🛒 Reorder in one tap!`,
      urgency: customer.nextDueDays <= 0 ? 'DUE NOW' : customer.nextDueDays <= 2 ? 'DUE SOON' : 'UPCOMING',
    };
  }

  // Business insights (mock)
  function generateInsightExplanation(insight) {
    const explanations = {
      INS001: 'This figure comes from comparing each SKU\'s cancellation count against its total orders. SKUs with rates above 15% are flagged — this threshold is configurable in Settings. The concentration at Store #102 suggests a localized inventory process issue rather than a supply-chain problem.',
      INS002: 'Store #102\'s cancellation rate of 11.3% is 82% above the platform average of 6.2%. When combined with 8 out of 12 high-risk SKUs being located there, this points to a systematic inventory management issue at that specific location.',
      INS003: 'By analyzing 14 days of order timestamps and delivery durations, we identified that orders placed between 7-9 PM take an average of 38% longer to deliver than the platform average. This window also coincides with the highest rider workload and the most phantom-stock cancellations.',
      INS004: 'Cohort analysis of customers who bought both milk and bread in the same order shows a 78% return rate within 7 days — compared to 51% for all customers. This makes them a high-value retention segment worth targeting with personalized reorder nudges.',
      INS005: 'Each customer\'s last purchase date is compared against their personal average reorder interval. Customers who are 7+ days past their interval with a history of regular purchases are marked as "due for reorder." The 127 figure represents those crossing the 70% probability threshold.',
      INS006: 'Riders with 4+ simultaneous active orders show an 86% probability of at least one delivery exceeding 10 minutes past the promised ETA. This metric is calculated from historical delivery data, cross-referenced with simultaneous order loads.',
    };
    return explanations[insight.id] || 'This insight is generated from analysis of the available demo data patterns.';
  }

  // Rescue action generator
  function generateRescueActions(data) {
    const actions = [];

    // Phantom stock rescues
    data.products.filter(p => p.risk === 'CRITICAL' || p.risk === 'HIGH').forEach(p => {
      const rec = getPhantomRecommendation(p);
      actions.push({
        id: `RESCUE-SKU-${p.id}`,
        type: 'PHANTOM_STOCK',
        severity: p.risk,
        title: `${p.risk === 'CRITICAL' ? '🚨' : '⚠️'} Phantom Stock: ${p.name}`,
        problem: `"${p.name}" has a ${p.cancellationRate}% cancellation rate at ${p.storeId}. Main cause: ${p.mainReason}`,
        evidence: `${p.cancellations} cancellations out of ${p.orders} orders. Highest risk period: ${p.peakCancelTime}`,
        recommendation: rec.primary,
        impact: rec.impact,
        sku: p.id,
        applied: p.applied,
      });
    });

    // Delivery rescues (high-risk orders)
    const highRiskOrders = data.orders.filter(o => o.delayRisk > 80 && o.status === 'ON_WAY').slice(0, 3);
    highRiskOrders.forEach(o => {
      const rider = data.riders.find(r => r.id === o.riderId);
      if (rider) {
        const riskScore = scoreDeliveryRisk(o, rider);
        actions.push({
          id: `RESCUE-ORD-${o.id}`,
          type: 'DELIVERY_RISK',
          severity: 'HIGH',
          title: `🚨 Order Risk: ${o.id}`,
          problem: `Order ${o.id} has ${o.delayRisk}% delay risk and ${o.cancellationRisk}% cancellation risk`,
          evidence: `Rider ${rider.name} has ${rider.activeOrders} active orders, ${rider.distanceKm}km away, ${rider.delayRisk} traffic conditions`,
          recommendation: `Prioritize picking and assign the nearest available rider. Update customer ETA to ${rider.honestETA} min.`,
          impact: 'May reduce cancellation probability by ~35–50% if actioned within 5 minutes.',
          orderId: o.id,
          applied: o.rescued,
        });
      }
    });

    // Reorder opportunity
    const dueCustomers = data.customers.filter(c => c.status === 'DUE_NOW').length;
    if (dueCustomers > 0) {
      actions.push({
        id: 'RESCUE-REORDER-001',
        type: 'REORDER_OPPORTUNITY',
        severity: 'OPPORTUNITY',
        title: `💡 Reorder Opportunity: ${dueCustomers} Customers`,
        problem: `${dueCustomers} customers are overdue for their regular grocery reorder`,
        evidence: 'Purchase history shows these customers typically reorder every 7–10 days. They are now 3+ days past their interval.',
        recommendation: 'Launch personalized "Breakfast Essentials" reorder bundles to these customers via in-app notification.',
        impact: `At 38% conversion, this could generate ${Math.round(dueCustomers * 0.38)} orders with an average value of ₹186 each.`,
        applied: false,
      });
    }

    return actions;
  }

  // Gemini API call (with mock fallback)
  async function callGemini(prompt, mockResponse) {
    const apiKey = window.NOVACART_CONFIG?.geminiApiKey;
    if (!apiKey) return mockResponse;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
        }),
      });
      if (!res.ok) return mockResponse;
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || mockResponse;
    } catch {
      return mockResponse;
    }
  }

  return {
    scorePhantomRisk,
    scoreDeliveryRisk,
    calcHonestETA,
    scoreReorderProbability,
    getPhantomRecommendation,
    getDeliveryRecommendation,
    getReorderBundle,
    generateInsightExplanation,
    generateRescueActions,
    callGemini,
  };
})();

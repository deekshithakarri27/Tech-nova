// ===================================================
// NOVACART AI — MASTER DEMO DATA ENGINE
// All data is PROTOTYPE SIMULATION DATA
// ===================================================

window.NOVACART_DATA = (function() {

  // ---- STORES ----
  const stores = [
    { id: 'S101', name: 'Store #101 — Koramangala', zone: 'South', lat: 12.9352, lng: 77.6245, activeOrders: 28, avgDelivery: 24, cancellationRate: 6.2, delayRate: 14, drivers: 4, bottleneck: 'None', phantomRisk: 'LOW', status: 'NORMAL' },
    { id: 'S102', name: 'Store #102 — Indiranagar', zone: 'East', lat: 12.9784, lng: 77.6408, activeOrders: 42, avgDelivery: 32, cancellationRate: 11.3, delayRate: 24, drivers: 2, bottleneck: 'High store workload', phantomRisk: 'HIGH', status: 'CRITICAL' },
    { id: 'S103', name: 'Store #103 — Whitefield', zone: 'East', lat: 12.9698, lng: 77.7500, activeOrders: 19, avgDelivery: 28, cancellationRate: 7.8, delayRate: 18, drivers: 3, bottleneck: 'Distance', phantomRisk: 'MEDIUM', status: 'WARNING' },
    { id: 'S104', name: 'Store #104 — HSR Layout', zone: 'South', lat: 12.9081, lng: 77.6476, activeOrders: 33, avgDelivery: 22, cancellationRate: 5.1, delayRate: 11, drivers: 5, bottleneck: 'None', phantomRisk: 'LOW', status: 'NORMAL' },
    { id: 'S105', name: 'Store #105 — Hebbal', zone: 'North', lat: 13.0358, lng: 77.5970, activeOrders: 15, avgDelivery: 19, cancellationRate: 3.9, delayRate: 8, drivers: 4, bottleneck: 'None', phantomRisk: 'LOW', status: 'NORMAL' },
  ];

  // ---- PRODUCTS / SKUs ----
  const products = [
    { id: 'SKU001', name: 'Milk 500ml', category: 'Dairy', storeId: 'S102', price: 28, orders: 1248, cancellations: 387, cancellationRate: 31.0, mainReason: 'Out of stock', peakCancelTime: '7PM–9PM', riskScore: 92, risk: 'CRITICAL', stockStatus: 'MISMATCH', substitute: 'SKU002', applied: false },
    { id: 'SKU002', name: 'Amul Milk 500ml', category: 'Dairy', storeId: 'S102', price: 30, orders: 890, cancellations: 62, cancellationRate: 7.0, mainReason: 'Delivery delay', peakCancelTime: '8PM–10PM', riskScore: 22, risk: 'LOW', stockStatus: 'OK', substitute: null, applied: false },
    { id: 'SKU003', name: 'Eggs (Tray of 6)', category: 'Dairy', storeId: 'S102', price: 48, orders: 943, cancellations: 234, cancellationRate: 24.8, mainReason: 'Inventory mismatch', peakCancelTime: '6PM–8PM', riskScore: 78, risk: 'HIGH', stockStatus: 'MISMATCH', substitute: null, applied: false },
    { id: 'SKU004', name: 'Whole Wheat Bread', category: 'Bakery', storeId: 'S102', price: 45, orders: 1102, cancellations: 209, cancellationRate: 19.0, mainReason: 'Store unable to fulfill', peakCancelTime: '7AM–9AM', riskScore: 65, risk: 'HIGH', stockStatus: 'LOW', substitute: 'SKU005', applied: false },
    { id: 'SKU005', name: 'Brown Bread 400g', category: 'Bakery', storeId: 'S102', price: 42, orders: 654, cancellations: 45, cancellationRate: 6.9, mainReason: 'Customer cancelled', peakCancelTime: '12PM–2PM', riskScore: 18, risk: 'LOW', stockStatus: 'OK', substitute: null, applied: false },
    { id: 'SKU006', name: 'Basmati Rice 1kg', category: 'Grains', storeId: 'S103', price: 89, orders: 567, cancellations: 91, cancellationRate: 16.1, mainReason: 'Inventory mismatch', peakCancelTime: '5PM–7PM', riskScore: 58, risk: 'MEDIUM', stockStatus: 'LOW', substitute: null, applied: false },
    { id: 'SKU007', name: 'Tomatoes 500g', category: 'Vegetables', storeId: 'S101', price: 35, orders: 432, cancellations: 52, cancellationRate: 12.0, mainReason: 'Out of stock', peakCancelTime: '11AM–1PM', riskScore: 41, risk: 'MEDIUM', stockStatus: 'MISMATCH', substitute: null, applied: false },
    { id: 'SKU008', name: 'Curd 400g', category: 'Dairy', storeId: 'S102', price: 38, orders: 788, cancellations: 98, cancellationRate: 12.4, mainReason: 'Out of stock', peakCancelTime: '7PM–9PM', riskScore: 45, risk: 'MEDIUM', stockStatus: 'LOW', substitute: null, applied: false },
    { id: 'SKU009', name: 'Onions 1kg', category: 'Vegetables', storeId: 'S104', price: 42, orders: 389, cancellations: 24, cancellationRate: 6.2, mainReason: 'Delivery delay', peakCancelTime: '4PM–6PM', riskScore: 19, risk: 'LOW', stockStatus: 'OK', substitute: null, applied: false },
    { id: 'SKU010', name: 'Cooking Oil 1L', category: 'Oils', storeId: 'S103', price: 145, orders: 298, cancellations: 38, cancellationRate: 12.8, mainReason: 'Inventory mismatch', peakCancelTime: '6PM–8PM', riskScore: 47, risk: 'MEDIUM', stockStatus: 'MISMATCH', substitute: null, applied: false },
    { id: 'SKU011', name: 'Paneer 200g', category: 'Dairy', storeId: 'S102', price: 72, orders: 512, cancellations: 143, cancellationRate: 27.9, mainReason: 'Out of stock', peakCancelTime: '6PM–9PM', riskScore: 84, risk: 'CRITICAL', stockStatus: 'MISMATCH', substitute: null, applied: false },
    { id: 'SKU012', name: 'Banana (6 pcs)', category: 'Fruits', storeId: 'S101', price: 30, orders: 621, cancellations: 37, cancellationRate: 6.0, mainReason: 'Customer cancelled', peakCancelTime: '2PM–4PM', riskScore: 15, risk: 'LOW', stockStatus: 'OK', substitute: null, applied: false },
  ];

  // ---- RIDERS ----
  const riders = [
    { id: 'R17', name: 'Arjun S.', status: 'ACTIVE', lat: 12.9720, lng: 77.6380, activeOrders: 3, distanceKm: 2.1, currentETA: 10, honestETA: 14, etaConfidence: 87, delayRisk: 'MEDIUM', reason: 'One nearby delivery scheduled before target', completedToday: 18, storeId: 'S102' },
    { id: 'R23', name: 'Priya M.', status: 'ACTIVE', lat: 12.9810, lng: 77.6290, activeOrders: 1, distanceKm: 0.8, currentETA: 6, honestETA: 7, etaConfidence: 95, delayRisk: 'LOW', reason: 'Direct route, no other stops', completedToday: 22, storeId: 'S102' },
    { id: 'R05', name: 'Kiran B.', status: 'BUSY', lat: 12.9650, lng: 77.6440, activeOrders: 4, distanceKm: 3.4, currentETA: 14, honestETA: 21, etaConfidence: 72, delayRisk: 'HIGH', reason: 'Heavy traffic + 2 pending stops', completedToday: 12, storeId: 'S101' },
    { id: 'R11', name: 'Rohit K.', status: 'ACTIVE', lat: 12.9740, lng: 77.6510, activeOrders: 2, distanceKm: 1.5, currentETA: 8, honestETA: 9, etaConfidence: 91, delayRisk: 'LOW', reason: 'Single stop, clear route', completedToday: 15, storeId: 'S104' },
    { id: 'R32', name: 'Meera T.', status: 'RETURNING', lat: 12.9690, lng: 77.6350, activeOrders: 0, distanceKm: 0.5, currentETA: 3, honestETA: 3, etaConfidence: 99, delayRisk: 'LOW', reason: 'Returning to store', completedToday: 20, storeId: 'S102' },
    { id: 'R08', name: 'Deepak N.', status: 'BUSY', lat: 12.9760, lng: 77.6600, activeOrders: 3, distanceKm: 2.8, currentETA: 12, honestETA: 18, etaConfidence: 68, delayRisk: 'HIGH', reason: 'High traffic zone + 2 stops', completedToday: 9, storeId: 'S103' },
  ];

  // ---- ORDERS ----
  const orders = [];
  const orderStatuses = ['CONFIRMED', 'PREPARING', 'PICKED', 'ON_WAY', 'DELIVERED', 'CANCELLED'];
  const cancelReasons = ['Out of stock', 'Inventory mismatch', 'Customer cancelled', 'Store unable to fulfill', 'Delivery delay too long'];
  const customerNames = ['Rahul Mehta', 'Priya Sharma', 'Aryan Verma', 'Sunita Rao', 'Vikas Nair', 'Anita Gupta', 'Sanjay Patel', 'Deepa Iyer', 'Rohan Das', 'Kavita Singh', 'Nikhil Joshi', 'Pooja Reddy'];
  const productSets = [
    ['Milk 500ml', 'Eggs', 'Bread'], ['Rice 1kg', 'Dal', 'Oil'], ['Paneer 200g', 'Curd', 'Milk'],
    ['Tomatoes', 'Onions', 'Potatoes'], ['Bread', 'Butter', 'Eggs'], ['Banana', 'Apple', 'Curd'],
  ];

  for (let i = 1; i <= 500; i++) {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const rider = riders[Math.floor(Math.random() * riders.length)];
    const customer = customerNames[Math.floor(Math.random() * customerNames.length)];
    const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
    const items = productSets[Math.floor(Math.random() * productSets.length)];
    const cancelled = status === 'CANCELLED';
    const cancelReason = cancelled ? cancelReasons[Math.floor(Math.random() * cancelReasons.length)] : null;
    const amount = Math.floor(Math.random() * 400) + 80;
    const hoursAgo = Math.floor(Math.random() * 48);
    const delayRiskScore = Math.floor(Math.random() * 100);
    const cancellationRisk = Math.floor(Math.random() * 100);

    const orderDate = new Date(Date.now() - hoursAgo * 3600000);

    orders.push({
      id: `NC-${2000 + i}`,
      storeId: store.id,
      storeName: store.name,
      riderId: rider.id,
      riderName: rider.name,
      customer,
      items,
      amount,
      status,
      cancelReason,
      promisedETA: rider.currentETA + Math.floor(Math.random() * 5),
      honestETA: rider.honestETA + Math.floor(Math.random() * 4),
      orderTime: orderDate.toISOString(),
      delayRisk: delayRiskScore,
      cancellationRisk: cancellationRisk,
      riskLevel: delayRiskScore > 70 ? 'HIGH' : delayRiskScore > 40 ? 'MEDIUM' : 'LOW',
      rescued: false,
    });
  }

  // ---- CUSTOMERS ----
  const customers = [];
  const purchasePatterns = [
    { items: ['Milk 500ml', 'Bread', 'Eggs'], frequency: 3, category: 'Breakfast Essentials', probability: 82 },
    { items: ['Rice 1kg', 'Dal', 'Oil'], frequency: 2, category: 'Kitchen Staples', probability: 74 },
    { items: ['Vegetables Mix', 'Tomatoes', 'Onions'], frequency: 4, category: 'Vegetables', probability: 88 },
    { items: ['Milk', 'Curd', 'Paneer'], frequency: 3, category: 'Dairy Bundle', probability: 79 },
    { items: ['Snacks', 'Juice', 'Biscuits'], frequency: 2, category: 'Snack Pack', probability: 61 },
  ];

  for (let i = 1; i <= 130; i++) {
    const pattern = purchasePatterns[Math.floor(Math.random() * purchasePatterns.length)];
    const daysAgo = Math.floor(Math.random() * 12) + 3;
    const nextDue = Math.floor(Math.random() * 4) - 2; // -2 to +2 days from now

    customers.push({
      id: `CUST-${1000 + i}`,
      name: customerNames[Math.floor(Math.random() * customerNames.length)] + ` #${i}`,
      phone: `+91 98${Math.floor(Math.random() * 90000000 + 10000000)}`,
      items: pattern.items,
      category: pattern.category,
      frequency: pattern.frequency,
      lastPurchaseDaysAgo: daysAgo,
      nextDueDays: nextDue,
      reorderProbability: pattern.probability + Math.floor(Math.random() * 15 - 7),
      status: nextDue <= 0 ? 'DUE_NOW' : nextDue <= 2 ? 'DUE_SOON' : 'UPCOMING',
      totalOrders: Math.floor(Math.random() * 40) + 10,
      avgOrderValue: Math.floor(Math.random() * 200) + 120,
      notified: false,
    });
  }

  // ---- KPIs ----
  const kpis = {
    ordersToday: 892,
    cancellationRate: 11.3,
    phantomStockSKUs: 8,
    avgHonestETA: 17.4,
    onTimeDelivery: 78.2,
    repeatPurchaseRate: 42.1,
    revenueRecovered: 0,
    customersRecovered: 0,
  };

  // ---- INSIGHTS ----
  const insights = [
    {
      id: 'INS001',
      icon: '👻',
      title: '12 SKUs have unusually high cancellation rates',
      evidence: 'Analysis of 6,284 orders shows 12 SKUs with >15% cancellation rates, concentrated in Store #102 (Indiranagar)',
      impact: 'Estimated 127 lost orders/day. Potential revenue loss: ₹8,400/day',
      action: 'Review inventory for flagged SKUs, trigger stock verification at Store #102',
      confidence: 87,
      category: 'PHANTOM_STOCK',
      severity: 'CRITICAL',
    },
    {
      id: 'INS002',
      icon: '🏪',
      title: 'Store #102 has the highest phantom-stock risk',
      evidence: '11.3% cancellation rate vs 6.2% platform average. 8 SKUs classified HIGH or CRITICAL.',
      impact: 'Store #102 accounts for 34% of all cancellations despite handling 18% of orders',
      action: 'Immediate inventory audit, reduce displayed stock for HIGH/CRITICAL SKUs',
      confidence: 93,
      category: 'PHANTOM_STOCK',
      severity: 'CRITICAL',
    },
    {
      id: 'INS003',
      icon: '⏱',
      title: 'Most delivery delays occur between 7 PM and 9 PM',
      evidence: 'Delivery delay rate spikes from 14% average to 31% during 7-9 PM. Pattern consistent across 14 days of data.',
      impact: 'Evening peak accounts for 48% of all negative delivery experiences',
      action: 'Add 2 additional riders during 6-10 PM window; adjust ETA buffers for this period',
      confidence: 91,
      category: 'DELIVERY',
      severity: 'HIGH',
    },
    {
      id: 'INS004',
      icon: '🥛',
      title: 'Customers who purchase milk + bread together show high return rate',
      evidence: '78% of customers who buy milk + bread together return within 7 days. Average basket size: ₹234',
      impact: 'This customer segment generates 2.3x more lifetime value than single-item purchasers',
      action: 'Create "Breakfast Essentials" bundle. Launch targeted reorder campaign for this segment.',
      confidence: 84,
      category: 'REORDER',
      severity: 'OPPORTUNITY',
    },
    {
      id: 'INS005',
      icon: '🔄',
      title: '127 customers are currently showing high reorder probability',
      evidence: 'Based on 30-day purchase history analysis, 127 customers are ≥7 days past their typical reorder interval.',
      impact: 'Average order value: ₹186. Potential immediate revenue: ₹23,622',
      action: 'Launch Smart Reorder campaign targeting these 127 customers with personalized bundles.',
      confidence: 79,
      category: 'REORDER',
      severity: 'OPPORTUNITY',
    },
    {
      id: 'INS006',
      icon: '🚴',
      title: 'Rider R-05 and R-08 have above-average delay rates',
      evidence: 'Both riders average 4+ active orders simultaneously, causing 86% delay probability for peak orders.',
      impact: 'These 2 riders account for 22% of all delayed deliveries',
      action: 'Cap active orders at 3 per rider during peak hours. Reassign pending orders.',
      confidence: 88,
      category: 'DELIVERY',
      severity: 'HIGH',
    },
  ];

  // ---- NOTIFICATIONS ----
  const notifications = [
    { id: 'N001', icon: '👻', title: '8 phantom-stock alerts', desc: 'Store #102 has 8 high-risk SKUs requiring immediate attention', time: '5 min ago', read: false, severity: 'critical', link: 'phantom.html' },
    { id: 'N002', icon: '⏰', title: '53 orders at delay risk', desc: 'Orders entering elevated delay probability (>60%)', time: '12 min ago', read: false, severity: 'high', link: 'delivery.html' },
    { id: 'N003', icon: '🔄', title: '127 customers due for reorder', desc: 'High-probability reorder window detected for breakfast essentials segment', time: '18 min ago', read: false, severity: 'opportunity', link: 'reorder.html' },
    { id: 'N004', icon: '🏪', title: 'Store #102 requires attention', desc: 'Cancellation rate climbed to 11.3% — above 8% threshold', time: '32 min ago', read: false, severity: 'high', link: 'stores.html' },
    { id: 'N005', icon: '✅', title: 'Demo data loaded successfully', desc: '5 stores, 12 SKUs, 500 orders, 6 riders, 127 customers ready', time: '1 hour ago', read: true, severity: 'info', link: 'dashboard.html' },
  ];

  // ---- IMPACT SIMULATOR DEFAULTS ----
  const impactDefaults = {
    interventionRate: 65,
    phantomDetectionAccuracy: 88,
    etaAccuracy: 91,
    recoveryRate: 72,
    reorderConversion: 38,
  };

  function calcImpact(settings) {
    const { interventionRate, phantomDetectionAccuracy, etaAccuracy, recoveryRate, reorderConversion } = settings;
    const base = {
      cancellationRate: 11.3,
      onTimeDelivery: 78.2,
      avgDelivery: 31,
      repeatPurchase: 42.1,
      recoveredOrders: 0,
      revenueRecovered: 0,
      customersRecovered: 0,
    };
    const cancelReduction = (interventionRate / 100) * (phantomDetectionAccuracy / 100) * 4.2;
    const etaImprovement = (etaAccuracy / 100) * 11.8;
    const deliveryImprovement = (etaAccuracy / 100) * 8;
    const repeatLift = (recoveryRate / 100) * (reorderConversion / 100) * 12.3;
    const recoveredOrders = Math.round((interventionRate / 100) * (recoveryRate / 100) * 84);
    const revenueRecovered = recoveredOrders * 186;
    const customersRecovered = Math.round((reorderConversion / 100) * 127);

    return {
      cancellationRate: Math.max(2, base.cancellationRate - cancelReduction).toFixed(1),
      onTimeDelivery: Math.min(98, base.onTimeDelivery + etaImprovement).toFixed(1),
      avgDelivery: Math.max(15, base.avgDelivery - deliveryImprovement).toFixed(0),
      repeatPurchase: Math.min(75, base.repeatPurchase + repeatLift).toFixed(1),
      recoveredOrders,
      revenueRecovered,
      customersRecovered,
    };
  }

  // ---- GLOBAL STATE ----
  let state = {
    demoLoaded: false,
    notifCount: 5,
    notifications: [...notifications],
    kpis: { ...kpis },
    rescueActions: [],
    settings: {
      delayThreshold: 5,
      compensationAmount: 30,
      couponValidity: 7,
      maxCompensation: 100,
      phantomStockThreshold: 15,
      reorderProbThreshold: 70,
      etaConfidenceThreshold: 80,
      criticalRiskThreshold: 80,
      highRiskThreshold: 50,
    },
  };

  return {
    stores,
    products,
    riders,
    orders,
    customers,
    insights,
    notifications,
    impactDefaults,
    calcImpact,
    state,
  };
})();

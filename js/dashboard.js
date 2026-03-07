/* ===================================================
   CryoCore Client Dashboard — Vanilla JS
   =================================================== */

// ===== DUMMY DATA =====

const ORDERS = [
    { id: 'ORD-101', product: 'Vaccine X', qty: 500, tempRange: '2°C – 8°C', destination: 'Mumbai', status: 'Processing', created: '2026-03-01' },
    { id: 'ORD-102', product: 'Insulin Batch A', qty: 1200, tempRange: '2°C – 8°C', destination: 'Delhi', status: 'Shipped', created: '2026-02-28' },
    { id: 'ORD-103', product: 'Biologic B12', qty: 300, tempRange: '-20°C – -15°C', destination: 'Bangalore', status: 'Delivered', created: '2026-02-25' },
    { id: 'ORD-104', product: 'Vaccine X', qty: 750, tempRange: '2°C – 8°C', destination: 'Hyderabad', status: 'Shipped', created: '2026-02-22' },
    { id: 'ORD-105', product: 'Monoclonal Ab', qty: 200, tempRange: '-70°C – -60°C', destination: 'Mumbai', status: 'Processing', created: '2026-02-20' },
    { id: 'ORD-106', product: 'Insulin Batch A', qty: 800, tempRange: '2°C – 8°C', destination: 'Delhi', status: 'Delivered', created: '2026-02-18' },
    { id: 'ORD-107', product: 'Biologic B12', qty: 450, tempRange: '-20°C – -15°C', destination: 'Bangalore', status: 'Shipped', created: '2026-02-15' },
    { id: 'ORD-108', product: 'Vaccine X', qty: 600, tempRange: '2°C – 8°C', destination: 'Hyderabad', status: 'Processing', created: '2026-02-12' },
    { id: 'ORD-109', product: 'Plasma Derivatives', qty: 350, tempRange: '-30°C – -20°C', destination: 'Mumbai', status: 'Delivered', created: '2026-02-10' },
    { id: 'ORD-110', product: 'Insulin Batch A', qty: 900, tempRange: '2°C – 8°C', destination: 'Delhi', status: 'Shipped', created: '2026-02-08' },
    { id: 'ORD-111', product: 'Gene Therapy Vector', qty: 100, tempRange: '-80°C – -60°C', destination: 'Bangalore', status: 'Processing', created: '2026-02-05' },
    { id: 'ORD-112', product: 'Vaccine X', qty: 1500, tempRange: '2°C – 8°C', destination: 'Hyderabad', status: 'Delivered', created: '2026-02-01' },
];

const SHIPMENTS = [
    { id: 'SHP-201', orderId: 'ORD-102', location: 'En route — Jaipur Highway', tempStatus: 'Safe', eta: '2026-03-09', status: 'In Transit' },
    { id: 'SHP-202', orderId: 'ORD-104', location: 'Warehouse — Pune Hub', tempStatus: 'Safe', eta: '2026-03-10', status: 'Preparing' },
    { id: 'SHP-203', orderId: 'ORD-107', location: 'Customs — Chennai Port', tempStatus: 'Warning', eta: '2026-03-11', status: 'Delayed' },
    { id: 'SHP-204', orderId: 'ORD-110', location: 'In flight — DEL to BLR', tempStatus: 'Safe', eta: '2026-03-08', status: 'In Transit' },
    { id: 'SHP-205', orderId: 'ORD-105', location: 'Cold Storage — Mumbai', tempStatus: 'Critical', eta: '2026-03-12', status: 'Preparing' },
    { id: 'SHP-206', orderId: 'ORD-108', location: 'En route — NH44', tempStatus: 'Safe', eta: '2026-03-08', status: 'In Transit' },
    { id: 'SHP-207', orderId: 'ORD-111', location: 'Lab Pickup — Hyderabad', tempStatus: 'Safe', eta: '2026-03-13', status: 'Preparing' },
    { id: 'SHP-208', orderId: 'ORD-101', location: 'Dispatched — Pune Depot', tempStatus: 'Warning', eta: '2026-03-09', status: 'In Transit' },
];

const SHIPMENT_HISTORY = [
    { id: 'SHP-190', orderId: 'ORD-103', origin: 'Pune', destination: 'Bangalore', delivered: '2026-02-26', status: 'Delivered' },
    { id: 'SHP-191', orderId: 'ORD-106', origin: 'Mumbai', destination: 'Delhi', delivered: '2026-02-19', status: 'Delivered' },
    { id: 'SHP-192', orderId: 'ORD-109', origin: 'Hyderabad', destination: 'Mumbai', delivered: '2026-02-11', status: 'Delivered' },
    { id: 'SHP-193', orderId: 'ORD-112', origin: 'Chennai', destination: 'Hyderabad', delivered: '2026-02-02', status: 'Delivered' },
    { id: 'SHP-194', orderId: 'ORD-098', origin: 'Pune', destination: 'Delhi', delivered: '2026-01-28', status: 'Delivered' },
];

const NOTIFICATIONS = [
    { type: 'temp-warning', label: 'Temperature Warning', text: 'Shipment SHP-204 approaching threshold at 7.2°C', time: '12 min ago', unread: true },
    { type: 'shipment-delay', label: 'Shipment Delay', text: 'Weather disruption detected on NH44 — SHP-206 rerouting', time: '34 min ago', unread: true },
    { type: 'customs-delay', label: 'Customs Delay', text: 'SHP-203 awaiting customs clearance at Chennai Port', time: '1 hr ago', unread: true },
    { type: 'delivery-completed', label: 'Delivery Completed', text: 'Order ORD-109 delivered successfully to Mumbai', time: '2 hrs ago', unread: true },
    { type: 'temp-breach', label: 'Temperature Breach', text: 'SHP-205 exceeded -60°C threshold — corrective action taken', time: '3 hrs ago', unread: true },
    { type: 'shipment-update', label: 'Shipment Update', text: 'SHP-208 dispatched from Pune Depot and en route', time: '5 hrs ago', unread: true },
];

// ===== DOM ELEMENTS =====
const sidebar = document.getElementById('dashSidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const navLinks = document.querySelectorAll('.sidebar-link[data-page]');
const pages = document.querySelectorAll('.dash-page');
const notifBtn = document.getElementById('notifBtn');
const notifDropdown = document.getElementById('notifDropdown');
const notifList = document.getElementById('notifList');
const notifBadge = document.getElementById('notifBadge');
const notifClear = document.getElementById('notifClear');
const btnCreateOrder = document.getElementById('btnCreateOrder');

// ===== SIDEBAR TOGGLE (MOBILE) =====
let overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});

// ===== PAGE NAVIGATION =====
function navigateTo(pageName) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById('page-' + pageName);
    const link = document.querySelector(`.sidebar-link[data-page="${pageName}"]`);

    if (target) target.classList.add('active');
    if (link) link.classList.add('active');

    // Close mobile sidebar
    sidebar.classList.remove('open');
    overlay.classList.remove('active');

    // Initialize charts if needed
    if (pageName === 'dashboard') initDashboardCharts();
    if (pageName === 'analytics') initAnalyticsCharts();
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
    });
});

// "Create Order" button on orders page → navigate to create-order
if (btnCreateOrder) {
    btnCreateOrder.addEventListener('click', () => navigateTo('create-order'));
}

// ===== NOTIFICATIONS =====
function renderNotifications() {
    notifList.innerHTML = '';
    NOTIFICATIONS.forEach((n, i) => {
        const item = document.createElement('div');
        item.className = 'notif-item' + (n.unread ? ' unread' : '');
        item.innerHTML = `
            <div class="notif-dot ${n.type}"></div>
            <div class="notif-content">
                <span class="notif-label ${n.type}">${n.label}</span>
                <div class="notif-text">${n.text}</div>
                <div class="notif-time">${n.time}</div>
            </div>
        `;
        item.addEventListener('click', () => {
            n.unread = false;
            item.classList.remove('unread');
            updateBadge();
        });
        notifList.appendChild(item);
    });
    updateBadge();
}

function updateBadge() {
    const count = NOTIFICATIONS.filter(n => n.unread).length;
    notifBadge.textContent = count;
    notifBadge.style.display = count > 0 ? 'flex' : 'none';
}

notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('open');
});

notifClear.addEventListener('click', () => {
    NOTIFICATIONS.forEach(n => n.unread = false);
    document.querySelectorAll('.notif-item').forEach(el => el.classList.remove('unread'));
    updateBadge();
});

document.addEventListener('click', (e) => {
    if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
        notifDropdown.classList.remove('open');
    }
});

// ===== TABLES =====
function statusBadge(status) {
    const cls = status.toLowerCase().replace(/\s+/g, '-');
    return `<span class="badge ${cls}">${status}</span>`;
}

function tempBadge(status) {
    const cls = status.toLowerCase();
    return `<span class="temp-badge ${cls}">${status}</span>`;
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function renderRecentOrders() {
    const tbody = document.getElementById('recentOrdersBody');
    tbody.innerHTML = '';
    ORDERS.slice(0, 7).forEach(o => {
        tbody.innerHTML += `<tr>
            <td style="font-family: var(--font-mono); font-weight:600; color: var(--text-primary);">${o.id}</td>
            <td>${o.product}</td>
            <td style="font-family: var(--font-mono);">${o.qty}</td>
            <td>${o.tempRange}</td>
            <td>${o.destination}</td>
            <td>${statusBadge(o.status)}</td>
            <td>${formatDate(o.created)}</td>
        </tr>`;
    });
}

function renderOrdersTable() {
    const tbody = document.getElementById('ordersBody');
    tbody.innerHTML = '';
    ORDERS.forEach(o => {
        tbody.innerHTML += `<tr>
            <td style="font-family: var(--font-mono); font-weight:600; color: var(--text-primary);">${o.id}</td>
            <td>${o.product}</td>
            <td style="font-family: var(--font-mono);">${o.qty}</td>
            <td>${o.tempRange}</td>
            <td>${o.destination}</td>
            <td>${statusBadge(o.status)}</td>
            <td>${formatDate(o.created)}</td>
        </tr>`;
    });
}

function renderShipmentsTable() {
    const tbody = document.getElementById('shipmentsBody');
    tbody.innerHTML = '';
    SHIPMENTS.forEach(s => {
        tbody.innerHTML += `<tr>
            <td style="font-family: var(--font-mono); font-weight:600; color: var(--text-primary);">${s.id}</td>
            <td style="font-family: var(--font-mono);">${s.orderId}</td>
            <td>${s.location}</td>
            <td>${tempBadge(s.tempStatus)}</td>
            <td>${formatDate(s.eta)}</td>
            <td>${statusBadge(s.status)}</td>
        </tr>`;
    });
}

function renderShipmentHistory() {
    const tbody = document.getElementById('shipmentHistoryBody');
    tbody.innerHTML = '';
    SHIPMENT_HISTORY.forEach(s => {
        tbody.innerHTML += `<tr>
            <td style="font-family: var(--font-mono); font-weight:600; color: var(--text-primary);">${s.id}</td>
            <td style="font-family: var(--font-mono);">${s.orderId}</td>
            <td>${s.origin}</td>
            <td>${s.destination}</td>
            <td>${formatDate(s.delivered)}</td>
            <td>${statusBadge(s.status)}</td>
        </tr>`;
    });
}

// ===== CHARTS =====
let dashChartsInit = false;
let analyticsChartsInit = false;
let chartInstances = {};

const chartColors = {
    cyan: '#00d4ff',
    cyanLight: 'rgba(0, 212, 255, 0.15)',
    green: '#00c9a7',
    greenLight: 'rgba(0, 201, 167, 0.15)',
    orange: '#ffb830',
    orangeLight: 'rgba(255, 184, 48, 0.15)',
    red: '#ff4757',
    redLight: 'rgba(255, 71, 87, 0.15)',
    blue: '#4f8cff',
    blueLight: 'rgba(79, 140, 255, 0.15)',
    purple: '#a855f7',
    purpleLight: 'rgba(168, 85, 247, 0.15)',
};

Chart.defaults.font.family = "'Space Grotesk', sans-serif";
Chart.defaults.color = '#94a3b8';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
Chart.defaults.plugins.legend.labels.padding = 16;

function initDashboardCharts() {
    if (dashChartsInit) return;
    dashChartsInit = true;

    // Orders Per Month — Bar Chart
    const ctxBar = document.getElementById('chartOrdersMonth').getContext('2d');
    const barGradient = ctxBar.createLinearGradient(0, 0, 0, 280);
    barGradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
    barGradient.addColorStop(1, 'rgba(0, 212, 255, 0.15)');

    chartInstances.ordersMonth = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Orders',
                data: [18, 24, 20, 32, 28, 36, 14],
                backgroundColor: barGradient,
                borderColor: chartColors.cyan,
                borderWidth: 1.5,
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.55,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#e8f4ff',
                    bodyColor: '#94a3b8',
                    padding: 12,
                    cornerRadius: 8,
                    borderColor: 'rgba(0,212,255,0.2)',
                    borderWidth: 1,
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { font: { size: 12, weight: 500 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
                    border: { display: false },
                    ticks: { font: { size: 12 }, stepSize: 10 }
                }
            }
        }
    });

    // Shipment Status Distribution — Doughnut
    const ctxDoughnut = document.getElementById('chartShipmentStatus').getContext('2d');
    chartInstances.shipmentStatus = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Preparing', 'In Transit', 'Delivered', 'Delayed'],
            datasets: [{
                data: [3, 4, 4, 1],
                backgroundColor: [chartColors.purple, chartColors.cyan, chartColors.green, chartColors.orange],
                borderWidth: 0,
                hoverOffset: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { font: { size: 12 }, padding: 16 }
                },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#e8f4ff',
                    bodyColor: '#94a3b8',
                    padding: 12,
                    cornerRadius: 8,
                }
            }
        }
    });
}

function initAnalyticsCharts() {
    if (analyticsChartsInit) return;
    analyticsChartsInit = true;

    // Orders Per Month — Bar
    const ctxBar = document.getElementById('chartAnalyticsOrders').getContext('2d');
    const barGradient = ctxBar.createLinearGradient(0, 0, 0, 280);
    barGradient.addColorStop(0, 'rgba(79, 140, 255, 0.85)');
    barGradient.addColorStop(1, 'rgba(79, 140, 255, 0.15)');

    chartInstances.analyticsOrders = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Orders',
                data: [18, 24, 20, 32, 28, 36, 14],
                backgroundColor: barGradient,
                borderColor: chartColors.blue,
                borderWidth: 1.5,
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.55,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#e8f4ff',
                    bodyColor: '#94a3b8',
                    padding: 12,
                    cornerRadius: 8,
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { font: { size: 12, weight: 500 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
                    border: { display: false },
                    ticks: { font: { size: 12 }, stepSize: 10 }
                }
            }
        }
    });

    // Delivery Success Rate — Pie
    const ctxPie = document.getElementById('chartDeliverySuccess').getContext('2d');
    chartInstances.deliverySuccess = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['On-Time', 'Delayed', 'Failed'],
            datasets: [{
                data: [96.4, 3.1, 0.5],
                backgroundColor: [chartColors.green, chartColors.orange, chartColors.red],
                borderWidth: 0,
                hoverOffset: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { font: { size: 12 }, padding: 16 }
                },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#e8f4ff',
                    bodyColor: '#94a3b8',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`
                    }
                }
            }
        }
    });
}

// ===== FORM VALIDATION =====
const form = document.getElementById('createOrderForm');
const formSuccess = document.getElementById('formSuccess');
const btnNewOrder = document.getElementById('btnNewOrder');

const validators = {
    productName: { el: 'productName', err: 'errProductName', msg: 'Product name is required' },
    quantity: { el: 'quantity', err: 'errQuantity', msg: 'Enter a valid quantity' },
    tempRange: { el: 'tempRange', err: 'errTempRange', msg: 'Temperature range is required' },
    origin: { el: 'origin', err: 'errOrigin', msg: 'Origin is required' },
    destination: { el: 'destination', err: 'errDestination', msg: 'Destination is required' },
    priority: { el: 'priority', err: 'errPriority', msg: 'Select a priority' },
    expectedDelivery: { el: 'expectedDelivery', err: 'errExpectedDelivery', msg: 'Select a delivery date' },
};

function validateForm() {
    let valid = true;
    Object.values(validators).forEach(v => {
        const el = document.getElementById(v.el);
        const err = document.getElementById(v.err);
        const val = el.value.trim();

        if (!val || (v.el === 'quantity' && (isNaN(val) || Number(val) < 1))) {
            el.classList.add('error');
            err.textContent = v.msg;
            valid = false;
        } else {
            el.classList.remove('error');
            err.textContent = '';
        }
    });
    return valid;
}

// Clear error on input
Object.values(validators).forEach(v => {
    const el = document.getElementById(v.el);
    el.addEventListener('input', () => {
        el.classList.remove('error');
        document.getElementById(v.err).textContent = '';
    });
    el.addEventListener('change', () => {
        el.classList.remove('error');
        document.getElementById(v.err).textContent = '';
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Simulate order creation
        const newOrder = {
            id: 'ORD-' + (113 + Math.floor(Math.random() * 100)),
            product: document.getElementById('productName').value.trim(),
            qty: parseInt(document.getElementById('quantity').value),
            tempRange: document.getElementById('tempRange').value.trim(),
            destination: document.getElementById('destination').value.trim(),
            status: 'Processing',
            created: new Date().toISOString().split('T')[0],
        };
        ORDERS.unshift(newOrder);

        // Show success
        form.style.display = 'none';
        formSuccess.style.display = 'block';

        // Re-render tables
        renderOrdersTable();
        renderRecentOrders();
    }
});

btnNewOrder.addEventListener('click', () => {
    form.reset();
    form.style.display = 'block';
    formSuccess.style.display = 'none';
});

// ===== INITIALIZE =====
function init() {
    renderNotifications();
    renderRecentOrders();
    renderOrdersTable();
    renderShipmentsTable();
    renderShipmentHistory();
    initDashboardCharts();
}

document.addEventListener('DOMContentLoaded', init);

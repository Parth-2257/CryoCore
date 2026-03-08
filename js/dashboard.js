/* ===================================================
   CryoCore Client Dashboard — Vanilla JS
   =================================================== */

// ===== DUMMY DATA =====

const ORDERS = [
    { id: 'ORD-20250308-001', product: 'Vaccine X', qty: 500, tempRange: '2°C – 8°C', tempStatus: 'Normal', destination: 'Mumbai', status: 'Processing', created: '2026-03-08' },
    { id: 'ORD-20250307-002', product: 'Insulin Batch A', qty: 1200, tempRange: '2°C – 8°C', tempStatus: 'Normal', destination: 'Delhi', status: 'In Transit', created: '2026-03-07' },
    { id: 'ORD-20250306-003', product: 'Biologic B12', qty: 300, tempRange: '-20°C – -15°C', tempStatus: 'Normal', destination: 'Bangalore', status: 'Delivered', created: '2026-03-06' },
    { id: 'ORD-20250305-004', product: 'Vaccine X', qty: 750, tempRange: '2°C – 8°C', tempStatus: 'Warning', destination: 'Hyderabad', status: 'In Transit', created: '2026-03-05' },
    { id: 'ORD-20250304-005', product: 'Monoclonal Ab', qty: 200, tempRange: '-70°C – -60°C', tempStatus: 'Excursion', destination: 'Mumbai', status: 'Processing', created: '2026-03-04' },
    { id: 'ORD-20250303-006', product: 'Insulin Batch A', qty: 800, tempRange: '2°C – 8°C', tempStatus: 'Normal', destination: 'Delhi', status: 'Delivered', created: '2026-03-03' },
    { id: 'ORD-20250302-007', product: 'Biologic B12', qty: 450, tempRange: '-20°C – -15°C', tempStatus: 'Normal', destination: 'Bangalore', status: 'In Transit', created: '2026-03-02' },
    { id: 'ORD-20250301-008', product: 'Vaccine X', qty: 600, tempRange: '2°C – 8°C', tempStatus: 'Normal', destination: 'Hyderabad', status: 'Processing', created: '2026-03-01' },
    { id: 'ORD-20250228-009', product: 'Plasma Derivatives', qty: 350, tempRange: '-30°C – -20°C', tempStatus: 'Normal', destination: 'Mumbai', status: 'Delivered', created: '2026-02-28' },
    { id: 'ORD-20250227-010', product: 'Insulin Batch A', qty: 900, tempRange: '2°C – 8°C', tempStatus: 'Warning', destination: 'Delhi', status: 'In Transit', created: '2026-02-27' },
    { id: 'ORD-20250226-011', product: 'Gene Therapy Vector', qty: 100, tempRange: '-80°C – -60°C', tempStatus: 'Normal', destination: 'Bangalore', status: 'Processing', created: '2026-02-26' },
    { id: 'ORD-20250225-012', product: 'Vaccine X', qty: 1500, tempRange: '2°C – 8°C', tempStatus: 'Normal', destination: 'Hyderabad', status: 'Delivered', created: '2026-02-25' },
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
const darkModeToggle = document.getElementById('darkModeToggle');
const userAvatar = document.getElementById('userAvatar');
const profileDropdown = document.getElementById('profileDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const orderModalOverlay = document.getElementById('orderModalOverlay');
const modalClose = document.getElementById('modalClose');
const sortSelect = document.getElementById('sortSelect');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Sorting state
let sortState = {
    column: 'id',
    direction: 'desc'
};

// Tab state
let currentTab = 'active';

// ===== DARK MODE TOGGLE =====
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    } else {
        updateDarkModeIcon(false);
    }
}

function updateDarkModeIcon(isDark) {
    const sunIcon = darkModeToggle.querySelector('.sun-icon');
    const moonIcon = darkModeToggle.querySelector('.moon-icon');
    if (isDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeIcon(isDark);
});

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

// ===== PROFILE DROPDOWN =====
userAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!profileDropdown.contains(e.target) && !userAvatar.contains(e.target)) {
        profileDropdown.classList.remove('open');
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});

// ===== TAB FUNCTIONALITY =====
function switchTab(tabName) {
    currentTab = tabName;
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabName + 'Tab');
    });
    renderOrders();
}

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        switchTab(button.dataset.tab);
    });
});

// ===== SORT FUNCTIONALITY =====
sortSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    const [column, direction] = value.split('-');
    sortState.column = column;
    sortState.direction = direction;
    renderOrders();
});

// Add click handlers for sortable headers
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('sortable')) {
        const column = e.target.dataset.column;
        if (sortState.column === column) {
            sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
        } else {
            sortState.column = column;
            sortState.direction = 'asc';
        }
        updateSortSelect();
        renderOrders();
    }
});

function updateSortSelect() {
    sortSelect.value = `${sortState.column}-${sortState.direction}`;
}

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
    if (pageName === 'analytics') {
        setTimeout(populateAnalytics, 100);
    }
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

// ===== ORDER MODAL =====
function showOrderModal(order) {
    const modal = document.getElementById('orderModalOverlay');
    const stage = getProgressStage(order.status);
    
    // Update progress pipeline
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('completed', 'active');
        if (step.dataset.stage === stage) {
            step.classList.add('active');
        } else {
            const stageOrder = ['ordered', 'sourcing', 'in-transit', 'distribution', 'delivered'];
            const currentIndex = stageOrder.indexOf(stage);
            const stepIndex = stageOrder.indexOf(step.dataset.stage);
            if (stepIndex < currentIndex) {
                step.classList.add('completed');
            }
        }
    });
    
    // Update details
    document.getElementById('detailProduct').textContent = order.product;
    document.getElementById('detailTempRange').textContent = order.tempRange;
    document.getElementById('detailTransport').textContent = `${getTransportIcon('Air')} Air`;
    document.getElementById('detailLocation').textContent = 'En route — Current Location';
    document.getElementById('detailDelivery').textContent = formatDate(order.created);
    document.getElementById('detailCreated').textContent = formatDate(order.created);
    document.getElementById('detailStatus').textContent = statusBadge(order.status);
    
    modal.classList.add('open');
}

modalClose.addEventListener('click', () => {
    document.getElementById('orderModalOverlay').classList.remove('open');
});

orderModalOverlay.addEventListener('click', (e) => {
    if (e.target === orderModalOverlay) {
        orderModalOverlay.classList.remove('open');
    }
});

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

function tempStatusBadge(status) {
    const statusMap = {
        'Normal': { class: 'normal', icon: '✅', text: 'Normal' },
        'Warning': { class: 'warning', icon: '⚠️', text: 'Warning' },
        'Excursion': { class: 'critical', icon: '🚨', text: 'Excursion' }
    };
    
    const statusInfo = statusMap[status] || statusMap['Normal'];
    return `<span class="temp-badge ${statusInfo.class}">${statusInfo.icon} ${statusInfo.text}</span>`;
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getTransportIcon(mode) {
    const icons = {
        'Air': '✈️',
        'Sea': '🚢',
        'Rail': '🚂',
        'Road': '🚛'
    };
    return icons[mode] || '🚛';
}

function getRiskScore(status, tempStatus) {
    if (tempStatus === 'Excursion') return 'High';
    if (tempStatus === 'Warning') return 'Medium';
    if (status === 'Delayed') return 'High';
    return 'Low';
}

function getProgressStage(status) {
    const stageMap = {
        'Processing': 'ordered',
        'Preparing': 'sourcing',
        'In Transit': 'in-transit',
        'Delivered': 'delivered'
    };
    return stageMap[status] || 'ordered';
}

function sortOrders(orders) {
    const sorted = [...orders];
    sorted.sort((a, b) => {
        let aVal = a[sortState.column];
        let bVal = b[sortState.column];
        
        // Handle different data types
        if (sortState.column === 'id') {
            aVal = aVal.split('-').join('');
            bVal = bVal.split('-').join('');
        }
        
        if (sortState.column === 'status') {
            const statusOrder = { 'Processing': 1, 'In Transit': 2, 'Delivered': 3 };
            aVal = statusOrder[a.status] || 0;
            bVal = statusOrder[b.status] || 0;
        }
        
        if (sortState.direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    return sorted;
}

function renderOrders() {
    const activeOrders = ORDERS.filter(o => 
        o.status === 'Processing' || o.status === 'In Transit' || o.status === 'Preparing'
    );
    const historyOrders = ORDERS.filter(o => 
        o.status === 'Delivered' || o.status === 'Cancelled' || o.status === 'Completed'
    );
    
    const sortedActive = sortOrders(activeOrders);
    const sortedHistory = sortOrders(historyOrders);
    
    // Render active orders
    const activeBody = document.getElementById('activeOrdersBody');
    activeBody.innerHTML = '';
    sortedActive.forEach(o => {
        activeBody.innerHTML += `<tr data-order-id="${o.id}">
            <td style="font-family: var(--font-mono); font-weight:600; color: var(--text-primary);">${o.id}</td>
            <td>${o.product}</td>
            <td style="font-family: var(--font-mono);">${o.qty}</td>
            <td>${tempStatusBadge(o.tempStatus)}</td>
            <td>${o.destination}</td>
            <td>${statusBadge(o.status)}</td>
        </tr>`;
    });
    
    // Render history orders
    const historyBody = document.getElementById('historyOrdersBody');
    historyBody.innerHTML = '';
    sortedHistory.forEach(o => {
        historyBody.innerHTML += `<tr data-order-id="${o.id}">
            <td style="font-family: var(--font-mono); font-weight:600; color: var(--text-primary);">${o.id}</td>
            <td>${o.product}</td>
            <td style="font-family: var(--font-mono);">${o.qty}</td>
            <td>${tempStatusBadge(o.tempStatus)}</td>
            <td>${o.destination}</td>
            <td>${statusBadge(o.status)}</td>
        </tr>`;
    });
    
    // Add click handlers for order details
    document.querySelectorAll('#activeOrdersBody tr, #historyOrdersBody tr').forEach(row => {
        row.addEventListener('click', () => {
            const orderId = row.dataset.orderId;
            const order = ORDERS.find(o => o.id === orderId);
            if (order) showOrderModal(order);
        });
    });
    
    // Update sortable header classes
    document.querySelectorAll('.sortable').forEach(th => {
        th.classList.remove('asc', 'desc');
        if (th.dataset.column === sortState.column) {
            th.classList.add(sortState.direction);
        }
    });
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
    console.log('initAnalyticsCharts called');
    
    // Destroy existing instances before creating new ones
    if (window.regionChartInstance) {
        window.regionChartInstance.destroy();
        console.log('Destroyed existing regionChart');
    }
    if (window.weeklyChartInstance) {
        window.weeklyChartInstance.destroy();
        console.log('Destroyed existing weeklyChart');
    }
    if (window.transportChartInstance) {
        window.transportChartInstance.destroy();
        console.log('Destroyed existing transportChart');
    }

    // Check if canvas elements exist
    const regionCanvas = document.getElementById("regionChart");
    const weeklyCanvas = document.getElementById("weeklyChart");
    const transportCanvas = document.getElementById("transportChart");
    
    console.log('Canvas elements found:', regionCanvas, weeklyCanvas, transportCanvas);
    
    if (!regionCanvas || !weeklyCanvas || !transportCanvas) {
        console.log('Missing canvas elements, aborting chart initialization');
        return;
    }

    console.log('All canvas elements found, creating charts...');

    // Chart 1 — Bar Graph "Total Shipments Across Regions"
    const ctxRegional = regionCanvas.getContext('2d');
    const regionalGradient = ctxRegional.createLinearGradient(0, 0, 0, 300);
    regionalGradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
    regionalGradient.addColorStop(1, 'rgba(0, 212, 255, 0.15)');

    window.regionChartInstance = new Chart(ctxRegional, {
        type: 'bar',
        data: {
            labels: ["North America", "Europe", "Asia Pacific", "Middle East", "Africa", "South America"],
            datasets: [{
                label: 'Shipments',
                data: [68, 84, 71, 29, 18, 22],
                backgroundColor: regionalGradient,
                borderColor: '#00d4ff',
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
                    backgroundColor: document.body.classList.contains('dark-mode') ? '#0f172a' : '#ffffff',
                    titleColor: document.body.classList.contains('dark-mode') ? '#e8f4ff' : '#0d1f38',
                    bodyColor: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#6b7a8d',
                    padding: 12,
                    cornerRadius: 8,
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { 
                        font: { size: 12, weight: 500 },
                        color: document.body.classList.contains('dark-mode') ? '#e8f4ff' : '#0d1f38'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: { 
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                        drawBorder: false 
                    },
                    border: { display: false },
                    ticks: { 
                        font: { size: 12 }, 
                        stepSize: 20,
                        color: document.body.classList.contains('dark-mode') ? '#e8f4ff' : '#0d1f38'
                    }
                }
            }
        }
    });

    // Chart 2 — Line Chart "Shipments Per Week"
    const ctxWeekly = weeklyCanvas.getContext('2d');
    window.weeklyChartInstance = new Chart(ctxWeekly, {
        type: 'line',
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
            datasets: [{
                label: 'Shipments',
                data: [28, 35, 31, 42, 38, 45, 41, 52],
                borderColor: '#00ff9d',
                backgroundColor: 'rgba(0, 255, 157, 0.08)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#00ff9d',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: document.body.classList.contains('dark-mode') ? '#0f172a' : '#ffffff',
                    titleColor: document.body.classList.contains('dark-mode') ? '#e8f4ff' : '#0d1f38',
                    bodyColor: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#6b7a8d',
                    padding: 12,
                    cornerRadius: 8,
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { 
                        font: { size: 12, weight: 500 },
                        color: document.body.classList.contains('dark-mode') ? '#e8f4ff' : '#0d1f38'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: { 
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                        drawBorder: false 
                    },
                    border: { display: false },
                    ticks: { 
                        font: { size: 12 }, 
                        stepSize: 10,
                        color: document.body.classList.contains('dark-mode') ? '#e8f4ff' : '#0d1f38'
                    }
                }
            }
        }
    });

    // Chart 3 — Donut Chart "Shipments by Transport Mode"
    const ctxTransport = transportCanvas.getContext('2d');
    window.transportChartInstance = new Chart(ctxTransport, {
        type: 'doughnut',
        data: {
            labels: ["Air", "Sea", "Rail", "Road"],
            datasets: [{
                data: [124, 67, 43, 58],
                backgroundColor: ["#00d4ff", "#0099bb", "#ffb830", "#00ff9d"],
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
                    labels: { 
                        font: { size: 12 }, 
                        padding: 16,
                        color: document.body.classList.contains('dark-mode') ? '#e8f4ff' : '#0d1f38'
                    }
                },
                tooltip: {
                    backgroundColor: document.body.classList.contains('dark-mode') ? '#0f172a' : '#ffffff',
                    titleColor: document.body.classList.contains('dark-mode') ? '#e8f4ff' : '#0d1f38',
                    bodyColor: document.body.classList.contains('dark-mode') ? '#94a3b8' : '#6b7a8d',
                    padding: 12,
                    cornerRadius: 8,
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
    initDarkMode();
    renderNotifications();
    renderOrders();
    initDashboardCharts();
    
    // Force update analytics stats immediately for testing
    updateAnalyticsStats();
    
    // Only initialize analytics charts if analytics page is active
    if (document.getElementById('page-analytics').classList.contains('active')) {
        setTimeout(function() {
            initAnalyticsCharts();
            updateAnalyticsStats();
        }, 150);
    }
}

function populateAnalytics() {
    // Populate stat cards with data
    document.getElementById('totalShipments').textContent = ORDERS.length;
    document.getElementById('avgRiskScore').textContent = 'Low';
    document.getElementById('totalCost').textContent = '$2,847,500';
    document.getElementById('missingDocs').textContent = '12';
    
    // Initialize charts
    initAnalyticsCharts();
}

// Initialize charts when analytics page is opened
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (link.dataset.page === 'analytics') {
            setTimeout(populateAnalytics, 100);
        }
    });
});

function updateAnalyticsStats() {
    populateAnalytics();
}

function calculateAverageRiskScore() {
    const riskScores = ORDERS.map(o => {
        if (o.tempStatus === 'Excursion') return 3;
        if (o.tempStatus === 'Warning') return 2;
        return 1;
    });
    const average = riskScores.reduce((a, b) => a + b, 0) / riskScores.length;
    if (average >= 2.5) return 'High';
    if (average >= 1.5) return 'Medium';
    return 'Low';
}

document.addEventListener('DOMContentLoaded', init);

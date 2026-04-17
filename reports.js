// Chart.js Configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#6b7280';

// Sample Data Store
const reportData = {
    daily: {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        sales: [1200, 800, 1500, 4500, 6200, 5800, 7200, 4100],
        orders: [5, 3, 8, 22, 31, 28, 35, 19],
        profit: [400, 250, 500, 1500, 2100, 1950, 2400, 1380]
    },
    weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        sales: [12500, 18900, 21000, 17500, 24500, 32000, 28900],
        orders: [52, 78, 89, 72, 98, 135, 118],
        profit: [4200, 6350, 7050, 5880, 8220, 10740, 9700]
    },
    monthly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        sales: [85000, 123000, 156000, 142000],
        orders: [342, 498, 625, 571],
        profit: [28500, 41250, 52300, 47600]
    },
    yearly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        sales: [450000, 520000, 480000, 610000, 580000, 720000, 680000, 750000, 820000, 790000, 910000, 950000],
        orders: [1800, 2080, 1920, 2440, 2320, 2880, 2720, 3000, 3280, 3160, 3640, 3800],
        profit: [150000, 173500, 160000, 203500, 193500, 240000, 226500, 250000, 273500, 263500, 303500, 317000]
    }
};

const categoryData = {
    labels: ['Smartphones', 'Accessories', 'Tablets', 'Chargers'],
    values: [65, 20, 10, 5],
    colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f97316']
};

const paymentData = {
    labels: ['Cash', 'Mobile Money', 'Bank Transfer', 'Card'],
    values: [45, 35, 15, 5],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
};

const cashierData = {
    labels: ['John Doe', 'Jane Smith', 'EL Lhord', 'Mike Johnson', 'Sarah Williams'],
    values: [125000, 98000, 87000, 72000, 65000],
    colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#14b8a6']
};

// Chart Instances
let salesTrendChart, categoryChart, paymentChart, dailySalesChart, cashierChart;

// Initialize All Charts
function initAllCharts(period = 'monthly') {
    initSalesTrendChart(period);
    initCategoryChart();
    initPaymentChart();
    initDailySalesChart();
    initCashierChart();
}

// Sales Trend Chart
function initSalesTrendChart(period = 'monthly') {
    const ctx = document.getElementById('salesTrendChart').getContext('2d');
    const data = reportData[period];
    
    if (salesTrendChart) {
        salesTrendChart.destroy();
    }
    
    salesTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Sales (GH₵)',
                data: data.sales,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1f2937',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: (context) => 'GH₵ ' + context.parsed.y.toLocaleString()
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        callback: (value) => 'GH₵ ' + (value / 1000).toFixed(0) + 'K'
                    }
                },
                x: { grid: { display: false } }
            },
            interaction: { intersect: false, mode: 'index' }
        }
    });
}

// Category Chart
function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.values,
                backgroundColor: categoryData.colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 15, usePointStyle: true, pointStyle: 'circle' }
                },
                tooltip: {
                    backgroundColor: '#1f2937',
                    callbacks: {
                        label: (context) => context.label + ': ' + context.parsed + '%'
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// Payment Chart
function initPaymentChart() {
    const ctx = document.getElementById('paymentChart').getContext('2d');
    
    if (paymentChart) {
        paymentChart.destroy();
    }
    
    paymentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: paymentData.labels,
            datasets: [{
                data: paymentData.values,
                backgroundColor: paymentData.colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 15, usePointStyle: true, pointStyle: 'circle' }
                },
                tooltip: {
                    backgroundColor: '#1f2937',
                    callbacks: {
                        label: (context) => context.label + ': ' + context.parsed + '%'
                    }
                }
            }
        }
    });
}

// Daily Sales Bar Chart
function initDailySalesChart() {
    const ctx = document.getElementById('dailySalesChart').getContext('2d');
    
    if (dailySalesChart) {
        dailySalesChart.destroy();
    }
    
    dailySalesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Sales',
                data: [12500, 18900, 21000, 17500, 24500, 32000, 28900],
                backgroundColor: '#3b82f6',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1f2937',
                    callbacks: {
                        label: (context) => 'GH₵ ' + context.parsed.y.toLocaleString()
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        callback: (value) => 'GH₵ ' + (value / 1000).toFixed(0) + 'K'
                    }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

// Cashier Performance Chart
function initCashierChart() {
    const ctx = document.getElementById('cashierChart').getContext('2d');
    
    if (cashierChart) {
        cashierChart.destroy();
    }
    
    cashierChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cashierData.labels,
            datasets: [{
                label: 'Revenue',
                data: cashierData.values,
                backgroundColor: cashierData.colors,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1f2937',
                    callbacks: {
                        label: (context) => 'GH₵ ' + context.parsed.y.toLocaleString()
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        callback: (value) => 'GH₵ ' + (value / 1000).toFixed(0) + 'K'
                    }
                },
                y: { grid: { display: false } }
            }
        }
    });
}

// Sample Transaction Data
const transactionData = [
    { receipt: 'RCP-001', date: 'Feb 15, 2026 10:30 AM', cashier: 'John Doe', category: 'Smartphones', payment: 'Cash', items: 3, subtotal: 1190, tax: 60, total: 1250, status: 'completed' },
    { receipt: 'RCP-002', date: 'Feb 15, 2026 09:45 AM', cashier: 'Jane Smith', category: 'Accessories', payment: 'Mobile Money', items: 2, subtotal: 810, tax: 40, total: 850, status: 'completed' },
    { receipt: 'RCP-003', date: 'Feb 15, 2026 08:20 AM', cashier: 'John Doe', category: 'Tablets', payment: 'Bank', items: 1, subtotal: 430, tax: 20, total: 450, status: 'completed' },
    { receipt: 'RCP-004', date: 'Feb 14, 2026 16:15 PM', cashier: 'EL Lhord', category: 'Smartphones', payment: 'Card', items: 2, subtotal: 2380, tax: 120, total: 2500, status: 'completed' },
    { receipt: 'RCP-005', date: 'Feb 14, 2026 14:30 PM', cashier: 'Jane Smith', category: 'Chargers', payment: 'Cash', items: 5, subtotal: 950, tax: 50, total: 1000, status: 'completed' },
    { receipt: 'RCP-006', date: 'Feb 14, 2026 11:00 AM', cashier: 'Mike Johnson', category: 'Accessories', payment: 'Mobile Money', items: 3, subtotal: 1425, tax: 75, total: 1500, status: 'pending' },
    { receipt: 'RCP-007', date: 'Feb 13, 2026 17:45 PM', cashier: 'John Doe', category: 'Smartphones', payment: 'Bank', items: 1, subtotal: 4750, tax: 250, total: 5000, status: 'completed' },
    { receipt: 'RCP-008', date: 'Feb 13, 2026 13:20 PM', cashier: 'Sarah Williams', category: 'Tablets', payment: 'Cash', items: 2, subtotal: 2850, tax: 150, total: 3000, status: 'refunded' },
    { receipt: 'RCP-009', date: 'Feb 13, 2026 10:00 AM', cashier: 'EL Lhord', category: 'Accessories', payment: 'Card', items: 4, subtotal: 1900, tax: 100, total: 2000, status: 'completed' },
    { receipt: 'RCP-010', date: 'Feb 12, 2026 15:30 PM', cashier: 'Jane Smith', category: 'Smartphones', payment: 'Mobile Money', items: 1, subtotal: 9500, tax: 500, total: 10000, status: 'completed' }
];

// Populate Table
function populateTable(data = transactionData) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.receipt}</td>
            <td>${row.date}</td>
            <td>${row.cashier}</td>
            <td>${row.category}</td>
            <td>${row.payment}</td>
            <td>${row.items}</td>
            <td>GH₵ ${row.subtotal.toLocaleString()}</td>
            <td>GH₵ ${row.tax.toLocaleString()}</td>
            <td><strong>GH₵ ${row.total.toLocaleString()}</strong></td>
            <td><span class="status-badge ${row.status}">${row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span></td>
        `;
        tbody.appendChild(tr);
    });
    
    document.getElementById('showingInfo').textContent = `Showing 1 to ${data.length} of ${data.length} entries`;
}

// Update Summary Stats
function updateStats(period) {
    const stats = {
        daily: { revenue: 45250, orders: 12, avg: 204.17, profit: 12580 },
        weekly: { revenue: 155300, orders: 572, avg: 271.50, profit: 42140 },
        monthly: { revenue: 506000, orders: 2036, avg: 248.53, profit: 169650 },
        yearly: { revenue: 7730000, orders: 30040, avg: 257.32, profit: 2575000 }
    };
    
    const s = stats[period] || stats.monthly;
    document.getElementById('totalRevenue').textContent = `GH₵ ${s.revenue.toLocaleString()}.00`;
    document.getElementById('totalOrders').textContent = s.orders.toLocaleString();
    document.getElementById('avgOrderValue').textContent = `GH₵ ${s.avg.toLocaleString()}`;
    document.getElementById('totalProfit').textContent = `GH₵ ${s.profit.toLocaleString()}.00`;
}

// Update Summary Section
function updateSummary() {
    const reportType = document.getElementById('reportType').value;
    const timePeriod = document.getElementById('timePeriod').value;
    const category = document.getElementById('category').value;
    
    const now = new Date();
    document.getElementById('generatedDate').textContent = now.toLocaleString();
    document.getElementById('summaryReportType').textContent = document.getElementById('reportType').options[document.getElementById('reportType').selectedIndex].text;
    document.getElementById('summaryTimePeriod').textContent = document.getElementById('timePeriod').options[document.getElementById('timePeriod').selectedIndex].text;
    document.getElementById('summaryCategory').textContent = document.getElementById('category').options[document.getElementById('category').selectedIndex].text;
    
    // Date range
    let dateRange = '';
    if (timePeriod === 'daily') {
        dateRange = now.toLocaleDateString();
    } else if (timePeriod === 'weekly') {
        dateRange = 'Last 7 Days';
    } else if (timePeriod === 'monthly') {
        dateRange = now.toLocaleString('default', { month: 'long', year: 'numeric' });
    } else if (timePeriod === 'yearly') {
        dateRange = now.getFullYear().toString();
    }
    document.getElementById('reportDateRange').textContent = dateRange;
}

// Export to PDF
function exportToPDF() {
    const element = document.getElementById('reportContent');
    const opt = {
        margin: 0.5,
        filename: `Prime_Accessories_Report_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    
    // Show loading state
    const btn = document.getElementById('exportPdfBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;
    
    html2pdf().set(opt).from(element).save().then(() => {
        showToast('PDF exported successfully!', 'success');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }).catch(() => {
        showToast('Failed to export PDF', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

// Export to CSV
function exportToCSV() {
    let csv = 'Receipt#,Date & Time,Cashier,Category,Payment Method,Items,Subtotal,Tax,Total,Status\n';
    transactionData.forEach(row => {
        csv += `${row.receipt},${row.date},${row.cashier},${row.category},${row.payment},${row.items},${row.subtotal},${row.tax},${row.total},${row.status}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Prime_Accessories_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('CSV exported successfully!', 'success');
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Filter Functionality
function applyFilters() {
    const reportType = document.getElementById('reportType').value;
    const timePeriod = document.getElementById('timePeriod').value;
    const category = document.getElementById('category').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const status = document.getElementById('status').value;
    
    // Show loading state
    document.getElementById('reportContent').classList.add('loading');
    
    setTimeout(() => {
        // Update charts based on time period
        initAllCharts(timePeriod);
        
        // Update stats
        updateStats(timePeriod);
        
        // Update summary
        updateSummary();
        
        // Filter table data (simplified - in production, fetch from API)
        let filteredData = transactionData;
        if (category !== 'all') {
            filteredData = filteredData.filter(row => row.category.toLowerCase().includes(category));
        }
        if (status !== 'all') {
            filteredData = filteredData.filter(row => row.status === status);
        }
        
        populateTable(filteredData);
        
        // Remove loading state
        document.getElementById('reportContent').classList.remove('loading');
        
        showToast('Report generated successfully!', 'success');
    }, 500);
}

// Clear Filters
function clearFilters() {
    document.getElementById('reportType').value = 'sales';
    document.getElementById('timePeriod').value = 'monthly';
    document.getElementById('category').value = 'all';
    document.getElementById('paymentMethod').value = 'all';
    document.getElementById('status').value = 'all';
    document.getElementById('fromDateGroup').style.display = 'none';
    document.getElementById('toDateGroup').style.display = 'none';
    
    applyFilters();
    showToast('Filters cleared!', 'success');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initAllCharts('monthly');
    
    // Populate table
    populateTable();
    
    // Update summary
    updateSummary();
    
    // Time Period Change - Show/Hide Date Inputs
    document.getElementById('timePeriod').addEventListener('change', function() {
        const showCustom = this.value === 'custom';
        document.getElementById('fromDateGroup').style.display = showCustom ? 'flex' : 'none';
        document.getElementById('toDateGroup').style.display = showCustom ? 'flex' : 'none';
    });
    
    // Generate Report Button
    document.getElementById('generateReport').addEventListener('click', applyFilters);
    
    // Reset Filters Button
    document.getElementById('resetFilters').addEventListener('click', clearFilters);
    
    // Clear All Filters Button
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    
    // Chart Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const chartType = this.dataset.chart;
            // In production, you would update the chart data based on chartType
            showToast(`Switched to ${chartType} view`, 'success');
        });
    });
    
    // Export PDF Button
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
    
    // Print Button
    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });
    
    // Export CSV Button
    document.getElementById('exportCsv').addEventListener('click', exportToCSV);
    
    // Set default dates for custom range
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    document.getElementById('fromDate').value = lastMonth.toISOString().split('T')[0];
    document.getElementById('toDate').value = today.toISOString().split('T')[0];
});
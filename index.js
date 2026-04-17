// Chart.js Configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#6b7280';

// Sample Data for Different Periods
const chartData = {
    week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        sales: [1250, 1890, 2100, 1750, 2450, 3200, 2890],
        revenue: [12500, 18900, 21000, 17500, 24500, 32000, 28900]
    },
    month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        sales: [8500, 12300, 15600, 14200],
        revenue: [85000, 123000, 156000, 142000]
    },
    year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        sales: [45000, 52000, 48000, 61000, 58000, 72000, 68000, 75000, 82000, 79000, 91000, 95000],
        revenue: [450000, 520000, 480000, 610000, 580000, 720000, 680000, 750000, 820000, 790000, 910000, 950000]
    }
};

// Category Data for Pie Chart
const categoryData = {
    labels: ['Smartphones', 'Accessories', 'Tablets', 'Chargers'],
    values: [65, 20, 10, 5],
    colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f97316']
};

// Payment Method Data
const paymentData = {
    labels: ['Cash', 'Mobile Money', 'Bank Transfer', 'Card'],
    values: [45, 35, 15, 5],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
};

// Main Sales Chart
let salesChart;

function initSalesChart(period = 'week') {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const data = chartData[period];
    
    if (salesChart) {
        salesChart.destroy();
    }
    
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Sales (GH₵)',
                data: data.revenue,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1f2937',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'GH₵ ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'GH₵ ' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Category Pie Chart
function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    new Chart(ctx, {
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
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1f2937',
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Payment Method Pie Chart
function initPaymentChart() {
    const ctx = document.getElementById('paymentChart').getContext('2d');
    
    new Chart(ctx, {
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
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1f2937',
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initSalesChart('week');
    initCategoryChart();
    initPaymentChart();
    
    // Tab button click handlers
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Get period and reinitialize chart
            const period = this.dataset.period;
            initSalesChart(period);
        });
    });
});
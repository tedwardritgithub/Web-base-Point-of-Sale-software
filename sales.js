// Sample sales data
const salesData = [
    { id: 'RCP-001', date: '2026-02-15 10:30', cashier: 'John Doe', payment: 'Cash', items: 3, total: 1250.00, status: 'completed' },
    { id: 'RCP-002', date: '2026-02-15 09:45', cashier: 'Jane Smith', payment: 'MTN MoMo', items: 2, total: 850.00, status: 'completed' },
    { id: 'RCP-003', date: '2026-02-15 08:20', cashier: 'John Doe', payment: 'Bank', items: 1, total: 450.00, status: 'completed' }
];

// Export to CSV
function exportToCSV() {
    const headers = ['Receipt #', 'Date & Time', 'Cashier', 'Payment Method', 'Items', 'Total', 'Status'];
    const rows = salesData.map(sale => [
        sale.id,
        sale.date,
        sale.cashier,
        sale.payment,
        sale.items,
        `GH₵ ${sale.total.toFixed(2)}`,
        sale.status
    ]);
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Sales data exported successfully!', 'success');
}

// Print sales page
function printSales() {
    window.print();
    showToast('Print dialog opened', 'success');
}

// View sale details
function viewSale(receiptId) {
    document.getElementById('modalReceiptNumber').textContent = receiptId;
    document.getElementById('detailReceiptNumber').textContent = receiptId;
    document.getElementById('viewSaleModal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('viewSaleModal').classList.remove('active');
}

// Print modal receipt
function printModalReceipt() {
    const receiptNumber = document.getElementById('modalReceiptNumber').textContent;
    window.print();
    showToast(`Receipt ${receiptNumber} printed`, 'success');
}

// Print individual sale
function printSale(receiptId) {
    viewSale(receiptId);
    setTimeout(() => {
        window.print();
    }, 300);
}

// Toggle select all
function toggleSelectAll() {
    const selectAll = document.querySelector('.select-all');
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
}

// Apply filters
function applyFilters() {
    const search = document.getElementById('searchInput').value;
    const dateRange = document.getElementById('dateRange').value;
    const payment = document.getElementById('paymentMethod').value;
    const status = document.getElementById('status').value;
    
    showToast('Filters applied successfully', 'success');
}

// Clear filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('dateRange').value = 'today';
    document.getElementById('paymentMethod').value = 'all';
    document.getElementById('status').value = 'all';
    
    showToast('Filters cleared', 'success');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toast.className = 'toast';
    if (type === 'error') {
        toast.classList.add('error');
    }
    
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('viewSaleModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add animation on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
        }
    });
});
// Product data
let products = [
    { id: 1, name: 'iPhone 15 Pro', sku: 'SKU-001', category: 'smartphones', brand: 'apple', price: 12500.00, quantity: 25, boxes: 5, perBox: 5, reorderLevel: 10, description: '256GB - Natural Titanium' },
    { id: 2, name: 'Samsung Galaxy S24', sku: 'SKU-002', category: 'smartphones', brand: 'samsung', price: 10200.00, quantity: 8, boxes: 2, perBox: 4, reorderLevel: 10, description: '512GB - Phantom Black' },
    { id: 3, name: 'AirPods Pro 2', sku: 'SKU-003', category: 'accessories', brand: 'apple', price: 2800.00, quantity: 0, boxes: 0, perBox: 10, reorderLevel: 15, description: 'With MagSafe Case' },
    { id: 4, name: 'iPad Air 5', sku: 'SKU-004', category: 'tablets', brand: 'apple', price: 6500.00, quantity: 18, boxes: 3, perBox: 6, reorderLevel: 8, description: '64GB - Space Gray' },
    { id: 5, name: 'Xiaomi Redmi Note 13', sku: 'SKU-005', category: 'smartphones', brand: 'xiaomi', price: 3200.00, quantity: 32, boxes: 8, perBox: 4, reorderLevel: 12, description: '128GB - Midnight Black' }
];

// Utility function
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let categories = [
    { id: 'CAT-001', name: 'Smartphones', description: 'Mobile phones & devices', createdAt: '2026-01-10' },
    { id: 'CAT-002', name: 'Accessories', description: 'Phone accessories', createdAt: '2026-01-10' },
    { id: 'CAT-003', name: 'Tablets', description: 'Tablet devices', createdAt: '2026-01-15' }
];

let brands = [
    { id: 'BRD-001', name: 'Apple', description: 'Apple Inc. products', createdAt: '2026-01-10' },
    { id: 'BRD-002', name: 'Samsung', description: 'Samsung Electronics', createdAt: '2026-01-10' },
    { id: 'BRD-003', name: 'Xiaomi', description: 'Xiaomi Corporation', createdAt: '2026-01-12' }
];

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderProducts();
    updateStats();
});

// Load data from localStorage
function loadData() {
    const savedProducts = localStorage.getItem('products');
    const savedCategories = localStorage.getItem('categories');
    const savedBrands = localStorage.getItem('brands');
    
    if (savedProducts) products = JSON.parse(savedProducts);
    if (savedCategories) categories = JSON.parse(savedCategories);
    if (savedBrands) brands = JSON.parse(savedBrands);
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('brands', JSON.stringify(brands));
}

// Render products table
function renderProducts(filteredProducts = products) {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const status = getStatus(product.quantity, product.reorderLevel);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${product.name}</strong><br>
                <small style="color: var(--text-light);">${product.description || ''}</small>
            </td>
            <td>${product.sku}</td>
            <td>${product.category}</td>
            <td>${product.brand}</td>
            <td>GH₵ ${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
            <td>${product.quantity}</td>
            <td>${product.boxes || 0}</td>
            <td>${product.perBox || 0}</td>
            <td>${product.reorderLevel}</td>
            <td><span class="status-badge ${status}">${status.replace('-', ' ')}</span></td>
            <td>
                <button class="btn-icon" onclick="editProduct(${product.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteProduct(${product.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    updateShowingInfo(filteredProducts.length);
}

// Render view products table
function renderViewProducts() {
    const tbody = document.getElementById('viewProductsTableBody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const status = getStatus(product.quantity, product.reorderLevel);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${product.name}</strong></td>
            <td>${product.sku}</td>
            <td>${product.category}</td>
            <td>${product.brand}</td>
            <td>GH₵ ${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
            <td>${product.quantity}</td>
            <td><span class="status-badge ${status}">${status.replace('-', ' ')}</span></td>
            <td>
                <button class="btn-icon" onclick="openEditModal(${product.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteProduct(${product.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Get stock status
function getStatus(quantity, reorderLevel) {
    if (quantity === 0) return 'out-stock';
    if (quantity <= reorderLevel) return 'low-stock';
    return 'in-stock';
}

// Update stats
function updateStats() {
    const total = products.length;
    const inStock = products.filter(p => p.quantity > p.reorderLevel).length;
    const lowStock = products.filter(p => p.quantity <= p.reorderLevel && p.quantity > 0).length;
    const outOfStock = products.filter(p => p.quantity === 0).length;
    
    document.getElementById('totalProducts').textContent = total;
    document.getElementById('inStockProducts').textContent = inStock;
    document.getElementById('lowStockProducts').textContent = lowStock;
    document.getElementById('outOfStockProducts').textContent = outOfStock;
}

// Update showing info
function updateShowingInfo(count) {
    document.getElementById('showingInfo').textContent = `Showing 1 to ${count} of ${count} entries`;
}

// Filter products
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const brand = document.getElementById('brandFilter').value;
    const status = document.getElementById('statusFilter').value;
    
    let filtered = products;
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (brand !== 'all') {
        filtered = filtered.filter(p => p.brand === brand);
    }
    
    if (status !== 'all') {
        filtered = filtered.filter(p => getStatus(p.quantity, p.reorderLevel) === status);
    }
    
    renderProducts(filtered);
}

// Modal functions
function openAddModal() {
    document.getElementById('addProductModal').classList.add('active');
}

function closeAddModal() {
    document.getElementById('addProductModal').classList.remove('active');
    document.getElementById('addProductForm').reset();
}

function openViewModal() {
    renderViewProducts();
    document.getElementById('viewProductsModal').classList.add('active');
}

function closeViewModal() {
    document.getElementById('viewProductsModal').classList.remove('active');
}

function openEditModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductSKU').value = product.sku;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductBrand').value = product.brand;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductQuantity').value = product.quantity;
    document.getElementById('editProductBoxes').value = product.boxes || 0;
    document.getElementById('editProductPerBox').value = product.perBox || 0;
    document.getElementById('editProductReorderLevel').value = product.reorderLevel;
    document.getElementById('editProductDescription').value = product.description || '';
    
    document.getElementById('editProductModal').classList.add('active');
}

function closeEditModal() {
    document.getElementById('editProductModal').classList.remove('active');
}

function openCategoryModal() {
    document.getElementById('addCategoryModal').classList.add('active');
}

function closeCategoryModal() {
    document.getElementById('addCategoryModal').classList.remove('active');
    document.getElementById('addCategoryForm').reset();
}

function openBrandModal() {
    document.getElementById('addBrandModal').classList.add('active');
}

function closeBrandModal() {
    document.getElementById('addBrandModal').classList.remove('active');
    document.getElementById('addBrandForm').reset();
}

// Save product
function saveProduct() {
    const name = document.getElementById('productName').value.trim();
    const sku = document.getElementById('productSKU').value.trim();
    const category = document.getElementById('productCategory').value;
    const brand = document.getElementById('productBrand').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const boxes = parseInt(document.getElementById('productBoxes').value) || 0;
    const perBox = parseInt(document.getElementById('productPerBox').value) || 0;
    const reorderLevel = parseInt(document.getElementById('productReorderLevel').value);
    const description = document.getElementById('productDescription').value.trim();
    
    // Validation
    if (!name || !sku || !category || !brand || isNaN(price) || isNaN(quantity) || isNaN(reorderLevel)) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check for duplicate SKU
    if (products.some(p => p.sku === sku)) {
        alert('SKU already exists. Please use a unique SKU.');
        return;
    }
    
    const newProduct = {
        id: Date.now(),
        name,
        sku,
        category,
        brand,
        price,
        quantity,
        boxes,
        perBox,
        reorderLevel,
        description
    };
    
    products.push(newProduct);
    saveData();
    renderProducts();
    updateStats();
    closeAddModal();
    
    alert('Product added successfully! Stock updated automatically.');
}

// Update product
function updateProduct() {
    const id = parseInt(document.getElementById('editProductId').value);
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const name = document.getElementById('editProductName').value.trim();
    const sku = document.getElementById('editProductSKU').value.trim();
    const category = document.getElementById('editProductCategory').value;
    const brand = document.getElementById('editProductBrand').value;
    const price = parseFloat(document.getElementById('editProductPrice').value);
    const quantity = parseInt(document.getElementById('editProductQuantity').value);
    const boxes = parseInt(document.getElementById('editProductBoxes').value) || 0;
    const perBox = parseInt(document.getElementById('editProductPerBox').value) || 0;
    const reorderLevel = parseInt(document.getElementById('editProductReorderLevel').value);
    const description = document.getElementById('editProductDescription').value.trim();
    
    // Validation
    if (!name || !sku || !category || !brand || isNaN(price) || isNaN(quantity) || isNaN(reorderLevel)) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check for duplicate SKU (excluding current product)
    if (products.some(p => p.sku === sku && p.id !== id)) {
        alert('SKU already exists. Please use a unique SKU.');
        return;
    }
    
// Update product
function updateProduct() {
    const id = parseInt(document.getElementById('editProductId').value);
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const name = document.getElementById('editProductName').value.trim();
    const sku = document.getElementById('editProductSKU').value.trim();
    const category = document.getElementById('editProductCategory').value;
    const brand = document.getElementById('editProductBrand').value;
    const price = parseFloat(document.getElementById('editProductPrice').value);
    const quantity = parseInt(document.getElementById('editProductQuantity').value);
    const boxes = parseInt(document.getElementById('editProductBoxes').value) || 0;
    const perBox = parseInt(document.getElementById('editProductPerBox').value) || 0;
    const reorderLevel = parseInt(document.getElementById('editProductReorderLevel').value);
    const description = document.getElementById('editProductDescription').value.trim();
    
    // Validation
    if (!name || !sku || !category || !brand || isNaN(price) || isNaN(quantity) || isNaN(reorderLevel)) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check for duplicate SKU (excluding current product)
    if (products.some(p => p.sku === sku && p.id !== id)) {
        alert('SKU already exists. Please use a unique SKU.');
        return;
    }
    
    // Update product
    product.name = name;
    product.sku = sku;
    product.category = category;
    product.brand = brand;
    product.price = price;
    product.quantity = quantity;
    product.boxes = boxes;
    product.perBox = perBox;
    product.reorderLevel = reorderLevel;
    product.description = description;
    
    saveData();
    renderProducts();
    updateStats();
    closeEditModal();
    
    // Send update to backend
    fetch('/store/api/update_inventory/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            product_id: id,
            stock: quantity
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product updated successfully! Stock updated in database.');
        } else {
            alert('Error updating database: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update database. Please try again.');
    });
}
}

// Edit product (from main table)
function editProduct(id) {
    openEditModal(id);
}

// Delete product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        saveData();
        renderProducts();
        updateStats();
        
        alert('Product deleted successfully!');
    }
}

// Save category
function saveCategory() {
    const name = document.getElementById('categoryName').value.trim();
    const description = document.getElementById('categoryDescription').value.trim();
    
    if (!name) {
        alert('Please enter category name');
        return;
    }
    
    const newCategory = {
        id: 'CAT-' + String(categories.length + 1).padStart(3, '0'),
        name,
        description,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    categories.push(newCategory);
    saveData();
    closeCategoryModal();
    
    alert('Category added successfully!');
}

// Save brand
function saveBrand() {
    const name = document.getElementById('brandName').value.trim();
    const description = document.getElementById('brandDescription').value.trim();
    
    if (!name) {
        alert('Please enter brand name');
        return;
    }
    
    const newBrand = {
        id: 'BRD-' + String(brands.length + 1).padStart(3, '0'),
        name,
        description,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    brands.push(newBrand);
    saveData();
    closeBrandModal();
    
    alert('Brand added successfully!');
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
}
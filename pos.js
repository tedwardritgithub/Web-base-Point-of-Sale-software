// ==================== UTILITY FUNCTIONS ====================
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

const csrftoken = getCookie('csrftoken');

// ==================== PRODUCT DATA (80 Products - 20 per Brand) ====================
let products = [
    // ==================== APPLE PRODUCTS (20) ====================
    // Apple Smartphones (8)
    { id: 1, name: 'iPhone 14 Pro Max', description: '256GB - Natural Titanium', price: 12500.00, sku: 'APL-SP-001', category: 'smartphones', brand: 'apple', stock: 25, stockStatus: 'in-stock', image: '/media/iphone 12 promax.webp' },
    { id: 2, name: 'iPhone 15 Pro Max', description: '512GB - Blue Titanium', price: 15000.00, sku: 'APL-SP-002', category: 'smartphones', brand: 'apple', stock: 18, stockStatus: 'in-stock', image: '/media/apple-iphone-15-pro-max-1.jpg' },
    { id: 3, name: 'iPhone 16 Pro Max', description: '128GB - Pink', price: 9500.00, sku: 'APL-SP-003', category: 'smartphones', brand: 'apple', stock: 32, stockStatus: 'in-stock', image: '/media/iphone 16 promax.png' },
    { id: 4, name: 'iPhone 16 ', description: '256GB - Green', price: 11000.00, sku: 'APL-SP-004', category: 'smartphones', brand: 'apple', stock: 22, stockStatus: 'in-stock', image: '/media/iPhone 16 green.jpg' },
    { id: 5, name: 'iPhone 13 ', description: '256GB - Deep Purple', price: 10500.00, sku: 'APL-SP-005', category: 'smartphones', brand: 'apple', stock: 15, stockStatus: 'in-stock', image: '/media/iPhone-13-Green.jpg' },
    { id: 6, name: 'iPhone 15 Pro', description: '128GB - Midnight', price: 8500.00, sku: 'APL-SP-006', category: 'smartphones', brand: 'apple', stock: 28, stockStatus: 'in-stock', image: '/media/iphone15pro-gray.jpg' },
    { id: 7, name: 'iPhone 13 Pro Max', description: '256GB - Starlight', price: 7300.00, sku: 'APL-SP-007', category: 'smartphones', brand: 'apple', stock: 8, stockStatus: 'low-stock', image: '/media/img4.jpg' },
    { id: 8, name: 'iPhone 12 Pro Max (2024)', description: '128GB - Red', price: 5500.00, sku: 'APL-SP-008', category: 'smartphones', brand: 'apple', stock: 0, stockStatus: 'out-stock', image: '/media/iphone 12 promax.webp' },
    
    // Apple Tablets (4)
    { id: 9, name: 'iPad Pro 12.9"', description: '512GB - Space Gray', price: 14500.00, sku: 'APL-TB-001', category: 'tablets', brand: 'apple', stock: 12, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 10, name: 'iPad Pro 11"', description: '256GB - Silver', price: 11000.00, sku: 'APL-TB-002', category: 'tablets', brand: 'apple', stock: 16, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 11, name: 'iPad Air 5', description: '64GB - Purple', price: 6500.00, sku: 'APL-TB-003', category: 'tablets', brand: 'apple', stock: 24, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 12, name: 'iPad Mini 6', description: '256GB - Starlight', price: 5800.00, sku: 'APL-TB-004', category: 'tablets', brand: 'apple', stock: 5, stockStatus: 'low-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    
    // Apple Accessories (5)
    { id: 13, name: 'AirPods Pro 2', description: 'With MagSafe Case', price: 2800.00, sku: 'APL-AC-001', category: 'accessories', brand: 'apple', stock: 45, stockStatus: 'in-stock', image: '/media/apple-airpod.jpg' },
    { id: 14, name: 'AirPods 3', description: 'Lightning Charging Case', price: 2100.00, sku: 'APL-AC-002', category: 'accessories', brand: 'apple', stock: 38, stockStatus: 'in-stock', image: '/media/pro-2.webp' },
    { id: 15, name: 'AirPods Max', description: 'Space Gray', price: 6500.00, sku: 'APL-AC-003', category: 'accessories', brand: 'apple', stock: 8, stockStatus: 'low-stock', image: '/media/img2.jpg' },
    { id: 16, name: 'Apple Watch Series 9', description: '45mm - Midnight', price: 5200.00, sku: 'APL-AC-004', category: 'accessories', brand: 'apple', stock: 20, stockStatus: 'in-stock', image: '/media/4054t-hero-zoom.png' },
    { id: 17, name: 'Apple Watch Ultra 2', description: '49mm - Titanium', price: 9500.00, sku: 'APL-AC-005', category: 'accessories', brand: 'apple', stock: 6, stockStatus: 'low-stock', image: '/media/charger.jpg' },
    
    // Apple Chargers (3)
    { id: 18, name: '20W USB-C Charger', description: 'Fast Power Adapter', price: 250.00, sku: 'APL-CH-001', category: 'chargers', brand: 'apple', stock: 150, stockStatus: 'in-stock', image: '/media/s-l1200 (1).jpg' },
    { id: 19, name: 'MagSafe Charger', description: 'Wireless Charger', price: 650.00, sku: 'APL-CH-002', category: 'chargers', brand: 'apple', stock: 65, stockStatus: 'in-stock', image: '/media/wireless Iphone charger.jpg' },
    { id: 20, name: 'USB-C to Lightning', description: '1m Cable', price: 350.00, sku: 'APL-CH-003', category: 'chargers', brand: 'apple', stock: 120, stockStatus: 'in-stock', image: '/media/1.jpg' },
    
    // ==================== SAMSUNG PRODUCTS (20) ====================
    // Samsung Smartphones (8)
    { id: 21, name: 'Galaxy S22 Ultra', description: '512GB - Titanium Gray', price: 13500.00, sku: 'SAM-SP-001', category: 'smartphones', brand: 'samsung', stock: 22, stockStatus: 'in-stock', image: '/media/S22 ultra.jpg' },
    { id: 22, name: 'Galaxy S25 fe', description: '256GB - Onyx Black', price: 11000.00, sku: 'SAM-SP-002', category: 'smartphones', brand: 'samsung', stock: 28, stockStatus: 'in-stock', image: '/media/SAMSUNG-galaxy-s25fe-black.webp' },
    { id: 23, name: 'Galaxy S24 Ultra', description: '128GB - Marble Gray', price: 9500.00, sku: 'SAM-SP-003', category: 'smartphones', brand: 'samsung', stock: 35, stockStatus: 'in-stock', image: '/media/S24-ultra.jpg' },
    { id: 24, name: 'Galaxy A15', description: '512GB - Phantom Black', price: 18000.00, sku: 'SAM-SP-004', category: 'smartphones', brand: 'samsung', stock: 8, stockStatus: 'low-stock', image: '/media/Samsung A14.jpg' },
    { id: 25, name: 'Galaxy S23 Ultra', description: '256GB - Lavender', price: 11500.00, sku: 'SAM-SP-005', category: 'smartphones', brand: 'samsung', stock: 15, stockStatus: 'in-stock', image: '/media/Samsung S22 Ultra.png' },
    { id: 26, name: 'Galaxy S25 Ultra', description: '256GB - Green', price: 11000.00, sku: 'SAM-SP-006', category: 'smartphones', brand: 'samsung', stock: 18, stockStatus: 'in-stock', image: '/media/S25 Ultra.webp' },
    { id: 27, name: 'Galaxy A54 5G', description: '128GB - Awesome Violet', price: 4500.00, sku: 'SAM-SP-007', category: 'smartphones', brand: 'samsung', stock: 42, stockStatus: 'in-stock', image: '/media/samsung-galaxy-a04s.png' },
    { id: 28, name: 'Galaxy A34 5G', description: '128GB - Awesome Lime', price: 3500.00, sku: 'SAM-SP-008', category: 'smartphones', brand: 'samsung', stock: 0, stockStatus: 'out-stock', image: '/media/A12.jpg' },
    
    // Samsung Tablets (4)
    { id: 29, name: 'Galaxy Tab S9 Ultra', description: '512GB - Graphite', price: 13500.00, sku: 'SAM-TB-001', category: 'tablets', brand: 'samsung', stock: 10, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 30, name: 'Galaxy Tab S9+', description: '256GB - Beige', price: 10500.00, sku: 'SAM-TB-002', category: 'tablets', brand: 'samsung', stock: 14, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 31, name: 'Galaxy Tab S9', description: '128GB - Mint', price: 8500.00, sku: 'SAM-TB-003', category: 'tablets', brand: 'samsung', stock: 20, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 32, name: 'Galaxy Tab A9+', description: '64GB - Gray', price: 3200.00, sku: 'SAM-TB-004', category: 'tablets', brand: 'samsung', stock: 30, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    
    // Samsung Accessories (5)
    { id: 33, name: 'Galaxy Buds 2 Pro', description: 'White', price: 2200.00, sku: 'SAM-AC-001', category: 'accessories', brand: 'samsung', stock: 55, stockStatus: 'in-stock', image: '/media/airpods-pro-2022.jpg' },
    { id: 34, name: 'Galaxy Buds FE', description: 'White', price: 1200.00, sku: 'SAM-AC-002', category: 'accessories', brand: 'samsung', stock: 48, stockStatus: 'in-stock', image: '/media/pro-2.webp' },
    { id: 35, name: 'Galaxy Watch 6', description: '44mm - Graphite', price: 3500.00, sku: 'SAM-AC-003', category: 'accessories', brand: 'samsung', stock: 25, stockStatus: 'in-stock', image: '/media/2323091765.jpg' },
    { id: 36, name: 'Galaxy Watch 6 Classic', description: '47mm - Black', price: 4500.00, sku: 'SAM-AC-004', category: 'accessories', brand: 'samsung', stock: 12, stockStatus: 'in-stock', image: '/media/apex-wireless-headphones.png' },
    { id: 37, name: 'Galaxy Buds', description: 'Size 10 - Titanium', price: 4200.00, sku: 'SAM-AC-005', category: 'accessories', brand: 'samsung', stock: 8, stockStatus: 'low-stock', image: '/media/31mgICOF63L._SL500_.jpg' },
    
    // Samsung Chargers (3)
    { id: 38, name: '25W USB-C Charger', description: 'Fast Charging Adapter', price: 280.00, sku: 'SAM-CH-001', category: 'chargers', brand: 'samsung', stock: 100, stockStatus: 'in-stock', image: '/media/Artboard_1.jpg' },
    { id: 39, name: 'Wireless Charger Duo', description: 'Fast Charge 2.0', price: 850.00, sku: 'SAM-CH-002', category: 'chargers', brand: 'samsung', stock: 45, stockStatus: 'in-stock', image: '/media/1.jpg' },
    { id: 40, name: 'USB-C Cable', description: '2m - White', price: 180.00, sku: 'SAM-CH-003', category: 'chargers', brand: 'samsung', stock: 200, stockStatus: 'in-stock', image: '/media/brown-260nw-charger.jpg' },
    
    // ==================== XIAOMI PRODUCTS (20) ====================
    // Xiaomi Smartphones (8)
    { id: 41, name: 'Xiaomi 14 Ultra', description: '512GB - Black', price: 11500.00, sku: 'XIA-SP-001', category: 'smartphones', brand: 'xiaomi', stock: 15, stockStatus: 'in-stock', image: '/media/51Zi49hqs2L._AC_UF350,350_QL80_.jpg' },
    { id: 42, name: 'Xiaomi 14', description: '256GB - Green', price: 8500.00, sku: 'XIA-SP-002', category: 'smartphones', brand: 'xiaomi', stock: 25, stockStatus: 'in-stock', image: '/media/hq720.jpg' },
    { id: 43, name: 'Xiaomi 13T Pro', description: '512GB - Meadow Green', price: 7500.00, sku: 'XIA-SP-003', category: 'smartphones', brand: 'xiaomi', stock: 30, stockStatus: 'in-stock', image: '/media/spark 9.jpg' },
    { id: 44, name: 'Xiaomi 13T', description: '256GB - Alpine Blue', price: 6000.00, sku: 'XIA-SP-004', category: 'smartphones', brand: 'xiaomi', stock: 35, stockStatus: 'in-stock', image: '/media/Tecno-Spark-Go-white.webp' },
    { id: 45, name: 'Redmi Note 13 Pro+', description: '256GB - Midnight Black', price: 4200.00, sku: 'XIA-SP-005', category: 'smartphones', brand: 'xiaomi', stock: 45, stockStatus: 'in-stock', image: '/media/A12.jpg' },
    { id: 46, name: 'Redmi Note 13 Pro', description: '128GB - Aurora Purple', price: 3500.00, sku: 'XIA-SP-006', category: 'smartphones', brand: 'xiaomi', stock: 50, stockStatus: 'in-stock', image: '/media/Pop 9.png' },
    { id: 47, name: 'Redmi Note 13', description: '128GB - Ice Blue', price: 2800.00, sku: 'XIA-SP-007', category: 'smartphones', brand: 'xiaomi', stock: 60, stockStatus: 'in-stock', image: '/media/maxresdefault.jpg' },
    { id: 48, name: 'Redmi 13C', description: '128GB - Starry Black', price: 1800.00, sku: 'XIA-SP-008', category: 'smartphones', brand: 'xiaomi', stock: 3, stockStatus: 'low-stock', image: '/media/spark-20-pro-plus.jpg' },
    
    // Xiaomi Tablets (4)
    { id: 49, name: 'Xiaomi Pad 6', description: '256GB - Mist Blue', price: 5500.00, sku: 'XIA-TB-001', category: 'tablets', brand: 'xiaomi', stock: 18, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 50, name: 'Xiaomi Pad 6 Max', description: '512GB - Gold', price: 7500.00, sku: 'XIA-TB-002', category: 'tablets', brand: 'xiaomi', stock: 10, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 51, name: 'Redmi Pad SE', description: '128GB - Graphite Gray', price: 2800.00, sku: 'XIA-TB-003', category: 'tablets', brand: 'xiaomi', stock: 28, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 52, name: 'Redmi Pad Pro', description: '256GB - Ocean Teal', price: 4200.00, sku: 'XIA-TB-004', category: 'tablets', brand: 'xiaomi', stock: 22, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    
    // Xiaomi Accessories (5)
    { id: 53, name: 'Redmi Buds 4 Pro', description: 'Obsidian Black', price: 950.00, sku: 'XIA-AC-001', category: 'accessories', brand: 'xiaomi', stock: 65, stockStatus: 'in-stock', image: '/media/61uJnjj88TL._AC_UF1000,1000_QL80_.jpg' },
    { id: 54, name: 'Redmi Buds 5', description: 'Ivory White', price: 650.00, sku: 'XIA-AC-002', category: 'accessories', brand: 'xiaomi', stock: 75, stockStatus: 'in-stock', image: '/media/feaec38ecec0a98137c68a49877e1b70 (1).jpg' },
    { id: 55, name: 'Xiaomi Smart Band 8', description: 'Black', price: 550.00, sku: 'XIA-AC-003', category: 'accessories', brand: 'xiaomi', stock: 90, stockStatus: 'in-stock', image: '/media/ee3e4df6ba93d5085497f771019e92ff.jpg' },
    { id: 56, name: 'Xiaomi Watch S3', description: '46mm - Black', price: 2200.00, sku: 'XIA-AC-004', category: 'accessories', brand: 'xiaomi', stock: 20, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    { id: 57, name: 'Xiaomi Watch 2 Pro', description: '46mm - Blue', price: 3200.00, sku: 'XIA-AC-005', category: 'accessories', brand: 'xiaomi', stock: 12, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    
    // Xiaomi Chargers (3)
    { id: 58, name: '67W Turbo Charger', description: 'Fast Charging Adapter', price: 350.00, sku: 'XIA-CH-001', category: 'chargers', brand: 'xiaomi', stock: 85, stockStatus: 'in-stock', image: '/media/EDA001115903.jpg' },
    { id: 59, name: 'Wireless Charging Pad', description: '30W - White', price: 450.00, sku: 'XIA-CH-002', category: 'chargers', brand: 'xiaomi', stock: 55, stockStatus: 'in-stock', image: '/media/img2.jpg' },
    { id: 60, name: 'USB-C Cable', description: '1.5m - Black', price: 120.00, sku: 'XIA-CH-003', category: 'chargers', brand: 'xiaomi', stock: 180, stockStatus: 'in-stock', image: '/media/61YquvtdGrL._AC_UF1000,1000_QL80_.jpg' },
    
    // ==================== TECHNO PRODUCTS (20) ====================
    // Techno Smartphones (8)
    { id: 61, name: 'Techno Camon 40 premier', description: '512GB - Black', price: 9500.00, sku: 'TEC-SP-001', category: 'smartphones', brand: 'techno', stock: 12, stockStatus: 'in-stock', image: '/media/tecno-camon-40-premier-5g.png' },
    { id: 62, name: 'Techno Spark 9 pro', description: '256GB - Starry Black', price: 7500.00, sku: 'TEC-SP-002', category: 'smartphones', brand: 'techno', stock: 18, stockStatus: 'in-stock', image: '/media/TECNO-Spark-9-Pro-Sport-.jpg' },
    { id: 63, name: 'Techno Camon 40 Pro', description: '512GB - Serenity Blue', price: 5500.00, sku: 'TEC-SP-003', category: 'smartphones', brand: 'techno', stock: 25, stockStatus: 'in-stock', image: '/media/tecno_camon_40_pro4.jpg' },
    { id: 64, name: 'Techno Camon 30 Pro', description: '256GB - Vibrant Gold', price: 4200.00, sku: 'TEC-SP-004', category: 'smartphones', brand: 'techno', stock: 32, stockStatus: 'in-stock', image: '/media/Spark 7.png' },
    { id: 65, name: 'Techno Spark 5', description: '256GB - Starry Black', price: 3500.00, sku: 'TEC-SP-005', category: 'smartphones', brand: 'techno', stock: 40, stockStatus: 'in-stock', image: '/media/tecno_spark_5.webp' },
    { id: 66, name: 'Techno Spark 20 Pro+', description: '256GB - Startrail Black', price: 2800.00, sku: 'TEC-SP-006', category: 'smartphones', brand: 'techno', stock: 45, stockStatus: 'in-stock', image: '/media/spark 20.jpg' },
    { id: 67, name: 'Techno Spark 20 Pro', description: '128GB - Comet Blue', price: 2200.00, sku: 'TEC-SP-007', category: 'smartphones', brand: 'techno', stock: 55, stockStatus: 'in-stock', image: '/media/Tecno-Spark-9.jpg' },
    { id: 68, name: 'Techno Spark 20', description: '128GB - Starry Black', price: 1800.00, sku: 'TEC-SP-008', category: 'smartphones', brand: 'techno', stock: 0, stockStatus: 'out-stock', image: '/media/spark-20-pro-plus.jpg' },
    
    // Techno Tablets (4)
    { id: 69, name: 'Techno MegaBook T1', description: '256GB - Silver', price: 4500.00, sku: 'TEC-TB-001', category: 'tablets', brand: 'techno', stock: 15, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 70, name: 'Techno DroidPad 10', description: '128GB - Gray', price: 2500.00, sku: 'TEC-TB-002', category: 'tablets', brand: 'techno', stock: 22, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 71, name: 'Techno DroidPad 8', description: '64GB - Blue', price: 1800.00, sku: 'TEC-TB-003', category: 'tablets', brand: 'techno', stock: 28, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: 72, name: 'Techno KidPad 7', description: '32GB - Pink', price: 1200.00, sku: 'TEC-TB-004', category: 'tablets', brand: 'techno', stock: 35, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    
    // Techno Accessories (5)
    { id: 73, name: 'Techno Buds 3', description: 'Active Noise Cancelling', price: 850.00, sku: 'TEC-AC-001', category: 'accessories', brand: 'techno', stock: 70, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop' },
    { id: 74, name: 'Techno Buds 2', description: 'Wireless Earbuds', price: 550.00, sku: 'TEC-AC-002', category: 'accessories', brand: 'techno', stock: 85, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop' },
    { id: 75, name: 'Techno Watch Storm', description: '46mm - Black', price: 1800.00, sku: 'TEC-AC-003', category: 'accessories', brand: 'techno', stock: 25, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    { id: 76, name: 'Techno Watch Storm 2', description: '46mm - Silver', price: 2200.00, sku: 'TEC-AC-004', category: 'accessories', brand: 'techno', stock: 18, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    { id: 77, name: 'Techno Smart Band', description: 'Fitness Tracker', price: 450.00, sku: 'TEC-AC-005', category: 'accessories', brand: 'techno', stock: 95, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    
    // Techno Chargers (3)
    { id: 78, name: '45W Fast Charger', description: 'USB-C Adapter', price: 320.00, sku: 'TEC-CH-001', category: 'chargers', brand: 'techno', stock: 95, stockStatus: 'in-stock', image: '/media/APPN-HC072-US-mp4.webp' },
    { id: 79, name: 'Wireless Charger', description: '15W - Black', price: 550.00, sku: 'TEC-CH-002', category: 'chargers', brand: 'techno', stock: 60, stockStatus: 'in-stock', image: '/media/universal-usb-5v-2a-charger.webp' },
    { id: 80, name: 'USB-C Cable', description: '1m - White', price: 150.00, sku: 'TEC-CH-003', category: 'chargers', brand: 'techno', stock: 150, stockStatus: 'in-stock', image: '/media/samsung charger.jpg' }
];

// ==================== STATE MANAGEMENT ====================
let cart = [];
let selectedPaymentMethod = '';
let receiptNumber = '';

// ==================== DOM ELEMENTS ====================
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartPanel = document.getElementById('cartPanel');
const floatingCart = document.getElementById('floatingCart');
const paymentModal = document.getElementById('paymentModal');
const receiptModal = document.getElementById('receiptModal');
const successMessage = document.getElementById('successMessage');
const toast = document.getElementById('toast');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadProducts();
    updateProductCount();
    setupEventListeners();
    generateReceiptNumber();
});

// ==================== LOAD PRODUCTS FROM BACKEND ====================
function mergeProducts(apiProducts) {
    if (!Array.isArray(apiProducts)) return;

    apiProducts.forEach(apiItem => {
        const index = products.findIndex(p => p.id === apiItem.id);
        if (index >= 0) {
            products[index] = {
                ...products[index],
                ...apiItem
            };
        } else {
            products.push(apiItem);
        }
    });
}

function loadProducts() {
    fetch('/store/api/get_products/')
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            mergeProducts(data);
        }
        renderProducts(products);
        updateProductCount();
    })
    .catch(error => {
        console.error('Error loading products:', error);
        renderProducts(products);
    });
}

// ==================== DATE & TIME ====================
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('currentDateTime').textContent = now.toLocaleString('en-US', options);
}

// ==================== GENERATE RECEIPT NUMBER ====================
function generateReceiptNumber() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    receiptNumber = `RCP-${timestamp}${random}`;
    return receiptNumber;
}

// ==================== RENDER PRODUCTS ====================
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>No Products Found</h3>
                <p>Try adjusting your filters or search term</p>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = `product-card ${product.stockStatus}`;
        const imageUrl = product.image ? (product.image.startsWith('/') ? encodeURI(product.image) : product.image) : 'https://via.placeholder.com/400x400?text=No+Image';

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-description">${product.description}</p>
                <p class="product-sku">${product.sku}</p>
                <p class="product-price">GH₵ ${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
            </div>
            <div class="product-footer">
                <span class="stock-badge ${product.stockStatus}">${product.stockStatus.replace('-', ' ')}</span>
                <button class="add-btn" ${product.stock === 0 ? 'disabled' : ''} onclick="addToCart(${product.id})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function updateProductCount() {
    document.getElementById('productCount').textContent = `${products.length} products`;
}

// ==================== CART FUNCTIONS ====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product || product.stock === 0) {
        showToast('Product is out of stock!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
            showToast('Quantity increased!', 'success');
        } else {
            showToast('Maximum stock reached!', 'warning');
            return;
        }
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
        showToast('Product added to cart!', 'success');
    }
    
    renderCart();
    updateCartTotals();
    updateCartCount();
    
    // Open cart panel when item is added
    cartPanel.classList.add('active');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateCartTotals();
    updateCartCount();
    showToast('Item removed from cart', 'success');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > product.stock) {
        showToast('Maximum stock reached!', 'warning');
        return;
    }
    
    item.quantity = newQuantity;
    renderCart();
    updateCartTotals();
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Cart is empty</p>
                <span>Select products to add to cart</span>
            </div>
        `;
        document.getElementById('processPayment').disabled = true;
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'">
            </div>
            <div class="cart-item-details">
                <h5 class="cart-item-name">${item.name}</h5>
                <p class="cart-item-price">GH₵ ${item.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <p class="cart-item-total">Total: GH₵ ${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    document.getElementById('processPayment').disabled = false;
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const discountPercent = parseFloat(document.getElementById('discountInput').value) || 0;
    const discountAmount = subtotal * (discountPercent / 100);
    const grandTotal = subtotal + tax - discountAmount;
    
    document.getElementById('subtotal').textContent = `GH₵ ${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('tax').textContent = `GH₵ ${tax.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('discountAmount').textContent = `-GH₵ ${discountAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('grandTotal').textContent = `GH₵ ${Math.max(0, grandTotal).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    document.getElementById('paymentAmount').textContent = `GH₵ ${Math.max(0, grandTotal).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
}

function clearCart() {
    if (cart.length === 0) {
        showToast('Cart is already empty!', 'warning');
        return;
    }
    
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        renderCart();
        updateCartTotals();
        updateCartCount();
        document.getElementById('discountInput').value = '';
        showToast('Cart cleared!', 'success');
    }
}

// ==================== FLOATING CART TOGGLE ====================
floatingCart.addEventListener('click', () => {
    cartPanel.classList.toggle('active');
});

document.getElementById('closeCart').addEventListener('click', () => {
    cartPanel.classList.remove('active');
});

// ==================== PAYMENT PROCESSING ====================
function openPaymentModal() {
    if (cart.length === 0) {
        showToast('Cart is empty! Add products first.', 'warning');
        return;
    }
    
    updateCartTotals();
    paymentModal.classList.add('active');
    selectedPaymentMethod = '';
    document.getElementById('confirmPayment').disabled = true;
    
    document.querySelectorAll('.payment-method-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.payment-detail-group').forEach(group => group.style.display = 'none');
    document.querySelectorAll('.form-group input').forEach(input => input.value = '');
    document.querySelectorAll('.form-group select').forEach(select => select.selectedIndex = 0);
}

function closePaymentModal() {
    paymentModal.classList.remove('active');
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.method === method);
    });
    
    document.querySelectorAll('.payment-detail-group').forEach(group => {
        group.style.display = 'none';
    });
    
    if (method === 'cash') {
        document.getElementById('cashDetails').style.display = 'block';
    } else if (method === 'momo') {
        document.getElementById('momoDetails').style.display = 'block';
    } else if (method === 'bank') {
        document.getElementById('bankDetails').style.display = 'block';
    } else if (method === 'card') {
        document.getElementById('cardDetails').style.display = 'block';
    }
    
    document.getElementById('confirmPayment').disabled = false;
}

function calculateChange() {
    const grandTotal = parseFloat(document.getElementById('grandTotal').textContent.replace('GH₵ ', '').replace(/,/g, ''));
    const amountReceived = parseFloat(document.getElementById('amountReceived').value) || 0;
    const change = amountReceived - grandTotal;
    
    document.getElementById('changeAmount').textContent = `GH₵ ${Math.max(0, change).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    if (change < 0) {
        document.getElementById('confirmPayment').disabled = true;
        showToast('Amount received is less than total!', 'error');
    } else {
        document.getElementById('confirmPayment').disabled = false;
    }
}

function validatePaymentDetails() {
    if (!selectedPaymentMethod) {
        showToast('Please select a payment method!', 'error');
        return false;
    }
    
    if (selectedPaymentMethod === 'cash') {
        const amountReceived = parseFloat(document.getElementById('amountReceived').value) || 0;
        const grandTotal = parseFloat(document.getElementById('grandTotal').textContent.replace('GH₵ ', '').replace(/,/g, ''));
        if (amountReceived < grandTotal) {
            showToast('Amount received is less than total!', 'error');
            return false;
        }
    } else if (selectedPaymentMethod === 'momo') {
        const phone = document.getElementById('momoPhone').value;
        const provider = document.getElementById('momoProvider').value;
        if (!phone || !provider) {
            showToast('Please enter phone number and select provider!', 'error');
            return false;
        }
    } else if (selectedPaymentMethod === 'bank') {
        const account = document.getElementById('bankAccount').value;
        const bank = document.getElementById('bankName').value;
        if (!account || !bank) {
            showToast('Please enter account number and select bank!', 'error');
            return false;
        }
    }
    
    return true;
}

function confirmPayment() {
    if (!validatePaymentDetails()) {
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const discountPercent = parseFloat(document.getElementById('discountInput').value) || 0;
    const discountAmount = subtotal * (discountPercent / 100);
    const grandTotal = subtotal + tax - discountAmount;
    
    // Prepare data to send
    const orderData = {
        cart: cart.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            price: item.price
        })),
        payment_method: selectedPaymentMethod,
        total_amount: grandTotal
    };
    
    // Send to backend
    fetch('/store/api/create_order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            closePaymentModal();
            showReceipt();
            showToast('Order created successfully!', 'success');
        } else {
            showToast('Error: ' + data.error, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Failed to create order. Please try again.', 'error');
    });
}

// ==================== RECEIPT ====================
function showReceipt() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const discountPercent = parseFloat(document.getElementById('discountInput').value) || 0;
    const discountAmount = subtotal * (discountPercent / 100);
    const grandTotal = subtotal + tax - discountAmount;
    
    const now = new Date();
    const receiptNum = generateReceiptNumber();
    
    document.getElementById('receiptNumber').textContent = receiptNum;
    document.getElementById('receiptDate').textContent = now.toLocaleDateString('en-US');
    document.getElementById('receiptTime').textContent = now.toLocaleTimeString('en-US');
    document.getElementById('receiptCashier').textContent = 'John Doe';
    document.getElementById('receiptPayment').textContent = selectedPaymentMethod.toUpperCase();
    
    const tbody = document.getElementById('receiptItemsBody');
    tbody.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>GH₵ ${item.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
            <td>GH₵ ${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
        `;
        tbody.appendChild(row);
    });
    
    document.getElementById('receiptSubtotal').textContent = `GH₵ ${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('receiptTax').textContent = `GH₵ ${tax.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('receiptDiscount').textContent = `-GH₵ ${discountAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('receiptTotal').textContent = `GH₵ ${Math.max(0, grandTotal).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('receiptBarcodeNumber').textContent = receiptNum.replace('-', '');
    
    receiptModal.classList.add('active');
}

function closeReceiptModal() {
    receiptModal.classList.remove('active');
    showSuccessMessage();
}

function printReceipt() {
    const receiptContent = document.getElementById('receiptContainer').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Receipt - ${receiptNumber}</title>
                <style>
                    body { font-family: 'Courier New', monospace; font-size: 12px; padding: 20px; width: 80mm; margin: 0 auto; }
                    .receipt-header { text-align: center; margin-bottom: 20px; }
                    .receipt-header h2 { font-size: 18px; margin-bottom: 10px; }
                    .receipt-row { display: flex; justify-content: space-between; margin: 5px 0; }
                    .receipt-divider { border-top: 2px dashed #000; margin: 15px 0; }
                    table { width: 100%; border-collapse: collapse; }
                    th { text-align: left; border-bottom: 1px solid #000; padding: 5px 0; }
                    td { padding: 5px 0; }
                    .total { font-weight: bold; border-top: 2px dashed #000; padding-top: 10px; }
                    .receipt-footer { text-align: center; margin-top: 20px; }
                    .barcode { margin: 15px 0; }
                    .barcode-bars { height: 40px; background: repeating-linear-gradient(90deg, #000 0px, #000 2px, #fff 2px, #fff 4px); margin-bottom: 5px; }
                </style>
            </head>
            <body>${receiptContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}

function showSuccessMessage() {
    document.getElementById('successReceiptNumber').textContent = receiptNumber;
    successMessage.classList.add('active');
}

function newSale() {
    successMessage.classList.remove('active');
    cart = [];
    renderCart();
    updateCartTotals();
    updateCartCount();
    document.getElementById('discountInput').value = '';
    cartPanel.classList.remove('active');
    generateReceiptNumber();
    showToast('Ready for new sale!', 'success');
}

// ==================== FILTER FUNCTIONS ====================
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const brand = document.getElementById('brandFilter').value;
    const stock = document.getElementById('stockFilter').value;
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    
    let filtered = products;
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (brand !== 'all') {
        filtered = filtered.filter(p => p.brand === brand);
    }
    
    if (stock !== 'all') {
        filtered = filtered.filter(p => p.stockStatus === stock);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.sku.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts(filtered);
    document.getElementById('productCount').textContent = `${filtered.length} products`;
}

function clearFilters() {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('brandFilter').value = 'all';
    document.getElementById('stockFilter').value = 'all';
    document.getElementById('productSearch').value = '';
    filterProducts();
    showToast('Filters cleared!', 'success');
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    const toastEl = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastEl.className = `toast ${type}`;
    toastMessage.textContent = message;
    toastEl.classList.add('active');
    
    setTimeout(() => {
        toastEl.classList.remove('active');
    }, 3000);
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Search
    document.getElementById('productSearch').addEventListener('input', filterProducts);
    
    // Filters
    document.getElementById('applyFilters').addEventListener('click', filterProducts);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    
    // Cart
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('processPayment').addEventListener('click', openPaymentModal);
    
    // Discount
    document.getElementById('discountInput').addEventListener('input', updateCartTotals);
    
    // Payment Modal
    document.getElementById('closePaymentModal').addEventListener('click', closePaymentModal);
    document.getElementById('cancelPayment').addEventListener('click', closePaymentModal);
    document.getElementById('confirmPayment').addEventListener('click', confirmPayment);
    
    // Payment Methods
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.addEventListener('click', () => selectPaymentMethod(btn.dataset.method));
    });
    
    // Amount Received
    document.getElementById('amountReceived').addEventListener('input', calculateChange);
    
    // Receipt Modal
    document.getElementById('closeReceiptModal').addEventListener('click', closeReceiptModal);
    document.getElementById('closeReceiptBtn').addEventListener('click', closeReceiptModal);
    document.getElementById('printReceiptBtn').addEventListener('click', printReceipt);
    
    // Success Message
    document.getElementById('newSale').addEventListener('click', newSale);
    
    // Close modals on outside click
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) closePaymentModal();
    });
    
    receiptModal.addEventListener('click', (e) => {
        if (e.target === receiptModal) closeReceiptModal();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePaymentModal();
            closeReceiptModal();
            cartPanel.classList.remove('active');
        }
    });
}

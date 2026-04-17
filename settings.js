// Toast notification function
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

// Save settings handlers
document.querySelectorAll('.btn-primary, .btn-purple, .btn-green, .btn-orange, .btn-red, .btn-teal').forEach(btn => {
    btn.addEventListener('click', function() {
        const cardHeader = this.closest('.settings-card').querySelector('.card-header h3').textContent;
        showToast(`${cardHeader} saved successfully!`, 'success');
    });
});

// Add animation on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-slide-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
        }
    });
});

// Form validation
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Backup button functionality
document.querySelector('.btn-teal').addEventListener('click', function() {
    showToast('Backup created successfully!', 'success');
});

// Restore button functionality
document.querySelector('.btn-outline').addEventListener('click', function() {
    if (confirm('Are you sure you want to restore from backup? This cannot be undone.')) {
        showToast('System restored successfully!', 'success');
    }
});
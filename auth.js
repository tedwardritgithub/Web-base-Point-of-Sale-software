// ==================== PASSWORD VALIDATION ====================
function validatePassword(password) {
    const hasMinLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return {
        valid: hasMinLength && hasLetter && hasNumber,
        hasMinLength,
        hasLetter,
        hasNumber
    };
}

// Update password requirements UI
function updatePasswordRequirements(password) {
    const validation = validatePassword(password);
    
    const reqLength = document.getElementById('req-length');
    const reqLetter = document.getElementById('req-letter');
    const reqNumber = document.getElementById('req-number');
    
    if (reqLength) {
        reqLength.className = validation.hasMinLength ? 'valid' : '';
        reqLength.innerHTML = validation.hasMinLength 
            ? '<i class="fas fa-check-circle"></i> At least 8 characters' 
            : '<i class="fas fa-circle"></i> At least 8 characters';
    }
    
    if (reqLetter) {
        reqLetter.className = validation.hasLetter ? 'valid' : '';
        reqLetter.innerHTML = validation.hasLetter 
            ? '<i class="fas fa-check-circle"></i> At least one letter' 
            : '<i class="fas fa-circle"></i> At least one letter';
    }
    
    if (reqNumber) {
        reqNumber.className = validation.hasNumber ? 'valid' : '';
        reqNumber.innerHTML = validation.hasNumber 
            ? '<i class="fas fa-check-circle"></i> At least one number' 
            : '<i class="fas fa-circle"></i> At least one number';
    }
}

// Check password match
function checkPasswordMatch() {
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const matchMessage = document.getElementById('passwordMatch');
    
    if (password && confirmPassword && matchMessage) {
        if (confirmPassword.value === '') {
            matchMessage.textContent = '';
            matchMessage.className = 'match-message';
        } else if (password.value === confirmPassword.value) {
            matchMessage.textContent = '✓ Passwords match';
            matchMessage.className = 'match-message success';
        } else {
            matchMessage.textContent = '✗ Passwords do not match';
            matchMessage.className = 'match-message error';
        }
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ==================== TOAST NOTIFICATION ====================
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

// ==================== USER AUTHENTICATION ====================
// Store user in localStorage
function saveUser(userData) {
    const users = getUsers();
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}

// Get all users from localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Find user by email
function findUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

// Set current logged in user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Get current logged in user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login.html';
}

// Check if user is logged in
function checkAuth() {
    const currentUser = getCurrentUser();
    const currentPage = window.location.pathname;
    
    // If user is logged in and trying to access auth pages
    if (currentUser && (currentPage.includes('/login.html') || currentPage.includes('/signup.html'))) {
        window.location.href = '/';
    }
    
    // If user is not logged in and trying to access protected pages
    if (!currentUser && !currentPage.includes('/login.html') && !currentPage.includes('/signup.html')) {
        window.location.href = '/login.html';
    }
}

// ==================== FORM HANDLERS ====================
// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Password validation on input
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordRequirements(this.value);
            checkPasswordMatch();
        });
    }
    
    // Confirm password validation
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Validation
        if (!username || username.length < 3) {
            showToast('Username must be at least 3 characters', 'error');
            return;
        }
        
        if (!email || !email.includes('@')) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            showToast('Password does not meet requirements', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }
        
        if (!agreeTerms) {
            showToast('You must agree to the terms and conditions', 'error');
            return;
        }
        
        // Check if user already exists
        const existingUser = findUserByEmail(email);
        if (existingUser) {
            showToast('Email already registered. Please login.', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            username,
            email,
            password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            role: 'user'
        };
        
        saveUser(newUser);
        setCurrentUser(newUser);
        
        showToast('Account created successfully! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validation
        if (!email || !password) {
            showToast('Please enter email and password', 'error');
            return;
        }
        
        // Find user
        const user = findUserByEmail(email);
        
        if (!user) {
            showToast('Invalid email or password', 'error');
            return;
        }
        
        if (user.password !== password) {
            showToast('Invalid email or password', 'error');
            return;
        }
        
        // Set current user
        setCurrentUser(user);
        
        // Set remember me
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        
        showToast('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status
    checkAuth();
    
    // Add animation to form inputs
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Social login buttons (demo)
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('Social login coming soon!', 'error');
        });
    });
});

// ==================== PROTECTED PAGES CHECK ====================
// Add this to all protected pages (index.html, pos.html, etc.)
// Example: Add this script tag to protected pages
/*
<script>
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
    }
</script>
*/
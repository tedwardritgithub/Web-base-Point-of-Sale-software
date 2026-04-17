from django.urls import path
from . import views

urlpatterns = [
    # your store urls will go here
    path('', views.index, name='index'),
    path('index.html', views.index, name='index_html'),
    path('products/', views.product_list, name='product_list'),
    path('products/<int:pk>/', views.product_detail, name='product_detail'),    
    path('orders/', views.order_list, name='order_list'),
    path('orders/<int:pk>/', views.order_detail, name='order_detail'),
    path('customers/', views.customer_list, name='customer_list'),
    path('customers/<int:pk>/', views.customer_detail, name='customer_detail'),
    path('payments/', views.payment_list, name='payment_list'),
    path('payments/<int:pk>/', views.payment_detail, name='payment_detail'),
    path('inventory/', views.inventory_list, name='inventory_list'),
    path('inventory/<int:pk>/', views.inventory_detail, name='inventory_detail'),
    path('sales/', views.sales_list, name='sales_list'),
    path('sales/<int:pk>/', views.sales_detail, name='sales_detail'),
    path('reports/', views.reports_list, name='reports_list'),
    path('reports/<int:pk>/', views.reports_detail, name='reports_detail'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('settings/', views.settings, name='settings'),
    path('logs/', views.logs, name='logs'),
    path('api/', views.api, name='api'),
    path('auth/', views.auth, name='auth'),
    path('login.html', views.login, name='login'),
    path('signup.html', views.signup, name='signup'),
    path('pos/', views.pos, name='pos'),
    path('api/create_order/', views.create_order, name='create_order'),
    path('api/update_inventory/', views.update_inventory, name='update_inventory'),
    path('api/get_products/', views.get_products, name='get_products'),
]
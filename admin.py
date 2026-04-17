from django.contrib import admin
from django.utils.html import format_html
from .models import Product, Order, Customer, Payment, Inventory, Sales, Reports


# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'image_tag', 'created_at', 'updated_at')
    search_fields = ('name', 'image')
    list_filter = ('created_at', 'updated_at')

    def image_tag(self, obj):
        if not obj.image:
            return '-'
        return format_html('<a href="{}" target="_blank"><img src="{}" style="max-height:50px; max-width:75px; object-fit:contain;" /></a>', obj.image, obj.image)
    image_tag.short_description = 'Image'
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'total_price', 'created_at', 'updated_at')
    search_fields = ('product__name',)
    list_filter = ('created_at', 'updated_at')
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'created_at', 'updated_at')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('created_at', 'updated_at')
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'amount', 'payment_method', 'created_at', 'updated_at')
    search_fields = ('order__product__name', 'payment_method')
    list_filter = ('created_at', 'updated_at')
@admin.register(Inventory) 
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'created_at', 'updated_at')
    search_fields = ('product__name',)
    list_filter = ('created_at', 'updated_at')  
@admin.register(Sales)
class SalesAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'total_price', 'created_at', 'updated_at')
    search_fields = ('product__name',)
    list_filter = ('created_at', 'updated_at')
@admin.register(Reports)
class ReportsAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'created_at', 'updated_at')
    search_fields = ('product__name',)
    list_filter = ('created_at', 'updated_at')
    
    
    


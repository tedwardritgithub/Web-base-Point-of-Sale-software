from decimal import Decimal, InvalidOperation
from django.shortcuts import render
from .models import Product, Order, Customer, Payment, Inventory, Sales, Reports
from django.http import HttpResponse
from django.views import View
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json


# Create your views here.
def index(request):
    return render(request, 'store/index.html')

def product_list(request):
    return render(request, 'store/product_list.html')   

def product_detail(request, pk):
    return render(request, 'store/product_detail.html', {'pk': pk})

def order_list(request):
    return render(request, 'store/order_list.html')

def order_detail(request, pk):
    return render(request, 'store/order_detail.html', {'pk': pk})

def customer_list(request):
    return render(request, 'store/customer_list.html')

def customer_detail(request, pk):
    return render(request, 'store/customer_detail.html', {'pk': pk})

def payment_list(request):
    return render(request, 'store/payment_list.html')

def payment_detail(request, pk):
    return render(request, 'store/payment_detail.html', {'pk': pk})

def inventory_list(request):
    products = Product.objects.all()
    return render(request, 'store/inventory.html', {'products': products})

def inventory_detail(request, pk):
    return render(request, 'store/inventory_detail.html', {'pk': pk})

def sales_list(request):
    return render(request, 'store/sales.html')

def sales_detail(request, pk):
    return render(request, 'store/sales_detail.html', {'pk': pk})

def reports_list(request):
    return render(request, 'store/reports.html')

def reports_detail(request, pk):
    return render(request, 'store/reports_detail.html', {'pk': pk})

def dashboard(request):
    return render(request, 'store/dashboard.html')

def settings(request):
    return render(request, 'store/settings.html')

def logs(request):
    return render(request, 'store/logs.html')

def api(request):
    return render(request, 'store/api.html')

def auth(request):
    return render(request, 'store/auth.html')

def pos(request):
    return render(request, 'store/pos.html')

@csrf_exempt
def create_order(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    cart = data.get('cart', [])
    payment_method = data.get('payment_method', '')
    total_amount = data.get('total_amount', 0)

    if not isinstance(cart, list) or not cart or not payment_method:
        return JsonResponse({'error': 'Invalid data'}, status=400)

    orders = []
    for item in cart:
        item_id = item.get('id')
        quantity = int(item.get('quantity', 0))
        price = Decimal(str(item.get('price', 0)))
        name = item.get('name', 'Unknown product')
        description = item.get('description', '')

        if not item_id or quantity <= 0:
            return JsonResponse({'error': 'Invalid cart item'}, status=400)

        product, created = Product.objects.get_or_create(
            id=item_id,
            defaults={
                'name': name,
                'description': description,
                'price': price,
                'stock': quantity,
            }
        )

        if product.stock < quantity:
            return JsonResponse({'error': f'Insufficient stock for {product.name}'}, status=400)

        if created:
            product.stock = quantity
            product.save()

        order = Order.objects.create(
            product=product,
            quantity=quantity,
            total_price=price * quantity
        )
        orders.append(order)

        product.stock -= quantity
        product.save()

        Sales.objects.create(
            product=product,
            quantity=quantity,
            total_price=price * quantity
        )

        inventory, created_inv = Inventory.objects.get_or_create(product=product, defaults={'quantity': product.stock})
        inventory.quantity = product.stock
        inventory.save()

    try:
        payment_amount = Decimal(str(total_amount))
    except (TypeError, ValueError, InvalidOperation):
        payment_amount = sum((o.total_price for o in orders))

    payment = Payment.objects.create(
        order=orders[0],
        amount=payment_amount,
        payment_method=payment_method
    )

    return JsonResponse({'success': True, 'order_ids': [o.id for o in orders], 'payment_id': payment.id})

@csrf_exempt
def update_inventory(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product_id = data.get('product_id')
            new_stock = data.get('stock')
            
            product = Product.objects.get(id=product_id)
            product.stock = new_stock
            product.save()
            
            # Update inventory model
            inventory, created = Inventory.objects.get_or_create(product=product, defaults={'quantity': new_stock})
            inventory.quantity = new_stock
            inventory.save()
            
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_products(request):
    products = Product.objects.all()
    data = []
    for p in products:
        data.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': float(p.price),
            'stock': p.stock,
            'sku': f'SKU-{p.id:03d}',
            'category': 'smartphones',  # placeholder
            'brand': 'apple',  # placeholder
            'stockStatus': 'in-stock' if p.stock > 10 else 'low-stock' if p.stock > 0 else 'out-stock',
            'image': p.image or 'https://via.placeholder.com/400x400?text=No+Image'
        })
    return JsonResponse(data, safe=False)

def login(request):
    return render(request, 'store/login.html')

def signup(request):
    return render(request, 'store/signup.html')

def shipping(request):
    return render(request, 'store/shipping.html')

def notifications(request):
    return render(request, 'store/notifications.html')

def integrations(request):
    return render(request, 'store/integrations.html')
def users(request):
    return render(request, 'store/users.html')
def profiles(request):
    return render(request, 'store/profiles.html')
def analytics(request):
    return render(request, 'store/analytics.html')
def marketing(request):
    return render(request, 'store/marketing.html')
def support(request):
    return render(request, 'store/support.html')
def login_view(request):    
    return render(request, 'store/login.html')
def pos(request):
    return render(request, 'store/pos.html')



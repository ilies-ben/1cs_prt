
from django.contrib import messages
from .forms import ProductSearchForm, ClientForm
from django.shortcuts import render, redirect
from .models import User, Product, Fournisseur
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
import openpyxl
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
from django.views.generic import ListView, DetailView
from django.utils import timezone
from django.http import HttpResponse
from django.utils import timezone
from openpyxl import Workbook
from django.shortcuts import render, redirect
from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.db.models import Q
from django.shortcuts import render, redirect
from .models import Product, Client, Vente , ProduitVendu, Stock  
from .forms import ProductSearchForm, ClientForm
import json
from django.urls import reverse
from decimal import Decimal
from django.shortcuts import render, redirect
from django.http import HttpResponse







def login(request):
    if request.method == 'POST':
        
        username = request.POST['username']
        password = request.POST.get('password')
        
        try:
            user = User.objects.get(username=username, password=password)
        except User.DoesNotExist:
            user = None
        if user:
            request.session['is_authenticated'] = True
            request.session['username'] = username
            request.session['password'] = password
            if user.department == 'meca':
                return render(request,'meca.html')
            elif user.department == 'elec':
                return render(request, 'elec.html')
            elif user.department =='Assemblage':
                return render(request,'Assm.html')
            elif user.department =='stock':
                return redirect('GS_home')
            else:
                return render(request,'loginn.html')
                
        else:
            return render(request, 'loginn.html', {'error': 'Invalid username or password'})
            
    else:
        return render(request, 'loginn.html')

# Gestion stock function

def frn(request):
    if request.session.get('is_authenticated', False):
        return render(request,'G_stock/frn.html' )
    else : 
        return redirect('login')
def GS_home(request):
    produits=Product.objects.all()
    context = { 
              
              'produits': produits,
              }
    if request.session.get('is_authenticated', False):
        return render(request,'G_stock/index.html',context)
    
    else : 
        return redirect('login')
def Gestion_lvn(request):
    if request.session.get('is_authenticated', False):
        return render(request,'G_stock/Gestion_lvn.html' )
    else : 
        return redirect('login')

def RC(request):
    if request.session.get('is_authenticated', False):
        fournisseurs = Fournisseur.objects.all()
        context = {'fournisseurs': fournisseurs}
        return render(request,'G_stock/RC.html',context )
    else : 
        return redirect('login')
    
#Fin gestion de stock function

#se deconnecter 

def deco(request):
    request.session.pop('is_authenticated',None)
    request.session.clear()
    return redirect('login')         

#Fin se deconnecter 


#  views cree fournisseur 

def creer_fournisseur(request):
    if request.method == 'POST':
        nom = request.POST.get('nom')
        prenom = request.POST.get('prenom')
        type_matiere = request.POST.get('matiere')
        numero_rc = request.POST.get('rc')
        numero_nif = request.POST.get('nif')
        numero_nis = request.POST.get('nis')
        numero_telephone = request.POST.get('telephone')

        fournisseur = Fournisseur(nom=nom, prenom=prenom, type_matiere=type_matiere, numero_rc=numero_rc, numero_nif=numero_nif, numero_nis=numero_nis, numero_telephone=numero_telephone)
        fournisseur.save()

        return redirect('frn') # rediriger vers la page des fournisseurs après l'enregistrement

    return render(request, 'G_stock/frn.html')

# fin cree fournisseur
#shoowroom 
def showroom(request):
    products = Product.objects.all()
    form = ProductSearchForm(request.POST or None)
    cart = request.session.get('cart', [])
    
    if isinstance(cart, str):
        cart = json.loads(cart)
    
    total = 0
    for item in cart:
        if isinstance(item, dict):
            product_price = float(item.get('product', {}).get('price', 0))
            quantity = item.get('quantity', 0)
            total += product_price * quantity
    
    context = {
        'products': products,
        'form': form,
        'cart': cart,
        'total': total
    }
    return render(request, 'showroom/showroom.html', context)
  
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)
def add_to_cart(request):
    if request.method == 'POST':
        product_id = request.POST.get('product_id')
        quantity = int(request.POST.get('quantity'))
        product = Product.objects.get(id=product_id)
        cart = request.session.get('cart', [])
        if isinstance(cart, str):
            cart = json.loads(cart)
        if not isinstance(cart, list):
            cart = []
        cart.append({
            'product': {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'quantity': product.quantity,
                # ...
            },
            'quantity': quantity
        })
        request.session['cart'] = json.dumps(cart, cls=DecimalEncoder)
    return redirect('showroom')

def remove_from_cart(request):
    if request.method == 'POST':
        product_id = request.POST.get('product_id')
        if product_id and product_id.isdigit():
            product_id = int(product_id)
            cart = request.session.get('cart', [])
            new_cart = [item for item in cart if item['product']['id'] != product_id]
            request.session['cart'] = json.dumps(new_cart, cls=DecimalEncoder)
    return redirect('showroom')



def facture(request):
    cart = request.session.get('cart', [])
    total = 0
    if cart and isinstance(cart, list):
        for item in cart:
            if isinstance(item, dict) and 'product' in item:
                total += item['product'].price * item['quantity']
        if cart[0]['product'] and hasattr(cart[0]['product'], 'client'):
            client = cart[0]['product'].client
        else:
            client = None
        context = {
            'client': client,
            'cart': cart,
            'total': total,
            'date': cart[0]['product'].date_vente if cart and isinstance(cart, list) and cart[0]['product'] else None
        }
        return redirect('facture.html')
    else:
        return redirect('showroom')
        



#fin showroom

#creation fournisseur 


def frn(request):
    

    if request.method == 'POST':
        # Récupérer les données du formulaire
        nom = request.POST['nom']
        prenom = request.POST['prenom']
        type_matiere = request.POST['matiere']
        numero_rc = request.POST['rc']
        numero_nif = request.POST['nif']
        numero_nis = request.POST['nis']
        numero_telephone = request.POST['telephone']

        # Créer un nouveau fournisseur
        fournisseur = Fournisseur(
            nom=nom,
            prenom=prenom,
            type_matiere=type_matiere,
            numero_rc=numero_rc,
            numero_nif=numero_nif,
            numero_nis=numero_nis,
            numero_telephone=numero_telephone
        )

        # Enregistrer le fournisseur dans la base de données
        fournisseur.save()

        # Rediriger l'utilisateur vers la page hfrn
        return redirect('frn')

    # Si la requête n'est pas de type POST, afficher le formulaire vide
    return render(request, 'G_stock/frn.html')



#fin creation fournisseur



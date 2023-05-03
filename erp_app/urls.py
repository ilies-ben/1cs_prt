from django.urls import path
from . import views


urlpatterns = [
    path('', views.login, name='login'),
    
    # pages de Gestion de stock
    path('G_stock/home',views.GS_home, name='GS_home'),
    path('G_stock/frn/',views.frn, name='frn'),
    path('G_stock/frn/Gestion_lvn',views.Gestion_lvn, name='Gestion_lvn'),
    path('G_stock/frn/RC',views.RC, name='RC'),
    
    # espace showroom
    path('showroom/', views.showroom, name='showroom'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('remove_from_cart/', views.remove_from_cart, name='remove_from_cart'),
    path('facture/', views.facture, name='facture'),
 
  
    #Fin pages de gestion de stock
    path('deco/', views.deco, name='deco'),
    


    
    
    #path('elec/', views.elec, name='elec'),
]

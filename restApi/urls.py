from django.urls import path 
from . import views 
from .views import *

urlpatterns = [
    path('get/',views.Productcreate.as_view(),name ='get'),
    path('create/',views.Productcreate.as_view(),name ='create'),
    path('get/<int:id>/', views.ProductDetail.as_view(), name=' get product_detail'),
    path('update/<int:id>/', views.ProductDetail.as_view(), name=' update product_detail'),
    path('delete/<int:id>/', views.ProductDetail.as_view(), name=' delete product_detail'),
    path('categories/<str:category>', views.FilterProductsView.as_view(), name='list_categories'),
    path('products/',views.FilterProductsByPrice.as_view(),name='filter_price'),
    path('search/',views.SearchProducts.as_view(),name='Search'),
    path('categories/', CategoryList.as_view(), name='category_list'),
    path('categories/<int:id>/', CategoryDetail.as_view(), name='category_detail'),
    path('categories/<int:id>/products/', CategoryProductList.as_view(), name='category_product_list'),
    path('add_favorite/', AddFavoriteView.as_view(), name='add_favorite'),
    path('remove_favorite/<int:product_id>/', RemoveFavoriteView.as_view(), name='remove_favorite'),
    path('promotions/', PromotionList.as_view(), name='promotion-list'),
    path('shipping/', ShippingListAPIView.as_view(), name='shipping-list'),
    path('shipping/create/', ShippingCreateAPIView.as_view(), name='shipping-create'),
    path('shipping/<int:pk>/', ShippingDetailAPIView.as_view(), name='shipping-detail'),
    path('shipping/<int:pk>/update/', ShippingUpdateAPIView.as_view(), name='shipping-update'),
    path('shipping/<int:pk>/delete/', ShippingDeleteAPIView.as_view(), name='shipping-delete'),
    path('shipping/<int:pk>/update-state/', ShippingStateUpdateAPIView.as_view(), name='shipping-update-state'),
    
    path('orders/history/', OrderHistoryView.as_view(), name='order-history'),
    path('MyShippings/', ShippingHistoryView.as_view(), name='shipping-history'),
    
    
    
    ]




from datetime import date
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView

from api.serializers import *


from multiprocessing import Value
from django.utils import timezone
from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.response  import Response 
from django.views.decorators.http import require_GET
from .serializer import *
from erp_app.models import *
from restApi import serializer
from .serializer import ProductSerializer,CategorySerializer
from rest_framework import status
from rest_framework import filters
from . import permission
from restApi.permission import *
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


# Product views:

# class Productcreate(generics.GenericAPIView):
#     serializer_class = serializer.ProductSerializer
#     queryset = Product.objects.all()
#     permission_classes = [IsAdminOrReadOnly]

#     def get(self, request):
#         # Retrieve all products
#         products = Product.objects.all()
#         serializer = self.serializer_class(products, many=True)
#         return Response(serializer.data)
    
#     def post(self,request):
#         # Create a new product
#         permission_classes = [IsAdminOrReadOnly]
#         data = request.data
#         serializer = self.serializer_class(data = data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(data = serializer.data)
#         return Response(data = serializer.errors)
    
class ProductDetail(generics.GenericAPIView):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = ProductSerializer
    
    def get(self, request, id):
        # Retrieve a specific product by ID
        try:
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(product)
        return Response(serializer.data)
    
    def put(self,request, id):
        # Update a specific product by ID
        try:
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        # Delete a specific product by ID
        try:
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Product filtering views:

class FilterProductsView(generics.GenericAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Retrieve all products by category
        category = self.kwargs['category']
        queryset = Product.objects.filter(category=category)

        return queryset
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
class FilterProductsByPrice(generics.ListAPIView):

    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()

        # Filter products by minimum price
        min_price = self.request.query_params.get('min_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        # Filter products by maximum price
        max_price = self.request.query_params.get('max_price')
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset


    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)   
        # to test http://127.0.0.1:8000/shop/products/?min_price=0&max_price=10


# Product search views:

class SearchProducts(generics.ListAPIView):
        serializer_class = ProductSerializer
        filter_backends = [filters.SearchFilter]
        search_fields = ['name', 'description']

        def get_queryset(self):
            queryset = Product.objects.all()
            return queryset
#http://127.0.0.1:8080/shop/search/?search=lk

#categories:
class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category = self.kwargs['id']
        return Product.objects.filter(category=category)
    


# class PromotionList(generics.ListCreateAPIView):
#     queryset = Promotion.objects.all()
#     serializer_class = PromotionSerializer

#     def perform_create(self, serializer):
#         send_notification = self.request.data.get('send_notification')
#         serializer.save()

#         if send_notification:
#             message = self.request.data.get('message')
#             recipients = self.request.data.get('recipients', 'all')  # Specify specific recipients or use 'all' for all users

#             if recipients == 'all':
#                 users = User.objects.all()
#             else:
#                 user_ids = recipients.split(',')
#                 users = User.objects.filter(id__in=user_ids)

#             notifications = []

#             for user in users:
#                 notification = Notification(recipient=user, message=message)
#                 notifications.append(notification)

#             Notification.objects.bulk_create(notifications)







class AddFavoriteView(generics.CreateAPIView):
    serializer_class = FavoriteSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        if Favorite.objects.filter(user=request.user, product_id=product_id).exists():
            return Response({"message": "This product is already in your favorites list."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RemoveFavoriteView(generics.DestroyAPIView):
    queryset = Favorite.objects.all()
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        product_id = kwargs.get('product_id')
        favorite = Favorite.objects.get(user=request.user, product_id=product_id)
        favorite.delete()
        return Response({"message": "Product removed from your favorites list."}, status=status.HTTP_204_NO_CONTENT)


    serializer_class = PromotionSerializer

   
    def get_queryset(self):
        return Promotion.objects.filter(end_date__gte=timezone.now())
    







# class ShippingListAPIView(ListAPIView):
#     serializer_class = ShippingSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Shipping.objects.filter(user=user)

# class ShippingDetailAPIView(RetrieveAPIView):
#     serializer_class = ShippingSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = Shipping.objects.all()

# class ShippingCreateAPIView(CreateAPIView):
#     serializer_class = ShippingSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# class ShippingUpdateAPIView(UpdateAPIView):
#     serializer_class = ShippingSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = Shipping.objects.all()
#     lookup_field = 'pk'

# class ShippingDeleteAPIView(DestroyAPIView):
#     serializer_class = ShippingSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = Shipping.objects.all()
#     lookup_field = 'pk'




# class ShippingStateUpdateAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def patch(self, request, pk):
#         shipping = Shipping.objects.get(pk=pk)
#         new_state = request.data.get('state')
#         shipping.update_state(new_state)
#         return Response({'message': 'Shipping state updated successfully.'})











class OrderHistoryView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.filter(user=user, checkout__shipping_state='delivered').select_related('checkout') | Order.objects.filter(user=user)
        return queryset
    
  


class ShippingHistoryView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        state = self.request.query_params.get('shipping_state', None)
        queryset = Order.objects.all()
        if state is not None:
            queryset = queryset.filter(checkout__shipping_state=state)
        return queryset


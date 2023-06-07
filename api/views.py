from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from erp_app.models import *
from rest_framework.views import APIView
import json
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import viewsets, generics, permissions
from .serializers import *

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class CheckoutViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class UserCheckoutsView(generics.ListAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Checkout.objects.filter(user=user)

# class CreateCheckoutWithOrdersView(generics.CreateAPIView):
#     serializer_class = CheckoutSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def create(self, request, *args, **kwargs):
#         data = request.data

#         checkout_data = {
#             "total": data["total"],
#             "shipping_adress": data["shipping_adress"],
#             "payment_method": data["payment_method"],
#             "tracking_number": data["tracking_number"],
#             "user": request.user.id
#         }
#         checkout_serializer = self.get_serializer(data=checkout_data)
#         checkout_serializer.is_valid(raise_exception=True)
#         self.perform_create(checkout_serializer)

#         orders = data["orders"]
#         for order_data in orders:
#             order_data["user"] = request.user.id
#             order_data["checkout"] = checkout_serializer.data["id"]

#             order_serializer = OrderCreateSerializer(data=order_data)
#             order_serializer.is_valid(raise_exception=True)
#             order_serializer.save()

#         headers = self.get_success_headers(checkout_serializer.data)
#         return Response(checkout_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class CreateCheckoutWithOrdersView(generics.CreateAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data

        checkout_data = {
            "total": data["total"],
            "shipping_adress": data["shipping_adress"],
            "payment_method": data["payment_method"],
            "tracking_number": data["tracking_number"],
            "user": request.user.id
        }
        checkout_serializer = self.get_serializer(data=checkout_data)
        checkout_serializer.is_valid(raise_exception=True)
        self.perform_create(checkout_serializer)

        orders = data["orders"]
        for order_data in orders:
            order_data["user"] = request.user.id
            order_data["checkout"] = checkout_serializer.data["id"]

            order_serializer = OrderCreateSerializer(data=order_data)
            order_serializer.is_valid(raise_exception=True)
            order_serializer.save()
        checkout_id = checkout_serializer.data['id']
        checkout = Checkout.objects.get(id=checkout_id)
        checkout_serializer = self.get_serializer(checkout)
        
        headers = self.get_success_headers(checkout_serializer.data)
        return Response(checkout_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class CheckoutPaymentStatusUpdateView(APIView):
    def get(self, request, checkout_id):
        checkout = Checkout.objects.filter(id=checkout_id).first()

        if checkout is not None:
            checkout.payment_status = 'paid'
            checkout.complete=True
            checkout.save()
            return Response({"message": f"Checkout {checkout_id} updated successfully.", 'payment_status': 'paid','complete':True}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid checkout ID."}, status=status.HTTP_404_NOT_FOUND)
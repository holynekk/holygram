from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, CreateUserSerializer
from .models import User

# Create your views here.

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print(serializer.is_valid(), '---------------------------------------')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            user_name = serializer.data.get('user_name')
            password = serializer.data.get('password')
            queryset = User.objects.filter(user_name=user_name)
            if queryset.exists():
                return Response({'Bad Request': 'User with that username is already exists!'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User(first_name=first_name, last_name=last_name, user_name=user_name, password=password)
                user.save()
                return Response((UserSerializer(user).data), status=status.HTTP_201_CREATED)
        else:
            return Response({'Bad Request': 'Invalid Data.'}, status=status.HTTP_400_BAD_REQUEST)

from cgitb import lookup
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, CreateUserSerializer, PostSerializer, CreatePostSerializer
from .models import User, Post

# Create your views here.

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
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

class GetUserView(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'userName'

    def get(self, request, format=None):
        user_name = request.GET.get(self.lookup_url_kwarg)
        if user_name != None:
            user = User.objects.filter(user_name=user_name)
            if len(user) > 0:
                password = request.GET.get('password')
                if password == user[0].password:
                    return Response(UserSerializer(user[0]).data, status=status.HTTP_200_OK)
                return Response({'Unauthorized': 'Password is wrong.'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'User Not Found': 'Invalid User Name.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Username couldn\'t found in database'}, status=status.HTTP_400_BAD_REQUEST) 

class PostView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CreatePostView(APIView):
    serializer_class = CreatePostSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):
            user_name = serializer.data.get('user_name')
            heading = serializer.data.get('heading')
            caption = serializer.data.get('caption')
            post_image = request.FILES.get('post_image')
            post = Post(user_name=user_name, heading=heading, caption=caption, post_image=post_image)
            post.save()
            return Response((PostSerializer(post).data), status=status.HTTP_201_CREATED)
        else:
            return Response({'Bad Request': 'Invalid Data.'}, status=status.HTTP_400_BAD_REQUEST)

class GetAllPosts(generics.ListAPIView):
    serializer_class = PostSerializer
    def get(self, request, format=None):
        all_posts = Post.objects.all()
        return_posts = []
        if len(all_posts) > 0:
            for i in range(len(all_posts)):
                data = PostSerializer(all_posts[i]).data
                return_posts.append(data)
            return Response(return_posts, status=status.HTTP_200_OK)
        else:
            return Response([], status=status.HTTP_204_NO_CONTENT)

class GetPostsOfFollowing(generics.ListAPIView):
    lookup_url_kwarg = 'user'
    def get(self, request, format=None):
        user = request.GET.get(self.lookup_url_kwarg)
        if user != None:
            posts = Post.objects.filter(user_name=user)
            if len(posts) > 0:
                return Response([], status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'Bad Request': 'Invalid post data..'}, status=status.HTTP_400_BAD_REQUEST)
        


from rest_framework import serializers
from .models import User, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'user_name', 'password', 'created_at')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'user_name', 'password')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'user_name', 'heading', 'caption', 'post_image', 'created_at')

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('user_name', 'heading', 'caption', 'post_image')

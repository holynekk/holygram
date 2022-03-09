from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=20)
    user_name = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=24)
    created_at = models.DateTimeField(auto_now_add=True)

class Post(models.Model):
    user_name = models.CharField(max_length=20)
    heading = models.CharField(max_length=80)
    caption = models.CharField(max_length=500)
    post_image = models.ImageField(upload_to='images/')
    created_at = created_at = models.DateTimeField(auto_now_add=True)

class Follow(models.Model):
    follower = models.ForeignKey(User, related_name="follower", on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    first_followed = models.DateTimeField(auto_now_add=True)

from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name=''),
    path('login', index),
    path('sign-up', index),
    path('profile/<str:username>', index),
    path('search', index),
    path('create-post', index),
    
]


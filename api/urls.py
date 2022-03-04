from django.urls import path
from .views import UserView, CreateUserView, GetUserView

urlpatterns = [
    path('user', UserView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('get-user', GetUserView.as_view()),
]


from django.urls import path

from holygram.settings import MEDIA_ROOT, MEDIA_URL
from .views import UserView, CreateUserView, GetUserView, PostView, CreatePostView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('user', UserView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('get-user', GetUserView.as_view()),
    path('post', PostView.as_view()),
    path('create-post', CreatePostView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
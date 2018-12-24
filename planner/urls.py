from django.urls import path, include
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('',views.indexView, name='index'),
    path('login/', views.login_user, name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('stop/', views.stopwatch, name='stopwatch'),
    path('today/', views.today, name='today'),
]
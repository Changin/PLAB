from django.urls import path, include
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('',views.indexView, name='index'),
    path('login/', views.login_user, name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('stop/', views.stopwatch, name='stopwatch'),
    path('calandar/', views.calandar, name='calandar'),
    path('write/', views.write, name='write'),
    path('api/date/<int:year>/<int:month>/<int:day>',views.api_date, name='api_date'),
]

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.http import *
from django.shortcuts import render_to_response,redirect
from django.template import RequestContext
from .models import *
from django.contrib.auth import authenticate, login, logout
from .models import Schedule
from django.contrib.auth.models import User
import time

'''
if not request.user.is_authenticated:
    data = {'username': request.user, 'is_authenticated': request.user.is_authenticated}
else:
    data = {'last_login': request.user.last_login, 'username': request.user.username,
       'password': request.user.password, 'is_authenticated': request.user.is_authenticated}
'''

#캘린더
@login_required
def calandar(request):
    me = request.user.username
    context = {
        'username' : me,
        'schedules' : Scheduls.objects.filter(author=me)
    }
    return render(request, 'calandar.html', context)

#오늘의 일정 보기
@login_required
def today(request):
    #me = User.objects.get(username=request.user.username)
    me = request.user.username
    context = Schedule.objects.filter(author=me).order_by('start_time')
    return render(request, 'today.html',{'schedules': context})

#스톱워치
@login_required
def stopwatch(request):
    return render(request, 'stop.html')

#메인 화면
def indexView(request):
    username = ''
    if request.user.is_authenticated:
        username = request.user.username

    context = {
        'username' : username
    }

    return render(request, 'plap.html', context)

#로그인 화면
def login_user(request):
    logout(request)
    username = password = ''
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/')
    return render(request,'registration/login.html')
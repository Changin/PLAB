from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.http import *
from django.shortcuts import render_to_response,redirect
from django.template import RequestContext
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import time
from datetime import date
from django.db.models import Q

'''
if not request.user.is_authenticated:
    data = {'username': request.user, 'is_authenticated': request.user.is_authenticated}
else:
    data = {'last_login': request.user.last_login, 'username': request.user.username,
       'password': request.user.password, 'is_authenticated': request.user.is_authenticated}
'''

#캘린더 api 리퀘스트
@login_required
def api_date(request, year, month, day):
    #if request.method == "POST":
        #요청한 날짜의 일정만 JsonResponse
        me = User.objects.get(username=request.user.username)
        schedules = Schedule.objects.filter(Q(author=me) & Q(start_time__year=year) & Q(start_time__month=month) & Q(start_time__day=day) )

        titles = []
        texts = []
        start_times = []
        end_times = []

        for schedule in schedules:
            titles.append(schedule.title)
            texts.append(schedule.text)
            start_times.append(schedule.start_time)
            end_times.append(schedule.end_time)

        res = {
            'titles' : titles,
            'texts' : texts,
            'start_times' : start_times, 
            'end_times' : end_times,
        }

        return JsonResponse(res)
    #else:
    #   return redirect('index')

#캘린더
@login_required
def calandar(request):
    me = User.objects.get(username=request.user.username)
    context = {
        'username' : me,
        'schedules' : Schedule.objects.filter(author=me).order_by('start_time')
    }
    return render(request, 'calandar.html', context)

#오늘의 일정 보기
@login_required
def today(request):
    me = User.objects.get(username=request.user.username)
    today = date.today()
    context = {
        'schedules' : Schedule.objects.filter(author=me).order_by('start_time'),
        'today' : str(today.month) + "/" + str(today.day)
    }
    return render(request, 'today.html', context)

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
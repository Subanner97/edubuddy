from django.shortcuts import render
from Web_App.models import Colleges
from Web_App.models import Course
# Create your views here.

def home(request):
    return render(request, 'Web_App/home.html')
def chatbot(request):
    return render(request, 'Web_App/chatbot.html')
def college(request):
    return render(request, 'Web_App/colleges.html', {'college': Colleges.objects.all()})
def course(request):
    return render(request, 'Web_App/courses.html', {'course': Course.objects.all()})
def about(request):
    return render(request, 'Web_App/about.html')

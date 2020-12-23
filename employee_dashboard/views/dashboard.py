from django.shortcuts import render
from django.http import HttpResponse
from core.decorators import  employee_required
from django.contrib.auth.decorators import login_required


@login_required
@employee_required
def serve_dashboard(request):
    
    return render(request , 'index.html' )
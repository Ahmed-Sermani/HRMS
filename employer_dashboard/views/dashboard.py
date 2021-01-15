from django.contrib.auth.decorators import login_required
from core.decorators import  employer_required
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@login_required
@employer_required
def serve_dashboard(request):
    return HttpResponse(b'Employer Dashboard')

@csrf_exempt
@login_required
@employer_required
def optain_token(request):
    refresh = RefreshToken.for_user(request.user)
    return JsonResponse({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'name': request.user.first_name +' ' + request.user.last_name
    })

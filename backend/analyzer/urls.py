from django.urls import path
from .views import analyze_patient

urlpatterns = [
    # Use the exact function name you imported, without the 'views.' prefix
    path('analyze/', analyze_patient, name='analyze'),
]
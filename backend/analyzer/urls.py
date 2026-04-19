from django.urls import path
# Add search_patient to the import below!
from .views import analyze_patient, search_patient 

urlpatterns = [
    path('analyze/', analyze_patient, name='analyze'),
    path('patient/<str:patient_id>/', search_patient),
]
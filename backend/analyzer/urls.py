from django.urls import path
# 1. Added add_patient to the imports!
from .views import analyze_patient, search_patient, add_patient 

urlpatterns = [
    path('analyze/', analyze_patient, name='analyze'),
    
    # 2. Removed the old patient/<str:patient_id>/ path
    
    path("add-patient/", add_patient),
    path("search-patient/", search_patient),
]
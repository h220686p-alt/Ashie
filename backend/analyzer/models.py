from django.db import models
from django.utils import timezone

class PatientProfile(models.Model):
    patient_id = models.CharField(max_length=20, unique=True)
    patient_name = models.CharField(max_length=100)

    # FIXED: Added null=True, blank=True so existing rows don't crash the database
    date_of_birth = models.DateField(null=True, blank=True)
    
    # FIXED: Added null=True. Alternatively, you could use (default=timezone.now) 
    # to automatically set this to the current day when created.
    date_of_testing = models.DateField(null=True, blank=True)

    # FIXED: Text fields for history are usually optional, so it's safer to allow blanks
    patient_history = models.TextField(null=True, blank=True)
    drug_history = models.TextField(null=True, blank=True)

    UGT1A1 = models.CharField(max_length=30)
    CYP2D6 = models.CharField(max_length=30)
    ACE = models.CharField(max_length=30)
    CYP3A5 = models.CharField(max_length=30)

    variants_tested = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.patient_id} - {self.patient_name}"
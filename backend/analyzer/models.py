from django.db import models


class PatientProfile(models.Model):
    patient_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)

    UGT1A1 = models.CharField(max_length=30)
    CYP2D6 = models.CharField(max_length=30)
    ACE = models.CharField(max_length=30)
    CYP3A5 = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.patient_id} - {self.name}"
# Create your models here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PatientProfile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def add_patient(request):
    if request.method == "POST":
        data = json.loads(request.body)

        patient = PatientProfile.objects.create(
            patient_id=data["patient_id"],
            patient_name=data["patient_name"],
            date_of_birth=data["date_of_birth"],
            date_of_testing=data["date_of_testing"],
            patient_history=data["patient_history"],
            drug_history=data["drug_history"],
            variants_tested=data["variants_tested"],
            UGT1A1=data["UGT1A1"],
            CYP2D6=data["CYP2D6"],
            ACE=data["ACE"],
            CYP3A5=data["CYP3A5"]
        )

        return JsonResponse({"message": "Patient added successfully"})

def search_patient(request):
    query = request.GET.get("q", "")

    patients = PatientProfile.objects.filter(
        patient_name__icontains=query
    ) | PatientProfile.objects.filter(
        patient_id__icontains=query
    )

    results = []

    for patient in patients:
        results.append({
            "patient_id": patient.patient_id,
            "patient_name": patient.patient_name,
            "date_of_birth": patient.date_of_birth,
            "date_of_testing": patient.date_of_testing,
            "patient_history": patient.patient_history,
            "drug_history": patient.drug_history,
            "variants_tested": patient.variants_tested,
            "genes": {
                "UGT1A1": patient.UGT1A1,
                "CYP2D6": patient.CYP2D6,
                "ACE": patient.ACE,
                "CYP3A5": patient.CYP3A5
            }
        })

    return JsonResponse(results, safe=False)

@api_view(['POST'])
def analyze_patient(request):
    genes = request.data.get("genes", {})

    risk_score = 0
    recommendations = set()
    warnings = []
    explanations = []

    # --- UGT1A1 ---
    if genes.get("UGT1A1") == "reduced":
        risk_score += 1
        warnings.append("Increased dolutegravir side effects risk")
        explanations.append(
            "UGT1A1 reduced function decreases drug metabolism, increasing exposure to dolutegravir"
        )

    # --- CYP2D6 ---
    if genes.get("CYP2D6") == "poor":
        risk_score += 2
        recommendations.add("Avoid beta-blockers")
        explanations.append(
            "CYP2D6 poor metabolizers cannot effectively process beta-blockers"
        )

    # --- ACE ---
    if genes.get("ACE") == "variant":
        recommendations.add("Use ACE inhibitors")
        explanations.append(
            "ACE gene variant is associated with improved response to ACE inhibitors"
        )

    # --- CYP3A5 (extension) ---
    if genes.get("CYP3A5") == "non-expresser":
        risk_score += 1
        recommendations.add("Consider dose adjustment for certain antihypertensives")
        explanations.append(
            "CYP3A5 non-expression affects metabolism of some cardiovascular drugs"
        )

    # --- Determine Risk Level ---
    if risk_score >= 4:
        risk_level = "high"
    elif risk_score >= 2:
        risk_level = "medium"
    else:
        risk_level = "low"

    # --- Conflict Handling ---
    if "Avoid beta-blockers" in recommendations and "Use ACE inhibitors" in recommendations:
        explanations.append(
            "ACE inhibitors are preferred due to CYP2D6-related beta-blocker metabolism issues"
        )

    return Response({
        "risk_level": risk_level,
        "risk_score": risk_score,
        "recommendations": list(recommendations),
        "warnings": warnings,
        "explanations": explanations
    })
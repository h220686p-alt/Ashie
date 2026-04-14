from rest_framework.decorators import api_view
from rest_framework.response import Response

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
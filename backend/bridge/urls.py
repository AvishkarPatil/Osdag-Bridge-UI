from django.urls import path
from .views import (
    LocationListView, 
    LocationDataView,
    ValidateInputView,
    GeometryCalculatorView,
    MaterialsView,
    BridgeDesignView
)

urlpatterns = [
    path('locations/', LocationListView.as_view(), name='locations'),
    path('location-data/', LocationDataView.as_view(), name='location-data'),
    path('validate/', ValidateInputView.as_view(), name='validate'),
    path('calculate-geometry/', GeometryCalculatorView.as_view(), name='calculate-geometry'),
    path('materials/<str:material_type>/', MaterialsView.as_view(), name='materials'),
    path('designs/', BridgeDesignView.as_view(), name='designs-list'),
    path('designs/<int:design_id>/', BridgeDesignView.as_view(), name='designs-detail'),
]

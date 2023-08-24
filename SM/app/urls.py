from posixpath import basename
from django.urls import path
from .views import *
from app import views

urlpatterns = [
    path('api/get_selected_examen/<int:id>', views.getSelectedExemen),
    path('api/create_new_examen/', views.createNewExemen),
    path('api/update_examen/<int:id>', views.updateExamen),
    path('api/delete_examen/<int:id>', views.deleteExamen),
    path('api/get_all_examen_of_year/<int:month>/<int:year>', views.getAllExamenOfYear),

]


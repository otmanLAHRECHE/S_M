from dataclasses import fields
from rest_framework import serializers
from .models import *

class ExamenSerializer(serializers.ModelSerializer):

    class Meta:
        model= Exemen
        fields= ['id', 'name', 'prenom', 'patient_genre', 'date_naissance', 'date_test', 'no_registre', 'HIV_test', 'HBS_test', 'HCV_test', 'BW_test', 'TOXOPLASME_test', 'RUBIOLE_test', 'observation']






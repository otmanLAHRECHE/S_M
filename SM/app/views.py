from django.shortcuts import render
import datetime
from os import stat
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from calendar import monthrange
from .models import *
from .serializers import ExamenSerializer
from rest_framework import status
# Create your views here.

@api_view(['GET'])
def getAllExamenOfYear(request, month, year):
    if request.method == 'GET' and request.user.is_authenticated:

        range = monthrange(year, month)


        date_start = datetime.date(year , month, 1)
        date_end = datetime.date( year, month, range[1])

        queryset = Exemen.objects.filter(date_test__gte=date_start, date_test__lte=date_end).order_by("-date_test")

        source_serial = ExamenSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 
    

@api_view(['POST'])
def createNewExemen(request):
    if request.method == 'POST' and request.user.is_authenticated:

        name = request.data.pop('name')
        prenom = request.data.pop('prenom')
        date_n = request.data.pop('date_naissance')
        date_t = request.data.pop('date_test')
        no_registre = request.data.pop('no_registre')
        patient_genre = request.data.pop('patient_genre')
        HIV_test = request.data.pop('HIV_test')
        HBS_test = request.data.pop('HBS_test')
        HCV_test = request.data.pop('HCV_test')
        BW_test = request.data.pop('BW_test')
        TOXOPLASME_test = request.data.pop('TOXOPLASME_test')
        RUBIOLE_test = request.data.pop('RUBIOLE_test')
        observation = request.data.pop('observation')

        print(date_n)
        print(date_t)

        date_naissance = date_n.split("/")
        date_test = date_t.split("/")

        d_n = date_naissance[0]
        m_n = date_naissance[1]

        d_t = date_test[0]
        m_t = date_test[1]

        if d_n[0] == '0':
            d_n.replace('0','',1)
        if m_n[0] == '0':
            m_n.replace('0','',1)
        if d_t[0] == '0':
            d_t.replace('0','',1)
        if m_t[0] == '0':
            m_t.replace('0','',1)

        date_naissance[0] = d_n
        date_naissance[1] = m_n
        date_test[0] = d_t
        date_test[1] = m_t

        print(date_naissance)
        print(date_test)
        date_naissance = datetime.date(int(date_naissance[2]), int(date_naissance[1]), int(date_naissance[0]))
        date_test = datetime.date(int(date_test[2]), int(date_test[1]), int(date_test[0]))


        source = Exemen.objects.create(name = name, prenom = prenom, date_naissance=date_naissance, date_test=date_test, no_registre=no_registre, HIV_test=HIV_test, HBS_test=HBS_test, HCV_test=HCV_test, BW_test=BW_test, TOXOPLASME_test=TOXOPLASME_test, RUBIOLE_test=RUBIOLE_test, observation=observation, patient_genre=patient_genre)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"id_examen":source.id})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def updateExamen(request, id):
    if request.method == 'POST' and request.user.is_authenticated:

        name = request.data.pop('name')
        prenom = request.data.pop('prenom')
        date_n = request.data.pop('date_naissance')
        date_t = request.data.pop('date_test')
        no_registre = request.data.pop('no_registre')
        patient_genre = request.data.pop('patient_genre')
        HIV_test = request.data.pop('HIV_test')
        HBS_test = request.data.pop('HBS_test')
        HCV_test = request.data.pop('HCV_test')
        BW_test = request.data.pop('BW_test')
        TOXOPLASME_test = request.data.pop('TOXOPLASME_test')
        RUBIOLE_test = request.data.pop('RUBIOLE_test')
        observation = request.data.pop('observation')

        date_naissance = date_n.split("/")
        date_test = date_t.split("/")

        d_n = date_naissance[0]
        m_n = date_naissance[1]

        d_t = date_test[0]
        m_t = date_test[1]

        if d_n[0] == '0':
            d_n.replace('0','',1)
        if m_n[0] == '0':
            m_n.replace('0','',1)
        if d_t[0] == '0':
            d_t.replace('0','',1)
        if m_t[0] == '0':
            m_t.replace('0','',1)

        date_naissance[0] = d_n
        date_naissance[1] = m_n
        date_test[0] = d_t
        date_test[1] = m_t

        
        date_naissance = datetime.date(int(date_naissance[2]), int(date_naissance[1]), int(date_naissance[0]))
        date_test = datetime.date(int(date_test[2]), int(date_test[1]), int(date_test[0]))


        examen_to_update = Exemen.objects.get(id = id)

        if not examen_to_update.name == name:
            examen_to_update.name = name
        if not examen_to_update.prenom == prenom:
            examen_to_update.prenom = prenom
        if not examen_to_update.date_naissance == date_naissance:
            examen_to_update.date_naissance = date_naissance
        if not examen_to_update.date_test == date_test:
            examen_to_update.date_test = date_test
        if not examen_to_update.no_registre == no_registre:
            examen_to_update.no_registre = no_registre
        if not examen_to_update.HIV_test == HIV_test:
            examen_to_update.HIV_test = HIV_test
        if not examen_to_update.HBS_test == HBS_test:
            examen_to_update.HBS_test = HBS_test
        if not examen_to_update.HCV_test == HCV_test:
            examen_to_update.HCV_test = HCV_test
        if not examen_to_update.BW_test == BW_test:
            examen_to_update.BW_test = BW_test
        if not examen_to_update.TOXOPLASME_test == TOXOPLASME_test:
            examen_to_update.TOXOPLASME_test = TOXOPLASME_test
        if not examen_to_update.RUBIOLE_test == RUBIOLE_test:
            examen_to_update.RUBIOLE_test = RUBIOLE_test
        if not examen_to_update.observation == observation:
            examen_to_update.observation = observation
        if not examen_to_update.patient_genre == patient_genre:
            examen_to_update.patient_genre = patient_genre

        examen_to_update.save()
        

        source = Exemen.objects.create(name = name, prenom = prenom, date_naissance=date_naissance, date_test=date_test, no_registre=no_registre, HIV_test=HIV_test, HBS_test=HBS_test, HCV_test=HCV_test, BW_test=BW_test, TOXOPLASME_test=TOXOPLASME_test, RUBIOLE_test=RUBIOLE_test, observation=observation, patient_genre=patient_genre)

        return Response(status=status.HTTP_200_OK, data = {"status":"Examen updated"})
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def getSelectedExemen(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Exemen.objects.get(id = id)

        source_serial = ExamenSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    


@api_view(['DELETE'])
def deleteExamen(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Exemen.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Examen deleted"})
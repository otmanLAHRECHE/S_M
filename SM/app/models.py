from django.db import models



class Exemen(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    date_naissance = models.DateField()
    date_test = models.DateField()
    no_registre = models.IntegerField()
    HIV_test = models.CharField(max_length=150)
    HBS_test = models.CharField(max_length=150)
    HCV_test = models.CharField(max_length=150)
    BW_test = models.CharField(max_length=150)
    TOXOPLASME_test = models.CharField(max_length=150)
    RUBIOLE_test = models.CharField(max_length=150)
    observation = models.CharField(max_length=500)
    patient_genre = models.CharField(max_length=150)

    def __str__(self):
        return self.id
    
      


     




     
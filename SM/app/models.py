from django.db import models



class Service(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class TypeArticle(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)


    def __str__(self):
            return self.name
    

class Article(models.Model):
     id = models.AutoField(primary_key=True)
     name = models.CharField(max_length=100)
     type_article = models.ForeignKey(TypeArticle, on_delete=models.CASCADE)
     observation = models.CharField(max_length=100)

     def __str__(self):
            return self.name
     


class Stock(models.Model):
     id = models.AutoField(primary_key=True)
     stock_number = bon_number = models.IntegerField()
     article = models.ForeignKey(Article, on_delete=models.CASCADE)
     date_arrived = models.DateField()
     stock_qte = models.IntegerField()

     def __str__(self):
            return self.stock_number


class Sortie(models.Model):
     id = models.AutoField(primary_key=True)
     bon_number = models.IntegerField()
     service = models.ForeignKey(Service, on_delete=models.CASCADE)
     stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
     date_sortie = models.DateField()
     sortie_qte = models.IntegerField()

     def __str__(self):
            return self.stock_number
     

class History(models.Model):
      id = models.AutoField(primary_key=True)
      type_operation = models.CharField(max_length=50)
      number = models.IntegerField()
      service = models.CharField(max_length=100)
      article = models.CharField(max_length=100)
      type_article = models.CharField(max_length=100)
      qte = models.IntegerField()

      def __str__(self):
            return self.stock_number
      


     




     
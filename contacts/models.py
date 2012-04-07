from django.db import models

# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    owner = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name

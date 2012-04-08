from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    user = models.ForeignKey(User, related_name='contacts', null=True)

    def __unicode__(self):
        return self.name

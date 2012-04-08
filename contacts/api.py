from tastypie.resources import ModelResource
from contacts.models import Contact
from django.contrib.auth.models import User
from tastypie.authorization import Authorization


class ContactResource(ModelResource):
    class Meta:
        queryset = Contact.objects.all()
        resource_name = 'contact'
        authorization = Authorization()


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        excludes = ['email',
                    'password',
                    'is_active',
                    'is_staff',
                    'is_superuser']
        allowed_methods = ['get']

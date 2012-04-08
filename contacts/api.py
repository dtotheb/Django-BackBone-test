from tastypie.resources import ModelResource
from contacts.models import Contact


class ContactResource(ModelResource):
    class Meta:
        queryset = Contact.objects.all()
        resource_name = 'contact'

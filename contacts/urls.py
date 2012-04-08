from django.conf.urls import patterns, url, include
from contacts.api import ContactResource

contact_resource = ContactResource()

urlpatterns = patterns('',
    url(r'^$', 'contacts.views.index', name='index'),
    url(r'^create$', 'contacts.views.create', name='create'),
    url(r'^api/', include(contact_resource.urls)),
    )

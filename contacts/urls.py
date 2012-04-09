from django.conf.urls import patterns, url, include
from contacts.api import ContactResource, UserResource
from tastypie.api import Api


v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(ContactResource())

urlpatterns = patterns('',
    url(r'^$', 'contacts.views.index', name='index'),
    url(r'^create$', 'contacts.views.create', name='create'),
    url(r'^api/', include(v1_api.urls)),
    url(r'^backbone$', 'contacts.views.backbone', name='backbone')
    )

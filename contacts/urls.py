from django.conf.urls import patterns, url


urlpatterns = patterns('',
    url(r'^$', 'contacts.views.index', name='index'),
    url(r'^create$', 'contacts.views.create', name='create'),
    )

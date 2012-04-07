from django.conf.urls import patterns, url


urlpatterns = patterns('',
    url(r'^$', 'contacts.views.index'),
    )

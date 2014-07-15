from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required, permission_required

from editor import views



urlpatterns = patterns('',
    url(r'^$', 'views.editor', name='index'),
    url(r'^newmap/$', 'views.newMap', name='newMap'),
    url(r'^(?P<map_id>\d+)/editor/$', 'views.edit', name='edit'),
    url(r'^(?P<map_id>\d+)/uploadbackground/$', 'views.uploadMapBackground', name='uploadBackground'),
    url(r'^getbackgrounds/$', 'views.getBackgrounds', name='getBackgrounds'),
    url(r'^(?P<map_id>\d+)/choosebackground/$', 'views.chooseBackground', name="chooseBackground")
)
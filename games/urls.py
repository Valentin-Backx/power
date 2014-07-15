from django.conf.urls import patterns, url
from django.contrib.auth.decorators import login_required, permission_required

from games import views

urlpatterns = patterns('',
    url(r'^$', views.IndexView.as_view(), name='index'),#list of games
    url(r'^(?P<pk>\d+)/$', 'views.play', name='play'),
    url(r'^create/$', 'views.create', name='create'),
    url(r'^(?P<pk>\d+)/lobby/$', 'views.lobby', name='lobby'),
    url(r'^(?P<game_id>\d+)/ready/$', 'views.ready', name='ready'),
    url(r'^(?P<game_id>\d+)/leave/$', 'views.leave', name='leave'),
    url(r'^(?P<game_id>\d+)/enter/$', 'views.enter', name='enter'),
    url(r'^seek/$', 'views.seek', name='seek')

)
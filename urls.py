from django.conf.urls.defaults import *
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.core.urlresolvers import reverse


from django.conf import settings
# import registration
admin.autodiscover()

urlpatterns = patterns('',

    (r'^admin/', include(admin.site.urls)),

    url(r'^$', 'views.home',name="home"),


    #(r'^accounts/logout/$', 'django.contrib.auth.views.logout',{'next_page': '/'}),
    #(r'^accounts/', include('registration.backends.default.urls',namespace='auth')),
    (r'^accounts/', include('registration.backends.default.urls')),
    (r'^mygames/', include('games.urls',namespace='games')),
    (r'^editor/',include('editor.urls',namespace='editor')),
	(r'^medias/(?P<path>.*)$', 'django.views.static.serve', {
	'document_root': settings.MEDIA_ROOT})
)

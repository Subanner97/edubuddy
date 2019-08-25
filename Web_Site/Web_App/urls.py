from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views

app_name = "web_app"
urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^home$', views.home, name='home'),
    url(r'^chat$', views.chatbot, name='chatbot'),
    url(r'^college$', views.college, name='college'),
    url(r'^course$', views.course, name='course'),
    url(r'^about$', views.about, name='about'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()

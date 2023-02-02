"""Warden_Server_Hoster URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from . import views
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import path, re_path, include
from django.views.generic.base import RedirectView

favicon_view = RedirectView.as_view(url=staticfiles_storage.url('favicon/Images/Warden_Face.png'), permanent=True)

urlpatterns = [
    re_path(r'^favicon\.ico$', favicon_view),
    path('admin/', admin.site.urls),
    path('', include('django.contrib.auth.urls')),
    path('', views.base, name='base'),
    path('login', views.Login, name='Login'),
    path('Logout', views.Logout, name='Logout'),
    path('addServer', views.addServer, name='add_server')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
import datetime

from django import forms
from django.db import models

# Create your models here.
class Server(models.Model):
    Name = models.CharField(max_length=255)
    Description = models.TextField(max_length=82, null=True)
    Status = models.BooleanField(default=False)
    Game = models.TextField()
    Modpack = models.CharField(max_length=255, null=True)
    CoverImageLink = models.CharField(max_length=255, null=True)
    DateCreated = models.DateTimeField(default=datetime.datetime.now())

class AddServerForm(forms.ModelForm):
    class Meta:
        model = Server
        fields = ['Name', 'Description', 'Game', 'Modpack']
        widgets = {
            'Name': forms.TextInput(attrs={'class': 'form-control col-sm-3'}),
            'Description': forms.TextInput(attrs={'class': 'form-control col-sm-3'}),
            'Game': forms.TextInput(attrs={'class': 'form-control col-sm-3'}),
            'Modpack': forms.TextInput(attrs={'class': 'form-control col-sm-3'}),
        }

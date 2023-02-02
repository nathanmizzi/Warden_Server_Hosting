from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from Warden_App.models import Server, AddServerForm


@login_required
def base(request):

    servers = Server.objects.all()

    context = {
        "userName": request.user.first_name,
        "servers": servers
    }

    return render(request, 'HTML/Homepage.html', context)

@login_required
def home(request):
    return render(request, './HTML/Homepage.html')

def addServer(request):

    form = AddServerForm()

    context = {
        'form': form
    }

    if request.method == 'POST':
        form = AddServerForm(request.POST)
        if form.is_valid():
            form.save()
    else:
        pass

    return render(request, 'HTML/AddServerForm.html', context)

def Login(request):

    if request.method == 'POST':
        username = request.POST['Username']
        password = request.POST['Password']
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            redirect('base')
        else:
            return render(request, '../templates/registration/Login.html')
    else:
        return render(request, '../templates/registration/Login.html')

    return redirect('base')

def Logout(request):
    logout(request)
    return render(request, '../templates/registration/Logout.html')


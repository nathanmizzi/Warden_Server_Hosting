from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from Warden_App.models import Server, AddServerForm
import json

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

@login_required
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

@login_required
def serverConsole(request, serverID):

    context = {"userName": request.user.first_name}

    return render(request, 'HTML/ServerConsole.html', context)

@login_required
def enableServer(request):

    if request.is_ajax and request.method == "POST":

        print("Enable Server Called!")

        serverID = request.POST.get("serverID")

        if serverID is not None:

            server = Server.objets.get(pk=serverID)
            server.Status = True
            server.save()

            response = {"status": True}

            response = json.loads(response)

            return response

        else:
            # TODO: Implement an error page and redirect to it instead
            return redirect("base")

    else:
        return redirect("base")

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




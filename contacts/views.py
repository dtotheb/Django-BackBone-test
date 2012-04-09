# Create your views here.
from contacts.models import Contact
from django.shortcuts import render, redirect
from contacts.forms import ContactForm


def index(request):
    """
    Index view - lists contacts
    """
    contacts = Contact.objects.filter(user=request.user.id)
    form = ContactForm()
    context = {'contacts': contacts,
               'title': 'contacts',
               'form': form,
              }
    return render(request, 'contacts/index.html', context)


def create(request):
    """
    Create Contact view - takes posts
    """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save(commit=False)
            contact.user = request.user
            contact.save()
            return redirect('index')
        else:
            return redirect('index')

def backbone(request):
    """
    Backbone view - used for testing the backbone.js view into the app
    """
    return render(request, 'contacts/backbone.html')

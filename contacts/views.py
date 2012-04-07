# Create your views here.
from contacts.models import Contact
from django.shortcuts import render_to_response


def index(request):
    """
    Index view - lists contacts
    """
    contacts = Contact.objects.all()
    return render_to_response('contacts/index.html', {'contacts': contacts})

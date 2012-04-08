from contacts.models import Contact
from django.contrib import admin


class ContactAdmin(admin.ModelAdmin):
    fields = ['name', 'email', 'user']


admin.site.register(Contact, ContactAdmin)

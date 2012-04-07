from contacts.models import Contact
from django.contrib import admin


class ContactAdmin(admin.ModelAdmin):
    fields = ['name', 'email']


admin.site.register(Contact, ContactAdmin)

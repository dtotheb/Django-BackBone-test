from django.test import TestCase
from django.core.urlresolvers import reverse
from contacts.models import Contact


class TestHelper(object):

    def create_contact(self, **kwargs):
        """
        Creates a Contact model in the DB
        """
        defaults = {
            'name': 'test',
            'email': 'test@test.com'
        }
        defaults.update(kwargs)
        return Contact.objects.create(**defaults)


class index_TestCase(TestHelper, TestCase):
    """
    Tests the index view
    """
    def setUp(self):
        TestHelper.create_contact(self)
        self.url = reverse('index')

    def test_pageLoads(self):
        """
        Tests that the page loads, and uses the expected template.
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'contacts/index.html')

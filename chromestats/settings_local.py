from mongoengine import connect
#connect('facefetti', username='facefetti', password='facefacepw')
connect('chromestats', host='localhost', port=27017)

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    '/Users/chrishughes/Projects/stats/chromestats/stats_site/templates'
)

MEDIA_ROOT = '/Users/chrishughes/Projects/stats/chromestats/stats_site/media'
STATIC_ROOT = "/Users/chrishughes/Projects/stats/chromestats/media"
SITE_URL = 'http://127.0.0.1:8000'

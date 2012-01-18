from mongoengine import connect
#connect('facefetti', username='facefetti', password='facefacepw')
connect('pluginnetwork', host='mongo1', username='pnuser', password='pnpassword', port=27017)

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    '/var/www/neatbookmarksapp_webapp/'
)

MEDIA_ROOT = '/var/www/chromestats/media'
STATIC_ROOT = '/var/www/chromestats/media'
SITE_URL = 'http://chromestats.iicdn.com'

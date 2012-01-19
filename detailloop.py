import json
import os
import pprint
from mongoengine import connect
connect('chromestats', host='localhost', port=27017)

from chromestats.stats_site.models import *

for extension in ChromeAppIds.objects.all():
    jsondata = os.popen("phantomjs details.js "+extension.guid)
    data = json.load(jsondata)
    plusdata = os.popen("phantomjs plusone.js "+extension.guid)
    pluscount = plusdata.read().replace("\n","")

    extensiondata, created = ChromeAppData.objects.get_or_create(
            guid=extension.guid)
    if created:
        extensiondata.guid = extension.guid
        extensiondata.name = data.name
        extensiondata.icon = data.icon
        extensiondata.rating = data.rating
        extensiondata.category = data.category
        extensiondata.current_usercount = data.usercount
        extensiondata.initial_usercount = data.usercount
        extensiondata.description = data.description
        extensiondata.version = data.version
        extensiondata.updated = data.updated
        extensiondata.language = data.language
        extensiondata.allwebsites = data.aw
        extensiondata.save()
    else:
        extensiondata.current_usercount = data.usercount
        extensiondata.version = data.version
        extensiondata.updated = data.updated
        extensiondata.language = data.language
        extensiondata.save()
    
    datum = ChromeAppHistricData()
    datum.guid = extension.guid
    datum.usercount = data.usercount
    datum.plusone = pluscount
    datum.storeposition = extension.storeposition
    datum.date = datetime.datetime.now()
    datum.save()
    
    print "processed " + extension.guid
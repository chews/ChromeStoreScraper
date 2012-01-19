import json
import os
import pprint
from mongoengine import connect
connect('chromestats', host='localhost', port=27017)

from chromestats.stats_site.models import *
jsondata = os.popen("phantomjs crawler.js")
data = json.load(jsondata)

for i in range(0, len(data)):
    datum = data[str(i)]
    extensiondata, created = ChromeAppIds.objects.get_or_create(
            guid=datum["guid"])
    if created:
        extensiondata.guid = datum["guid"]
        extensiondata.apptype = 1
        extensiondata.storeposition = datum["storeposition"]
        extensiondata.promostatus = datum["promostatus"]
        extensiondata.save()
    else:
        extensiondata.storeposition = datum["storeposition"]
        extensiondata.save()
    print "processed " + str(i) + " for id " + datum["guid"]
    
    
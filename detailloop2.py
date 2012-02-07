import json
import os
import pprint
from mongoengine import connect
connect('chromestats', host='localhost', port=27017)
import multiprocessing
import time
from chromestats.stats_site.models import *

def worker(ext):
    extension = ChromeAppIds.objects.get(guid=ext)
    jsondata = os.popen("phantomjs details.js "+extension.guid)
    data = json.load(jsondata)
    plusdata = os.popen("phantomjs plusone.js "+extension.guid)
    pluscount = plusdata.read().replace("\n","")

    extensiondata, created = ChromeAppData.objects.get_or_create(
            guid=extension.guid)
    if created:
        extensiondata.guid = extension.guid
        extensiondata.name = data["name"]
        extensiondata.icon = data["icon"]
        extensiondata.rating = float(data["rating"])
        extensiondata.category = data["category"]
        extensiondata.current_usercount = int(data["usercount"].replace(",",""))
        extensiondata.initial_usercount = int(data["usercount"].replace(",",""))
        extensiondata.description = data["description"]
        extensiondata.version = data["version"]
        extensiondata.updated = data["updated"]
        extensiondata.language = data["language"]
        extensiondata.storeposition = int(extension.storeposition)
        extensiondata.plusone = int(pluscount)
        extensiondata.allwebsites = data["aw"]
        extensiondata.save()
    else:
        extensiondata.current_usercount = int(data["usercount"].replace(",",""))
        extensiondata.rating = float(data["rating"])
        extensiondata.version = data["version"]
        extensiondata.updated = data["updated"]
        extensiondata.language = data["language"]
        extensiondata.plusone = int(pluscount)
        extensiondata.storeposition = int(extension.storeposition)
        extensiondata.save()
    
    datum = ChromeAppHistricData()
    datum.guid = extension.guid
    datum.usercount = int(data["usercount"].replace(",",""))
    datum.plusone = int(pluscount)
    datum.rating = float(data["rating"])
    datum.storeposition = int(extension.storeposition)
    datum.date = datetime.datetime.now()
    datum.save()
    print "processed " + extension.guid


def batch(arr):
    jobs = []
    for i in range(0,len(arr)):
        p = multiprocessing.Process(args=(arr[i],), target=worker)
        jobs.append(p)
        p.start()
        print "started job"

    time.sleep((len(jobs)*1.47))

    for i in range(0,len(jobs)):
        if (jobs[i].is_alive()):
            print "killing job"
            jobs[i].terminate();
            jobs[i].join();

guids = []
for extension in ChromeAppIds.objects.all():
    guids.append(extension.guid)

counter = 0
while (counter < len(guids)):
    eb = []
    if counter < len(guids):
        eb.append(guids[counter])
        counter=counter+1
    if counter < len(guids):
        eb.append(guids[counter])
        counter=counter+1
    if counter < len(guids):
        eb.append(guids[counter])
        counter=counter+1
    if counter < len(guids):
        eb.append(guids[counter])
        counter=counter+1
    if counter < len(guids):
        eb.append(guids[counter])
        counter=counter+1

    batch(eb)
    #print type(guids[counter])

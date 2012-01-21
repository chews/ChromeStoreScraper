# Create your views here.
from chromestats.stats_site.models import *

from mongoengine import *
import mongoengine
from pymongo.objectid import ObjectId
from types import ModuleType
from itertools import groupby


from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.core import serializers
from django.conf import settings
import re
import urllib
import json
import pymongo
import datetime
import random
import simplejson


def encode_model(obj):
    if isinstance(obj, (mongoengine.Document, mongoengine.EmbeddedDocument)):
        out = dict(obj._data)
        for k,v in out.items():
            if isinstance(v, ObjectId):
                out[k] = str(v)
    elif isinstance(obj, mongoengine.queryset.QuerySet):
        out = list(obj)
    elif isinstance(obj, types.ModuleType):
        out = None
    elif isinstance(obj, groupby):
        out = [ (g,list(l)) for g,l in obj ]
    elif isinstance(obj, (list,dict)):
        out = obj
    else:
        raise TypeError, "Could not JSON-encode type '%s': %s" % (type(obj), str(obj))
    return out

def index(request):
    extensions = ChromeAppData.objects.all().order_by('storeposition')

    return render_to_response('index.html', {
        'extensions':extensions})

def jsonr(request):
    base = ChromeAppData.objects.all().order_by('storeposition')
    return HttpResponse(simplejson.dumps(base, default=encode_model),mimetype="application/json")
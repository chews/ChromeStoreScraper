# Create your views here.
from chromestats.stats_site.models import *
from mongoengine import *

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


def index(request):
    extensions = ChromeAppData.objects.all().order_by('storeposition')

    return render_to_response('index.html', {
        'extensions':extensions})
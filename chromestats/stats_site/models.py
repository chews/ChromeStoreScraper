import datetime
from mongoengine import *

class ChromeAppIds(Document):
    guid = StringField(max_length=255)
    apptype = IntField(default=1)
    storeposition = IntField()
    promostatus = IntField(default=1)
    

class ChromeAppData(Document):
    guid = StringField(max_length=255)
    name = StringField(max_length=255)
    icon = StringField(max_length=255)
    rating = FloatField()
    category = StringField(max_length=255)
    current_usercount = IntField()
    initial_usercount = IntField()
    description = StringField()
    version = StringField(max_length=255)
    updated = StringField(max_length=255)
    language = StringField()
    storeposition = IntField()
    plusone = IntField()
    allwebsites = IntField()


class ChromeAppHistricData(Document):
    guid = StringField(max_length=255)
    usercount = IntField()
    plusone = IntField()
    rating = FloatField()
    storeposition = IntField()
    date = DateTimeField()
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Colleges
from .models import Course
from .models import Chat

admin.site.register(Colleges)
admin.site.register(Course)
admin.site.register(Chat)
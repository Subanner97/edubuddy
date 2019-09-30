# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Colleges
from .models import Course

admin.site.register(Colleges)
admin.site.register(Course)

  
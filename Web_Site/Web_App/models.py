# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

from django.db import models

class Colleges(models.Model):
     college = models.CharField('College Name', max_length=120)
     courses = models.CharField('Courses Available', max_length=120)
     address = models.CharField(max_length=120)
     marks = models.IntegerField(default='50')
     phone = models.IntegerField(null=True)
     fees = models.TextField(blank=True)
     
class Course(models.Model):
     name = models.CharField('Course Name', max_length=120)
     exam = models.CharField('Exam Required', max_length=120, null=True)
class Chat(models.Model):
     name = models.CharField('Course Name', max_length=120)
     marks = models.IntegerField(default='50')

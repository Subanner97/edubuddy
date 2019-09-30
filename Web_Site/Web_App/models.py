# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Colleges(models.Model):
     def __str__(self):
          return 'College Name: ' + self.college
     college = models.CharField('College Name', max_length=120)
     courses = models.CharField('Courses Available', max_length=120)
     address = models.CharField(max_length=120)
     marks = models.IntegerField(default='50')
     phone = models.IntegerField(null=True)
     fees = models.TextField(blank=True)
     fields = ('college', 'address', 'marks', 'phone', 'fees')
     
class Course(models.Model):
     name = models.CharField('Course Name', max_length=120)
     exam = models.CharField('Exam Required', max_length=120, null=True)

class Blog(models.Model):
   title = models.CharField(max_length=100, unique=True)
   slug = models.SlugField(max_length=100, unique=True)
   body = models.TextField()
   posted = models.DateField(db_index=True, auto_now_add=True)
   category = models.ForeignKey('Web_App.Category', on_delete=models.PROTECT)

class Category(models.Model):
     title = models.CharField(max_length=100, db_index=True)     
     slug = models.SlugField(max_length=100, db_index=True)

#     def __str__(self):
#         return self.title
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

class Post(models.Model):
    title = models.CharField(max_length=250)
    text = models.TextField()
    author = models.CharField(max_length=150, default="no Author")
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        ordering = ('created',)
# Create your models here.

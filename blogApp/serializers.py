from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Post, LANGUAGE_CHOICES, STYLE_CHOICES

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields = '__all__'
    # id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField(required=False, allow_blank=True, max_length=250)
    # text = serializers.CharField(style={'base_template': 'textarea.html'})
    # language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
    # style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')
    #
    # def create(self, validate_data):
    #     return Post.objects.create(**validate_data)
    #
    # def update(self, instance, validate_data):
    #
    #     instance.title = validate_data.get('title', instance.title)
    #     instance.text = validate_data.get('text', instance.text)
    #     instance.language = validate_data.get('language', instance.language)
    #     instance.style = validate_data.get('style', instance.style)
    #     instance.save()
    #     return instance
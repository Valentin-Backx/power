# -*- coding: utf-8 -*-
from games.models import Background
from django import forms

class TextureForm(forms.Form):
    texture = forms.FileField(
        label='Select a file for this case texture',
        help_text='max. 42 megabytes'
    )

class BackgroundForm(forms.Form):
	model = Background

	name = forms.CharField(
		label = 'select a name for this background',
		help_text = 'prout'
	)
	background = forms.FileField(
		label = 'Select a file for your whole map background',
		help_text = 'max. 42 megabytes'
	)

	
class UnitSpriteForm(forms.Form):
	sprite = forms.FileField(
		label = 'Select a file for this unit sprite',
		help_text = 'max. 42 megabytes'
	)
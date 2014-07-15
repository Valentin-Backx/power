# -*- coding: utf-8 -*-

import datetime
from django.utils import timezone 

from django.db import models

from django.contrib.auth.models import User

class Game(models.Model):
	name = models.CharField(max_length=200)
	start_date = models.DateTimeField('date started')
	map = models.ForeignKey('MapPatron')
	is_launched = models.BooleanField(default = 0)

	def __unicode__(self):
	    return self.name

	def is_full(self):
	    return (len(self.player_set.all()) == self.map.max_player)

	def areAllReady(self):
		return len(self.player_set.filter(is_ready=False)) == 0

	def getAvailableSpot(self):
	    nb_players = self.player_set.count()
	    return self.map.playerspot_set.all()[nb_players]

	def hasPlayerUser(self,user):
	    return len(self.player_set.filter(user=user)) > 0

	def playerReady(self,user):
	    player = self.player_set.filter(user=user)[0]
	    player.ready()

	def playerLeft(self,user):
		player = self.player_set.filter(user=user)[0]
		player.delete()


	def initialize(self):

	    for unit in self.map.starting_units.all():#prevoir le cas ou il n'y a qu'une unit (utiliser .get et pas .all)
		    for player in self.player_set.all():
	        	p = Piece(case = player.spot.hq,unit = unit,owner=player)

	    self.start_date = timezone.now()
	    self.save()

class Round(models.Model):
	game = models.ForeignKey(Game)


	def all_players_ready():
		allReady = True
		for player in self.game.player_set.all():
		    if not player.ready:
				allReady = False
		return allReady




class Order(models.Model):
	player = models.ForeignKey('Player')

class BuildOrder(Order):
	build_order = models.CharField(max_length=200)

class MergeOrder(Order):
	unit_create_order = models.CharField(max_length=200)

	unit1 = models.ForeignKey('Unit',related_name="merge_unit_1")
	unit2 = models.ForeignKey('Unit',related_name="merge_unit_2")
	unit3 = models.ForeignKey('Unit',related_name="merge_unit_3")


class MoveOrder(Order):
	unit = models.ForeignKey('Unit')
	destination = models.ForeignKey('Case')
	


class Player(models.Model):
	game = models.ForeignKey('Game')
	user = models.ForeignKey(User)
	color = models.CharField(max_length=100)

	is_ready = models.BooleanField(default = 0)

	spot = models.ForeignKey('PlayerSpot')

	def __unicode__(self):
		return self.user.username

	def ready(self):
	    self.is_ready = True
	    self.save()



#Une seule instance du modele par map. Quel que soit le nombre de parties en cours.
#J'arrive pas à penser à une autre façon de faire pour le moment
class MapPatron(models.Model):
	name = models.CharField(max_length=200)

	max_player = models.IntegerField(blank=True,null=True)

	start_cases = models.ManyToManyField("Case",blank=True,null=True)#cases de démarrage possible sur cette carte

	starting_units = models.ManyToManyField("Unit",blank=True,null=True)

	background = models.ForeignKey('Background',blank=True, null=True)

	creator = models.ForeignKey(User)

	def __unicode__(self):
		return self.name

class Sector(models.Model):
	name = models.CharField(max_length=200)

	map = models.ForeignKey('MapPatron')

	owner = models.ForeignKey('PlayerSpot',blank=True,null=True)

	def __unicode__(self):
	    return self.name

class PlayerSpot(models.Model):
	name = models.CharField(max_length=200)
	map = models.ForeignKey('MapPatron')
	hq = models.ForeignKey('Case') #case de démarrage


	def __unicode__(self):
		return self.name


class Case(models.Model):
	name = models.CharField(max_length=10)

	sector = models.ForeignKey(Sector)
	has_land = models.BooleanField(default = 1)
	has_water = models.BooleanField(default = 1)
	adj = models.ManyToManyField('Case',blank=True, null=True)

	texture = models.ForeignKey('Texture',blank=True, null=True)

	def __unicode__(self):
		return self.name



class Coordinate(models.Model):
	case = models.ForeignKey('Case')

	x = models.IntegerField()
	y = models.IntegerField()



class Reserve(Case):
	player = models.ForeignKey(Player)
	powers = models.IntegerField()


class Piece(models.Model):
	case = models.ForeignKey(Case)
	can_move = models.BooleanField(default=True)

	owner = models.ForeignKey("Player")

	unit = models.ForeignKey("Unit")

#TOP LEVEL UNIT MODEL#
class Unit(models.Model):
	name = models.CharField(max_length=200)

	power = models.IntegerField()
	moveRange = models.IntegerField()
	
	sprite = models.FileField(upload_to='units_sprites')

	def __unicode__(self):
		return self.name

class Texture(models.Model):

	name = models.CharField(max_length=200)

	user = models.ForeignKey(User)

	texture = models.FileField(upload_to='case_textures')

class Background(models.Model):

	name = models.CharField(max_length=200)

	user = models.ForeignKey(User)

	background = models.FileField(upload_to='map_backgrounds')

#LEVEL 2 UNIT MODEL#
class NavalUnit(Unit):
	pass

class ArmoredUnit(Unit):
	pass

class AirUnit(Unit):
	pass

class TroopUnit(Unit):
	pass


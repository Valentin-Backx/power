# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse,HttpResponseRedirect,HttpResponseBadRequest
from django.core.urlresolvers import reverse
from django.views import generic# Create your views here.
from django.shortcuts import render_to_response
import datetime
from django.utils import timezone
from django.contrib.auth.decorators import login_required, permission_required
from django.template import RequestContext

import re
from games.models import MapPatron,Game,Player,Texture,Background



import django.contrib.auth.views as authViews


from editor.views import *

def home(request):
	logout = None
	if request.user.is_authenticated:
		logout = "logout"
	return render_to_response("home.html",{'logout':logout, 'name' : request.user.username },context_instance=RequestContext(request))

@login_required
def logout(request):
	authViews.logout(request)
	return HttpResponseRedirect(reverse("home"))

@login_required
def ready(request,game_id):
	game = Game.objects.get(pk = game_id)

	game.playerReady(request.user)
	
	if game.areAllReady() and game.is_full():
		game.initialize()
		return HttpResponseRedirect(reverse('games:play',args=(game.id,)))
	else:
	    return HttpResponseRedirect(reverse('games:lobby',args=(game.id,)))

@login_required
def leave(request,game_id):
	game = Game.objects.get(pk = game_id)

	game.playerLeft(request.user)

	return HttpResponseRedirect(reverse('games:index'))


@login_required
def create(request):
	#penser à tester si le joueur enregistré n'a pas déjà n parties maximum de crées à son actif

	if request.method == "POST":

		try:
			chosen_name = request.POST["name"]
			if not re.search('^[a-zA-Z0-9_]*$',chosen_name):
				raise "WrongNameError"
			selected_map = MapPatron.objects.get(id=request.POST['map'])

		except (KeyError,"WrongNameError"):
			return render(request, 'games/create.html', {
	            'error_message': "You didn't select an existing map/invalid game name. Only characters a-z A-Z and 0-9 are accepted.",
	        })


		else:
			g = Game(name=chosen_name,start_date=timezone.now(),map=selected_map)
	        g.save()
	        return HttpResponseRedirect(reverse('games:lobby', args=(g.id,)))
	else:
		list_maps = MapPatron.objects.all()
		return render_to_response('games/create.html', { 'list_maps': list_maps },context_instance=RequestContext(request))


@login_required
def lobby(request,pk):
	g = Game.objects.get(pk=pk)

	if not g.hasPlayerUser(request.user):
		g.player_set.create(game=g,user=request.user,color="pink",spot=g.getAvailableSpot())

	player_list = g.player_set.all()
	return render_to_response("games/lobby.html",{
		'game':g,
		'player_list':player_list,
		'ready':Player.objects.get(game=g,user=request.user).is_ready
		},context_instance=RequestContext(request))


@login_required
def enter(request,game_id):
	game = Game.objects.get(id=game_id)
	if game.areAllReady() and game.is_full():
		return HttpResponseRedirect(reverse("games:play",args=(game.id,)))
	else:
		return HttpResponseRedirect(reverse("games:lobby",args=(game.id,)))


@login_required
def play(request,pk):
	game = Game.objects.get(pk=pk)

	if not game.areAllReady() and game.is_full():
		return HttpResponseRedirect(reverse("games:lobby",args=(game.id,)))
	else:
		players = []
		for player in game.player_set.all():
			playerDic = {'player':player.user.username}

			unitList = []

			for piece in player.piece_set.all():
				unitList.append({
					'name':piece.unit.name,
					'power':piece.unit.power,
					'range':piece.unit.moverange,
					'position':piece.case,
					'can_move':piece.can_move
					})
				
			playerDic['units'] = unitList

			playerDic['power'] = player.reserve.powers
			players.append(playerDic)

		map = []
		for sector in game.map.sector_set.all():
			sectorDic  = { 'sector':sector.name }

			for case in sector.case_set.all():
				sectorDic[case.name] = {
					'has_land':case.has_land,
					'has_water':case.has_water,
					'adj':[ adj.name for adj in case.adj.all()]

					}

			map.append(sectorDic)


		return render_to_response("games/play.html",{'players':players,'map':map},context_instance=RequestContext(request))


@login_required
def seek(request):
	games = list(Game.objects.all())

	userPlayers = request.user.player_set.all()

	for player in userPlayers:
		games.remove(player.game)

	return render_to_response('games/seek.html',{'candidates':games},context_instance=RequestContext(request))



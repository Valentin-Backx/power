# -*- coding: utf-8 -*-
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic# Create your views here.
from django.shortcuts import render_to_response
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

# import re

from games.models import Game,MapPatron



class IndexView(generic.ListView):
    template_name = 'games/index.html'
    context_object_name = 'latest_games'

    def get_queryset(self):
    	"""Return the player's games."""
    	return Game.objects.filter(player__user=self.request.user)#order_by('-pub_date')[:5] 

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)

# @login_required
# def create(request):
# 	#penser à tester si le joueur enregistré n'a pas déjà n parties maximum de crées à son actif

# 	if request.method == "POST":

# 		try:
# 			chosen_name = request.POST["name"]
# 			if not re.search('[a-zA-Z0-9]',chosen_name):
# 				raise "WrongNameError"
# 			selected_map = Map.objects.get(request.POST['map'])

# 		except (KeyError,"WrongNameError"):
# 			return render(request, 'games/create.html', {
# 	            'error_message': "You didn't select an existing map/invalid game name. Only characters a-z A-Z and 0-9 are accepted.",
# 	        })


# 		else:
# 			g = Game(name=chosen_name,start_date=timezone.now(),map=selected_map.id)
# 	        g.save()
# 	        return HttpResponseRedirect(reverse('games:lobby', args=(g.id,)))
# 	else:
			
# 		return render_to_response('games/create.html', { 'list_maps': list_maps })

# @login_required
# def lobby(request,pk):

# 	game = Game.objects.get(pk=pk)

# 	players = game.player_set.all()

# 	#testing if user player already is in lobby
# 	for player in players:
# 		if player.user == request.user:
# 			continue
# 		else:
# 			p = Player(game=game,user=request.user,color="white")#see later to adjust colors...
# 			break;

# 	return render_to_response('games/lobby.html', { 'player_list': players,'game':game })


# @login_required
# def ready(request,game_id):
# 	game = Game.objects.get(pk = game_id)



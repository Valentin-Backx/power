from games.models import Game,Player
from django.contrib.auth.models import User

u = User.objects.all()[1]


def retrieve(user):
	games = list(Game.objects.all())

	userPlayers = u.player_set.all()
	
	for player in userPlayers:
		games.remove(player.game)

	return games


toto = "tata"
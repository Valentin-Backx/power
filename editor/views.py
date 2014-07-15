# Create your views here.
from django.contrib.auth.decorators import login_required, permission_required

from games.models import MapPatron
from django.shortcuts import render_to_response
from django.template import RequestContext

from games.forms import BackgroundForm
from games.models import Background

from django.http import HttpResponse,HttpResponseRedirect,HttpResponseBadRequest
from django.core.urlresolvers import reverse

import json

@login_required
def editor(request):
	maps = MapPatron.objects.filter(creator=request.user)

	return render_to_response('editor/editor.html',{'maps':maps},context_instance=RequestContext(request))

@login_required
def edit(request,map_id):
	map = MapPatron.objects.get(id=map_id)

	form = BackgroundForm()

	return render_to_response('editor/map_editor.html',{'map':map,'backgroundForm':form},context_instance=RequestContext(request))

@login_required
def newMap(request):

	try:
		chosen_name = request.POST["name"]
		if not re.search('^[a-zA-Z0-9_]*$',chosen_name):
					raise "WrongNameError"
	except ("WrongNameError"):
		
		map = MapPatron.objects.filter(user=request.user)

		return render(request, 'editor/editor.html', {
	            'error_message': "You put an invalid name. Only characters a-z A-Z and 0-9 are accepted.",
	            'maps':maps
	        })

	else:
		m = MapPatron(name=chosen_name,creator=request.user)

		m.save()
		
		return HttpResponseRedirect(reverse("editor:edit",args=(m.id,)))

@login_required
def uploadMapBackground(request,map_id):
	form = BackgroundForm(request.POST,request.FILES)
	if form.is_valid():
		background = Background(name=request.POST['name'],user=request.user,background=request.FILES['background'])
		background.save()

		return HttpResponseRedirect(reverse("editor:edit",args=(map_id,)))

	return HttpResponseBadRequest("nope")


@login_required
def uploadTexture(request):

    form = TextureForm(request.POST, request.FILES)
    if form.is_valid():
        texture = Texture(name=request.POST['name'],user=request.user,texture = request.FILES['texture'])
        texture.save()

        # Redirect to the document list after POST
        return HttpResponse("texture file successfully uploaded")

    return HttpResponseBadRequest("nope")

@login_required
def getBackgrounds(request):
	user = request.user
	bgs = user.background_set.all()

	response_data = {}



	for bg in bgs:
		response_data[bg.name] = bg.background.url
	

	return HttpResponse(json.dumps(response_data),content_type="application/json")

@login_required
def getTextures(request):
	user = request.user
	textures = user.texture_set.all()

	response = HttpResponse()

	for texture in textures:
		response.write(texture.texture.url)

	return response

@login_required
def chooseBackground(request,map_id):
	bgName = request.POST['name']

	try:
		bg = Background.objects.get(name=bgName)

	except("DoesNotExist"):
		return HttpResponseBadRequest ("non existent background")

	else:
		map = MapPatron.objects.get(id=map_id)

		map.background = bg

		map.save()

		return HttpResponseRedirect(reverse('editor:edit',args=(map_id)))
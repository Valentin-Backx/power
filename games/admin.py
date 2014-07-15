from django.contrib import admin
from games.models import MapPatron,Case,Sector,NavalUnit,AirUnit,TroopUnit,ArmoredUnit,PlayerSpot

class CaseInline(admin.TabularInline):
	model = Case
	extra = 6

class SectorInline(admin.ModelAdmin):
    inlines = [CaseInline]



admin.site.register(MapPatron)

admin.site.register(Sector,SectorInline)

admin.site.register(NavalUnit)
admin.site.register(AirUnit)
admin.site.register(TroopUnit)
admin.site.register(ArmoredUnit)
admin.site.register(PlayerSpot)
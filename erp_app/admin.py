from django.contrib import admin
from .models import *
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'department')
    

class ProductAdmin(admin.ModelAdmin):
   list_display =('name','category') 

class FournisseurAdmin(admin.ModelAdmin):
    list_display =('nom','prenom','type_matiere')
        


admin.site.register(User, UserAdmin)
admin.site.register(Product,ProductAdmin)
admin.site.register(Fournisseur,FournisseurAdmin)

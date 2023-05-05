from django.contrib import admin
from .models import *
from api.admin import *

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('username', 'department')

class FournisseurAdmin(admin.ModelAdmin):
    list_display =('nom','prenom','type_matiere')
        


admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Fournisseur,FournisseurAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Checkout)
admin.site.register(Review)


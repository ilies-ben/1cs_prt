from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from django.urls import reverse



# Create your models here.
DEPARTMENTS = [
        ('meca', 'Mecanique'),
        ('elec', 'Electronique'),
        ('Assemblage','Assemblage'),
        ('Gerant','Gestion'),
        ('Agent_showroom','Showroom'),
        ('stock','Gestion de stock'),
]

class User(models.Model):
    department = models.CharField(max_length=20, choices=DEPARTMENTS)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)

    def __str__(self):
        return self.username

class Fournisseur(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    MATIERE_CHOICES = [
        ('Accessoires', 'Accessoires'),
        ('Matiere premiere Electronique', 'Matière première Électronique'),
        ('Matiere premiere Mecanique', 'Matière première Mécanique'),
    ]
    type_matiere = models.CharField(max_length=30, choices=MATIERE_CHOICES)
    numero_rc = models.CharField(max_length=20)
    numero_nif = models.CharField(max_length=20)
    numero_nis = models.CharField(max_length=20)
    numero_telephone = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.nom} {self.prenom}"


class Product(models.Model):
    name = models.CharField(max_length=30)
    CATEGORIES = [
        ('Velo', 'Vélo'),
        ('e-velo', 'Vélo électrique'),
        ('e-scotter', 'Scooter électrique'),
        ('Accessoires', 'Accessoires'),
        ('Matiere 1 ere', 'matiere 1 ere'),
    ]
    category = models.CharField(max_length=30, null=True, choices=CATEGORIES)
    description = models.CharField(max_length=200, null=True)
    image = models.ImageField(upload_to='produits_images/', default='produits_images/photo_non_dispo.png')
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    SOURCE_CHOICES = [
        ('Startup', 'Produit fabriqué par la startup'),
        ('Fournisseur', 'Produit acheté auprès d\'un fournisseur'),
    ]
    source = models.CharField(max_length=30, choices=SOURCE_CHOICES, default='Startup')
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        if self.source == 'Startup':
            return self.name + ' (produit par la startup)'
        elif self.source == 'Fournisseur' and self.fournisseur:
            return self.name + ' (source fournisseur : ' + self.fournisseur.nom + ' ' + self.fournisseur.prenom + ')'
        else:
            return self.name
    
    
class Client(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return f"{self.nom} {self.prenom}"

class Vente(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    produits = models.ManyToManyField(Product, through='ProduitVendu')
    date_vente = models.DateTimeField(auto_now_add=True)

class ProduitVendu(models.Model):
    vente = models.ForeignKey(Vente, on_delete=models.CASCADE)
    produit = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantite = models.IntegerField(validators=[MinValueValidator(1)])
    prix_unitaire = models.DecimalField(max_digits=8, decimal_places=2)

class Stock(models.Model):
    produit = models.OneToOneField(Product, on_delete=models.CASCADE)
    quantite = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.produit.name} - {self.quantite}"



    



# Generated by Django 4.2.2 on 2023-06-07 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp_app', '0003_remove_checkout_shipping_state'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='checkout',
            name='tracking_number',
        ),
        migrations.AddField(
            model_name='checkout',
            name='shipping_state',
            field=models.CharField(choices=[('pending', 'Pending'), ('shipped', 'Shipped'), ('delivered', 'Delivered')], default='pending', max_length=20),
        ),
        migrations.AddField(
            model_name='order',
            name='tracking_number',
            field=models.CharField(default=3, max_length=100),
            preserve_default=False,
        ),
    ]

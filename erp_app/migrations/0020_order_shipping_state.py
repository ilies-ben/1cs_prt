# Generated by Django 3.2.19 on 2023-05-23 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp_app', '0019_alter_notification_recipient_alter_shipping_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='shipping_state',
            field=models.CharField(choices=[('pending', 'Pending'), ('shipped', 'Shipped'), ('delivered', 'Delivered')], default='pending', max_length=20),
        ),
    ]
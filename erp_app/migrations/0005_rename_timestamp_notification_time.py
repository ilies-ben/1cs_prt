# Generated by Django 4.2.1 on 2023-05-10 23:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('erp_app', '0004_promotion_send_notification'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notification',
            old_name='timestamp',
            new_name='time',
        ),
    ]
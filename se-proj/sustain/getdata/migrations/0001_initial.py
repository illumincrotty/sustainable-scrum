# Generated by Django 3.0.5 on 2020-04-25 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='sus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('building', models.CharField(max_length=200)),
                ('year', models.IntegerField()),
                ('util', models.CharField(max_length=50)),
                ('meas', models.FloatField()),
            ],
        ),
    ]
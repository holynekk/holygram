# Generated by Django 4.0.2 on 2022-03-06 09:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('heading', models.CharField(max_length=80)),
                ('caption', models.CharField(max_length=500)),
                ('post_image', models.ImageField(upload_to='images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_name', models.ForeignKey(max_length=20, on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
from django.db import models
from django.utils import timezone

# Create your models here.
class Schedule(models.Model):
	author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	title = models.CharField(max_length=200)
	text = models.TextField()
	start_time = models.DateTimeField(default=timezone.now)
	end_time = models.DateTimeField(blank=True, null=True)

	def __str__(self):
		return self.title
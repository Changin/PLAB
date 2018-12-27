from django import forms
from .models import Schedule

class ScheduleForm(forms.ModelForm):
	class Meta:
		model = Schedule
		fields = ('title', 'text', 'start_time', 'end_time')
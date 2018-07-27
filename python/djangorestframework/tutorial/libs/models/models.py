# from django.db import models
# from libs.models.managers import ActiveManager
# from hashid_field import HashidAutoField


# class BaseModel(models.Model):
#     id = HashidAutoField(primary_key=True)
#     is_active = models.BooleanField(default=True)
#     objects = ActiveManager()
#
#     def delete(self):
#         self.is_active = False
#         self.save()
#
#     class Meta:
#         abstract = True

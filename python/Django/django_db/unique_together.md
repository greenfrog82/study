# [unique_together](https://docs.djangoproject.com/ko/2.1/ref/models/options/#unique-together)

다음과 같은 모델이 있다고 할 때, 
```python
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=10)
    platform_id = models.CharField(max_length=10)

    class Meta:
        unique_together = ('platform', 'platform_id')
```

이 모델을 생성하는 코드는 다음과 같다.

```sql
$ python3 manage.py sqlmigrate app_model 0014_auto_20181023_1123

BEGIN;
--
-- Alter field user on userprofile
--
ALTER TABLE "app_model_userprofile" RENAME TO "app_model_userprofile__old";
CREATE TABLE "app_model_userprofile" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "user_id" integer NOT NULL UNIQUE REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "platform" varchar(10) NOT NULL, "platform_id" varchar(10) NOT NULL);
INSERT INTO "app_model_userprofile" ("platform_id", "platform", "user_id", "id") SELECT "platform_id", "platform", "user_id", "id" FROM "app_model_userprofile__old";
DROP TABLE "app_model_userprofile__old";
--
-- Alter unique_together for userprofile (1 constraint(s))
--
CREATE UNIQUE INDEX app_model_userprofile_platform_platform_id_24c78389_uniq ON "app_model_userprofile" ("platform", "platform_id");
COMMIT;
```

위 상황에서는 다음 상황만 입력이 가능.

foo, A, a
test, A, b

위 모델을 다음같이 수정하고 .. 

```python
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=10)
    platform_id = models.CharField(max_length=10)

    class Meta:
        unique_together = ('user', 'platform', 'platform_id')
```

migrate를 하면 쿼리는 다음과 같다. 

```sql
CREATE TABLE "app_model_userprofile" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "platform" varchar(10) NOT NULL, "platform_id" varchar(10) NOT NULL, "user_id" integer NOT NULL UNIQUE REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX app_model_userprofile_user_id_platform_platform_id_32e29247_uniq ON "app_model_userprofile" ("user_id", "platform", "platform_id");
```



"""
Возвращает список проектов галереи.
Структура проектов задаётся в файле photo/projects.json в S3 хранилище.
Формат:
{
  "projects": [
    {
      "id": "obj1",
      "title": "Монтаж кровли",
      "description": "Частный дом 160 м², 3 дня",
      "tags": ["Металлочерепица"],
      "photos": [
        "photo/obj1/PHOTO-2026-04-28-23-42-40.jpg",
        "photo/obj1/PHOTO-2026-04-28-23-42-39.jpg"
      ]
    }
  ]
}
"""
import json
import os
import boto3
from botocore.exceptions import ClientError


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def get_cdn_url(key: str) -> str:
    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    s3 = get_s3()

    # Читаем индексный файл projects.json
    projects = []
    config_key = "photo/projects.json"
    try:
        resp = s3.get_object(Bucket="bucket", Key=config_key)
        config = json.loads(resp["Body"].read().decode("utf-8"))
        for p in config.get("projects", []):
            photos = []
            for photo_key in p.get("photos", []):
                photos.append({
                    "src": get_cdn_url(photo_key),
                    "caption": p.get("title", ""),
                })
            if photos:
                projects.append({
                    "id": p.get("id", ""),
                    "title": p.get("title", ""),
                    "description": p.get("description", ""),
                    "tags": p.get("tags", []),
                    "cover": photos[0]["src"],
                    "photos": photos,
                })
    except ClientError as e:
        print(f"[INFO] config not found or error: {e}")

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "projects": projects}, ensure_ascii=False),
    }

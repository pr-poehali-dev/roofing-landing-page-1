"""
Возвращает список проектов из S3 папки /photo/objN с фотографиями и описаниями.
Описание проекта хранится в файле photo/objN/meta.json
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
    bucket = "bucket"
    prefix = "photo/"

    # Получаем ВСЕ объекты под photo/ без delimiter
    all_objects = []
    paginator = s3.get_paginator("list_objects_v2")
    for page in paginator.paginate(Bucket=bucket, Prefix=prefix):
        for obj in page.get("Contents", []):
            all_objects.append(obj["Key"])

    print(f"[DEBUG] all objects under photo/: {all_objects}")

    # Группируем по папкам objN
    folder_files: dict = {}
    for key in all_objects:
        parts = key.split("/")
        # key like: photo/obj1/file.jpg → parts = ["photo", "obj1", "file.jpg"]
        if len(parts) >= 3 and parts[1].startswith("obj"):
            folder_name = parts[1]
            filename = parts[-1]
            if folder_name not in folder_files:
                folder_files[folder_name] = []
            folder_files[folder_name].append((key, filename))

    print(f"[DEBUG] folders found: {list(folder_files.keys())}")

    projects = []
    for folder_name in sorted(folder_files.keys()):
        files = folder_files[folder_name]
        meta = {"title": folder_name.upper(), "description": "", "tags": []}
        photos = []

        # Сначала читаем meta.json
        for key, filename in files:
            if filename.lower() == "meta.json":
                try:
                    resp = s3.get_object(Bucket=bucket, Key=key)
                    meta = json.loads(resp["Body"].read().decode("utf-8"))
                    print(f"[DEBUG] loaded meta for {folder_name}: {meta}")
                except ClientError as e:
                    print(f"[DEBUG] meta read error: {e}")

        # Затем собираем фото
        for key, filename in files:
            if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                photos.append({
                    "src": get_cdn_url(key),
                    "caption": meta.get("title", folder_name.upper()),
                })

        print(f"[DEBUG] {folder_name}: {len(photos)} photos")

        if photos:
            projects.append({
                "id": folder_name,
                "title": meta.get("title", folder_name.upper()),
                "description": meta.get("description", ""),
                "tags": meta.get("tags", []),
                "cover": photos[0]["src"],
                "photos": photos,
            })

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "projects": projects}, ensure_ascii=False),
    }

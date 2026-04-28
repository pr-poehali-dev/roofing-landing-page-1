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
    bucket = "files"
    prefix = "photo/"

    # Отладка: все файлы в бакете с префиксом photo/
    all_keys = []
    try:
        resp = s3.list_objects_v2(Bucket=bucket, Prefix=prefix)
        all_keys = [o["Key"] for o in resp.get("Contents", [])]
        print(f"[DEBUG] all keys under photo/: {all_keys}")
    except Exception as e:
        print(f"[DEBUG] list error: {e}")

    paginator = s3.get_paginator("list_objects_v2")
    pages = paginator.paginate(Bucket=bucket, Prefix=prefix, Delimiter="/")

    folders = []
    for page in pages:
        for cp in page.get("CommonPrefixes", []):
            folder = cp["Prefix"]
            name = folder.rstrip("/").split("/")[-1]
            if name.startswith("obj"):
                folders.append((name, folder))

    folders.sort(key=lambda x: x[0])

    projects = []
    for name, folder in folders:
        obj_pages = paginator.paginate(Bucket=bucket, Prefix=folder)
        photos = []
        meta = {"title": name.upper(), "description": "", "tags": []}

        for page in obj_pages:
            for obj in page.get("Contents", []):
                key = obj["Key"]
                filename = key.split("/")[-1].lower()
                if filename == "meta.json":
                    try:
                        resp = s3.get_object(Bucket=bucket, Key=key)
                        meta = json.loads(resp["Body"].read().decode("utf-8"))
                    except ClientError:
                        pass
                elif filename.endswith((".jpg", ".jpeg", ".png", ".webp")):
                    photos.append({
                        "src": get_cdn_url(key),
                        "caption": meta.get("title", name.upper()),
                    })

        if photos:
            projects.append({
                "id": name,
                "title": meta.get("title", name.upper()),
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
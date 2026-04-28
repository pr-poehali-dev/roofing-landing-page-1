"""
Приём заявок со всех форм сайта и отправка в Telegram.
"""
import json
import os
import urllib.request
import urllib.parse
from datetime import datetime


def send_telegram(token: str, chat_id: str, text: str) -> bool:
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except Exception:
        return False


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name     = body.get("name", "").strip()
    phone    = body.get("phone", "").strip()
    question = body.get("question", "").strip()
    source   = body.get("source", "Сайт").strip()
    work_type = body.get("work_type", "").strip()
    material  = body.get("material", "").strip()

    if not phone:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "phone required"})}

    token   = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    now = datetime.now().strftime("%d.%m.%Y %H:%M")

    lines = [
        "🏠 <b>Новая заявка — На Высоте</b>",
        f"📅 {now}",
        f"📌 <b>Источник:</b> {source}",
        "",
    ]

    if name:
        lines.append(f"👤 <b>Имя:</b> {name}")
    lines.append(f"📞 <b>Телефон:</b> {phone}")
    if work_type:
        lines.append(f"🔨 <b>Вид работ:</b> {work_type}")
    if material:
        lines.append(f"🏗 <b>Материал:</b> {material}")
    if question:
        lines.append(f"💬 <b>Вопрос:</b> {question}")

    text = "\n".join(lines)

    tg_ok = False
    if token and chat_id:
        tg_ok = send_telegram(token, chat_id, text)

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "telegram": tg_ok}),
    }

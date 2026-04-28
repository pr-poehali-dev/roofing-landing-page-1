"""
Приём заявок со всех форм сайта и отправка в Telegram.
"""
import json
import os
import urllib.request
from datetime import datetime


def send_telegram(token: str, chat_id: str, text: str) -> tuple[bool, str]:
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = resp.read().decode("utf-8")
            print(f"[TG] status={resp.status} body={body[:200]}")
            return resp.status == 200, body
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8")
        print(f"[TG] HTTPError {e.code}: {err}")
        return False, err
    except Exception as ex:
        print(f"[TG] Exception: {ex}")
        return False, str(ex)


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
    name      = body.get("name", "").strip()
    phone     = body.get("phone", "").strip()
    question  = body.get("question", "").strip()
    source    = body.get("source", "Сайт").strip()
    work_type = body.get("work_type", "").strip()
    material  = body.get("material", "").strip()

    if not phone:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "phone required"})}

    token   = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    print(f"[LEAD] phone={phone} source={source} token_set={bool(token)} chat_id_set={bool(chat_id)}")

    if not token or not chat_id:
        print("[LEAD] Секреты TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заполнены!")
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"ok": True, "telegram": False, "error": "secrets not set"}),
        }

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
    tg_ok, tg_detail = send_telegram(token, chat_id, text)

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "telegram": tg_ok, "detail": tg_detail[:100] if not tg_ok else "ok"}),
    }

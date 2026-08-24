import os

import httpx

RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "b_giova93@hotmail.com")
# Dominio di test di Resend finché non viene verificato un dominio custom
# (vedi nota nel README del backend).
FROM_EMAIL = os.getenv("FROM_EMAIL", "onboarding@resend.dev")

RESEND_API_URL = "https://api.resend.com/emails"


async def send_contact_notification(name: str, email: str, message: str) -> bool:
    """Invia una mail di notifica al proprietario del portfolio quando arriva
    un nuovo messaggio dal form di contatto. Ritorna True se l'invio riesce,
    False altrimenti (il messaggio resta comunque salvato nel database)."""

    if not RESEND_API_KEY:
        # Nessuna chiave configurata (es. in locale senza .env): non bloccare
        # il salvataggio del messaggio, semplicemente salta l'invio email.
        return False

    html_body = f"""
    <div style="font-family: sans-serif; line-height: 1.6;">
      <h2>Nuovo messaggio dal portfolio</h2>
      <p><strong>Nome:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Messaggio:</strong></p>
      <p style="white-space: pre-wrap;">{message}</p>
    </div>
    """

    payload = {
        "from": f"Portfolio <{FROM_EMAIL}>",
        "to": [NOTIFY_EMAIL],
        "reply_to": email,
        "subject": f"Nuovo messaggio da {name} — Portfolio",
        "html": html_body,
    }

    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(RESEND_API_URL, json=payload, headers=headers)
            return response.status_code < 300
    except httpx.HTTPError:
        return False

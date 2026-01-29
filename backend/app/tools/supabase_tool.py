from supabase import create_client, Client
from app.config.settings import settings
import logging

logger = logging.getLogger("supabase_tool")
_supabase_client: Client | None = None

def get_supabase_client() -> Client | None:
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    url = settings.SUPABASE_URL
    key = settings.SUPABASE_KEY
    if not url or not key:
        logger.warning("Supabase URL or Key not configured.")
        return None

    try:
        _supabase_client = create_client(url, key)
        return _supabase_client
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        return None

def run_query(sql: str):
    client = get_supabase_client()
    if client is None:
        return {"error": "Supabase credentials not configured in environment (SUPABASE_URL / SUPABASE_KEY missing or invalid)."}

    try:
        result = client.rpc("exec_sql", {"query": sql}).execute()
        return result.data
    except Exception as e:
        return {"error": str(e)}

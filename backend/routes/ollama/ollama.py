from fastapi import APIRouter
from apps.ollama.summarize_data import summarize_pdf

router = APIRouter()
ROUTER_BASE = "/ollama"

@router.get(ROUTER_BASE + "query")
async def query():
    #summarize_pdf('temp.pdf')
    pass

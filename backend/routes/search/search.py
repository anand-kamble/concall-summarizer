from fastapi import APIRouter, HTTPException, Request
import requests
from utils.CONSTANTS import SCREENER_BASE_URL

router = APIRouter()

@router.get("/search/{query}")
async def search(query: str):
    url = f"{SCREENER_BASE_URL}?q={query}&v=3&fts=1"
    try:
        # Fetch data from the Screener API
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Return JSON response from Screener
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error fetching data: {str(e)}")

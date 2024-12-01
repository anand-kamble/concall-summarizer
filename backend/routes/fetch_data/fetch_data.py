from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from pyppeteer import launch
from pyppeteer.browser import Browser
from pyppeteer.page import Page
import requests
from utils.models import ScreenerSearchResult
from utils.CONSTANTS import SCREENER_BASE_URL

router = APIRouter()
ROUTER_BASE = "/fetch"

class FindRequestType(BaseModel):
    selectedResult:ScreenerSearchResult

@router.post(ROUTER_BASE + "find")
async def find(req: FindRequestType):

    browser: Browser = await launch({'headless': False})

    page: Page = await browser.newPage()
    await page.goto("https://www.screener.in/" + req.selectedResult.url)



    return {"received_data": ""}


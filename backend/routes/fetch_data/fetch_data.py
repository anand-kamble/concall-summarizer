from typing import Any
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup, BeautifulStoneSoup, ResultSet, Tag
from utils.models import ScreenerSearchResult
from utils.CONSTANTS import SCREENER_BASE_URL

router = APIRouter()
ROUTER_BASE = "/fetch"

class FindRequestType(BaseModel):
    selectedResult:ScreenerSearchResult

@router.post(ROUTER_BASE + "/find")
async def find(req: FindRequestType):
    url = "https://www.screener.in" + req.selectedResult.url
    try:
        response = requests.get(url)
        soup = BeautifulStoneSoup(response.content, features='html.parser')
        # required_elements = soup.select(".concall-link")
        required_element = soup.select(".concalls .list-links")

        # data = [element.get('text') for element in required_elements]

        transcripts: ResultSet[Tag] = soup.find_all("a",{"title":"Raw Transcript"})

        data = list()
        for t in transcripts:
            transcript_entry = dict()
            transcript_entry["date"] = t.findPreviousSiblings()[0].get_text().strip("\n ")
            transcript_entry["url"] = t.get('href')
            data.append(transcript_entry)




        return {"extracted_data": data}
    except Exception as e:
        raise HTTPException(400,f"Failed to parse the HTML page: {req.selectedResult.url}")



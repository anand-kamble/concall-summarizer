from pydantic import BaseModel


class ScreenerSearchResult(BaseModel):
    id:int
    url:str
    name:str

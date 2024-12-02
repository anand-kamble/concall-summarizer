import os
from traceback import print_tb
from typing import TypedDict, Optional
import json

from httpx import request

#writing the function in order to undertsand if the given url indicates
# to file and pdf that exist or not in the database
# the file is uniquely indentified by the name of the screener name and the Month_year in format

class ScreenerPDFFile(TypedDict):
    access_timestamps :list[int]
    id: str
    name: str
    path: str
    url: str
    screener_name: str
    month_year: str
class JSONCache(TypedDict):
    files: list[ScreenerPDFFile]



class PDFLoader:
    def __init__(self, screener_name:str, month_year:str, url:Optional[str] = None):
        self.screener_name = screener_name
        self.month_year = month_year
        self.url = url
        # load json file into a dictionary
        self.cache:JSONCache | None = None
        self.cache_file = "./file_cache.json"

        if os.path.exists(self.cache_file):
            with open(self.cache_file, "r") as f:
                self.cache = json.load(f)


    def load(self):
        cache = self.__check_cache()
        if cache == False:
            request(url=self.url)
        else:
            return cache


    def __check_cache(self):
        if self.cache is None:
            return False

        for file in self.cache["files"]:
            if file["screener_name"] == self.screener_name and file["month_year"] == self.month_year:
                return file

if __name__ == "__main__":
    loader = PDFLoader("screener_name", "month_year")
    print(loader.load())

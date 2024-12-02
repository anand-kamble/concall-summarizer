import os
from typing import TypedDict, Optional
import json

#writing the function in order to undertsand if the given url indicates
# to file and pdf that exist or not in the database
# the file is uniquely indentified by the name of the screener name and the Month_year in format

class ScreenerPDFFile(TypedDict):
    access_timestamps = list[int]
    unique_name: str



class PDFLoader:
    def __init__(self, url, screener_name, month_year:Optional[str]):


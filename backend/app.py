from typing import Annotated
from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from routes import FetchDataRouter, SearchRouter
import uvicorn
import os
import pkgutil

app = FastAPI()


origins: list[str] = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(SearchRouter)
app.include_router(FetchDataRouter)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3030)

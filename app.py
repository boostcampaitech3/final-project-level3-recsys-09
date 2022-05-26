from typing import List, Optional

from inference import load_model

from fastapi import FastAPI, Query
from pydantic import BaseModel

app = FastAPI()

# model = load_model()

class Item(BaseModel):
    # user: str
    # item: List[str] = None
    # rating: List[float] = None
    item: str = None
    rating: float = None

# @app.get("/items/")
# def inference(user: str = Query(default=None), item: List[str] = Query(default=None)):
#     query_items = {"user": user, "item": item}
#     return query_items
# @app.get("/items/")
# def inference(item: Item):
#     item = {"user": user, "item": item, "rating": rating}
#     return item
@app.get("/items/")
def inference(items: Item):
    return items


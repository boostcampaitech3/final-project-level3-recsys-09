import pandas as pd
import os
import pymongo
from pymongo import MongoClient

FILE = "/opt/ml/input/data/train/train_ratings.csv"
TARGET_DIR = os.path.join(os.getcwd(), "data/train")
TARGET_NAME = "train."

os.makedirs(TARGET_DIR, exist_ok=True)

client = MongoClient("mongodb://118.67.143.144:30001/")
db = client["amazon"]
Collection = db["train"]
cursor = Collection.find(
    {},
    projection={
        "_id": False,
        "reviewerID": True,
        "asin": True,
        "overall": True,
        "title": True,
        "price": True,
        # "Format": True,
        "main_cat": True,
        "brand": True,
        "unixReviewTime": True
    }
)

# inter
df = pd.DataFrame.from_dict(cursor)
print(df)

df.columns = ["user_id:token", "item_id:token", "rating:float", "title:token_seq", "price:float", "main_cat:token_seq", "brand:token_seq", "timestamp:float"]

df_inter = df[["user_id:token", "item_id:token", "timestamp:float"]]
df_user = df[["user_id:token"]]
df_item = df[["item_id:token", "title:token_seq", "price:float", "main_cat:token_seq", "brand:token_seq"]]

df_inter.to_csv(os.path.join(TARGET_DIR, TARGET_NAME+'inter'), index=False, sep="\t")
df_user.to_csv(os.path.join(TARGET_DIR, TARGET_NAME+'user'), index=False, sep="\t")
df_item.to_csv(os.path.join(TARGET_DIR, TARGET_NAME+'item'), index=False, sep="\t")

print("Done!")



def load_data_from_mongodb(self):
    return df
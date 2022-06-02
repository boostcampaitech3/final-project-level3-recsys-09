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
Collection = db["context_aware"]
cursor = Collection.find(
    {},
    projection={
        "_id": False,
        # "reviewerID": True,
        # "asin": True,
        # "overall": True,
        # "unixReviewTime": True
        # "verified": True,
        # "genre": True,
        # "review_sentiment_score": True,
        # "price": True,
        # "year": True,
        # "month": True,
        # "user_overall_diversity": True,
        # ""
        # "title": True,
        # # "Format": True,
        # "main_cat": True,
        # "brand": True,
    }
)

# inter
df = pd.DataFrame.from_dict(cursor)
print(df)

df.columns = [
    "user_id:token", 
    "item_id:token",
    "rating:float",
    "timestamp:float",
    "verified:token",
    "genre:token_seq",
    "review_sentiment_score:float",
    "price:float",
    "year:token",
    "month:token",
    "user_overall_diversity:float",
    "user_overall_mean:float",
    "user_years:token",
    "user_book_count:token",
    "item_overall_mean:float",
    "item_first_year:token",
    "item_user_count:token",
    "brand:token_seq",
    "Format:token_seq",
    "main_cat:token_seq"]

df_inter = df[["user_id:token", "item_id:token", "rating:float", "timestamp:float", "verified:token", "review_sentiment_score:float", "year:token", "month:token"]]
df_user = df[["user_id:token", "user_overall_diversity:float", "user_overall_mean:float", "user_years:token", "user_book_count:token"]]
df_item = df[["item_id:token", "genre:token_seq", "price:float", "main_cat:token_seq", "brand:token_seq", "item_overall_mean:float", "item_first_year:token", "item_user_count:token", "Format:token_seq"]]

df_inter.to_csv(os.path.join(TARGET_DIR, TARGET_NAME+'inter'), index=False, sep="\t")
df_user.to_csv(os.path.join(TARGET_DIR, TARGET_NAME+'user'), index=False, sep="\t")
df_item.to_csv(os.path.join(TARGET_DIR, TARGET_NAME+'item'), index=False, sep="\t")

print("Done!")
from typing import List, Optional

from inference import load_model

from fastapi import FastAPI, Query
from pydantic import BaseModel
import pandas as pd
import numpy as np
from recommenders.datasets.sparse import AffinityMatrix
from recommenders.utils.python_utils import binarize


app = FastAPI()

model = load_model()

print("loading complete")


@app.get("/items/")
def inference(i: List[str] = Query(default=None), r: List[int] = Query(default=None)):
    query_items = {"itemID": i, "rating": r}
    model = load_model()

    df = pd.DataFrame.from_dict(query_items)
    df['userID'], df['timestamp'] = 1, 1
    df = df[['userID', 'itemID', 'rating', 'timestamp']]
    unique_train_items = np.load('/opt/ml/final/final-project-level3-recsys-09/data/train_items.npy', allow_pickle=True)
    am_inference = AffinityMatrix(df=df, items_list=unique_train_items)
    inference_data, inference_map_users, inference_map_items = am_inference.gen_affinity_matrix()
    inference_data = binarize(a=inference_data, threshold=3.5)

    top_k =  model.recommend_k_items(x=inference_data,
                                                  k=10,
                                                  remove_seen=True
                                                  )
    # Convert sparse matrix back to df
    top_k_df = am_inference.map_back_sparse(top_k, kind='prediction')
    return {"top_k": list(top_k_df['itemID'].values)}

from cmath import exp
from turtle import pd
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
import pymongo # import
from pymongo import MongoClient
from bson.json_util import loads, dumps

import requests
import json
import urllib

from inference import load_model
from recommenders.datasets.sparse import AffinityMatrix
from recommenders.utils.python_utils import binarize
import pandas as pd
import numpy as np
import random
import time

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("book.csv")
#a = df.set_index('asin').T.to_dict('list')
b = list(df['asin'])

@app.get("/rand/{idx}")
def read_item1(idx):
    time.sleep(0.1)
    return random.sample(b, int(idx))

@app.get("/search/{asin}")
def read_item2(asin):
    time.sleep(0.54)
    '''
    url = "https://dapi.kakao.com//v3/search/book"
    MY_REST_API = 'a9f59d8981601a41b5fb31311b82b8a4'
    input_text = asin
    queryString = {'query' : input_text}
    header = {'Authorization': 'KakaoAK ' + MY_REST_API }
    response = requests.get(url, headers=header, params=queryString)
    tokens = response.json()

    try:    
        return tokens["documents"][0]["thumbnail"]
    except:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Flag_of_None_%28square%29.svg/768px-Flag_of_None_%28square%29.svg.png"
    '''
    
    input_text = asin
    client_id = "EZKJjFYCeCFKfj3qk2OM"
    client_secret = "dLMxOkCV6M"
    input_text_n = urllib.parse.quote(input_text)
    url = "https://openapi.naver.com/v1/search/book?query=" + input_text_n +"&display=3&sort=count"
    Send_request = urllib.request.Request(url)
    Send_request.add_header("X-Naver-Client-Id", client_id)
    Send_request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(Send_request)
    success = response.getcode()
    
    try:
        Response = response.read()
        tokens = json.loads(Response.decode('utf-8'))
        return tokens['items'][0]['image']
    except:
        #print("Error Code:", success)
        return "https://bookthumb-phinf.pstatic.net/cover/061/154/06115486.jpg?type=m1&udate=20210317"
    
@app.get("/imglist/{lists}")
def get_imglist(lists):
    time.sleep(0.1)
    strings = lists.replace("%2c", "")
    strings = strings.split(",")
    strings = [s for s in strings if s != ""]
    img_url = []
    
    for s in strings:
        img_url.append(read_item2(s))
    
    return img_url

    
@app.get("/db/{asin}")
def get_item(asin):
    client = MongoClient(mongodb_client)
    db = client["amazon"]
    collection = db["train"]
    query = {'asin': asin}
    cursor = collation.find(query, projection={'_id': False})
    result = loads(dumps(cursor))
    return result

@app.get("/ddb/{asin}")
def get_item(asin):
    client = pymongo.MongoClient("mongodb+srv://recsys09:recsys09@recsys09.jsi8u.mongodb.net/?retryWrites=true&w=majority")
    db = client["amazon"]
    collection = db["books"]
    naver_client_id = "EZKJjFYCeCFKfj3qk2OM"
    naver_client_secret = "dLMxOkCV6M"
    kakao_API_url = "https://dapi.kakao.com//v3/search/book"
    Kakao_MY_REST_API = 'a9f59d8981601a41b5fb31311b82b8a4'
    # ↑--- 고정 ---↑
    input_text = 'asin_number'
    query = {'asin': asin}
    cursor = collection.find(query)
    '''
    if cursor['imageURL'] == '':
        # Naver API search
        naver_input_text_n = urllib.parse.quote(input_text)
        naver_url = "https://openapi.naver.com/v1/search/book?query=" + naver_input_text_n +"&display=3&sort=count"
        Send_request = urllib.request.Request(naver_url)
        Send_request.add_header("X-Naver-Client-Id", naver_client_id)
        Send_request.add_header("X-Naver-Client-Secret", naver_client_secret)
        response = urllib.request.urlopen(Send_request)
        success = response.getcode()
        if (success == 200):
            Response = response.read()
            tokens = json.loads(Response.decode('utf-8'))
            return tokens['items'][0]['image']
        else:
            # Kakao API search
            queryString = {'query' : input_text}
            header = {'Authorization': 'KakaoAK ' + Kakao_MY_REST_API }
            response = requests.get(kakao_API_url, headers=header, params=queryString)
            tokens = response.json()
            
            try:    
                return tokens["documents"][0]["thumbnail"]
            except:
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Flag_of_None_%28square%29.svg/768px-Flag_of_None_%28square%29.svg.png"
    else:
        return cursor['imageURL']
    '''
    
    for record in cursor:
        return record


@app.get("/dddb/{asin}")
def get_1111(asin):
    client = pymongo.MongoClient("mongodb+srv://recsys09:recsys09@recsys09.jsi8u.mongodb.net/?retryWrites=true&w=majority")
    # db(=database): "recsys09"의 "amazon" 데이터베이스
    db = client["amazon"]
    # Collection(=table): "amazon" 데이터 베이스의 "books" 테이블
    Collection = db["books"]
    
    query = {'asin': asin}
    cursor = Collection.find(query)
    return cursor
    
@app.get("/inference/{lists}")
def getpredict(lists):
    time.sleep(0.1)
    strings = lists.replace("%2c", "")
    strings = strings.split(",")
    strings = [s for s in strings if s != ""]
    query_items = {"itemID": strings, "rating": [5 for _ in range(len(strings))]}

    model = load_model()

    df = pd.DataFrame.from_dict(query_items)
    df['userID'], df['timestamp'] = 1, 1
    df = df[['userID', 'itemID', 'rating', 'timestamp']]
    unique_train_items = np.load('C:\\Users\\dpqls\\SYB\\app\\data\\train_items.npy', allow_pickle=True)
    am_inference = AffinityMatrix(df=df, items_list=unique_train_items)
    
    inference_data, inference_map_users, inference_map_items = am_inference.gen_affinity_matrix()
    inference_data = binarize(a=inference_data, threshold=3.5)

    top_k =  model.recommend_k_items(x=inference_data,
                                                  k=10,
                                                  remove_seen=True
                                                  )
    # Convert sparse matrix back to df
    top_k_df = am_inference.map_back_sparse(top_k, kind='prediction')

    return list(top_k_df['itemID'].values)
    
    #return list(top_k)

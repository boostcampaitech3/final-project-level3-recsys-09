# MongoDB

- 환경: MongoDB cloud의 M0 Sandbox 티어(shared ram, 512mb storage, shared cpu, free price)
- 데이터: |2017년|리뷰 30개 이상|5번 이상 평가 받은 책| only for MVP..
- 업로드 방식: MongoDB Compass(gui로 사용해주는 툴)로 CSV 파일 업로드
    - 각 column의 mongodb dtype은 아래 참고
      (용량이랑 관련(?) 나중에 최적화 필요. 업로드 전: 425mb 파일 → 후: 223mb 차지)
      
        ![mongodb dtype](https://user-images.githubusercontent.com/43275710/170470061-0c1b163b-e13a-4522-b0bb-49df76822dde.png)
      

# @Shell: 라이브러리 설치

- mongoDB 클라우드를 이용할시 ***pymongo[srv]*** 라는걸 추가로 설치해야 함
(이미 pymongo 설치했을시, 삭제하고 ***pymongo[srv]*** 설치하기)
- 각자 사용하는 환경에서 pymongo[srv] 라이브러리 설치
    - ex) virtualenv 환경
      
        ```bash
        python -m pip uninstall pymongo[srv] -y
        python -m pip uninstall pymongo -y
        python -m pip install pymongo[srv]
        ```
        

# @Python: 사용법

- 아래가 기본 Import 구조
  
    ```bash
    import pymongo # import
    from pymongo import MongoClient
    
    # mongodb 클러스터(=recsys09)랑 연결
    # mongodb+srv://(*username*):(*password*)@(*cluster*).*blahblah*...
    client = pymongo.MongoClient("mongodb+srv://recsys09:recsys09@recsys09.jsi8u.mongodb.net/?retryWrites=true&w=majority")
    # db(=database): "recsys09"의 "amazon" 데이터베이스
    db = client["amazon"]
    # Collection(=table): "amazon" 데이터 베이스의 "books" 테이블
    Collection = db["books"]
    ```
    
    - 참고
      
        ![rdbms vs mongodb](https://user-images.githubusercontent.com/43275710/170470064-a2e2daf8-4c94-4c31-9503-b4d9eb8ba6e6.png)

    
- query 날리는 예시
  
    ```bash
    # 참조) https://www.mongodb.com/docs/manual/tutorial/query-documents/
    query = {'asin': '0001720392'}
    cursor = Collection.find(filter=query ,projection={'_id': True, 'reviewerID': True, 'overall': True, 'timestamp': True})
    ```
    
    ```bash
    # 결과 보기
    for record in cursor:
        print(record)
    ```
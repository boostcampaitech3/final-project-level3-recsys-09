# 저희 잘하조 Recsys 9조



## 프로젝트 개요

- 추천 시스템 모델링부터 배포까지 사용가능한 서비스 개발
- 줄어드는 독서율을 해결하고자 독서에 관한 관심과 흥미를 유도할 서비스 제공 목표
- 유저의 독서 이력 관리 기능과, 독서 기록을 토대로 읽을만한 책 추천

## 프로젝트 팀 구성 및 역할

- 김혁수:  데이터 전처리, NLP 모델링, CI/CD
- 신예빈:  프론트엔드, 백엔드
- 이건:  크롤러, 백엔드, 추천 모델링
- 이창근: 백엔드, 추천 모델링
- 최준영: DB, Docker

---

## 데이터 설명

- json 형태의 파일
    - 리뷰 데이터: 2억 3300만 건(34gb)
    - 메타 데이터: 1500만 건(24gb)
- 1996년 5월 ~ 2018년 10월 데이터

**리뷰 데이터**

- `reviewerID` : 사용자의 고유번호(예: A18SIF0L23ER2H)
- `asin` : 아마존에서 사용하는 상품 고유번호. ISBN과 동일(예: 1408883759)
- `overall` :  사용자 평점. 1~5 사이의 자연수
- `timestamp` : 리뷰 남긴 시간(예: 2017-07-07)
- `verified` :  책 실제 구매 여부. True or False
- `style` : 책 상태(표지 재질, 사이즈, edition 등)
- `reviewText` : 리뷰 (예 : This book is a winner with both of my boys.)
- `summary` : 리뷰 제목 (예 : Children’s favorite)

**메타 데이터**

- `asin` : 아마존에서 사용하는 상품 고유번호. ISBN과 동일(예: 1408883759)
- `title` : 책 제목 (예: The golden treasury of poetry)
- `description` : 책 설명 (예: This book will alert, amuse and appall you a…..)
- `price` : 책 가격($)
- `category` : 책 장르 (예: ‘Arts & Photography’, ‘Music’)
- `brand` : 책 출판사 및 작가 (예: Burkhard Jarisch)

## Feature Engineering

```python
-------------- 모델에 사용한 feature --------------
reviewerID: 사용자의 고유 번호

asin: 책의 고유 번호 

overall: 사용자가 책에 준 평점

timestamp: 리뷰 남긴 시간

-------------- 그 외 feature --------------

title: 책의 제목

description: 책의 설명

price: 책의 가격

category: 책의 장르

verified: 사용자가 책을 실제로 구매했는지 여부

reviewText: 리뷰 

brand: 출판사 및 작가

imageURL: 이미지 URL 정보

-------------- 추가 생성 feature --------------
review_sentiment_score: 리뷰 감성점수

user_overall_diversity: 사용자 별 얼마나 다양하게 점수 매기는지 정도

user_overall_mean: 사용자 별 평균 평점

user_years: 사용자 별 활동 기간

user_book_count: 사용자 별 읽은 책 수

item_overall_mean: 책 별 평균 평점

item_first_year: 책의 첫 리뷰 년도(출판년도일 것으로 예상)

item_user_count: 책 인기도(몇 명이 이책을 읽었는가)
```

---

# 실험 노트 <방법론>

## Model Baseline (Using Recbole)

- **Baseline Structure**

```jsx
model
├── Recbole
│   ├── make_data.py
│   ├── config
│   │   ├── common.yaml
│   │   └── common_cpu.yaml
│   ├── train.py
│   └── [inference.py](http://inference.py/)
│
└── data/boostcamp
		└── boostcamp.inter
```

- `make_data.py` : MongoDB에 저장된 사용자의 정보를 Recbole에서 지원하는 데이터셋으로 가공
    - `boostcamp.inter` : ‘make_data.py’에 의해 생성된 데이터셋
- `common.yaml` : Recbole을 이용한 모델 훈련 시 필요한 환경 요소
  
                            ex) [**Environment settings](https://recbole.io/docs/user_guide/config/environment_settings.html), [Data settings](https://recbole.io/docs/user_guide/config/data_settings.html), [Training Settings,](https://recbole.io/docs/user_guide/config/training_settings.html) [Evaluation Settings](https://recbole.io/docs/user_guide/config/evaluation_settings.html)**
    
- `common_cpu.yaml` : CPU 환경에서 모델을 추론 예정 시, 필요한 환경 요소를 담은 파일
- `train.py` : 모델 훈련 시 사용
  
    <aside>
    📖 **python train.py** **—config_files** [**common.yaml**] **—model** [**MultVAE**]
    </aside>
    
- `inference.py` : 훈련된 모델로 추천할 책을 추론
  
    <aside>
    📖 **python inference.py** -**-model_path** [**saved/MultVAE.pth**]
    
    </aside>
    

# 실험 노트 <모델>

## AutoEncoder 응용 모델 (Best performance)

![Untitled](https://user-images.githubusercontent.com/43275710/173736514-6152ba02-c466-4115-bab2-bab19985f359.png)

### 결과 & 시도

1. 사용자 평점 데이터 5만 개 중, **4만 개를 훈련 데이터셋**, **5천 개를 검증 데이터셋**으로 사용
2. 데이터 분할 시, **Random split(default)** 적용과 **Temporal order(TO)** 적용 비교
    - **Temporal order가 효과가 없음**을 확인
3. 모델의 하이퍼파라미터는 Recbole에서 설정한 default 값으로 사용

### 평가

- 다른 모델에 비해 성능이 좋은 것을 확인
- VAE 계열 모델이 inference 속도가 빠름
- Product serving이기 때문에, **Inference 속도**를 높이기 위해 model ensemble은 사용하지 않음

---

## General Recommender

![Untitled 1](https://user-images.githubusercontent.com/43275710/173736732-d7668c8b-659f-40a3-8734-da0650d9b00f.png)

### 결과 & 시도

1. 훈련 데이터는 VAE 계열 모델과 같은 방식으로 분할 후 훈련에 이용
2. General recommender로 분류된 모델들을 전부 훈련을 진행
3. Early stopping 적용, 가장 성능이 좋았던 epoch의 모델 구조를 저장  

### 평가

- 가장 성능이 좋았던 [NCEPLRec](https://recbole.io/docs/user_guide/model/general/nceplrec.html)은 모델 훈련 시간이 상당히 소비되어 batch serving 불가
- Full user-item matrix로 결과를 내는 모델 ([EASE](https://recbole.io/docs/user_guide/model/general/ease.html), [ADMMSLIM](https://recbole.io/docs/user_guide/model/general/admmslim.html), [SLIMElastic](https://recbole.io/docs/user_guide/model/general/slimelastic.html) 등)
    - 차후 대용량 데이터로 훈련 시 Memory error 발생

---

## Sequential Recommender

![Untitled 2](https://user-images.githubusercontent.com/43275710/173736794-bfb0ac2f-9477-4818-a612-f6a507c33006.png)

### 결과 & 시도

1. Self-attention 기반 모델인 BERT4Rec으로 진행
2. 독서 이력을 바탕으로 다음에 읽을 책을 예측하는 모델

### 평가

- 성능이 좋지 않음
    - Sequential Recommender 뿐만 아니라, context-aware recommender도 성능이 좋지 않음
    - Time-series 기반으로 추론하는 모델은 성능이 좋지 못함

---

# 실험 노트 <추가 모델>

## Bert (감성분석)

**ACC 0.97**

Hugging face의 pytorch-transformers 라이브러리 기반 감성분석 모델

평점을 단순하게(ex. 모든 평점을 5점으로) 준 사용자의 데이터에서 리뷰 감성점수로 가중치 주는 것 목적 - 평점의 신뢰도가 낮기 때문

### 결과 & 시도

1. 평점을 1~5까지 다양하게 준 사용자의 리뷰를 훈련데이터로 사용 
2. Parameter setting

```xml
'learning_rate': 3e-5,
'epsilon': 1e-8,
'epochs': 3,
'maxlen': 216,
'dtype':'long',
'truncating': 'post',
'padding':'post',
'batch_size': 32
```

### 평가

- 평점을 단순하게 준 유저의 리뷰에 대한 감성점수가 예상과 달리 평점과 거의 일치했음
- 평점을 단순하게 주었더라도 평점의 신뢰도가 충분히 높다 판단되기 때문에 이후 감성분석 모델 적용 X

---

# Web Service

## 1. Front-End ( React )

[final-project-level3-recsys-09/front-end at develop · boostcampaitech3/final-project-level3-recsys-09](https://github.com/boostcampaitech3/final-project-level3-recsys-09/tree/develop/front-end)

## Main page

![Untitled 3](https://user-images.githubusercontent.com/43275710/173736848-8ff0c3a5-e3c8-4b76-be77-0c8c0d33505a.png)

### 1. Login & Logout

![Untitled 4](https://user-images.githubusercontent.com/43275710/173736877-0721fde9-197d-4e9e-90ec-8d5ad58deb1c.png)

로그인 버튼을 클릭 하면 

![Untitled 5](https://user-images.githubusercontent.com/43275710/173736904-65fb5f4e-54a4-457e-a5eb-eb2ab95c71d9.png)

로그인 창이 나오고 ID를 입력시 DB에서 ID에 대한 정보를 불러와서 독서 기록 테이블에 표시함

### 2. 독서 기록 테이블

비 로그인시 빈 칸이 나타남

![Untitled 6](https://user-images.githubusercontent.com/43275710/173736934-11686185-5e94-4d1f-be56-c0b60b0f5a98.png)

로그인하면 DB에 저장된 정보가 10개 이하면 10개가 나타나고 10개 이상이면 스크롤을 이용해 모두 표시한다.

![Untitled 7](https://user-images.githubusercontent.com/43275710/173736945-de4c0c68-8d95-4355-a72c-c705f93d1c36.png)

## Search page

![Untitled 8](https://user-images.githubusercontent.com/43275710/173736979-10367dcd-56b9-4555-bf7e-893b05a2162a.png)

### 1. 검색하기

![Untitled 9](https://user-images.githubusercontent.com/43275710/173736998-f0b8ad36-3d33-42f1-8dfe-820ed7209cce.png)

원하는 검색어를 입력 후 search버튼을 누르면 검색 결과가 최대 10개 까지 나타난다

### 2. 검색 결과

![Untitled 10](https://user-images.githubusercontent.com/43275710/173737013-1bfeed09-b34c-405e-be4b-f700982a54e2.png)

DB에서 책에 대한 정보들을 불러와서 표시해 준다

오른쪽 위의 + 버튼을 누르면 독서 기록에 추가할 수 있는 화면이 표시된다.

### 3. 독서 기록 추가

![Untitled 11](https://user-images.githubusercontent.com/43275710/173737038-7d3ae051-aebb-47a8-9e9d-d4a4d23a3ae9.png)

1. 선택한 책의 타이틀
2. 별점 선택 버튼 (1 ~ 5점까지 선택 가능, 0점은 불가능)
3. 리류 입력 텍스트 박스
4. 책을 읽은 날짜 선택 기능
5. submit 버튼을 누르면 db의 독서 기록에 포함됨

## Recommand page

![Untitled 12](https://user-images.githubusercontent.com/43275710/173737061-7b6424ae-e4a9-415a-9132-2a2da3c32550.png)

### 1. 추천받기

![Untitled 13](https://user-images.githubusercontent.com/43275710/173737078-566091fb-f647-4525-8bee-7edf7c06cebb.png)

추천받기 버튼을 누르면 DB에 저장된 유저에 대한 정보를 받아와서 백엔드의 모델로 전달하고 inference를 해서 결과 값을 반환받는다.

### 2. 추천 결과

![Untitled 14](https://user-images.githubusercontent.com/43275710/173737098-bcbc7dee-5a0f-44ce-a94a-dc05bc96f5b1.png)

백엔드에서 받아온 결과값을 이용해 DB에서 책에대한 정보를 받아와서 출력한다.

## 2. Back-End ( FastApi )

[final-project-level3-recsys-09/back-end at develop · boostcampaitech3/final-project-level3-recsys-09

---

# Database

| MySQL | Elasticsearch | MongoDB |
| --- | --- | --- |
| RDBMS | 검색 및 분석 엔진 | NoSQL |
| 구조화된 데이터 구조 | 속도에선 빠르지만 데이터 수집에 한계 | 유연한 데이터 구조 |
- 아마존 데이터 셋은 비정형 데이터이고, DB의 안정성을 고려하여 NoSQL인 MongoDB 사용

---

# CI/CD

웹 서비스에 기능을 편집하거나 추가하였을 때 자동으로 통합, 배포 구현

- Github Action
- Google Cloud Platform
- Docker

---

# Teamwork Process

### **Github 브랜치 이용**

- Git Flow 정책 사용
    - main
        - 최종 결과물 브랜치
    - develop
        - 새로운 기능에 대한 작업 수행 브랜치

### Notion으로 일정관리

→ 주차별 계획 작성 후 매일 진행할 사항을 노션에 기록

- 데일리 스크럼 : 아침에 진행, 한 일과 할 일 기록
- 피어 세션 : 오후에 진행, 프로젝트 진행 사항, 토론할 내용 공유

### W&B project로 실험 결과 공유

![Untitled 15](https://user-images.githubusercontent.com/43275710/173737144-0db2aedf-c373-4eda-be34-7fc00f7739cc.png)

# 정리

## 결론

- 개인화된 책 이력 관리 및 새로운 책 추천 서비스 개발
- 웹 서비스 구축
- Recbole과 W&B를 활용한 모델 실험 파이프라인 구축
- 감성분석을 위한 NLP 모델(BERT) 적용 시도
- Context aware 모델 적용 시도
- MongoDB 서버 구축
- CI/CD

## 향후 진행 방향

- 구매 연결 등 실질적인 수익을 창출할 수 있는 서비스 추가
- 인기도 기반 추천 및 장르별 추천 추가
- Batch Serving
    - 모델을 지정한 기간마다 재학습
- 대용량 데이터를 추천 시스템에 활용하기 위한 방법 고민 필요
    - 리뷰 데이터가 쌓이며 데이터 용량이 커지는데, 제한된 메모리로 모델을 학습해야함
- 다양한 정보를 활용한 추천 시스템 개발 필요
    - 책의 장르, 언어, 작가 등 메타데이터를 활용해 추천 품질 향상

---

### 📝 Notion

[https://www.notion.so/611a825cf31e4710b02a6b7cf1b8f241](https://www.notion.so/611a825cf31e4710b02a6b7cf1b8f241)

### ⚉ Github

[**https://github.com/boostcampaitech3/level2-dkt-level2-recsys-09**](https://github.com/boostcampaitech3/level2-dkt-level2-recsys-09)

---

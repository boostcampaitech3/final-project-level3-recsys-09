## Recbole Baseline Usage

1. Atomic file 생성 (reviewerID, itemID, ratings, timestamp from mongoDB)

```
python make_data.py
```

2. Model training

```
python train.py --config_files [model.yaml] --model [model]
```

+ model.yaml 파일은 config folder 내에 위치

++ train.py에 있는 wandb initiation 본인의 id로 수정 후 진행해야 wandb에 프로젝트 결과가 upload됩니다.
   -> wandb.init(project="Books_Recommendation", entity=[본인 id])


+++ RecVAE 실행 시 오류 해결

TypeError: calculate_loss() missing 1 required positional argument: 'encoder_flag'

위 오류는, /opt/conda/lib/python3.8/site-packages/recbole/trainer/trainer.py 에서
```
def calculate_loss(self, interaction, encoder_flag)
-> def calculate_loss(self, interaction, encoder_flag=True)
```
로 바꿔주시면 실행됩니다.

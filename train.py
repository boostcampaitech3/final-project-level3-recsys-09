import argparse
import os
from recbole.config import Config
from logging import getLogger
from recbole.config import Config
from recbole.data import create_dataset, data_preparation
from recbole.trainer import Trainer
from recbole.utils import init_seed, init_logger, get_model
import wandb


if __name__ == "__main__":
    
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', '-m', type=str, default='BPR', help='name of models')
    parser.add_argument('--dataset', '-d', type=str, default='train', help='name of datasets')
    parser.add_argument('--config_files', '-c', type=str, default=None, help='config files')
    parser.add_argument('--name', '-n', type=str, default=None, help='name of wandb run')

    args = parser.parse_args()

    if args.config_files == None:
        args.config_files = os.path.join('./config', args.model + ".yaml")
    else:
        if args.config_files.endswith('.yaml'):
            args.config_files = os.path.join('./config', args.config_files)
        else:
            args.config_files = os.path.join('./config', args.config_files + ".yaml")

    config = Config(model=args.model, dataset=args.dataset, config_file_list=[args.config_files])
    wandb.init(project="Books_Recommendation", entity="recsys09")
    wandb.run.name = args.name
    # init random seed
    init_seed(config["seed"], config["reproducibility"])

    # logger initialization
    init_logger(config)
    logger = getLogger()

    # write config info into log
    logger.info(config)

    # dataset creating and filtering
    dataset = create_dataset(config)
    logger.info(dataset)

    # dataset splitting
    train_data, valid_data, test_data = data_preparation(config, dataset)

    # model loading and initialization
    imported_model = get_model(args.model)
    model = imported_model(config, train_data.dataset).to(config["device"])
    logger.info(model)

    # trainer loading and initialization
    trainer = Trainer(config, model)

    # model training
    best_valid_score, best_valid_result = trainer.fit(train_data, valid_data)
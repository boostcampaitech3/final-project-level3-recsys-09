FROM python:3.9-slim

COPY . /app

WORKDIR /app

ENV PYTHONPATH=/app \
	PYTHONFAULTHANDLER=1 \
	PYTHONUNBUFFERED=1 \
	PYTHONHASHSEED=random \
	PIP_NO_CACHE_DIR=off \
	PIP_DISABLE_PIP_VERSION_CHECK=on \
	PIP_DEFAULT_TIMEOUT=100
#	POETRY_VERSION=1.1.0

RUN apt-get update && apt-get install --no-install-recommends -y curl \
	&& pip install poetry
#"poetry==$POETRY_VERSION"
	#&& curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python

ENV PATH=$HOME/.poetry/bin:$PATH

COPY ./app/pyproject.toml /app

CMD ["poetry", "install"]

CMD ["uvicorn", "app.py", ":", "app", "--reload"]

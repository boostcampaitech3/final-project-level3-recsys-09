FROM python:3.9-buster

ENV	PYTHONFAULTHANDLER=1 \
	PYTHONUNBUFFERED=1 \
	PYTHONHASHSEED=random \
	PIP_NO_CACHE_DIR=off \
	PIP_DISABLE_PIP_VERSION_CHECK=on \
	PIP_DEFAULT_TIMEOUT=100

RUN mkdir -p /app
RUN mkdir -p "/workspace/data/boostcamp/"
COPY ./requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt
COPY ./app/ /app
EXPOSE 8080



#RUN apt-get install -y build-essential libpython


#CMD ["uvicorn", "app.py:app", "--host", "localhost", "--port", "8080", "--reload"]
RUN ["python3", "make_data.py"]
CMD ["python3", "app.py"]

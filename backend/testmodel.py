import pandas as pd
import sys
import numpy as np
import random
import string
import json
import requests
load_path = "testreview2.csv"
save_path = ""

data = pd.read_csv(sys.argv[1])
#data.columns = ['review', 'sentiment','intent' ,'emotion']
#emotion_json = data['emotion'].value_counts().to_json()
#sentiment_json = data['sentiment'].value_counts().to_json()
#intent_json = data['intent'].value_counts().to_json()

emailList = ['@gmail.com', '@naver.com', '@yahoo.com', '@nate.com', '@daum.net', '@cau.ac.kr']
productSite = ['samsung', 'apple', 'hp', 'asus', 'acer', 'msi']
sourceSite = ['amazon', 'ebay']
urlList = ['https://www.amazon.com', 'https://www.ebay.com']

resultData = []
idCount = 10

data.columns = ['0']
for i in data['0']:
    reviewID = ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.digits) for _ in range(10)) + random.choice(emailList)
    productID = random.choice(productSite) + '-' + ''.join(random.SystemRandom().choice(string.digits) for _ in range(2))
    sourceID = random.choice(sourceSite)
    url = random.choice(urlList) + '/' + ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.digits + string.ascii_uppercase) for _ in range(30))
    content = i
    keyword = random.choices(content.split(), k=5)
    sentiment = {
        "positive" : random.uniform(0, 1.0),
        "negative" : random.uniform(0, 1.0),
        "neutral" : random.uniform(0, 1.0)
    }
    intent = {
        "spam" : random.uniform(0, 1.0),
        "question" : random.uniform(0, 1.0),
        "complaint" : random.uniform(0, 1.0),
        "suggestion" : random.uniform(0, 1.0),
        "compliment" : random.uniform(0, 1.0)
    }
    emotion = {
        "happy" : random.uniform(0, 1.0),
        "angry" : random.uniform(0, 1.0),
        "excited" : random.uniform(0, 1.0),
        "sad" : random.uniform(0, 1.0),
        "bored" : random.uniform(0, 1.0),
        "afraid" : random.uniform(0, 1.0),
        "disgust" : random.uniform(0, 1.0)
    }

    result = {
        "reviewID": reviewID,
        "productID": productID,
        "sourceID": sourceID,
        "url": url,
        "content": content,
        "sentiment": sentiment,
        "intent": intent,
        "emotion": emotion,
        "keyword": keyword,
        "summary":
        {
            "sentiment" : max(sentiment, key=sentiment.get),
            "intent" : max(intent, key=intent.get),
            "emotion" : max(emotion, key=emotion.get)
        }
    }
    bulkHead = {
        "index": {
            "_index": "entity",
            "_type": "review",
            "_id": idCount
        }
    }
    idCount += 1
    resultData.append(bulkHead)
    resultData.append(result)

sys.stdout.flush()
#resultData = json.dumps(resultData)
print(resultData)
r = requests.post('http://localhost:3000/summary/getmodelresult', json=resultData)
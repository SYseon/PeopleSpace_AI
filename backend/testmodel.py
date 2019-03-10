import pandas as pd
import numpy as np
import sys
import random
import string
import json
import datetime
import os
load_path = "testreview2.csv"
save_path = ""

data = pd.read_csv(sys.argv[1])
# data = pd.read_csv(load_path)
#data.columns = ['review', 'sentiment','intent' ,'emotion']
#emotion_json = data['emotion'].value_counts().to_json()
#sentiment_json = data['sentiment'].value_counts().to_json()
#intent_json = data['intent'].value_counts().to_json()

emailList = ['@gmail.com', '@naver.com', '@yahoo.com', '@nate.com', '@daum.net', '@cau.ac.kr']
productSite = ['samsung', 'apple', 'hp', 'asus', 'acer', 'msi']
sourceSite = ['amazon', 'ebay']
urlList = ['https://www.amazon.com', 'https://www.ebay.com']

userEmail = sys.argv[2]    # the email of user who search the data
# userEmail = 'hi'
resultData = np.empty((0))
idCount = 1

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
        "userID": userEmail,
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
    tempid = userEmail+'-'+str(idCount)
    bulkHead = {
        "index": {
            "_index": "entity",
            "_type": "review",
            "_id": tempid
        }
    }
    idCount += 1
    resultData = np.append(resultData, bulkHead)
    resultData = np.append(resultData, result)

sys.stdout.flush()
resultData = resultData.tolist()
resultJson = json.dumps(resultData)
resultName = 'resultJson_'+userEmail+'_'+str(datetime.datetime.now().strftime("%y-%m-%d-%H-%M-%S"))+'.json'
resultPath = os.path.join(os.getcwd(), 'result_jsons', resultName)
f = open(resultPath, 'w')
f.write(resultJson)
f.close()
print(resultName)
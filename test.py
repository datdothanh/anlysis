import pymongo
import pandas as pd
from pymongo import MongoClient

from sklearn import linear_model
import matplotlib.pyplot as plt
import numpy as np 
client = MongoClient()
#point the client at mongo URI
client = MongoClient('mongodb+srv://admin:qtlKCcrMp264hS2H@cluster0.wlohl.mongodb.net/timesheet')
#select database
db = client['timesheet']
#select the collection within the database
Profile = db.profiles
Anlyses = db.anlyses

Result = db.results


#convert entire collection to Pandas dataframe
Anlyses = pd.DataFrame(list(Anlyses.find()))
Profile = pd.DataFrame(list(Profile.find()))


x_values = Profile[['height']]
y_values = Profile[['weight']]

x_height = Anlyses['height']
x_userName = Anlyses['userName']

x_h = x_height[0]
x_u = x_userName[0]

print ("x_h",x_h)
print ("x_u",x_u)

X = x_values
# weight (kg)
y = y_values

# Building Xbar 
one = np.ones((X.shape[0], 1))
Xbar = np.concatenate((one, X), axis = 1)

# Calculating weights of the fitting line 
A = np.dot(Xbar.T, Xbar)
b = np.dot(Xbar.T, y)
w = np.dot(np.linalg.pinv(A), b)
# print ('w = ', w)
# Preparing the fitting line 
w_0 = w[0][0]
w_1 = w[1][0]

x0 = np.linspace(146, 190, 2, endpoint=True)
y0 = w_0 + w_1*x0

y1 = w_1*x_h + w_0

print ("x_h",y1)

thisdict = {
  "w0": w_0,
  "w1": w_1,
  "weight": y1,
  "userName": x_u,
  "height": np.float64(x_h)
}
Result.drop();
Result.insert_one(thisdict)

# # Drawing the fitting line 
# plt.plot(X, y, 'ro')     # data 
# plt.plot(x0, y0)               # the fitting line
# plt.axis([146, 190, 38, 81])
# plt.xlabel('Height (cm)')
# plt.ylabel('Weight (kg)')
# plt.show()




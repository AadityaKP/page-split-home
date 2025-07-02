# retrain_model.py

import pandas as pd
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

# 1. Load original training dataset
train_df = pd.read_csv('278k_song_labelled.csv')  # Use your correct file name

# 2. Drop unnecessary columns
train_df = train_df.drop(['Unnamed: 0', 'duration (ms)', 'spec_rate'], axis=1)

# 3. Prepare features and labels
X = train_df.drop('labels', axis=1)
y = train_df['labels']

# 4. Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Train XGBoost model
model = XGBClassifier(objective='multi:softmax', num_class=4, eval_metric='mlogloss', use_label_encoder=False)
model.fit(X_train, y_train)

# 6. Evaluate the model
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# 7. Save the retrained model
joblib.dump(model, 'song_mood_xgb_model_updated.pkl')
print("Retrained model saved successfully!")

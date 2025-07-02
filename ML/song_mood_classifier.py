# import pandas as pd
# from xgboost import XGBClassifier
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score, classification_report
# import matplotlib.pyplot as plt
# import joblib  # For saving and loading the model
# # Load your dataset
# df = pd.read_csv('278k_song_labelled.csv')  # Replace with your file name

# # Split features and labels
# X = df.drop('labels', axis=1)
# y = df['labels']

# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # # 🔍 Add this block immediately after the train-test split to check for outliers:
# # import seaborn as sns
# # import matplotlib.pyplot as plt

# # for feature in X_train.columns:
# #     plt.figure(figsize=(8, 4))
# #     sns.boxplot(x=X_train[feature])
# #     plt.title(f'Boxplot of {feature}')
# #     plt.show()

# model = XGBClassifier(
#     objective='multi:softmax',
#     num_class=4,
#     eval_metric='mlogloss',
#     use_label_encoder=False,
#     random_state=42,
#     max_depth=4,               # Limit tree depth
#     min_child_weight=3,        # Minimum samples to allow split
#     subsample=0.8,             # Use 80% of data per tree
#     colsample_bytree=0.8,      # Use 80% of features per tree
#     learning_rate=0.05,        # Smaller learning steps
#     n_estimators=500,          # More trees to compensate for low learning rate
#     reg_lambda=1,              # L2 Regularization
#     reg_alpha=0.5              # L1 Regularization
# )

# model.fit(X_train, y_train)

# # Save the model to a file
# joblib.dump(model, 'song_mood_xgb_model.pkl')
# print("Model saved successfully!")
# # Load the model from the saved file
# loaded_model = joblib.load('song_mood_xgb_model.pkl')

# # Make predictions
# y_pred = loaded_model.predict(X_test)

# # Evaluate
# print("Accuracy:", accuracy_score(y_test, y_pred))
# print(classification_report(y_test, y_pred))
# plt.figure(figsize=(8,6))
# plt.scatter(X_test['valence'], X_test['energy'], c=y_pred, cmap='viridis', alpha=0.6)
# plt.xlabel('Valence')
# plt.ylabel('Arousal (Energy)')
# plt.title('Valence-Arousal Mood Prediction')
# plt.colorbar(label='Predicted Mood Label')
# plt.show()


# from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

# # Create and display the confusion matrix
# cm = confusion_matrix(y_test, y_pred)
# disp = ConfusionMatrixDisplay(confusion_matrix=cm)
# disp.plot(cmap='Blues')
# plt.title('Confusion Matrix for Song Mood Classification')
# plt.show()


#with advances techniques - below
import pandas as pd
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt
import joblib

# Load your dataset
df = pd.read_csv('278k_song_labelled.csv')

# Split features and labels
X = df.drop('labels', axis=1)
y = df['labels']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the XGBClassifier
xgb = XGBClassifier(
    objective='multi:softmax',
    num_class=4,
    eval_metric='mlogloss',
    random_state=42
)

# Define hyperparameter grid
param_grid = {
    'max_depth': [3, 4, 5],
    'min_child_weight': [3, 5],
    'subsample': [0.8, 0.9],
    'colsample_bytree': [0.8],
    'learning_rate': [0.05, 0.1],
    'n_estimators': [300, 500],
    'reg_lambda': [1],
    'reg_alpha': [0.5]
}

# Set up GridSearch with 3-Fold Cross Validation
grid_search = GridSearchCV(
    estimator=xgb,
    param_grid=param_grid,
    cv=3,
    verbose=2,
    n_jobs=-1
)

# Fit the model
grid_search.fit(X_train, y_train)

# Best parameters
print("Best Parameters Found: ", grid_search.best_params_)

# Use the best model
best_model = grid_search.best_estimator_

# Save the best model
joblib.dump(best_model, 'song_mood_best_xgb_model.pkl')
print("Best model saved successfully!")

# Load the model
loaded_model = joblib.load('song_mood_best_xgb_model.pkl')

# Make predictions
y_pred = loaded_model.predict(X_test)

# Evaluate the model
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Plot valence vs energy scatter plot
plt.figure(figsize=(8, 6))
plt.scatter(X_test['valence'], X_test['energy'], c=y_pred, cmap='viridis', alpha=0.6)
plt.xlabel('Valence')
plt.ylabel('Arousal (Energy)')
plt.title('Valence-Arousal Mood Prediction')
plt.colorbar(label='Predicted Mood Label')
plt.show()

# Plot confusion matrix
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot(cmap='Blues')
plt.title('Confusion Matrix for Song Mood Classification')
plt.show()

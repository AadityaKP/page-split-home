import pandas as pd
import joblib
import matplotlib.pyplot as plt
#hello bestiee
# 1. Load Listening History
history = pd.read_csv('listening_history.csv')

# 2. Rename columns to match the model's training feature names
history.rename(columns={
    'Acousticness': 'acousticness',
    'Danceability': 'danceability',
    'Energy': 'energy',
    'Instrumentalness': 'instrumentalness',
    'Liveness': 'liveness',
    'Loudness': 'loudness',
    'Speechiness': 'speechiness',
    'Tempo': 'tempo',
    'Valence': 'valence'
}, inplace=True)

# 3. Load the Retrained Model
model = joblib.load('song_mood_xgb_model_updated.pkl')

# 4. Select Features
feature_columns = ['danceability', 'energy', 'loudness', 'speechiness',
                   'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

X_chunks = history[feature_columns]

# 5. Predict Mood for Each Chunk
predicted_moods = model.predict(X_chunks)

# Map numerical labels to mood names
mood_mapping = {0: 'Sad', 1: 'Happy', 2: 'Energetic', 3: 'Calm'}
predicted_mood_names = [mood_mapping[label] for label in predicted_moods]

# Add predictions to dataframe
history['Predicted_Mood'] = predicted_moods
history['Mood_Name'] = predicted_mood_names

# 6. Plot Mood Progression for the Song
song_name = 'Nagada Sang Dhol'
song_chunks = history[history['Song Name'] == song_name]

plt.figure(figsize=(12, 4))
plt.plot(song_chunks['Chunk'], song_chunks['Predicted_Mood'], marker='o', linestyle='-')
plt.xlabel('Chunk')
plt.ylabel('Predicted Mood')
plt.title(f'Mood Progression for {song_name}')
plt.xticks(rotation=45)
plt.grid(True)
plt.show()

# 7. Print Predicted Moods
print("\nPredicted moods for each chunk:")
for idx, row in song_chunks.iterrows():
    print(f"{row['Chunk']}: {row['Mood_Name']}")

# 8. Optional: Save the updated CSV
history.to_csv('listening_history_with_predictions.csv', index=False)
print("\nPredictions added and saved successfully!")

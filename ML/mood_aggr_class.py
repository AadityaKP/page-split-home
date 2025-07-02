import pandas as pd
import joblib

# 1. Load Listening History
history = pd.read_csv('listening_history_kp.csv')

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

# Mood Mapping
mood_mapping = {0: 'Sad', 1: 'Happy', 2: 'Energetic', 3: 'Calm'}
predicted_mood_names = [mood_mapping[label] for label in predicted_moods]

# Add Predictions to DataFrame
history['Predicted_Mood'] = predicted_moods
history['Mood_Name'] = predicted_mood_names

# 6. Final Mood Aggregation Function (with relabeling logic)
def determine_final_mood(moods):
    valence_moods = [mood for mood in moods if mood in ['Happy', 'Sad']]
    arousal_moods = [mood for mood in moods if mood in ['Calm', 'Energetic']]
    
    final_valence = pd.Series(valence_moods).value_counts()
    final_arousal = pd.Series(arousal_moods).value_counts()
    
    mood_parts = []
    if not final_valence.empty:
        mood_parts.append(final_valence.idxmax())
    if not final_arousal.empty:
        mood_parts.append(final_arousal.idxmax())
    
    # Combine the mood parts
    final_mood = ' and '.join(mood_parts) if mood_parts else 'Unknown'
    
    # Relabel single moods
    if final_mood == 'Sad':
        final_mood = 'Sad and Calm'
    elif final_mood == 'Happy':
        final_mood = 'Happy and Energetic'
    
    return final_mood

# 7. Aggregate Final Mood for Each Song
final_moods = history.groupby('Song Name')['Mood_Name'].apply(determine_final_mood).reset_index()
final_moods.rename(columns={'Mood_Name': 'Final_Mood'}, inplace=True)

# Save final mood file
final_moods.to_csv('song_final_mood_extended.csv', index=False)
print("\n✅ Final mood per song (Happy/Sad + Calm/Energetic) saved to 'song_final_mood_extended.csv' successfully!")

# Optional: Save detailed chunk predictions
history.to_csv('listening_history_with_predictions_ext.csv', index=False)
print("\n✅ Detailed chunk-wise predictions saved to 'listening_history_with_predictions_ext.csv'.")

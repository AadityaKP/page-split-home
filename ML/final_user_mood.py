import pandas as pd
import matplotlib.pyplot as plt

# Load the dataset
df = pd.read_csv('song_final_mood_extended.csv')
print(df.columns)

# Take the first 15 songs as the listening session
session_songs = df.head(15)

# Method 1: Most Frequent Mood
most_frequent_mood = session_songs['Final_Mood'].mode()[0]
print("🎯 Most Frequent Mood:", most_frequent_mood)

# Method 2: Mood Percentage Distribution
mood_distribution = session_songs['Final_Mood'].value_counts(normalize=True) * 100
print("\n📊 Mood Distribution (%):")
for mood, percentage in mood_distribution.items():
    print(f"{mood}: {percentage:.2f}%")

# Plot the distribution
plt.bar(mood_distribution.index, mood_distribution.values)
plt.xlabel('Mood')
plt.ylabel('Percentage (%)')
plt.title('Mood Distribution in Listening Session')
plt.show()

# Method 3: Average Mood Score (Optional: only works if you have numeric mapping)
# If you want to use average mood score, you need to convert moods to numbers.
mood_to_number = {'Sad': 0, 'Happy': 1, 'Energetic': 2, 'Calm': 3}
number_to_mood = {0: 'Sad', 1: 'Happy', 2: 'Energetic', 3: 'Calm'}

# Convert moods to numbers
numeric_moods = session_songs['Final_Mood'].map(mood_to_number)

average_mood_score = numeric_moods.mean()
rounded_mood_label = round(average_mood_score)
average_mood = number_to_mood[rounded_mood_label]
print(f"\n⚖️ Average Mood Score: {average_mood_score:.2f} (Rounded: {average_mood})")

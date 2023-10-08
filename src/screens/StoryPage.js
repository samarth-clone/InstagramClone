import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { storydata } from './HomePage';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import Icon from 'react-native-vector-icons/FontAwesome';

const StoryPage = ({ route, navigation }) => {
  const { storyId } = route.params;
  const selectedStoryIndex = storydata.findIndex((story) => story.id === storyId);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(selectedStoryIndex);
  const [storyProgress, setStoryProgress] = useState(0);
  const [message, setMessage] = useState(''); // State to hold the typed message
  const selectedStory = storydata[currentStoryIndex];

  // Maintain a state variable for likes associated with each story
  const [likes, setLikes] = useState({ [selectedStory.id]: false });

  const handleNextStory = () => {
    if (currentStoryIndex < storydata.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setStoryProgress(0);
      // Reset like status for the next story
      setLikes({ ...likes, [selectedStory.id]: false });
    } else {
      navigation.navigate('HomePage');
    }
  };

  useEffect(() => {
    let timer;
    if (storyProgress < 1) {
      timer = setTimeout(() => {
        setStoryProgress(storyProgress + 0.001); // Increment progress over time
      }, 0.1); // Increased the interval to slow down the progress for demonstration
    } else {
      handleNextStory();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [storyProgress]);

  // Check if the selectedStory.story is a URL or a local file
  const isURL = selectedStory.story.match(/^(http|https):\/\//);

  const toggleLike = () => {
    // Toggle the like status for the current story
    setLikes({ ...likes, [selectedStory.id]: !likes[selectedStory.id] });
  };
  
  return (
    <TouchableOpacity style={{ flex: 1, backgroundColor: 'grey' }} onPress={handleNextStory}>
      <View style={styles.storyContainer}>
        <Image
          source={isURL ? { uri: selectedStory.story } : selectedStory.story}
          style={{ resizeMode: 'stretch', flex: 1 }}
        />
        <View style={styles.userDetails}>
          <Image source={{ uri: selectedStory.pfp }} style={styles.userImage} />
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{selectedStory.username}</Text>
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar styleAttr="Horizontal" progress={storyProgress} indeterminate={false} color="#3498db" />
        </View>
        {/* Progress Bar */}

        <View style={styles.messageContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholderTextColor="white"
          />
          <TouchableOpacity onPress={toggleLike}>
            <Icon
              name={likes[selectedStory.id] ? 'heart' : 'heart-o'}
              size={20}
              color={likes[selectedStory.id] ? 'red' : 'black'}
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="paper-plane-o" size={20} style={styles.icons} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoryPage;

const styles = StyleSheet.create({
  storyContainer: {
    flex: 1,
    position: 'relative',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  progressBarContainer: {
    position: 'absolute',
    top: 8,
    left: 16,
    right: 16,
  },
  messageContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    color: 'white',
    marginRight: 8,
  },
  icons: {
    margin: 5,
  },
  userDetails: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 22,
    left: 16,
  },
  usernameContainer: {
    marginLeft: 8,
  },
  username: {
    color: 'white',
    fontSize: 16,
  },
});

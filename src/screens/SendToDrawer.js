import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, PanResponder, FlatList, Image, Button, Alert, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Corrected import
import Modal from 'react-native-modal';
import { storydata } from './HomePage';

const SendToDrawer = ({ isVisible, onClose }) => {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Check if the gesture is a downward swipe
        return gestureState.dy > 5;
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Check if the swipe was long enough to trigger the close action
        if (gestureState.dy > 50) {
          onClose();
        }
      },
    })
  ).current;

  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  const ShareItem = ({ pfp, username }) => {
    return (
      <View style={styles.shareItemContainer}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: pfp }} style={styles.userImage} />
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={() => Alert.alert('Message sent')}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Filter the data based on the search query
  const filteredData = storydata.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} // Close the drawer when tapping outside
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        {...panResponder.panHandlers} // Attach panResponder to the view
      >
        <View style={{ alignItems: 'center' }}>
          <Icon name="minus" size={40} color={'#ddd'} />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <ShareItem pfp={item.pfp} username={item.username} />}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginTop: 300,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  shareItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {},
  flatList: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#0362fc', // Change this to your desired background color
    borderRadius: 20, // Adjust the border radius as needed
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 30,
  },
  sendButtonText: {
    color: 'white', // Change the text color to your preference
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SendToDrawer;

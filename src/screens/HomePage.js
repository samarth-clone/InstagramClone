import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList,ScrollView, TouchableOpacity, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useScrollToTop } from "@react-navigation/native";

//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import {PanGestureHandler} from 'react-native-gesture-handler'

//screens
import Messages from "./Messages";
import Followers from "./Followers";
import StoryPage from "./StoryPage";
import SendToDrawer from "./SendToDrawer";
import Camera from "./Camera";

const Stack = createNativeStackNavigator();

export const storydata=[
    {id:1,username:"user1",story: 'https://picsum.photos/1011',pfp:"https://picsum.photos/1021", isMyStory: true},
    {id:2,username:"user2",story: 'https://picsum.photos/1012',pfp:"https://picsum.photos/1022"},
    {id:3,username:"user3",story: 'https://picsum.photos/1013',pfp:"https://picsum.photos/1023"},
    {id:4,username:"user4",story: 'https://picsum.photos/1014',pfp:"https://picsum.photos/1024"},
    {id:5,username:"user5",story: 'https://picsum.photos/1015',pfp:"https://picsum.photos/1025"},
    {id:6,username:"user6",story: 'https://picsum.photos/1016',pfp:"https://picsum.photos/1026"},
    {id:7,username:"user7",story: 'https://picsum.photos/1017',pfp:"https://picsum.photos/1027"},
    {id:8,username:"user8",story: 'https://picsum.photos/1018',pfp:"https://picsum.photos/1028"},
    {id:9,username:"user9",story: 'https://picsum.photos/1019',pfp:"https://picsum.photos/1029"},
  ]

const feedData = [
  {
    id: '1',
    username: 'user1',
    profilePicture: 'https://picsum.photos/1001',
    postMedia: 'https://picsum.photos/1002',
    LikedBy: '99',
    caption: 'This is a sample caption for post 1.',
  },
  {
    id: '2',
    username: 'user2',
    profilePicture: 'https://picsum.photos/1003',
    postMedia: 'https://picsum.photos/1004',
    LikedBy: '9',
    caption: 'Another sample caption for post 2.',
  },
  {
    id: '3',
    username: 'user2',
    profilePicture: 'https://picsum.photos/1005',
    postMedia: 'https://picsum.photos/1006',
    LikedBy: '4',
    caption: 'Another sample caption for post 2.',
  },
  {
    id: '4',
    username: 'user2',
    profilePicture: 'https://picsum.photos/1007',
    postMedia: 'https://picsum.photos/1008',
    LikedBy: '50',
    caption: 'Another sample caption for post 2.',
  },
  
];



function HomeStackNavigator() {
    return(
    <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="Messages"
        component={Messages}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="Followers"
        component={Followers}
        options={{headerShown: false}}
        />
        

    </Stack.Navigator>
    )
}

const FeedItem = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSendToDrawerVisible, setIsSendToDrawerVisible] = useState(false);


  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmarkPress = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSharePress = () => {
    setIsSendToDrawerVisible(true); // Open the drawer
  };

  const handleCloseSendToDrawer = () => {
    setIsSendToDrawerVisible(false); // Close the drawer
  };

  


  return (
    <View style={styles.feedItem}>
      {/* User Info */}
      <View style={styles.userInfo}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.profilePicture }} style={styles.userImage} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
        <View style={styles.listIconContainer}>
          <Icon name='list-ul' size={15} color={'black'}/>
        </View>
      </View>

      {/* Post Media */}
      <Image source={{ uri: item.postMedia }} style={styles.postMedia} />

      {/* Like, Comment, Share, and Bookmark */}
      <View style={styles.actions}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={handleLikePress}>
          <Icon
            name={isLiked ? "heart" : "heart-o"}
            size={25}
            color={isLiked ? "red" : "black"}
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="comment-o"
            size={25}
            color="black"
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSharePress}>
        <Icon
          name="share"
          size={25}
          color="black"
          style={styles.icons}
        />
      </TouchableOpacity>
      <SendToDrawer isVisible={isSendToDrawerVisible} onClose={handleCloseSendToDrawer} />
        </View>
        <View>
        <TouchableOpacity onPress={handleBookmarkPress}>
          <View style={{ alignItems: 'flex-end' }}>
            <Icon
              name={isBookmarked ? "bookmark" : "bookmark-o"}
              size={25}
              color={isBookmarked ? "black" : "black"}
              style={styles.icons}
            />
          </View>
        </TouchableOpacity>
        </View>
      </View>

      {/* Caption */}
      <Text style={styles.caption}>Liked By <Text style={{ fontWeight: 'bold' }}>User</Text> and {item.LikedBy} others</Text>
      <Text style={styles.caption}>{item.caption}</Text>
      <TouchableOpacity onPress={() =>
      alert("Comments")}>
        <Text>View comments</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomePage = ({navigation}) => {
  const [showStory, setShowStory] = useState(false);

  const onGestureEvent = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Detect a swipe right gesture and navigate to the Camera screen
      if (event.nativeEvent.translationX > 50) {
        navigation.navigate('Camera');
      }
    }
  };

  const renderHeader = () => {
    return (
      <View>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.logo}>Instagram</Text>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => navigation.navigate('Followers')}>
              <Icon name="heart-o" size={25} color="black" style={styles.icons} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
              <Icon name="paper-plane" size={25} color="black" style={styles.icons} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
              <Icon name="camera" size={25} color="black" style={styles.icons} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stories */}
        <View style={styles.stories}>
          <FlatList
            data={storydata}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setShowStory(true);
                    navigation.navigate('StoryPage', { storyId: item.id });
                  }}
                >
                  <View style={styles.storyItem}>
                    <View style>
                      <Image source={{ uri: item.pfp }} style={styles.storyImage}></Image>

                      {item.isMyStory && (
                        <View>
                          <View style={styles.plusIconContainer}>
                            <Icon name="plus-circle" size={20} color="teal" />
                          </View>
                          <View style={styles.plusInsideIconContainer}>
                            <Icon name="plus" size={15} color="black" />
                          </View>
                        </View>
                      )}
                    </View>
                    <Text style={styles.storyUsername}>User</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    
    <FlatList
      ListHeaderComponent={renderHeader}
      data={feedData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedItem item={item} />}
    />
  );
};
const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: "#fff",
  },
  topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 13,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
  },
  logo: {
      fontFamily: 'Instagram Sans Headline',
      fontSize: 25,
      fontWeight: "400",
      color:'black'
  },
  icons: {
      margin:5,
      justifyContent:"flex-end"
  },
  tabs: {
  flexDirection: "row",
  },
  
  stories:{
      borderBottomColor:'#ddd',
      borderBottomWidth:1
  },
  storyItem: {
    marginRight: 12, 
    marginLeft:10,
    marginTop:10,
    
  },
  storyImage: {

    width: 70,
    height: 70,
    borderRadius: 35, // Make the image circular
    borderWidth: 1,
    borderColor: "#e1306c", // Customize the border color
  },
  storyUsername: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  plusInsideIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 23,
  },


  feed: {
    flex: 1,
  },
  feedItem: {
    backgroundColor: "#fff",
    marginBottom: 10,
    
    
    // padding: 16,
    
  },
  actions: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  listIconContainer:{
  flex: 1, 
  alignItems: 'flex-end', 
  marginRight: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postMedia: {
    width: "100",
    height: 400,
    marginTop: 8,
    resizeMode: "cover",
  },
  caption: {
    marginTop: 4,
    color: 'black'
  },

  });

  export default HomeStackNavigator;

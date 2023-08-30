import React,{useState,useRef,useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions ,TouchableOpacity} from 'react-native';
import PagerView from 'react-native-pager-view';
import { Video, ResizeMode } from 'expo-av';

const SlideItem = ({ item,isCurrent }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  
  const toggleMute = () => {
    if (video.current) {
      video.current.setIsMutedAsync(!isMuted);
      setIsMuted(prevIsMuted => !prevIsMuted);
    }
  };
  useEffect(() => {
    if (video.current) {
      if (isCurrent) {
        video.current.playAsync();
      } else {
        video.current.pauseAsync();
      }
    }
  }, [isCurrent]);
  return (
    <View style={styles.slide}>
      <TouchableOpacity activeOpacity={0.1} style={{width:'100%',heighht:'100%'}} onPress={toggleMute}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      </TouchableOpacity>
    </View>
  );
};

const YourScreen = () => {
  const data = [1, 2, 3, 4]; // Your data for the PagerView
  const [currentPage, setCurrentPage] = useState(0);
  const onPageSelected = e => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0} orientation="vertical" onPageSelected={onPageSelected}>
        {data.map((item, index) => (
          <View key={index}>
            <SlideItem item={item} isCurrent={index === currentPage} />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pagerView: {
    flex: 1,
  },
  slide: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  video:{
    width:'100%',
    height:'100%'
  }
});

export default YourScreen;
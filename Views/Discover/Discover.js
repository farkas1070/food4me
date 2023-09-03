import React, { useState, useRef,  useContext } from "react";
import {
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { videosContext } from "../../Context/GlobalContext";
import SlideItem from "./Components/SlideItem"
import {styles} from "./DiscoverStyle"

const YourScreen = () => {
  const [videoURLs, setVideoURLs] = useContext(videosContext);
  const pagerViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isGlobalMuted, setIsGlobalMuted] = useState(false);

  const onPageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const toggleGlobalMute = () => {
    setIsGlobalMuted((prevIsGlobalMuted) => !prevIsGlobalMuted);
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        orientation="vertical"
        onPageSelected={onPageSelected}
        ref={pagerViewRef}
      >
        {videoURLs.map((item, index) => (
          <View key={index}>
            <SlideItem
              item={item}
              isCurrent={index === currentPage}
              isGlobalMuted={isGlobalMuted}
              toggleGlobalMute={toggleGlobalMute}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default YourScreen;

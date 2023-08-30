import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';

const SlideItem = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Text>{item}</Text>
    </View>
  );
};

const YourScreen = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 23]; // Your data for the PagerView

  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0} orientation="vertical">
        {data.map((item, index) => (
          <View key={index}>
            <SlideItem item={item} />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
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
});

export default YourScreen;
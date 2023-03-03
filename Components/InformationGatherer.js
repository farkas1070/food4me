import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');
const images = [
  'https://images.unsplash.com/photo-1501410693927-3319a0a42d31',
  'https://images.unsplash.com/photo-1514482464635-e23bff5c1e5a',
  'https://images.unsplash.com/photo-1498529605905-1c5f6e63eaba',
  'https://images.unsplash.com/photo-1485291571153-86b00accb5cd',
];

export default function InformationGatherer() {
  const [index, setIndex] = useState(0);
  const [carouselRef, setCarouselRef] = useState(null);
  const translateX = interpolate(index, {
    inputRange: images.map((_, i) => i),
    outputRange: images.map((_, i) => -i * width),
  });

  const handleNext = () => {
    if (carouselRef) {
      carouselRef.snapToNext();
    }
  };

  const handlePrevious = () => {
    if (carouselRef) {
      carouselRef.snapToPrev();
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={setCarouselRef}
        data={images}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={setIndex}
      />
      <Pagination activeIndex={index} total={images.length} />
      <TouchableOpacity style={styles.buttonPrevious} onPress={handlePrevious}>
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  buttonPrevious: {
    position: 'absolute',
    top: height / 2,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    borderRadius: 8,
    zIndex: 1,
  },
  buttonNext: {
    position: 'absolute',
    top: height / 2,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    borderRadius: 8,
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

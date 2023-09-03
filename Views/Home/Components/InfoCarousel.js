import React,{useState} from 'react';
import { View, Text,  ImageBackground } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';


import {styles} from "./InfoCarouselStyle"

const InfoCarousel = () => {
    const [mode] = useState('horizontal-stack');
    const [pagingEnabled] = useState(true);
  const [snapEnabled] = useState(true);
  const [snapDirection] = useState('left');
  const carouseldata = [
    {
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Suscribe to Our food delivery services, and get all the products you need to keep cooking!"
    }, {
      "image": "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Browse our Recipes and get inspired!"
    }, {
      "image": "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Or make it extra easy to decide and just let us pick a meal for you"
    }, {
      "image": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
      "text": "Suscribe to Our food delivery services, and get all the products you need to keep cooking!"
    }, {
      "image": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Or an entire menu!"
    }, {
      "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Keep in touch with us, and we will keep you updated on special deals tailor made just for you!"
    }
  ];
  
  const viewCount = 5;
  return (
    <View style={{ flex: 1, marginTop: 50 }}>
    <Carousel
      style={{
        width: 350,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      loop
      mode={mode}
      pagingEnabled={pagingEnabled}
      snapEnabled={snapEnabled}
      width={280}
      height={210}
      autoPlay={true}
      modeConfig={{
        snapDirection,
        stackInterval: mode === 'vertical-stack' ? 8 : 18,
      }}
      customConfig={() => ({ type: 'positive', viewCount })}
      data={carouseldata}
      scrollAnimationDuration={3000}
      renderItem={({ index }) => (
        <View
          style={{
            flex: 1,

            justifyContent: 'center',


            borderRadius: 30
          }}
        >
          <ImageBackground source={{ uri: carouseldata[index].image }} resizeMode="cover" style={{ justifyContent: "center", alignItems: 'center', height: '100%', width: '100%' }}>
            <View style={{ justifyContent: "center", alignItems: 'center', width: "60%", backgroundColor: "rgba(255, 255, 255, 0.85)", height: 60, borderRadius: 50 }}>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>
                {carouseldata[index].text}
              </Text>
            </View>
          </ImageBackground>
        </View>
      )}
    />
  </View>
  )
}

export default InfoCarousel


import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import CustomFont from '../../../fonts/myfont.otf';

const LoadingOverlay = () => {
  
  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={{ fontFamily: 'CustomFont', fontSize: 22, color: 'white', marginBottom: 10, textAlign: 'center', }}>Loading, please wait...</Text>
        <ActivityIndicator color="white" size={100} />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  container: {
    backgroundColor: '#fd5a43',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default LoadingOverlay;
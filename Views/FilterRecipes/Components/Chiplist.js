import {   View } from 'react-native'
import React from 'react'
import { Chip } from 'react-native-paper';
import {styles} from "./ChiplistStyle"
const ChipList = ({ options, selectedIndices, setSelectedIndices }) => {

    const handleChipPress = (index) => {
      const isSelected = selectedIndices.includes(index);
      if (isSelected) {
        setSelectedIndices(selectedIndices.filter((i) => i !== index));
      } else {
        setSelectedIndices([...selectedIndices, index]);
      }
    };
  
    return (
      <View style={styles.container}>
        {options.map((option, index) => (
          <Chip
            key={option}
  
            selectedColor={selectedIndices.includes(option) ? 'white' : '#fd5a43'}
            onPress={() => handleChipPress(option)}
            style={[styles.chip,{backgroundColor: selectedIndices.includes(option) ? '#fd5a43' : 'white',}]}
          >
            {option}
          </Chip>
        ))}
      </View>
    );
  };

export default ChipList


import { StyleSheet,  View } from 'react-native'
import React from 'react'
import { Chip } from 'react-native-paper';

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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {options.map((option, index) => (
          <Chip
            key={option}
  
            selectedColor={selectedIndices.includes(index) ? 'white' : '#fd5a43'}
            onPress={() => handleChipPress(index)}
            style={{ marginTop: 5, marginRight: 5, marginBottom: 5, backgroundColor: selectedIndices.includes(index) ? '#fd5a43' : 'white', borderColor: '#fd5a43', borderWidth: 0.5 }}
          >
            {option}
          </Chip>
        ))}
      </View>
    );
  };

export default ChipList

const styles = StyleSheet.create({})
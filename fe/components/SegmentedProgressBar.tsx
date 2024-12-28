import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface SegmentedProgressBarProps {
  len: number;
  activeIndex: number;
}

const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({ len, activeIndex }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: len }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            index <= activeIndex && styles.currentSegment,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 4,
    backgroundColor: '#E0E0E0',
  } as ViewStyle,
  segment: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#E0E0E0',
  } as ViewStyle,
  activeSegment: {
    backgroundColor: '#304FFE',
  } as ViewStyle,
  currentSegment: {
    backgroundColor: '#304FFE',
  } as ViewStyle,
});

export default SegmentedProgressBar;
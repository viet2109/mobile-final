import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface SegmentedProgressBarProps {
  segments: number[]; // Mảng đại diện cho các phân đoạn
  activeIndex: number; // Chỉ mục của phân đoạn hiện tại
}

const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({ segments, activeIndex }) => {
  return (
    <View style={styles.container}>
      {segments.map((_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            index < activeIndex && styles.activeSegment,
            index === activeIndex && styles.currentSegment,
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
    backgroundColor: '#4CAF50',
  } as ViewStyle,
  currentSegment: {
    backgroundColor: '#2196F3',
  } as ViewStyle,
});

export default SegmentedProgressBar;

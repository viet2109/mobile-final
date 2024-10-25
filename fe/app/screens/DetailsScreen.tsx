import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text className='text-blue-300'>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;

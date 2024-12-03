import { StackNavigationProp } from '@react-navigation/stack';
import { Stack, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { PanResponder } from 'react-native';

const CardScreen = () => {
  const [cards, setCards] = useState<{ id: number; account: string }[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [swipeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation<StackNavigationProp<any>>();
  const addCard = () => {
    // // Giả lập thêm thẻ thành công
    // setCards([...cards, { id: Date.now(), account: '************3994' }]);
    // setMessage('Your card successfully added');
    // setShowMessage(true);

    // // Tắt thông báo sau 5 giây
    // setTimeout(() => {
    //   setShowMessage(false);
    // }, 5000);

    navigation.navigate('adding_card/card_input');
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx > 20; // Kéo sang bên phải
    },
    onPanResponderMove: (evt, gestureState) => {
      swipeAnim.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 100) {
        // Xoá thẻ nếu kéo sang trái
        deleteCard(gestureState.moveY);
      } else {
        // Trở về vị trí ban đầu
        Animated.spring(swipeAnim, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="flex-1 bg-[#f7f7f7] p-4 mt-12">
        {showMessage && (
          <View className="bg-green-200 p-4 mb-4 rounded">
            <Text className="text-green-800">{message}</Text>
          </View>
        )}

        <Text className="text-2xl font-bold mb-2">Card list</Text>
        <Text className="text-gray-500 mb-4">
          Enter your credit card info into the box below.
        </Text>

        {cards.map((card) => (
          <Animated.View
            key={card.id}
            {...panResponder.panHandlers}
            style={[styles.card, { transform: [{ translateX: swipeAnim }] }]}
          >
            <View className="flex-row justify-between items-center p-4 bg-gray-100 rounded mb-2">
              <Text className="text-gray-700">Account {card.account}</Text>
              <TouchableOpacity onPress={() => deleteCard(card.id)}>
                <Text className="text-red-500">🗑️</Text> {/* Icon xóa */}
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}

        <View className='flex items-center justify-center object-center self-center absolute w-full bottom-16 mx-auto'>
        <TouchableOpacity
          className="w-11/12"
          onPress={addCard}
        >
          <Text className="bg-[#304fff] p-5 rounded-full w-full color-white text-center">+ Add another card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-3 w-11/12"
          onPress={() => navigation.navigate('adding_card/card_banner')}
        >
          <Text className="border border-[#304fff] bg-white p-5 rounded-full w-full text-[#304fff] text-center">Continue</Text>
        </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    position: 'relative',
  },
});

export default CardScreen;
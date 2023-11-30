import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingBagIcon, PlusCircleIcon, MinusCircleIcon } from 'react-native-heroicons/solid';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { ChevronLeftIcon } from 'react-native-heroicons/solid'

const cartItems = [
  { id: 1, name: 'Hamburguer', price: 10, quantity: 2 },
  { id: 2, name: 'Pizza', price: 15, quantity: 1 },

];


export default function CarrinhoScreen({ navigation }) {
  const [cart, setCart] = useState(cartItems);

  const increaseQuantity = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeItem = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  const goToPayment = () => {
    navigation.navigate('Pagamento');
  };


  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Cabeçalho */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginVertical: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white rounded-2xl p-3 shadow">
                        <ChevronLeftIcon size="23" stroke={50} color="black" />
                    </TouchableOpacity>
                    
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Meu Carrinho</Text>
          <ShoppingBagIcon size={30} color="black" />
        </View>

        {/* Lista de itens no carrinho */}
        <ScrollView style={{ paddingHorizontal: 16 }}>
          {cart.map(item => (
            <Animatable.View key={item.id} animation="fadeInUp" duration={500}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
                <Image source={item.image} style={{ width: 50, height: 50, marginRight: 8 }} />
                <Text style={{ fontSize: 18, color: 'black' }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <MinusCircleIcon size={25} color="black" />
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 8, fontSize: 16, color: 'black' }}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <PlusCircleIcon size={25} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeItem(item.id)} style={{ marginLeft: 16 }}>
                    <Text style={{ color: 'red' }}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          ))}
        </ScrollView>

        {/* Total do carrinho */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Total a Pagar:</Text>
          <Text style={{ fontSize: 18, color: 'black' }}>
            R$ {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </Text>
        </View>

        {/* Botão para ir para a tela de pagamento */}
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginHorizontal: 16,
          }}
          onPress={goToPayment}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Ir para o Pagamento</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

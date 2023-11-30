import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCardIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import * as Animatable from 'react-native-animatable';

const itemsToPurchase = [
  { id: 1, name: 'Hamburguer', price: 10, quantity: 2 },
  { id: 2, name: 'Pizza', price: 15, quantity: 1 },
  // Adicione mais itens conforme necessário
];

export default function PaymentScreen({ navigation }) {
  const [cart, setCart] = useState(itemsToPurchase);
  const totalAmount = itemsToPurchase.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Cabeçalho */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginVertical: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
            <ChevronLeftIcon size={30} stroke={50} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Pagamento</Text>
          <CreditCardIcon size={30} color="black" />
        </View>

        {/* Lista de itens a serem comprados */}
        <ScrollView style={{ paddingHorizontal: 16 }}>
          {itemsToPurchase.map(item => (
            <Animatable.View key={item.id} animation="fadeInUp" duration={500}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
                <Image source={item.image} style={{ width: 50, height: 50, marginRight: 8 }} />
                <Text style={{ fontSize: 18, color: 'black' }}>{item.name}</Text>
                <Text style={{ fontSize: 16, color: 'black' }}>Quantidade: {item.quantity}</Text>
              </View>
            </Animatable.View>
          ))}
        </ScrollView>

        {/* Total a pagar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Total a Pagar:</Text>
          <Text style={{ fontSize: 18, color: 'black' }}>R$ {totalAmount.toFixed(2)}</Text>
        </View>

        {/* Botão de pagamento */}
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginHorizontal: 16,
          }}
          onPress={() => alert('Pagamento efetuado com sucesso!')}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Pagar Agora</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

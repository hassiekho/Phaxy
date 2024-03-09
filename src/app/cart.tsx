import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'


export default function CartScreen() {
    const { items, total, checkout } = useCart()
    return (
        <View style={{ padding: 5 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem key={item.id} cartItem={item} />}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
            <Text className='text-base font-semibold text-gray-800'>Total: ${total}</Text>
            <Button onPress={checkout} text='Checkout' />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}
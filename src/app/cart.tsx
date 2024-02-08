import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'


export default function CartScreen() {
    const { items } = useCart()
    return (
        <View>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem key={item.id} cartItem={item} />}
                contentContainerStyle={{padding: 10, gap: 10}}
            />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}
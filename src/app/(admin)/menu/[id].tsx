import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from 'types'

export default function ProductDetails() {
  const router = useRouter()

  const { id } = useLocalSearchParams()
  const product = products.find(p => p.id.toString() === id)

  if (!product) {
    return (
      <Text>Product not found</Text>
    )
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: product?.name,
      }} />
      <Image
        style={styles.image}
        source={{
          uri: product.image as string
        }}
        resizeMode="contain"

      />
   
      <Text className='text-base font-semibold'>${product.name}</Text>
      <Text className='text-base font-semibold'>${product.price}</Text>
  
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500"
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  }
})
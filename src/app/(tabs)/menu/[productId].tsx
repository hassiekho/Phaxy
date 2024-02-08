import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@assets/data/products'
import Button from '@/components/Button'

const sizes = ["S", "M", "L", "XL"]

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("M")
  const { productId } = useLocalSearchParams()
  const product = products.find(p => p.id.toString() === productId)
  const addToCart = () => {
    console.warn("Product")
  }
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
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size, index) => (
          <Pressable
            onPress={() => { setSelectedSize(size) }}
            style={[styles.size, {
              backgroundColor: selectedSize === size ? "gainsboro" : "white"
            }]}
            key={index}>
            <Text style={[styles.sizeText, {
              color: selectedSize === size ? "black" : "gray"
            }]}>{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text className='text-base font-semibold'>${product.price}</Text>
      <Button onPress={addToCart} text='Add to cart' />
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
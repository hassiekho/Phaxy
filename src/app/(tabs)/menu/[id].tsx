import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@assets/data/products'

const sizes = ["S", "M", "L", "XL"]

export default function product() {
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
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size, index) => (
          <View style={styles.size} key={index}>
            <Text style={styles.sizeText}>{size}</Text>
          </View>
        ))}
      </View>
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
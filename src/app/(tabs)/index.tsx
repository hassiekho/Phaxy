import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ProductListItem } from '@/components/ProductListItem'
import products from '@assets/data/products'


const product = products[0]


export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} />
    </View>
  )
}


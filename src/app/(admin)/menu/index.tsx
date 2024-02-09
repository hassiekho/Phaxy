import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { ProductListItem } from '@/components/ProductListItem'
import products from '@assets/data/products'


const product = products[0]


export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  )
}


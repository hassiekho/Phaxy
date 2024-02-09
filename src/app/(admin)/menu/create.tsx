import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';


export default function CreateProductScreen() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState("")
  const [image, setImage] = useState<string | null>(null);
  const resetFields = () => {
    setName("")
    setPrice("")
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInput = () => {
    setErrors("")
    if (!name) {
      setErrors("Name is required")
      return false
    }
    if (!price) {
      setErrors("Price is required")
      return false
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number")
      return false
    }

    return true
  }
  const createProduct = () => {
    if (!validateInput()) {
      return
    }
    console.warn(name, price)
    return resetFields()
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerTitle: "Create Product"
      }} />
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"
        }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.selectButton}>Select Image</Text>
      <View className='space-y-2'>
        <View>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            value={name}
            style={styles.input}
            onChangeText={setName}
            placeholder='Enter product name'
          />
        </View>
        <View>
          <Text style={styles.label}>Price</Text>
          <TextInput
            value={price}
            style={styles.input}
            onChangeText={setPrice}
            placeholder='Enter product price'
            keyboardType='numeric'
          />
        </View>
      </View>
      <Text className='text-red-700'>{errors}</Text>
      <Button onPress={createProduct} text='Create' />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20
  },
  label: {
    color: "gray",
    fontSize: 16
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center"
  },
  selectButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    fontSize: 16
  }
})
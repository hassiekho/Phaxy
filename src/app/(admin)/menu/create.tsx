import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { randomUUID } from "expo-crypto";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import { supabase } from "@/lib/supabase";

export default function CreateProductScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateAProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();
  const isUpdating = !!id;
  const resetFields = () => {
    setName("");
    setPrice("");
  };

  console.log("first", updatingProduct);
  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

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
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      updateProduct();
    } else {
      createProduct();
    }
  };
  const createProduct = () => {
    if (!validateInput()) {
      return;
    }
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
    return resetFields();
  };
  const updateProduct = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();
    console.log(imagePath)
    updateAProduct(
      {
        id,
        name,
        price: parseFloat(price),
        image: imagePath ,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: isUpdating ? "Update Product" : "Create Product",
        }}
      />
      <Image
        source={{
          uri:
            image ||
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
        }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.selectButton}>
        Select Image
      </Text>
      <View className="space-y-2">
        <View>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            value={name}
            style={styles.input}
            onChangeText={setName}
            placeholder="Enter product name"
          />
        </View>
        <View>
          <Text style={styles.label}>Price</Text>
          <TextInput
            value={price}
            style={styles.input}
            onChangeText={setPrice}
            placeholder="Enter product price"
            keyboardType="numeric"
          />
        </View>
      </View>
      <Text className="text-red-700">{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text onPress={confirmDelete} className="text-red-700 text-center">
          Delete
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  selectButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    fontSize: 16,
  },
});

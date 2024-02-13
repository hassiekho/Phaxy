import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "types";
import { useProduct } from "@/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

export default function ProductDetails() {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { productId: productIdString } = useLocalSearchParams();
  const id = parseFloat(
    typeof productIdString === "string" ? productIdString : productIdString[0]
  );
  const { data: product, error, isLoading } = useProduct(id);

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product?.name,
        }}
      />
      <Image
        style={styles.image}
        source={{
          uri:
            product.image ||
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
        }}
        resizeMode="contain"
      />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size, index) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={index}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text className="text-base font-semibold">${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

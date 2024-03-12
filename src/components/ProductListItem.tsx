import { Link, useSegments } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product, Tables } from "types";
import RemoteImage from "./RemoteImage";



type ProductListItemComponent = {
  product: Tables<"products">;
};

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

export const ProductListItem = ({ product }: ProductListItemComponent) => {
  const segments = useSegments();
  if (!segments) {
    return;
  }
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
       <RemoteImage
        path={product.image} 
        style={styles.image} 
        resizeMode="contain"
        fallback={defaultPizzaImage}
        
        />
        <Text>{product.name}</Text>
        <Text className="text-blue-700">${product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

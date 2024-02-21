import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrdersList } from "@/api/orders";

export default function index() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdersList({ archived: true });
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed To Fetch</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}

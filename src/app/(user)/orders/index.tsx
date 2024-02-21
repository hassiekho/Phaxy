import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";

import OrderListItem from "@/components/OrderListItem";
import { useMyOrdersList } from "@/api/orders";

export default function index() {
  const { data: orders, isLoading, error } = useMyOrdersList();
  
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed To Fetch</Text>
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}

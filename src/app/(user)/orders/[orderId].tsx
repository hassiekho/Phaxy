import { View, Text, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";

export default function OrderDetailsScreen() {
  const { orderId } = useLocalSearchParams();
  const order = orders.find((o) => o.id.toString() === orderId);
  if (!order) {
    return (
      <Text className="text-xl text-slate-900 text-center font-semibold">
        Order Not found
      </Text>
    );
  }
  return (
    <View style={{ padding: 10 , gap: 20}}>
      <Stack.Screen
        options={{
          title: `Order #${orderId}`,
        }}
      />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{
          gap: 10,
        }}
      />
    </View>
  );
}

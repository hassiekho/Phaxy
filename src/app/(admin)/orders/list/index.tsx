import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrdersList } from "@/api/orders";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderSubscription } from "@/api/orders/subscriptions";

export default function index() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdersList({ archived: false });

  const queryClient = useQueryClient();
  useInsertOrderSubscription();
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

import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import Colors from "@/constants/Colors";
import { OrderStatusList } from "types";

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
        ListFooterComponent={()=><>
          <Text style={{ fontWeight: 'bold' }}>Status</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {OrderStatusList.map((status) => (
              <Pressable
                key={status}
                onPress={() => console.warn('Update status')}
                style={{
                  borderColor: Colors.light.tint,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  backgroundColor:
                    order.status === status
                      ? Colors.light.tint
                      : 'transparent',
                }}
              >
                <Text
                  style={{
                    color:
                      order.status === status ? 'white' : Colors.light.tint,
                  }}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
        }
      />
    </View>
  );
}


import { Image, StyleSheet, Text, View } from "react-native"
import { Product } from "types"


type ProductListItemComponent = {
    product: Product
}

export const ProductListItem = ({product}: ProductListItemComponent) => {
    return (
        <View className='bg-white p-2 rounded-md'>
            <Image
                style={styles.image}
                source={{
                    uri: product.image as string
                }}

            />
            <Text>{product.name}</Text>
            <Text className='text-blue-700'>${product.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1
    }
})
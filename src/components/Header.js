import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default props => {
    const header = <Text style={styles.buttonLabel}>SMSLAPP</Text>;
    return (
        <View style={styles.container}>
        {header}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#424242',
        alignItems: 'flex-start'
    },
    buttonLabel: {
        padding: 10,
        fontSize: 20,
        color: '#DDD',
        fontWeight: 'bold'
    }
})
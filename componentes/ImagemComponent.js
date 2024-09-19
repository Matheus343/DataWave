import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function ImageComponent() {
    return (
        <Image
            source={require('../assets/dw_imagem.png')}
            style={styles.logo}
        />
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});

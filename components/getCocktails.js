import {Image, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";

const GetCocktails = () => {


    const [data, setData] = useState({});
    const getBeer = async () => {
        try {
            const response = await fetch('https://api.punkapi.com/v2/beers/random');
            const json = await response.json();
            setData(json[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBeer();
    }, []);

    return (
        <View style={styles.compo}>
            <Text style={styles.title}>
                Bienvenue sur
            </Text>
            <Text style={styles.title}>
                RandomBEER !
            </Text>
            <Text style={styles.texte}>
                {data.name}
            </Text>
            <Text style={styles.desc}>
                {data.description}
            </Text>
            <Image
                style={styles.img}
                source={{
                    uri: `${data.image_url}`,
                }}
            />
        </View>
    );

}
export default GetCocktails;


const styles = StyleSheet.create({
    texte: {
        color: "black",
        fontSize: 20,
        marginTop:20,
    },
    title: {
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
    },
    compo: {
        marginTop: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    desc: {
        fontSize:15,
        margin:10,

    },
    img:{
        height:200,
        width:100,
    }
});
import { Pressable, StyleSheet } from "react-native";
import React, { useState, PropsWithChildren } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedIcon } from "@/components/ThemedIcon";

type Prop = PropsWithChildren<{
        supportEmail: string,
        id: string,
        topic: string,
        lookChat?: any
    }>;

export default function Card({
    supportEmail,
    id,
    topic,
    lookChat,
}: Prop) { 
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.leftContainer}>

                <ThemedText type="default" style={styles.title} numberOfLines={1}>
                    ID: {id}
                </ThemedText>
                <ThemedText type="defaultMini" style={styles.subtitle} numberOfLines={1}>
                    Topic: {topic}
                </ThemedText>
                <ThemedText type="defaultMini" style={styles.subtitle} numberOfLines={1}>
                    {supportEmail? supportEmail : "Support not asign"}
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.rightContainer}>
                <Pressable
                    onPress={lookChat}
                >
                    {/* <ion-icon name="arrow-dropright" /> */}
                    <ThemedIcon name="arrow-forward" color={"white"}/>
                </Pressable>
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        // alignItems: 'center',
        // justifyContent: 'space-around',
        backgroundColor: '#257DC0',
        width: '100%',
        height: 80,
        borderRadius: 10,
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        backgroundColor: '#257DC0',
        borderRadius: 10,
        width: '80%',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#257DC0',
        borderRadius: 10,
        width: '20%',
    },
    title: {
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 2,
        fontWeight: 'bold',
        flexShrink: 1
    },
    subtitle: {
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 2,
    },
});

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         marginBottom: 10,
//         backgroundColor: '#257DC0',
//         width: '100%', // Para que el ancho se ajuste al contenido
//         borderRadius: 10,
//         padding: 10,
//     },
//     leftContainer: {
//         flexDirection: 'column',
//         backgroundColor: '#257DC0',
//         borderRadius: 10,
//     },
//     rightContainer: {
//         flexDirection: 'column',
//         alignItems: 'flex-end',
//         justifyContent: 'center',
//         backgroundColor: '#257DC0',
//         borderRadius: 10,
//     },
//     title: {
//         marginBottom: 5,
//         marginLeft: 2,
//         fontWeight: 'bold',
//     },
//     subtitle: {
//         marginBottom: 5,
//         marginLeft: 2,
//     },
// });
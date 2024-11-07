import { Pressable, StyleSheet } from "react-native";
import React, { useState, PropsWithChildren } from 'react';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedIcon } from "@/components/ThemedIcon";
import { Link, Redirect, router } from "expo-router";

type Prop = PropsWithChildren<{
        supportEmail: string,
        id: string,
        topic: string,
        lookChat?: any,
        closed: string,
    }>;

export default function Card({
    supportEmail,
    id,
    topic,
    lookChat,
    closed,
}: Prop) { 
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={[styles.leftContainer, closed == 'Open'? styles.openColor : styles.closeColor]}>

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
            <ThemedView style={[styles.rightContainer, closed == 'Open'? styles.openColor : styles.closeColor]}>
                <Pressable
                onPress={() =>
                    router.push({
                    pathname: "/hiddenScreens/[jammerChat]",
                    params: { jammerChat: id },
                    })
                }
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
        width: '100%',
        height: 80,
        borderRadius: 10,
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: '80%',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#257DC0',
        borderEndEndRadius: 10,
        borderTopEndRadius: 10,
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
        flexShrink: 1
    },
    openColor: {
        backgroundColor: '#257DC0',
    },
    closeColor: {
        backgroundColor: '#D9534F',
    },
});
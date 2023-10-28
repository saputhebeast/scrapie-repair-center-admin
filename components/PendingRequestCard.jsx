import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../constants';
import { db } from '../firebase.config';
import { collection, doc, setDoc } from 'firebase/firestore';

const updateRequest = async (id, status) => {
    const docRef = doc(db, 'repair-center-request', id);
    try { 
        await setDoc(docRef, { status }, { merge: true });
        console.log("Request updated successfully");
    } catch (error) {
        console.error("Error updating request:", error);
    }
}

const PendingRequestCard = ({ id, imageSource, name, address, phoneNumber, budget, requestedAt }) => {
    return (
        <View style={styles.card}>
            <View style={styles.leftSide}>
                <Image source={{ uri: imageSource }} style={styles.image} />
            </View>
            <View style={styles.rightSide}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.details}>Email: {address}</Text>
                <Text style={styles.details}>Contact: {phoneNumber}</Text>
                <Text style={styles.details}>Budget: {budget}</Text>
                <Text style={styles.details}>Requested At: {requestedAt}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: COLORS.primary }]}
                        onPress={() => {
                            Alert.alert(
                                "Approve Request",
                                "Do you want to approve this request? Once you approve, you can't roll back your decision.",
                                [
                                    { text: "No", onPress: () => {} },
                                    {
                                        text: "Yes",
                                        onPress: async () => {
                                            await updateRequest(id, 'on-going');
                                        },
                                    },
                                ]
                            );
                        }}>
                        <Text style={{ color: COLORS.white, fontSize: 15 }}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: COLORS.red }]}
                        onPress={() => {
                            Alert.alert(
                                "Reject Request",
                                "Do you want to reject this request? Once you reject, you can't roll back your decision.",
                                [
                                    { text: "No", onPress: () => {} },
                                    {
                                        text: "Yes",
                                        onPress: async () => {
                                            await updateRequest(id, 'declined');
                                        },
                                    },
                                ]
                            );
                        }}>
                        <Text style={{ color: COLORS.white, fontSize: 15 }}>Reject</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: COLORS.primary,
        borderRadius: 10,
        marginLeft: 20,
        marginBottom: 20
    },
    leftSide: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    rightSide: {
        flex: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: -20,
    },
    image: {
        marginLeft: 10,
        width: 120,
        height: 150,
        borderRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        flex: 1,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
});

export default PendingRequestCard;

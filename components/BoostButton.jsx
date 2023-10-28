// BoostButton.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { COLORS } from "../constants";
import { setDoc, doc } from "@firebase/firestore";
import { db } from "../firebase.config";

const BoostButton = ({ repairCenterId, isBoosted }) => {
    const boostRepairCenter = async () => {
        try {
            const docRef = doc(db, "repair-centers", repairCenterId);
            await setDoc(docRef, { isBoosted: true }, { merge: true });
        } catch (error) {
            console.error("Error boosting repair center:", error);
        }
    };

    const handleBoostButtonPress = () => {
        if (isBoosted) {
            // Already boosted
            Alert.alert("Already Boosted", "This repair center is already boosted.");
        } else {
            // Ask for confirmation
            Alert.alert(
                "Boost Repair Center",
                "Boosting this repair center will place it at the top of the search list. Are you sure you want to boost it?",
                [
                    {
                        text: "No",
                        style: "cancel",
                    },
                    {
                        text: "Yes",
                        onPress: boostRepairCenter,
                    },
                ]
            );
        }
    };

    return (
        <View style={{ width: "100%" }}>
            <TouchableOpacity
                onPress={handleBoostButtonPress}
                style={isBoosted ? styles.boosted : styles.boostButton}
            >
                <Text style={styles.boostButtonText}>
                    {isBoosted ? "Boosted" : "Boost"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    boostButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    boosted: {
        backgroundColor: COLORS.green,
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    boostButtonText: {
        color: COLORS.white,
        fontSize: 16,
    },
    boostSectionBorder: {
        borderColor: COLORS.gray,
        borderWidth: 1,
    },
});

export default BoostButton;

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PendingRequestCard from "./PendingRequestCard";
import { db } from '../firebase.config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

const getUserData = async () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                const usersCollection = collection(db, "users");
                const userQuery = query(usersCollection, where("email", "==", userEmail));
                try {
                    const querySnapshot = await getDocs(userQuery);
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        const userData = userDoc.data();
                        const userId = userDoc.id;
                        const userDataWithId = { ...userData, id: userId };
                        resolve(userDataWithId);
                    } else {
                        console.error("User document not found.");
                        reject("User document not found");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    reject(error);
                }
            } else {
                console.error("User not authenticated.");
                reject("User not authenticated");
            }
        });
    });
};

const getUserById = async (userId) => {
    try {
        const repairCenterRef = doc(db, "users", userId);
        const repairCenterDoc = await getDoc(repairCenterRef);

        if (repairCenterDoc.exists()) {
            const repairCenterData = repairCenterDoc.data();
            return repairCenterData;
        } else {
            console.error("Repair center document not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching repair center data:", error);
        return null;
    }
};

const getRepairCenterById = async (repairCenterId) => {
    try {
        const repairCenterRef = doc(db, "repair-centers", repairCenterId);
        const repairCenterDoc = await getDoc(repairCenterRef);

        if (repairCenterDoc.exists()) {
            const repairCenterData = repairCenterDoc.data();
            return repairCenterData;
        } else {
            console.error("Repair center document not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching repair center data:", error);
        return null;
    }
};

const fetchRepairCenterRequests = async ({ repairCenterId, status }) => {
    try {
        const requestsCollection = collection(db, "repair-center-request");
        let requestsQuery = requestsCollection;

        if (repairCenterId) {
            requestsQuery = query(requestsQuery, where("repairCenterId", "==", repairCenterId));
        }

        if (status) {
            requestsQuery = query(requestsQuery, where("status", "==", status));
        }

        const querySnapshot = await getDocs(requestsQuery);
        const data = [];

        for (const doc of querySnapshot.docs) {
            const rawData = doc.data();
            const repairCenterData = await getRepairCenterById(rawData.repairCenterId);
            const customerData = await getUserById(rawData.userId);
            const processedData = {
                id: doc.id,
                budget: parseInt(rawData.budget),
                dateTime: new Date(rawData.dateTime),
                days: parseInt(rawData.days),
                image: rawData.image,
                item: rawData.item,
                repairCenter: repairCenterData,
                status: rawData.status,
                customer: customerData,
            };
            data.push(processedData);
        }

        return data;
    } catch (error) {
        console.error("Error fetching repair centers:", error);
        return [];
    }
};

const PendingRequestView = () => {
    const [user, setUser] = useState();
    const [pendingRequests, setPendingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData();
                setUser(userData);
    
                if (userData) {
                    // Get repair center ID using the user ID
                    const repairCentersCollection = collection(db, "repair-centers");
                    const repairCentersQuery = query(repairCentersCollection, where("userId", "==", userData.id));
                    const repairCenterSnapshot = await getDocs(repairCentersQuery);
    
                    if (!repairCenterSnapshot.empty) {
                        const repairCenterDoc = repairCenterSnapshot.docs[0];
                        const repairCenterData = repairCenterDoc.data();
                        const repairCenterId = repairCenterDoc.id;
    
                        // Now that we have the repair center ID, fetch pending requests
                        const data = await fetchRepairCenterRequests({ repairCenterId, status: "pending" });
                        setPendingRequests(data);
                    } else {
                        console.error("No repair center found for the user.");
                    }
                } else {
                    console.error("User data is undefined.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <ScrollView>
            <Text style={styles.header}>Pending Requests</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <Text>Loading...</Text>
                    </View>
                ) : pendingRequests && pendingRequests.length > 0 ? (
                    pendingRequests.map((request, index) => (
                        <PendingRequestCard
                            key={index}
                            id={request.id}
                            imageSource={request.image}
                            name={request.customer?.name || 'N/A'}
                            address={request.customer?.email || 'N/A'}
                            phoneNumber={request.customer?.phone || 'N/A'}
                            budget={request.budget}
                            requestedAt={request.dateTime.toLocaleString()}
                            
                        />
                    ))
                ) : (
                    <Text>No pending requests found.</Text>
                )}
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 100,
        fontSize: 40,
        marginLeft: 20,
    },
    loadingContainer: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        minHeight: "100%",
    },
});

export default PendingRequestView;

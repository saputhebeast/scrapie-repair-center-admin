import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Welcome } from "../../components";
import { COLORS } from "../../constants";
import BoostButton from "../../components/BoostButton";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  const useRepairCenterRequests = async (repairCenterId) => {
    try {
      const requestsCollection = collection(db, "repair-center-request");
      const requestsQuery = query(requestsCollection, where("repairCenterId", "==", repairCenterId));

      const querySnapshot = await getDocs(requestsQuery);
      const data = [];

      querySnapshot.forEach((doc) => {
        const rawData = doc.data();
        const processedData = {
          id: doc.id,
          budget: parseInt(rawData.budget),
          dateTime: new Date(rawData.dateTime),
          days: parseInt(rawData.days),
          image: rawData.image,
          item: rawData.item,
        };
        data.push(processedData);
      });

      return data;
    } catch (error) {
      console.error("Error fetching repair center requests:", error);
      return [];
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const userEmail = authUser.email;

        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("email", "==", userEmail));

        getDocs(userQuery)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const userData = userDoc.data();
              const userId = userDoc.id;
              const userDataWithId = { ...userData, id: userId };
              setUser(userDataWithId);

              // Fetch repair center requests after getting the user data
              useRepairCenterRequests(userId)
                .then((data) => {
                  setRequests(data);
                })
                .catch((error) => {
                  console.error("Error fetching repair center requests:", error);
                  setRequests([]);
                });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Welcome />
      <View style={styles.boostSection}>
        <Text style={styles.boostDescription}>
          Boost your repair center to be at the top of the search list.
        </Text>
        {user ? (
          <BoostButton repairCenterId={user.id} isBoosted={user.isBoosted} />
        ) : (
          <Text>Loading user data...</Text>
        )}
      </View>
      <ScrollView>
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statsItem} disabled={true}>
              <Text style={styles.statsLabel}>Visits</Text>
              <Text style={styles.statsValue}>100</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statsItem} disabled={true}>
              <Text style={styles.statsLabel}>Pending Requests</Text>
              <Text style={styles.statsValue}>4</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statsItem} disabled={true}>
              <Text style={styles.statsLabel}>Ongoing Orders</Text>
              <Text style={styles.statsValue}>2</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statsItem} disabled={true}>
              <Text style={styles.statsLabel}>Total Money Made</Text>
              <Text style={styles.statsValue}>$5600</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  boostSection: {
    alignItems: "center",
    padding: 20,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
  },
  boostDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  statsSection: {
    padding: 30,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 25,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  statsItem: {
    flex: 1,
    alignItems: "center",
  },
  statsLabel: {
    fontSize: 16,
    color: COLORS.gray,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
});

export default Home;

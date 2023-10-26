import { db } from "../../firebase.config";

const getUser = async () => {
    const userID = "qPffAhYz8flGU91qYvCX";
    try {
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("userId", "==", userID));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.docs.length === 0) {
            console.log("User not found");
            return null;
        }

        const userData = querySnapshot.docs[0].data();
        return userData;
    } catch (error) {
        console.error("Error getting user from Fire store: ", error);
        return null;
    }
};

export default getUser;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Simulación de visitas generadas
const visits = Array(8).fill({
  name: "Angel Daniel",
  time: "18:00",
  timestamp: new Date().getTime(),
});

const VisitsScreen = () => {
  const navigation = useNavigation();
  const [recentVisits, setRecentVisits] = useState([]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const now = new Date().getTime();
    const fourHoursInMs = 4 * 60 * 60 * 1000;

    const filteredVisits = visits.filter(
      (visit) => now - visit.timestamp <= fourHoursInMs
    );

    setRecentVisits(filteredVisits);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Image
            source={require("../assets/circulo-de-flecha.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.logo}>SCSVF</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("HomeStack", { screen: "Home" })
          }
        >
          <Image
            source={require("../assets/menu_icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Mis visitas</Text>

      <FlatList
        data={recentVisits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.visitItem}
            onPress={() =>
              navigation.navigate("VisitQRScreen", {
                name: item.name,
                time: item.time,
              })
            }
          >
            <Text style={styles.visitText}>{
              `${item.name} | Hora: ${item.time}`
            }</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F18F5A",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 2,
    marginBottom: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  visitItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  visitText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VisitsScreen;

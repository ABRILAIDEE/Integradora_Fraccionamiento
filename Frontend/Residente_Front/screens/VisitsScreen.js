import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const visits = Array(8).fill({ name: "Angel Daniel", time: "18:00" });

const VisitsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>SCSVF</Text>
        <TouchableOpacity onPress={() => alert("Opciones")}>
          <Text style={styles.icon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Mis visitas</Text>
      <FlatList
        data={visits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.visitItem}
            onPress={() => navigation.navigate("Visit QR")}
          >
            <Text style={styles.visitText}>{`${item.name} | Hora: ${item.time}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7945b",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 22,
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
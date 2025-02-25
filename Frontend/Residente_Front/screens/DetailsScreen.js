import React from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView, Image} from "react-native";

const DetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text>Pantalla de Detalles</Text>


        <Image
                              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQNs6OINZNmNUROQ6MuUekfOe0Igx3XtumMG-ve8STDo0ofvj7HjqdM_XA9XBQaNUTeo&usqp=CAU' }} 
                              style={styles.image}
                            />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
    image: {
      width: 600, 
      height: 600, 
      marginBottom: 20,
    },
  });

export default DetailsScreen;
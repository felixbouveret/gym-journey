import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { RootTabScreenProps } from "@/types";

export default function TabOneScreen({}: RootTabScreenProps<"TabOne">) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

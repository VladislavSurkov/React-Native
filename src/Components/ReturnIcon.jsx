import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default ReturnIcon = () => {
 const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.goBack()}
      style={styles.exitBtn}
    >
      <AntDesign
        name="arrowleft"
        style={styles.returnSvg}
        size={28}
        color={"#BDBDBD"}
        backgroundColor={"transparent"}
        header={20}
      />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  exitBtn: {
      position: "absolute",
      left: 16,
      bottom: 10,
  },
});

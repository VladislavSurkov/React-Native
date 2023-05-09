import { Ionicons } from "@expo/vector-icons";
import { logout } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet } from "react-native";

export default LogOutIcon = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => dispatch(logout())}
      style={styles.exitBtn}
    >
      <Ionicons
        name="exit-outline"
        style={styles.exitSvg}
        size={28}
        color="#BDBDBD"
        backgroundColor="transparent"
      />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  exitBtn: {
    position: "absolute",
    right: 16,
    bottom: 10,
  },

});

import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  onClear?: () => void;
};

export function SearchInput({
  value,
  onChangeText,
  placeholder,
  onClear,
}: SearchInputProps) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="person-outline" size={18} color={colors.inputIcon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
      {value ? (
        <Pressable onPress={onClear} hitSlop={10} style={styles.clearButton}>
          <Ionicons name="close-circle" size={18} color={colors.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.softPeachBorder,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.title,
    fontSize: 15,
    paddingVertical: 14,
  },
  clearButton: {
    marginLeft: 8,
  },
});

import { AppScreen } from "@/src/components/ui/AppScreen";
import { AnimatedPressable } from "@/src/components/ui/AnimatedPressable";
import { BrandHeader } from "@/src/components/ui/BrandHeader";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { RevealView } from "@/src/components/ui/RevealView";
import { SearchInput } from "@/src/components/ui/SearchInput";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { members, villages } from "@/src/data/content";
import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MembersScreen() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [name, setName] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [showVillages, setShowVillages] = useState(false);

  useEffect(() => {
    if (typeof params.query === "string") {
      setName(params.query);
    }
  }, [params.query]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const nameMatch = name
        ? member.fullName.toLowerCase().includes(name.trim().toLowerCase())
        : true;
      const villageMatch = selectedVillage
        ? member.village === selectedVillage
        : true;

      return nameMatch && villageMatch;
    });
  }, [name, selectedVillage]);

  return (
    <AppScreen keyboardShouldPersistTaps="handled">
      <RevealView>
        <BrandHeader badgeLabel="Members" onRightPress={() => router.push("/home")} />
      </RevealView>

      <RevealView delay={70} style={styles.searchCard}>
        <SectionTitle label="Find Your Kin" />
        <Text style={styles.searchSubtitle}>
          Search by member name or village. The structure is static today, but ready for API-backed data later.
        </Text>

        <View style={styles.formGap}>
          <SearchInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Rajesh Patel"
          />
        </View>

        <View style={styles.dropdownWrap}>
          <Pressable onPress={() => setShowVillages((prev) => !prev)} style={styles.dropdownButton}>
            <View style={styles.dropdownLeft}>
              <Ionicons name="location-outline" size={18} color={colors.inputIcon} />
              <Text
                style={[
                  styles.dropdownText,
                  !selectedVillage ? styles.dropdownPlaceholder : null,
                ]}
              >
                {selectedVillage || "Select Village"}
              </Text>
            </View>
            <Ionicons
              name={showVillages ? "chevron-up" : "chevron-down"}
              size={18}
              color={colors.muted}
            />
          </Pressable>

          {showVillages ? (
            <View style={styles.dropdownList}>
              {villages.map((village) => (
                <Pressable
                  key={village}
                  onPress={() => {
                    setSelectedVillage(village);
                    setShowVillages(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{village}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        <PrimaryButton
          label="Clear Filters"
          onPress={() => {
            setName("");
            setSelectedVillage("");
            setShowVillages(false);
          }}
        />
      </RevealView>

      <Text style={styles.resultsCount}>
        {filteredMembers.length} member{filteredMembers.length === 1 ? "" : "s"} found
      </Text>

      {filteredMembers.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="people-outline" size={26} color={colors.muted} />
          </View>
          <Text style={styles.emptyTitle}>No members found</Text>
          <Text style={styles.emptySubtitle}>Try adjusting your search filters.</Text>
        </View>
      ) : null}

      {filteredMembers.map((member) => (
        <AnimatedPressable key={member.id} style={styles.memberCard}>
          <View style={styles.memberTopRow}>
            <View style={styles.memberMain}>
              <Text style={styles.memberName}>{member.fullName}</Text>
              <Text style={styles.memberAge}>Age: {getAge(member.dateOfBirth)}</Text>
            </View>
          </View>

          <InfoLine icon="calendar-outline" text={member.dateOfBirth} />
          <InfoLine icon="location-outline" text={`${member.currentCity} · ${member.village}`} />
          <InfoLine icon="briefcase-outline" text={member.occupation} />

          {member.canadaStatus ? (
            <View style={styles.statusRow}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color={colors.primarySolid}
              />
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{member.canadaStatus}</Text>
              </View>
            </View>
          ) : null}
        </AnimatedPressable>
      ))}
    </AppScreen>
  );
}

type InfoLineProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  text: string;
};

function InfoLine({ icon, text }: InfoLineProps) {
  return (
    <View style={styles.infoLine}>
      <Ionicons name={icon} size={14} color={colors.subtleText} />
      <Text style={styles.infoLineText}>{text}</Text>
    </View>
  );
}

function getAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

const styles = StyleSheet.create({
  searchCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.softPeachBorder,
    borderRadius: 32,
    padding: 20,
    marginBottom: 18,
    ...shadows.lifted,
  },
  searchSubtitle: {
    color: colors.subtleText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: -4,
    marginBottom: 18,
  },
  formGap: {
    marginBottom: 14,
  },
  dropdownWrap: {
    marginBottom: 16,
  },
  dropdownButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.softPeachBorder,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  dropdownText: {
    marginLeft: 10,
    color: colors.title,
    fontSize: 15,
  },
  dropdownPlaceholder: {
    color: colors.muted,
  },
  dropdownList: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    marginTop: 8,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    color: colors.subtleText,
    fontSize: 15,
    fontWeight: "600",
  },
  resultsCount: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    marginBottom: 14,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 38,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.softPeach,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    color: colors.title,
    fontSize: 20,
    fontWeight: "800",
  },
  emptySubtitle: {
    color: colors.subtleText,
    fontSize: 14,
    marginTop: 4,
  },
  memberCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    padding: 18,
    marginBottom: 14,
    ...shadows.soft,
  },
  memberTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  memberMain: {
    flex: 1,
  },
  memberName: {
    color: colors.title,
    fontSize: 20,
    fontWeight: "800",
  },
  memberAge: {
    color: colors.subtleText,
    fontSize: 14,
    fontWeight: "600",
  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLineText: {
    color: colors.subtleText,
    fontSize: 15,
    marginLeft: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statusBadge: {
    marginLeft: 8,
    backgroundColor: colors.softPeach,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    color: colors.primarySolid,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});

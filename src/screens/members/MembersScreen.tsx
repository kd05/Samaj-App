import { AppScreen } from "@/src/components/ui/AppScreen";
import { AnimatedPressable } from "@/src/components/ui/AnimatedPressable";
import { BrandHeader } from "@/src/components/ui/BrandHeader";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { RevealView } from "@/src/components/ui/RevealView";
import { SearchInput } from "@/src/components/ui/SearchInput";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { API_ROUTES } from "@/src/config/api";
import { villages as fallbackVillages } from "@/src/data/content";
import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { getNumberField, getObjectField, getStringField, type ApiRecord } from "@/src/utils/apiFields";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

export default function MembersScreen() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [name, setName] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [appliedName, setAppliedName] = useState("");
  const [appliedVillage, setAppliedVillage] = useState("");
  const [memberList, setMemberList] = useState<MemberListItem[]>([]);
  const [availableVillages, setAvailableVillages] = useState<string[]>(fallbackVillages);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [membersError, setMembersError] = useState("");
  const [villagesError, setVillagesError] = useState("");
  const [showVillages, setShowVillages] = useState(false);

  useEffect(() => {
    if (typeof params.query === "string") {
      setName(params.query);
    }
  }, [params.query]);

  useEffect(() => {
    let isMounted = true;

    const loadVillages = async () => {
      try {
        setVillagesError("");

        const response = await fetch(API_ROUTES.villages, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        const villagesPayload = Array.isArray(data?.data?.villages)
          ? data.data.villages
          : Array.isArray(data?.villages)
            ? data.villages
            : [];

        const villageOptions = villagesPayload
          .map((item) => getStringField(item as ApiRecord, ["title", "name"]))
          .filter(Boolean);

        if (!response.ok || villageOptions.length === 0) {
          throw new Error(data?.message || "Unable to fetch villages.");
        }

        if (!isMounted) {
          return;
        }

        setAvailableVillages(villageOptions);
      } catch (error) {
        console.log("Villages API error:", error);

        if (!isMounted) {
          return;
        }

        setAvailableVillages(fallbackVillages);
        setVillagesError("Showing saved villages right now.");
      }
    };

    loadVillages();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    return memberList.filter((member) => {
      const nameMatch = appliedName
        ? member.fullName.toLowerCase().includes(appliedName.trim().toLowerCase())
        : true;
      const villageMatch = appliedVillage
        ? member.village.toLowerCase() === appliedVillage.trim().toLowerCase()
        : true;

      return nameMatch && villageMatch;
    });
  }, [appliedName, appliedVillage, memberList]);

  const isSearchDisabled = isSearching || (!name.trim() && !selectedVillage);

  const handleSearch = async () => {
    if (isSearchDisabled) {
      return;
    }

    try {
      setIsSearching(true);
      setMembersError("");
      setHasSearched(true);
      setAppliedName(name.trim());
      setAppliedVillage(selectedVillage);
      setShowVillages(false);

      const response = await fetch(API_ROUTES.members, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const membersPayload = Array.isArray(data?.data?.members)
        ? data.data.members
        : Array.isArray(data?.members)
          ? data.members
          : [];

      const mappedMembers = membersPayload
        .map((item) => mapApiMember(item))
        .filter((member): member is MemberListItem => member !== null);

      if (!response.ok) {
        throw new Error(data?.message || "Unable to fetch members.");
      }

      setMemberList(mappedMembers);
    } catch (error) {
      console.log("Members API error:", error);
      setMemberList([]);
      setMembersError("We couldn't load members right now. Please try again shortly.");
    } finally {
      setIsSearching(false);
    }
  };

  const resetResults = () => {
    setAppliedName("");
    setAppliedVillage("");
    setMemberList([]);
    setMembersError("");
    setHasSearched(false);
    setIsSearching(false);
    setShowVillages(false);
  };

  const handleClearName = () => {
    setName("");
    resetResults();
  };

  const handleClearVillage = () => {
    setSelectedVillage("");
    setShowVillages(false);
    resetResults();
  };

  return (
    <AppScreen keyboardShouldPersistTaps="handled">
      <RevealView>
        <BrandHeader badgeLabel="Members" onRightPress={() => router.push("/home")} />
      </RevealView>

      <RevealView delay={70} style={styles.searchCard}>
        <SectionTitle label="Search Members in Canada" />
        <Text style={styles.searchSubtitle}>
          Search by member name or village. Results update only after you press the search
          button.
        </Text>
        {membersError ? (
          <Text style={styles.helperText}>{membersError}</Text>
        ) : null}
        {villagesError ? (
          <Text style={styles.helperText}>{villagesError}</Text>
        ) : null}

        <View style={styles.formGap}>
          <SearchInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Rajesh Patel"
            onClear={handleClearName}
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
            <View style={styles.dropdownActions}>
              {selectedVillage ? (
                <Pressable onPress={handleClearVillage} hitSlop={10} style={styles.dropdownClearButton}>
                  <Ionicons name="close-circle" size={18} color={colors.muted} />
                </Pressable>
              ) : null}
              <Ionicons
                name={showVillages ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.muted}
              />
            </View>
          </Pressable>

          {showVillages ? (
            <View style={styles.dropdownList}>
              {availableVillages.map((village) => (
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

        <View style={styles.actionsRow}>
          <PrimaryButton
            label={isSearching ? "Searching..." : "Search"}
            onPress={handleSearch}
            disabled={isSearchDisabled}
            style={styles.searchButtonFull}
          />
        </View>
      </RevealView>

      {!hasSearched ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="people-outline" size={26} color={colors.muted} />
          </View>
          <Text style={styles.emptyTitle}>Search for members</Text>
          <Text style={styles.emptySubtitle}>
            Enter a name or choose a village, then press search to view results.
          </Text>
        </View>
      ) : isSearching ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={colors.primaryEnd} />
          <Text style={styles.loadingTitle}>Searching members</Text>
          <Text style={styles.loadingSubtitle}>
            We are fetching the latest results for your search.
          </Text>
        </View>
      ) : (
        <>
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
                  <Text style={styles.memberName}>
                    {member.fullName}
                    {member.village ? (
                      <Text style={styles.memberMetaInline}> ({member.village})</Text>
                    ) : null}
                  </Text>
                  <Text style={styles.memberAge}>Age: {member.age}</Text>
                </View>
              </View>

              <InfoLine icon="calendar-outline" text={member.dateOfBirth} />
              <InfoLine icon="person-outline" text={member.gender} />
              <InfoLine icon="location-outline" text={member.locationLabel} />
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
        </>
      )}
    </AppScreen>
  );
}

type ApiMember = ApiRecord;
type MemberListItem = {
  id: string;
  fullName: string;
  age: string;
  dateOfBirth: string;
  currentCity: string;
  gender: string;
  province: string;
  locationLabel: string;
  village: string;
  occupation: string;
  canadaStatus?: string;
};

function mapApiMember(item: ApiMember): MemberListItem | null {
  const acf = getObjectField(item, "acf");
  const id = getStringField(item, ["id", "ID", "member_id"]);
  const firstName = getStringField(item, ["first_name", "firstName", "fname"]);
  const lastName = getStringField(item, ["last_name", "lastName", "lname"]);
  const fullName =
    getStringField(item, ["full_name", "fullName", "name", "title"]) ||
    [firstName, lastName].filter(Boolean).join(" ").trim();
  const village =
    getStringField(acf, ["village"]) ||
    getStringField(item, ["village", "village_name", "villageName"]);
  const city =
    getStringField(acf, ["city"]) ||
    getStringField(item, ["current_city", "currentCity", "city", "location"]) ||
    "N/A";
  const province = getStringField(acf, ["province"]) || getStringField(item, ["province"]) || "N/A";
  const gender = getStringField(acf, ["gender"]) || getStringField(item, ["gender"]) || "N/A";
  const age = getNumberField(item, ["age"]);

  if (!id || !fullName || !village) {
    return null;
  }

  return {
    id,
    fullName,
    age,
    dateOfBirth:
      getStringField(acf, ["date_of_birth"]) ||
      getStringField(item, ["date_of_birth", "dateOfBirth", "dob", "birth_date"]) ||
      "N/A",
    currentCity: city,
    gender,
    province,
    locationLabel: `${city}, ${province}`,
    village,
    occupation:
      getStringField(acf, ["designation"]) ||
      getStringField(item, ["occupation", "profession", "job_title", "jobTitle"]) ||
      "N/A",
    canadaStatus:
      getStringField(acf, ["current_status_in_canada"]) ||
      getStringField(item, [
        "canada_status",
        "canadaStatus",
        "status_in_canada",
        "statusInCanada",
      ]) ||
      undefined,
  };
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
    marginBottom: 10,
  },
  helperText: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 14,
  },
  formGap: {
    marginBottom: 14,
  },
  dropdownWrap: {
    marginBottom: 16,
  },
  actionsRow: {
    width: "100%",
  },
  searchButtonFull: {
    width: "100%",
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
  dropdownActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownClearButton: {
    marginRight: 10,
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
  loadingWrap: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 28,
    marginBottom: 18,
  },
  loadingTitle: {
    color: colors.title,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 16,
  },
  loadingSubtitle: {
    color: colors.subtleText,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 6,
    maxWidth: 240,
  },
  emptySubtitle: {
    color: colors.subtleText,
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  memberCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
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
  memberMetaInline: {
    color: colors.subtleText,
    fontSize: 14,
    fontWeight: "600",
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

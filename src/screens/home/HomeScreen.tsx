import { AppScreen } from "@/src/components/ui/AppScreen";
import { AnimatedPressable } from "@/src/components/ui/AnimatedPressable";
import { BrandHeader } from "@/src/components/ui/BrandHeader";
import { FeatureSlider, FeatureSliderControls } from "@/src/components/ui/FeatureSlider";
import { Pill } from "@/src/components/ui/Pill";
import { RevealView } from "@/src/components/ui/RevealView";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { heroEvents } from "@/src/data/content";
import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const navCards = [
  {
    title: "Events",
    subtitle: "Programs, celebrations, and upcoming registrations",
    icon: "calendar-outline" as const,
    accent: "#E37A36",
    eyebrow: "Community Calendar",
    onPress: () => router.push("/events"),
  },
  {
    title: "Members",
    subtitle: "Browse and search community member profiles",
    icon: "people-outline" as const,
    accent: "#F29A4A",
    eyebrow: "People Directory",
    onPress: () => router.push("/members"),
  },
];

export default function HomeScreen() {
  return (
    <AppScreen>
      <RevealView>
        <BrandHeader />
      </RevealView>

      <RevealView delay={70} style={styles.sectionSpacing}>
        <FeatureSlider
          items={heroEvents}
          itemKey={(item) => item.id}
          imageUri={(item) => item.image}
          cardHeight={360}
          imageOpacity={0.72}
          contentStyle={styles.heroContent}
          renderControls={({ goNext, goPrev }) => (
            <View style={styles.rowBetween}>
              <SectionTitle label="Featured Events" subtitle="Community Hub" />
              <FeatureSliderControls goPrev={goPrev} goNext={goNext} />
            </View>
          )}
          showControls={false}
          onPress={() =>
            router.push({
              pathname: "/events/[id]",
              params: { id: "patidar-cultural-mahotsav-2024" },
            })
          }
          style={styles.heroCard}
          renderContent={(event) => (
            <>
              <View style={styles.heroTags}>
                {event.tags.map((tag) => (
                  <View key={tag} style={styles.heroTagItem}>
                    <Pill label={tag} inverse />
                  </View>
                ))}
              </View>
              <Text style={styles.heroTitle}>{event.title}</Text>
              <View style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Detail</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.white} />
              </View>
            </>
          )}
        />
      </RevealView>

      <RevealView delay={130} style={[styles.sectionSpacing, styles.fullBleedSection]}>
        <SectionTitle label="Explore" subtitle="Quick Access" />
        <View>
          {navCards.map((card) => (
            <AnimatedPressable
              key={card.title}
              onPress={card.onPress}
              style={styles.featureTile}
            >
              <View
                style={[
                  styles.featureTileGlow,
                  { backgroundColor: `${card.accent}18` },
                ]}
              />
              <View
                style={[
                  styles.featureTileIcon,
                  { backgroundColor: `${card.accent}20`, borderColor: `${card.accent}35` },
                ]}
              >
                <Ionicons name={card.icon} size={24} color={card.accent} />
              </View>
              <Text style={styles.featureTileEyebrow}>{card.eyebrow}</Text>
              <Text style={styles.featureTileTitle}>{card.title}</Text>
              <Text style={styles.featureTileSubtitle}>{card.subtitle}</Text>
              <View style={styles.featureTileFooter}>
                <View style={styles.featureTileActionCopy}>
                  <View
                    style={[
                      styles.featureTileActionLine,
                      { backgroundColor: `${card.accent}88` },
                    ]}
                  />
                  <Text style={[styles.featureTileActionText, { color: card.accent }]}>
                    Enter Section
                  </Text>
                </View>
                <View
                  style={[
                    styles.featureTileArrow,
                    {
                      backgroundColor: `${card.accent}14`,
                      borderColor: `${card.accent}38`,
                    },
                  ]}
                >
                  <Ionicons
                    name="arrow-up"
                    size={18}
                    color={card.accent}
                    style={styles.featureTileArrowIcon}
                  />
                </View>
              </View>
            </AnimatedPressable>
          ))}
        </View>
      </RevealView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  sectionSpacing: {
    marginBottom: 28,
  },
  fullBleedSection: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  heroCard: {
    minHeight: 360,
  },
  heroContent: {
    left: 22,
    right: 22,
    bottom: 24,
  },
  heroTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  heroTagItem: {
    marginRight: 8,
    marginBottom: 8,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    marginBottom: 18,
    maxWidth: "85%",
  },
  heroButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primarySolid,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  heroButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
    marginRight: 8,
  },
  featureTile: {
    width: "100%",
    minHeight: 220,
    backgroundColor: colors.surface,
    borderRadius: 32,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    overflow: "hidden",
    ...shadows.lifted,
  },
  featureTileGlow: {
    position: "absolute",
    right: -24,
    top: -24,
    width: 140,
    height: 140,
    borderRadius: 999,
  },
  featureTileIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  featureTileEyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  featureTileTitle: {
    color: colors.title,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },
  featureTileSubtitle: {
    color: colors.subtleText,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: "84%",
  },
  featureTileFooter: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  featureTileActionCopy: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureTileActionLine: {
    width: 18,
    height: 2,
    borderRadius: 999,
    marginRight: 10,
  },
  featureTileActionText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  featureTileArrow: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.soft,
  },
  featureTileArrowIcon: {
    transform: [{ rotate: "45deg" }],
  },
});

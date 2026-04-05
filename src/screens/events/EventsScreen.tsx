import { AppScreen } from "@/src/components/ui/AppScreen";
import { AnimatedPressable } from "@/src/components/ui/AnimatedPressable";
import { BrandHeader } from "@/src/components/ui/BrandHeader";
import { FeatureSlider, FeatureSliderControls } from "@/src/components/ui/FeatureSlider";
import { Pill } from "@/src/components/ui/Pill";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { RevealView } from "@/src/components/ui/RevealView";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { featuredEvent, pastEvents, upcomingEvents } from "@/src/data/content";
import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EventsScreen() {
  return (
    <AppScreen>
      <RevealView>
        <BrandHeader badgeLabel="Events" onRightPress={() => router.push("/home")} />
      </RevealView>

      <RevealView delay={60} style={styles.section}>
        <Text style={styles.sectionEyebrow}>Community Hub</Text>
        <Text style={styles.sectionTitle}>Featured Events</Text>
        <View style={styles.sectionAccent} />
        <View style={styles.featuredCard}>
          <Image
            source={{ uri: featuredEvent.image }}
            style={styles.featuredImage}
            contentFit="cover"
          />
          <View style={styles.featuredBody}>
            <Pill label={featuredEvent.tag} />
            <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>

            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={15} color={colors.subtleText} />
              <Text style={styles.metaText}>{featuredEvent.date}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={15} color={colors.subtleText} />
              <Text style={styles.metaText}>{featuredEvent.location}</Text>
            </View>

            <Text style={styles.description}>{featuredEvent.description}</Text>

            <PrimaryButton
              label="Book Your Seat"
              onPress={() =>
                router.push({
                  pathname: "/events/[id]",
                  params: { id: "patidar-cultural-mahotsav-2024" },
                })
              }
            />
          </View>
        </View>
      </RevealView>

      <RevealView delay={130} style={styles.section}>
        <FeatureSlider
          items={upcomingEvents}
          itemKey={(item) => item.id}
          imageUri={(item) => item.image}
          renderControls={({ goNext, goPrev }) => (
            <View style={styles.headerRow}>
              <SectionTitle label="Upcoming Events" subtitle="Discover More" />
              <FeatureSliderControls goPrev={goPrev} goNext={goNext} />
            </View>
          )}
          cardHeight={320}
          imageOpacity={0.62}
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
              <View style={styles.heroPills}>
                <View style={styles.heroPillWrap}>
                  <Pill label={event.tag} inverse />
                </View>
                <Pill label={event.date} inverse />
              </View>
              <Text style={styles.heroTitle}>{event.title}</Text>
              <View style={styles.metaRowLight}>
                <Ionicons name="time-outline" size={14} color={colors.white} />
                <Text style={styles.metaTextLight}>{event.time}</Text>
              </View>
              <View style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Details</Text>
              </View>
            </>
          )}
        />
      </RevealView>

      <RevealView delay={200} style={styles.section}>
        <Text style={styles.sectionTitle}>Past Events</Text>
        <View style={styles.sectionAccent} />
        <View>
          {pastEvents.map((item) => (
            <AnimatedPressable key={item.id} style={styles.pastCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.pastImage}
                contentFit="cover"
              />
              <View style={styles.pastBody}>
                <Text style={styles.pastDate}>{item.date}</Text>
                <Text style={styles.pastTitle}>{item.title}</Text>
                <Text style={styles.pastMeta}>{item.meta}</Text>
              </View>
            </AnimatedPressable>
          ))}
        </View>
      </RevealView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 38,
  },
  sectionEyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.title,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
  },
  sectionAccent: {
    width: 52,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primaryEnd,
    marginTop: 12,
    marginBottom: 14,
  },
  featuredCard: {
    backgroundColor: colors.card,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.lifted,
  },
  featuredImage: {
    width: "100%",
    height: 220,
  },
  featuredBody: {
    padding: 20,
  },
  featuredTitle: {
    color: colors.title,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
    marginTop: 14,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metaText: {
    color: colors.subtleText,
    fontSize: 14,
    marginLeft: 8,
  },
  description: {
    color: colors.subtleText,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  heroCard: {
    height: 320,
  },
  heroContent: {
    left: 20,
    right: 20,
    bottom: 22,
  },
  heroPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  heroPillWrap: {
    marginRight: 8,
    marginBottom: 8,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
    maxWidth: "80%",
    marginBottom: 10,
  },
  metaRowLight: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  metaTextLight: {
    color: colors.white,
    fontSize: 14,
    marginLeft: 8,
  },
  detailsButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.primarySolid,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailsButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },
  pastCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    borderRadius: 30,
    overflow: "hidden",
    ...shadows.lifted,
  },
  pastImage: {
    width: "100%",
    height: 170,
  },
  pastBody: {
    padding: 18,
  },
  pastDate: {
    color: colors.primarySolid,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  pastTitle: {
    color: colors.title,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 8,
  },
  pastMeta: {
    color: colors.subtleText,
    fontSize: 14,
    lineHeight: 20,
  },
});

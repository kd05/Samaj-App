import { AppScreen } from "@/src/components/ui/AppScreen";
import { AnimatedPressable } from "@/src/components/ui/AnimatedPressable";
import { BrandHeader } from "@/src/components/ui/BrandHeader";
import { Pill } from "@/src/components/ui/Pill";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { RevealView } from "@/src/components/ui/RevealView";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { featuredEvent, pastEvents, upcomingEvents } from "@/src/data/content";
import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function EventsScreen() {
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const event = upcomingEvents[upcomingIndex];

  useEffect(() => {
    cardOpacity.setValue(0.2);
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [cardOpacity, upcomingIndex]);

  return (
    <AppScreen>
      <RevealView>
        <BrandHeader badgeLabel="Events" onRightPress={() => router.push("/home")} />
      </RevealView>

      <RevealView delay={60} style={styles.section}>
        <SectionTitle label="Featured Events" subtitle="Community Hub" />
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
        <View style={styles.headerRow}>
          <SectionTitle label="Upcoming Events" subtitle="Discover More" />
          <View style={styles.controls}>
            <RoundIconButton
              icon="chevron-back"
              onPress={() =>
                setUpcomingIndex(
                  (prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length
                )
              }
            />
            <RoundIconButton
              icon="chevron-forward"
              onPress={() => setUpcomingIndex((prev) => (prev + 1) % upcomingEvents.length)}
            />
          </View>
        </View>

        <AnimatedPressable
          onPress={() =>
            router.push({
              pathname: "/events/[id]",
              params: { id: "patidar-cultural-mahotsav-2024" },
            })
          }
          style={styles.heroCard}
        >
          <Animated.View
            style={[
              styles.heroAnimatedLayer,
              { opacity: cardOpacity },
            ]}
          >
            <Image source={{ uri: event.image }} style={styles.heroImage} contentFit="cover" />
            <View style={styles.heroOverlay} />
            <View style={styles.heroContent}>
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
            </View>
          </Animated.View>
          <View style={styles.indicatorRow}>
            {upcomingEvents.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.indicator,
                  index === upcomingIndex ? styles.indicatorActive : null,
                ]}
              />
            ))}
          </View>
        </AnimatedPressable>
      </RevealView>

      <RevealView delay={200} style={styles.section}>
        <SectionTitle label="Past Events" />
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

type RoundIconButtonProps = {
  icon: "chevron-back" | "chevron-forward";
  onPress: () => void;
};

function RoundIconButton({ icon, onPress }: RoundIconButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.roundButton}>
      <Ionicons name={icon} size={18} color={colors.title} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  featuredCard: {
    backgroundColor: colors.card,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
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
  controls: {
    flexDirection: "row",
    marginBottom: 18,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.softPeach,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  heroCard: {
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: colors.card,
    height: 320,
    shadowColor: "#000",
    shadowOpacity: 0.24,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 9,
  },
  heroAnimatedLayer: {
    height: 320,
  },
  heroImage: {
    width: "100%",
    height: 320,
    opacity: 0.62,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  heroContent: {
    position: "absolute",
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
  indicatorRow: {
    position: "absolute",
    right: 22,
    bottom: 18,
    flexDirection: "row",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.35)",
    marginLeft: 6,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: colors.white,
  },
  pastCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    borderRadius: 30,
    overflow: "hidden",
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

import { AppScreen } from "@/src/components/ui/AppScreen";
import { AnimatedPressable } from "@/src/components/ui/AnimatedPressable";
import { BrandHeader } from "@/src/components/ui/BrandHeader";
import { Pill } from "@/src/components/ui/Pill";
import { RevealView } from "@/src/components/ui/RevealView";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { heroEvents } from "@/src/data/content";
import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const event = heroEvents[currentIndex];

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroEvents.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroEvents.length) % heroEvents.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroEvents.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    cardOpacity.setValue(0.2);
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [cardOpacity, currentIndex]);

  return (
    <AppScreen>
      <RevealView>
        <BrandHeader />
      </RevealView>

      <RevealView delay={70} style={styles.sectionSpacing}>
        <View style={styles.rowBetween}>
          <SectionTitle label="Featured Events" subtitle="Community Hub" />
          <View style={styles.arrowRow}>
            <ArrowButton icon="chevron-back" onPress={goPrev} />
            <ArrowButton icon="chevron-forward" onPress={goNext} />
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
            <Image
              source={{ uri: event.image }}
              style={styles.heroImage}
              contentFit="cover"
            />
            <View style={styles.heroOverlay} />
            <View style={styles.heroContent}>
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
            </View>
          </Animated.View>
          <View style={styles.indicatorRow}>
            {heroEvents.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.indicator,
                  index === currentIndex ? styles.indicatorActive : null,
                ]}
              />
            ))}
          </View>
        </AnimatedPressable>
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
              <View style={styles.featureTileArrow}>
                <Ionicons name="arrow-forward" size={18} color={card.accent} />
              </View>
            </AnimatedPressable>
          ))}
        </View>
      </RevealView>
    </AppScreen>
  );
}

type ArrowButtonProps = {
  icon: "chevron-back" | "chevron-forward";
  onPress: () => void;
};

function ArrowButton({ icon, onPress }: ArrowButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.arrowButton}>
      <Ionicons name={icon} size={18} color={colors.title} />
    </Pressable>
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
  arrowRow: {
    flexDirection: "row",
    marginBottom: 18,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.softPeach,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  heroCard: {
    position: "relative",
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: colors.card,
    minHeight: 360,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },
  heroAnimatedLayer: {
    minHeight: 360,
  },
  heroImage: {
    width: "100%",
    height: 360,
    opacity: 0.72,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  heroContent: {
    position: "absolute",
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
    backgroundColor: "rgba(255,255,255,0.45)",
    marginLeft: 6,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: colors.white,
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
  featureTileArrow: {
    marginTop: "auto",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
});

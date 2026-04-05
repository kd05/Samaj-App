import { AnimatedPressable } from "@/src/components/ui/AnimatedPressable";
import { Pill } from "@/src/components/ui/Pill";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { RevealView } from "@/src/components/ui/RevealView";
import { type EventHighlight, getEventDetailById } from "@/src/data/content";
import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const event = getEventDetailById(params.id);
  const insets = useSafeAreaInsets();
  const [openHighlight, setOpenHighlight] = useState(event.highlights[1]?.id ?? event.highlights[0]?.id);
  const [showSheet, setShowSheet] = useState(false);
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslate = useRef(new Animated.Value(360)).current;

  const openSheet = () => {
    setShowSheet(true);
  };

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslate, {
        toValue: 360,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(() => setShowSheet(false));
  };

  useEffect(() => {
    if (!showSheet) {
      return;
    }

    backdropOpacity.setValue(0);
    sheetTranslate.setValue(360);

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(sheetTranslate, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 90,
      }),
    ]).start();
  }, [backdropOpacity, sheetTranslate, showSheet]);

  const highlights = useMemo(() => event.highlights, [event.highlights]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: event.image }} style={styles.heroImage} contentFit="cover" />
          <LinearGradient
            colors={[
              "rgba(23,18,15,0)",
              "rgba(23,18,15,0.08)",
              "rgba(23,18,15,0.36)",
              "rgba(23,18,15,0.72)",
              colors.background,
            ]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.heroGradient}
          />

          <View style={styles.heroHeader}>
            <Pressable onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="arrow-back" size={20} color={colors.white} />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={18} color={colors.white} />
            </Pressable>
          </View>

          <View style={styles.heroFooter}>
            <Pill label={event.tag} inverse />
            <Text style={styles.heroTitle}>{event.title}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <RevealView delay={50}>
            <InfoCard icon="calendar-outline" label="Date & Time" value={event.date} />
            <InfoCard icon="location-outline" label="Venue" value={event.venue} />
            <InfoCard
              icon="cash-outline"
              label="Pricing"
              value={event.price}
              note={event.priceNote}
            />
          </RevealView>

          <RevealView delay={110} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>About the Event</Text>
            </View>
            {event.about.map((paragraph) => (
              <Text key={paragraph} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </RevealView>

          <RevealView delay={160} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Highlights</Text>
            </View>
            {highlights.map((highlight) => {
              const isOpen = openHighlight === highlight.id;

              return (
                <AccordionItem
                  key={highlight.id}
                  highlight={highlight}
                  isOpen={isOpen}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setOpenHighlight(isOpen ? "" : highlight.id);
                  }}
                />
              );
            })}
          </RevealView>
        </View>
      </ScrollView>

      <View style={[styles.footerCta, { bottom: insets.bottom + 18 }]}>
        <PrimaryButton label="Book Your Spot Now" onPress={openSheet} />
      </View>

      <Modal visible={showSheet} transparent animationType="none" onRequestClose={closeSheet}>
        <View style={styles.modalRoot}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
            <Pressable style={StyleSheet.absoluteFillObject} onPress={closeSheet} />
          </Animated.View>

          <Animated.View
            style={[styles.sheet, { transform: [{ translateY: sheetTranslate }] }]}
          >
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>How to Join</Text>
            <Text style={styles.sheetText}>
              Please e-transfer <Text style={styles.ctaHighlight}>$50.00 CAD</Text> per person
              to <Text style={styles.ctaEmail}>info@48kadvapatidar.com</Text>.
            </Text>
            <View style={styles.contactCard}>
              <ContactRow icon="call-outline" label="Phone Support" value="+1 (987) 654-3210" />
              <ContactRow
                icon="mail-outline"
                label="Email Queries"
                value="support@48kadvapatidar.com"
              />
            </View>
            <PrimaryButton label="Got it" onPress={closeSheet} />
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

type InfoCardProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  note?: string;
};

function InfoCard({ icon, label, value, note }: InfoCardProps) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={20} color={colors.primarySolid} />
      </View>
      <View style={styles.infoBody}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
        {note ? <Text style={styles.infoNote}>{note}</Text> : null}
      </View>
    </View>
  );
}

type ContactRowProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
};

function ContactRow({ icon, label, value }: ContactRowProps) {
  return (
    <View style={styles.contactRow}>
      <View style={styles.contactIcon}>
        <Ionicons name={icon} size={17} color={colors.primarySolid} />
      </View>
      <View>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 140,
  },
  heroWrap: {
    position: "relative",
    height: 380,
  },
  heroImage: {
    width: "100%",
    height: 380,
  },
  heroGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: "46%",
  },
  heroHeader: {
    position: "absolute",
    top: 18,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 4,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(8,8,8,0.34)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  heroFooter: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 36,
    marginTop: 14,
    maxWidth: "90%",
  },
  body: {
    paddingHorizontal: 20,
    marginTop: -10,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    ...shadows.soft,
  },
  infoIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.softPeach,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  infoBody: {
    flex: 1,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  infoValue: {
    color: colors.title,
    fontSize: 15,
    fontWeight: "700",
  },
  infoNote: {
    color: colors.subtleText,
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionAccent: {
    width: 5,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.primaryEnd,
    marginRight: 10,
  },
  sectionTitle: {
    color: colors.title,
    fontSize: 24,
    fontWeight: "800",
  },
  paragraph: {
    color: colors.subtleText,
    fontSize: 14,
    lineHeight: 23,
    marginBottom: 12,
  },
  accordionCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    ...shadows.soft,
  },
  accordionCardOpen: {
    backgroundColor: colors.softPeach,
    borderColor: colors.softPeachBorder,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordionTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  accordionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  accordionIconOpen: {
    backgroundColor: colors.primarySolid,
  },
  accordionTitle: {
    color: colors.title,
    fontSize: 16,
    fontWeight: "800",
    flex: 1,
  },
  accordionContent: {
    color: colors.subtleText,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 14,
  },
  accordionBody: {
    overflow: "hidden",
  },
  accordionBodyMeasure: {
    paddingBottom: 2,
  },
  footerCta: {
    position: "absolute",
    left: 18,
    right: 18,
    zIndex: 20,
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.52)",
  },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetTitle: {
    color: colors.title,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 14,
  },
  sheetText: {
    color: colors.subtleText,
    lineHeight: 22,
    fontSize: 14,
    marginBottom: 18,
  },
  contactCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.softPeachBorder,
    padding: 16,
    marginBottom: 18,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.softPeach,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  contactLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  contactValue: {
    color: colors.title,
    fontSize: 14,
    fontWeight: "700",
  },
  ctaHighlight: {
    color: colors.primarySolid,
    fontWeight: "800",
  },
  ctaEmail: {
    color: colors.title,
    fontWeight: "700",
  },
});

type AccordionItemProps = {
  highlight: EventHighlight;
  isOpen: boolean;
  onPress: () => void;
};

function AccordionItem({ highlight, isOpen, onPress }: AccordionItemProps) {
  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.accordionCard, isOpen ? styles.accordionCardOpen : null]}
    >
      <View style={styles.accordionHeader}>
        <View style={styles.accordionTitleWrap}>
          <View
            style={[
              styles.accordionIcon,
              isOpen ? styles.accordionIconOpen : null,
            ]}
          >
            <Ionicons
              name={highlight.icon}
              size={18}
              color={isOpen ? colors.white : colors.primarySolid}
            />
          </View>
          <Text style={styles.accordionTitle}>{highlight.title}</Text>
        </View>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.subtleText}
        />
      </View>

      {isOpen ? (
        <Animated.View style={styles.accordionBody}>
          <Text style={styles.accordionContent}>{highlight.content}</Text>
        </Animated.View>
      ) : null}
    </AnimatedPressable>
  );
}

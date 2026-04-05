import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AnimatedPressable } from "./AnimatedPressable";

type FeatureSliderProps<T> = {
  items: T[];
  imageUri: (item: T) => string;
  itemKey: (item: T) => string;
  onPress?: (item: T) => void;
  renderContent: (item: T) => React.ReactNode;
  renderTopOverlay?: (controls: SliderControls) => React.ReactNode;
  renderControls?: (controls: SliderControls) => React.ReactNode;
  showControls?: boolean;
  autoPlayMs?: number;
  cardHeight?: number;
  imageOpacity?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

type SliderControls = {
  goNext: () => void;
  goPrev: () => void;
};

export function FeatureSlider<T>({
  items,
  imageUri,
  itemKey,
  onPress,
  renderContent,
  renderTopOverlay,
  renderControls,
  showControls = true,
  autoPlayMs = 4500,
  cardHeight = 320,
  imageOpacity = 0.66,
  style,
  contentStyle,
}: FeatureSliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const item = items[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = setInterval(goNext, autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs, goNext, items.length]);

  useEffect(() => {
    cardOpacity.setValue(0.2);
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [cardOpacity, currentIndex]);

  return (
    <View>
      {renderControls ? renderControls({ goNext, goPrev }) : null}
      {showControls && !renderControls ? (
        <View style={styles.controls}>
          <ArrowButton icon="chevron-back" onPress={goPrev} />
          <ArrowButton icon="chevron-forward" onPress={goNext} />
        </View>
      ) : null}

      <AnimatedPressable
        onPress={onPress ? () => onPress(item) : undefined}
        style={[
          styles.card,
          { height: cardHeight },
          style,
        ]}
      >
        <Animated.View style={[styles.animatedLayer, { height: cardHeight, opacity: cardOpacity }]}>
          <Image
            source={{ uri: imageUri(item) }}
            style={[styles.image, { height: cardHeight, opacity: imageOpacity }]}
            contentFit="cover"
          />
          <View style={styles.overlay} />
          {renderTopOverlay ? <View style={styles.topOverlay}>{renderTopOverlay({ goNext, goPrev })}</View> : null}
          <View style={[styles.content, contentStyle]}>{renderContent(item)}</View>
        </Animated.View>

        <View style={styles.indicatorRow}>
          {items.map((entry, index) => (
            <View
              key={itemKey(entry)}
              style={[styles.indicator, index === currentIndex ? styles.indicatorActive : null]}
            />
          ))}
        </View>
      </AnimatedPressable>
    </View>
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

export function FeatureSliderControls({ goPrev, goNext }: SliderControls) {
  return (
    <View style={styles.controlsInline}>
      <ArrowButton icon="chevron-back" onPress={goPrev} />
      <ArrowButton icon="chevron-forward" onPress={goNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    marginBottom: 18,
    alignSelf: "flex-end",
  },
  controlsInline: {
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
  card: {
    borderRadius: 32,
    overflow: "hidden",
    backgroundColor: colors.card,
    ...shadows.lifted,
  },
  animatedLayer: {
    position: "relative",
  },
  image: {
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  content: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 22,
  },
  topOverlay: {
    position: "absolute",
    top: 18,
    left: 20,
    right: 20,
    zIndex: 2,
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
    backgroundColor: "rgba(255,255,255,0.4)",
    marginLeft: 6,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: colors.white,
  },
});

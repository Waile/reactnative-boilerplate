/**
 * SPACING CONFIGURATION
 * 
 * THIS FILE DEFINES STANDARD SPACING VALUES THROUGHOUT THE APP
 * USING A CONSISTENT SPACING SYSTEM ENSURES UI HARMONY AND RESPONSIVENESS
 */

// BASE UNIT FOR SPACING CALCULATIONS
export const baseSpacing = 4;

// SPACING SCALE BASED ON THE BASE UNIT
export const spacing = {
  tiny: baseSpacing, // 4
  small: baseSpacing * 2, // 8
  medium: baseSpacing * 4, // 16
  large: baseSpacing * 6, // 24
  xlarge: baseSpacing * 8, // 32
  xxlarge: baseSpacing * 12, // 48
  huge: baseSpacing * 16, // 64
};

// CONTAINER PADDING PRESETS
export const containerPadding = {
  small: {
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
  },
  medium: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
  },
  large: {
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.large,
  },
};

// COMMON MARGIN PRESETS
export const margin = {
  small: {
    marginBottom: spacing.small,
  },
  medium: {
    marginBottom: spacing.medium,
  },
  large: {
    marginBottom: spacing.large,
  },
  vertical: {
    marginVertical: spacing.medium,
  },
  horizontal: {
    marginHorizontal: spacing.medium,
  },
};

// BORDER RADIUS PRESETS
export const borderRadius = {
  small: spacing.tiny, // 4
  medium: spacing.small, // 8
  large: spacing.medium, // 16
  round: 9999, // Fully rounded
};

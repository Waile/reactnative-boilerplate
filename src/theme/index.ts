/**
 * THEME INDEX
 * 
 * THIS FILE EXPORTS ALL THEME-RELATED CONFIGURATIONS
 * CENTRALIZING EXPORTS MAKES IMPORTING THEME ELEMENTS CLEANER THROUGHOUT THE APP
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing, margin, containerPadding, borderRadius } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  margin,
  containerPadding,
  borderRadius
};

export { colors, typography, spacing, margin, containerPadding, borderRadius };

// Constants for level calculation (adjustable)
const BASE_XP_PER_LEVEL = 100; // Base multiplier for level XP thresholds
const LEVEL_EXPONENT = 3; // Increase this (e.g., 2.5, 3, 4) for bigger XP pools at higher levels

// Constants for streak XP (adjustable, unchanged)
const BASE_STREAK_XP = 50;
const LINEAR_INCREMENT = 20;
const QUADRATIC_EXPONENT = 1.5; // For quadratic scaling

/**
 * Calculates the current level based on total XP.
 * Generalized: level = floor( (xp / BASE_XP_PER_LEVEL) ^ (1/LEVEL_EXPONENT) ) + 1
 * @param xp Current total XP
 * @returns The current level (starts at 1)
 */
export function getCurrentLevel(xp: number): number {
  if (xp < 0) throw new Error('XP cannot be negative');
  if (xp === 0) return 1;
  const level =
    Math.floor(Math.pow(xp / BASE_XP_PER_LEVEL, 1 / LEVEL_EXPONENT)) + 1;
  return level;
}

/**
 * Calculates the XP needed to reach the next level.
 * Next level min XP = BASE_XP_PER_LEVEL * (currentLevel) ^ LEVEL_EXPONENT
 * @param xp Current total XP
 * @returns XP remaining to next level
 */
export function getXpToNextLevel(xp: number): number {
  if (xp < 0) throw new Error('XP cannot be negative');
  const currentLevel = getCurrentLevel(xp);
  const nextLevelMinXp =
    BASE_XP_PER_LEVEL * Math.pow(currentLevel, LEVEL_EXPONENT);
  return nextLevelMinXp - xp;
}

/**
 * Calculates the progress percentage (0-100) towards the next level based on current XP.
 * Progress = ((xp - minXpForCurrentLevel) / (minXpForNextLevel - minXpForCurrentLevel)) * 100
 * @param xp Current total XP
 * @returns Progress as a number between 0 and 100 (rounded to nearest integer)
 */
export function getLevelProgress(xp: number): number {
  if (xp < 0) throw new Error('XP cannot be negative');
  const currentLevel = getCurrentLevel(xp);
  const minXpForCurrent =
    BASE_XP_PER_LEVEL * Math.pow(currentLevel - 1, LEVEL_EXPONENT);
  const minXpForNext =
    BASE_XP_PER_LEVEL * Math.pow(currentLevel, LEVEL_EXPONENT);
  const xpInLevel = xp - minXpForCurrent;
  const requiredForLevel = minXpForNext - minXpForCurrent;
  if (requiredForLevel <= 0) return 0; // Edge case for level 1 or max level
  const progress = (xpInLevel / requiredForLevel) * 100;
  return Math.round(Math.min(100, Math.max(0, progress))); // Clamp and round
}

/**
 * Calculates XP awarded for a given streak day based on the formula type.
 * @param day The streak day (1-based)
 * @param formulaType 'linear' or 'quadratic'
 * @returns XP for that day
 */
export function getStreakXp(
  day: number,
  formulaType: 'linear' | 'quadratic',
): number {
  if (day < 1) throw new Error('Day must be at least 1');
  if (formulaType === 'linear') {
    return BASE_STREAK_XP + day * LINEAR_INCREMENT;
  } else if (formulaType === 'quadratic') {
    return Math.round(BASE_STREAK_XP * Math.pow(day, QUADRATIC_EXPONENT));
  } else {
    throw new Error('Invalid formula type. Use "linear" or "quadratic".');
  }
}

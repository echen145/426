export const TOGGLE_THEME = 'TOGGLE_THEME'

export function toggleTheme (isLight) {
  return {
    type: TOGGLE_THEME,
    isLight
  }
}
import { createPart } from '../../Part';
import { defaultLightColorSchemeParams } from '../../core/core-css';
import { accentMix, foregroundBackgroundMix } from '../../theme-utils';

export const colorSchemeLight = /*#__PURE__*/ createPart({
    feature: 'colorScheme',
    params: defaultLightColorSchemeParams,
});

export const colorSchemeLightWarm = /*#__PURE__*/ createPart({
    feature: 'colorScheme',
    params: {
        ...defaultLightColorSchemeParams,
        foregroundColor: '#000000de',
        borderColor: '#60300026',
        chromeBackgroundColor: '#60300005',
    },
});

export const colorSchemeLightCold = /*#__PURE__*/ createPart({
    feature: 'colorScheme',
    params: {
        ...defaultLightColorSchemeParams,
        foregroundColor: '#000',
        chromeBackgroundColor: '#f3f8f8',
    },
});

const darkParams = {
    ...defaultLightColorSchemeParams,
    backgroundColor: 'hsl(217, 0%, 17%)',
    foregroundColor: '#FFF',
    chromeBackgroundColor: foregroundBackgroundMix(0.05),
    rowHoverColor: accentMix(0.15),
    selectedRowBackgroundColor: accentMix(0.2),
    menuBackgroundColor: foregroundBackgroundMix(0.1),
    browserColorScheme: 'dark',
    popupShadow: '0 0px 20px #000A',
    cardShadow: '0 1px 4px 1px #000A',
    advancedFilterBuilderJoinPillColor: '#7a3a37',
    advancedFilterBuilderColumnPillColor: '#355f2d',
    advancedFilterBuilderOptionPillColor: '#5a3168',
    advancedFilterBuilderValuePillColor: '#374c86',
    checkboxUncheckedBorderColor: foregroundBackgroundMix(0.4),
    toggleButtonOffBackgroundColor: foregroundBackgroundMix(0.4),
} as const;

export const colorSchemeDark = /*#__PURE__*/ createPart({
    feature: 'colorScheme',
    params: darkParams,
});

export const colorSchemeDarkWarm = /*#__PURE__*/ createPart({
    feature: 'colorScheme',
    params: {
        backgroundColor: 'hsl(29, 10%, 17%)',
        foregroundColor: '#FFF',
        browserColorScheme: 'dark',
    },
});

const darkBlueParams = {
    ...darkParams,
    backgroundColor: '#1f2836',
} as const;

export const colorSchemeDarkBlue = /*#__PURE__*/ createPart({
    feature: 'colorScheme',
    params: darkBlueParams,
});

export const colorSchemeVariable = /*#__PURE__*/ createPart({
    feature: 'colorScheme',
    params: defaultLightColorSchemeParams,
    modeParams: {
        light: defaultLightColorSchemeParams,
        dark: darkParams,
        'dark-blue': darkBlueParams,
    },
});

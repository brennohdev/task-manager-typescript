export const ProviderEnum = {
    GOOGLE: "GOOGLE",
    GITHUB: "GITHUB",
    EMAIL: "EMAIL",
    FACEBOOK: "FACEBOOK",
} as const;

export type ProviderEnumType =keyof typeof ProviderEnum;
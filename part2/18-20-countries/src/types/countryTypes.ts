export interface CountryTypes {
  name: Name;
  capital: string[];
  languages: Languages;
  area: number;
  flags: Flags;
}

export interface Languages {
  [key: string]: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  [key: string]: {
    official: string;
    common: string;
  };
}

export interface Flags {
  png?: string;
  svg?: string;
  alt?: string;
}

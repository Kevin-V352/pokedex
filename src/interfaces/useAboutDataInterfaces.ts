type Types =
  | 'simple'
  | 'ev-shield-arr'
  | 'genre-arr'
  | 'abilities-arr'
  | 'locations-arr'
  | 'weaknesses-arr'

type Payload =
  | string
  | number
  | string[]
  | EVShieldItem[]
  | GenderItem
  | AbilitiesItem

interface EVShieldItem {
  name: string;
  effort: number;
};

interface GenderItem {
  femalePercentage: string;
  malePercentage: string;
};

interface AbilitiesItem {
  hidden: string[]
  normal: string[]
};

export interface AboutItem {
  title: string;
  payload: Payload;
  type: Types;
};

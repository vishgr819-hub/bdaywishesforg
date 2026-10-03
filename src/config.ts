// ============ EDIT EVERYTHING IN THIS FILE ============
export type Stat = [label: string, value: number]; // value 0-100

export const config = {
  name: 'NAME',
  password: 'PASSWORD', // not case-sensitive
  passwordHint: 'You should probably know this one.',

  profile: {
    nickname: 'NICKNAME',
    stats: [
      ['Threat level', 40],
      ['Chaos level', 90],
      ['Responsibility', 50],
      ['Cuteness', 100],
      ['Importance to Stark Labs', 100],
    ] as Stat[],
  },

  analysis: [
    ['Sleep schedule', 20],
    ['Common sense', 60],
    ['Chaos', 90],
    ['Patience', 40],
    ['Awesomeness', 100],
    ['Birthday energy', 100],
  ] as Stat[],

  incident: {
    mission: '[Funny event]',
    damage: '[Funny description]',
    casualties: '[Funny description]',
  },

  // Blank line = new paragraph. Paragraphs fade in one by one.
  personalMessage: `YOUR PERSONAL BIRTHDAY MESSAGE

Second paragraph here.`,

  finalMessage: `You officially survived another year.
Stark Labs has determined that you're still pretty awesome.
Please continue being you.`,

  giftUrl: 'https://example.com',
};

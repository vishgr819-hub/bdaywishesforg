export type Stat = [label: string, value: number];

export const config = {
  name: 'SPOODERMAN',
  password: 'SOUP', // not case-sensitive
  passwordHint: 'Its literally 4 letters and you\'ll still text me asking for it.',

  profile: {
    nickname: 'MONSIEE',
    stats: [
      ['Threat level', 100],
      ['Chaos level', 99],
      ['Responsibility', 30],
      ['Cuteness', 1000],
      ['Importance to Stark Labs', 999],
    ] as Stat[],
  },

  analysis: [
    ['Sleep schedule', 20],
    ['Common sense', 50],
    ['Chaos', 90],
    ['Patience', 40],
    ['Awesomeness', 100],
    ['Birthday energy', 100],
  ] as Stat[],

  incident: {
    mission: 'TRYING TO ANNOY YOU',
    damage: 'COMPLETE',
    casualties: 'ALL',
  },

  // Blank line = new paragraph. Paragraphs fade in one by one.
  personalMessage: `HAPPY BIRTHDAYY PENGUIN, U'LL ALWAYS BE THE LIL ONE (EVENTHO YOU R 17)

Imagine becoming one year older, and still being the same height xD.`,

  finalMessage: `You officially survived another year.
Stark Labs has determined that you're still pretty awesome.
Please continue being you. Happy bday once again future dr :)
All the best for your future endeavours, not sure if I'll be there for all of your journey, yet atb`,

  giftUrl: 'https://youtu.be/4bzIpYiPUUo?si=oZJhKoak5Zzq2GZj',
};
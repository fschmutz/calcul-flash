export const STR = {
  fr: {
    htmlLang: 'fr',
    title: 'Calcul Flash',
    description: 'Calcul mental arcade dans le navigateur. 60 secondes. Rien n’est envoyé.',
    skip: 'Aller au jeu',
    noscript: 'Cette page a besoin de JavaScript pour poser les calculs.',
    muteOn: 'Couper le son',
    muteOff: 'Activer le son',
    tagline: (name) => 'Le chrono tourne. À toi de jouer, ' + name + ' !',
    whoEyebrow: "Qui joue aujourd'hui ?",
    namePh: 'Ton prénom',
    ageEyebrow: 'Ton âge',
    ageHintFallback: "Les calculs s'adaptent à ton âge.",
    go: "C'EST PARTI",
    setup1: '1 — Choisis ton entraînement',
    setup2: (age) => '2 — Niveau de difficulté (calibré pour ' + age + ' ans)',
    setup3: '3 — Durée de la manche',
    play: 'JOUER',
    changePlayer: 'Changer de joueur',
    time: 'Temps',
    score: 'Score',
    level: (n) => 'Palier ' + n,
    typeAnswer: 'Tape ta réponse',
    ok: 'OK',
    points: 'points',
    justes: 'justes',
    reussite: 'réussite',
    perCalc: 'par calcul',
    challenges: 'Les défis de cette manche',
    recap: 'À revoir tranquillement',
    again: 'REJOUER',
    back: "Changer d'entraînement",
    newRecord: 'points — NOUVEAU RECORD !',
    recordLine: (diffName, rec, top) => 'points  ·  record ' + diffName + ' : ' + rec + '  ·  palier ' + top,
    years: (n) => n + ' ans',
    levelOf: (top, max) => 'palier ' + top + '/' + max,
    nCalcs: (n) => n + ' calculs posés',
    durS: (n) => n + ' s',
    dur2min: '2 min',
    privacy: "Rien n'est envoyé. Pas de compte, pas de pub.",
    version: 'version',
    reload: 'Recharger la dernière version',
    update: 'Une nouvelle version est sur le serveur.',
    langGroup: 'Langue',
    champ: 'Champion',
    fam: {
      tables: 'Tables ×',
      addsub: 'Additions éclair',
      comp: 'Compléments',
      deci: 'Décimaux',
      frac: 'Fractions & %',
      mes: 'Mesures',
      malin: 'Calcul malin',
      mix: 'Mélange total'
    },
    modeHint: {
      tables: "jusqu'à 12, et divisions",
      addsub: '+ et − avec retenues',
      comp: 'à 100 et à 1000',
      deci: '×10, ×100, virgules',
      frac: '3/4 de 40, 25 % de 60',
      mes: 'm, cm, kg, L, durées',
      malin: '× 5, × 9, × 11, × 25, carrés, doubles',
      mix: 'les 7 familles, sans prévenir'
    },
    diff: {
      facile: '🙂 Facile',
      moyen: '😃 Moyen',
      expert: '🤩 Expert'
    },
    diffHint: {
      facile: 'petits nombres, 2 s de pénalité',
      moyen: 'niveau 6e, 3 s de pénalité',
      expert: 'gros nombres, nombres relatifs, 4 s de pénalité, points doublés'
    },
    diffName: { facile: 'Facile', moyen: 'Moyen', expert: 'Expert' },
    ageHint: {
      8: "Tables jusqu'à 7, additions à deux chiffres, compléments à 10 et à 100.",
      9: "Tables jusqu'à 9, soustractions avec retenue, compléments à 100.",
      10: "Tables jusqu'à 10, divisions, compléments à 1000, premiers décimaux.",
      11: "Niveau 6e : tables jusqu'à 12, divisions, décimaux, ×10 et ×100.",
      12: 'Niveau 5e : grands nombres, décimaux, et nombres relatifs en Expert.',
      13: 'Calcul rapide sur trois chiffres, décimaux et relatifs.',
      14: 'Le niveau le plus costaud : tout y passe, et vite.'
    },
    celeb: {
      feu: { title: "FEU D'ARTIFICE !", sub: (acc) => acc + " % de réussite — c'est le sommet." },
      etoiles: { title: "PLUIE D'ÉTOILES", sub: (acc) => acc + " % — il s'en est fallu de peu !" },
      confettis: { title: 'CONFETTIS !', sub: (acc) => acc + ' % — solide, on vise 90 % maintenant.' }
    },
    praise: {
      fast: (name) => 'Rapide ET juste. Franchement, bravo ' + name + '. 👑',
      accurate: (name) => 'Presque tout juste, ' + name + ' ! Maintenant, essaie de gagner une seconde par calcul.',
      ok: 'Bonne manche. Regarde les calculs ci-dessous et retente ta chance.',
      slow: (name) => 'Ralentis un peu, ' + name + " : la précision d'abord, la vitesse viendra toute seule.",
      next: ' Prête pour le niveau au-dessus ?',
      streak: (n) => ' Meilleure série : ' + n + " d'affilée !"
    }
  },
  en: {
    htmlLang: 'en',
    title: 'Calcul Flash',
    description: 'Arcade mental math in the browser. 60 seconds. Nothing is uploaded.',
    skip: 'Skip to game',
    noscript: 'This page needs JavaScript to ask the questions.',
    muteOn: 'Mute',
    muteOff: 'Unmute',
    tagline: (name) => 'The clock is running. Your turn, ' + name + '!',
    whoEyebrow: "Who's playing today?",
    namePh: 'First name',
    ageEyebrow: 'Your age',
    ageHintFallback: 'The sums adapt to your age.',
    go: "LET'S GO",
    setup1: '1 — Pick your drill',
    setup2: (age) => '2 — Difficulty (calibrated for age ' + age + ')',
    setup3: '3 — Round length',
    play: 'PLAY',
    changePlayer: 'Change player',
    time: 'Time',
    score: 'Score',
    level: (n) => 'Level ' + n,
    typeAnswer: 'Type your answer',
    ok: 'OK',
    points: 'points',
    justes: 'correct',
    reussite: 'accuracy',
    perCalc: 'per sum',
    challenges: 'This round',
    recap: 'Look over these quietly',
    again: 'PLAY AGAIN',
    back: 'Change drill',
    newRecord: 'points — NEW RECORD!',
    recordLine: (diffName, rec, top) => 'points  ·  ' + diffName + ' record: ' + rec + '  ·  level ' + top,
    years: (n) => n + ' years',
    levelOf: (top, max) => 'level ' + top + '/' + max,
    nCalcs: (n) => n + ' questions',
    durS: (n) => n + ' s',
    dur2min: '2 min',
    privacy: 'Nothing is uploaded. No account, no ads.',
    version: 'version',
    reload: 'Reload latest version',
    update: 'A new version is on the server.',
    langGroup: 'Language',
    champ: 'Champion',
    fam: {
      tables: 'Times tables',
      addsub: 'Lightning +/−',
      comp: 'Complements',
      deci: 'Decimals',
      frac: 'Fractions & %',
      mes: 'Measures',
      malin: 'Smart tricks',
      mix: 'Full mix'
    },
    modeHint: {
      tables: 'up to 12, and division',
      addsub: '+ and − with regrouping',
      comp: 'make 100 and 1000',
      deci: '×10, ×100, decimals',
      frac: '3/4 of 40, 25% of 60',
      mes: 'm, cm, kg, L, time',
      malin: '× 5, × 9, × 11, × 25, squares, doubles',
      mix: 'all 7 families, no warning'
    },
    diff: {
      facile: '🙂 Easy',
      moyen: '😃 Medium',
      expert: '🤩 Expert'
    },
    diffHint: {
      facile: 'small numbers, 2 s penalty',
      moyen: 'year-7 level, 3 s penalty',
      expert: 'big numbers, negatives, 4 s penalty, double points'
    },
    diffName: { facile: 'Easy', moyen: 'Medium', expert: 'Expert' },
    ageHint: {
      8: 'Tables to 7, two-digit addition, make 10 and 100.',
      9: 'Tables to 9, subtraction with regrouping, make 100.',
      10: 'Tables to 10, division, make 1000, first decimals.',
      11: 'Year 7: tables to 12, division, decimals, ×10 and ×100.',
      12: 'Year 8: large numbers, decimals, and negatives on Expert.',
      13: 'Three-digit speed, decimals and negatives.',
      14: 'The hardest setting: everything, and fast.'
    },
    celeb: {
      feu: { title: 'FIREWORKS!', sub: (acc) => acc + '% correct — the top.' },
      etoiles: { title: 'STAR SHOWER', sub: (acc) => acc + '% — so close!' },
      confettis: { title: 'CONFETTI!', sub: (acc) => acc + '% — solid. Next stop 90%.' }
    },
    praise: {
      fast: (name) => 'Fast AND right. Honestly, well done ' + name + '. 👑',
      accurate: (name) => 'Almost all correct, ' + name + '! Now try to shave a second off each sum.',
      ok: 'Good round. Look at the sums below and have another go.',
      slow: (name) => 'Slow down a bit, ' + name + ': accuracy first, speed follows.',
      next: ' Ready for the next difficulty?',
      streak: (n) => ' Best streak: ' + n + ' in a row!'
    }
  }
};

export function t(lang, path) {
  const pack = STR[lang] || STR.fr;
  const parts = path.split('.');
  let cur = pack;
  for (const p of parts) cur = cur?.[p];
  return cur;
}

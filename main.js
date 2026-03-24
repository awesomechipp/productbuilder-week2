// ── MBTI Data ──────────────────────────────────────────────

const TYPES = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP',
               'ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];

const TYPE_INFO = {
  INTJ: { emoji: '🔮', desc: '전략적 사고가 · 독립적 · 논리적' },
  INTP: { emoji: '🧠', desc: '논리적 분석가 · 호기심 · 창의적' },
  ENTJ: { emoji: '👑', desc: '타고난 리더 · 자신감 · 목표지향' },
  ENTP: { emoji: '💡', desc: '창의적 토론가 · 혁신적 · 다재다능' },
  INFJ: { emoji: '🌙', desc: '통찰력 있는 이상주의자 · 공감' },
  INFP: { emoji: '🌸', desc: '낭만적 이상주의자 · 진정성 · 창의적' },
  ENFJ: { emoji: '🌟', desc: '카리스마 있는 멘토 · 따뜻함' },
  ENFP: { emoji: '🎨', desc: '자유로운 영혼 · 열정적 · 창의적' },
  ISTJ: { emoji: '🛡️', desc: '신뢰할 수 있는 현실주의자 · 성실' },
  ISFJ: { emoji: '🌿', desc: '따뜻한 수호자 · 배려심 · 헌신적' },
  ESTJ: { emoji: '⚡', desc: '관리자형 · 리더십 · 조직적' },
  ESFJ: { emoji: '🤗', desc: '사교적 외교관 · 따뜻함 · 배려' },
  ISTP: { emoji: '🔧', desc: '만능 재주꾼 · 분석적 · 실용적' },
  ISFP: { emoji: '🎵', desc: '호기심 많은 예술가 · 온화 · 자유' },
  ESTP: { emoji: '🏄', desc: '모험을 즐기는 사업가 · 대담 · 활동적' },
  ESFP: { emoji: '🎉', desc: '자유로운 연예인 · 즉흥적 · 에너지' },
};

// 16×16 compatibility matrix (symmetric)
// Index order matches TYPES array
// Golden pairs (5): INTJ↔ENFP, INTP↔ENTJ, ENTP↔INFJ, INFP↔ENFJ,
//                   ISTJ↔ESFP, ISFJ↔ESTP, ESTJ↔ISFP, ESFJ↔ISTP
const MATRIX = [
//     INTJ INTP ENTJ ENTP INFJ INFP ENFJ ENFP ISTJ ISFJ ESTJ ESFJ ISTP ISFP ESTP ESFP
  /*INTJ*/[3,   4,   4,   4,   4,   3,   3,   5,   3,   2,   3,   2,   3,   2,   2,   3],
  /*INTP*/[4,   3,   5,   4,   3,   3,   3,   4,   2,   2,   3,   2,   4,   3,   3,   2],
  /*ENTJ*/[4,   5,   3,   4,   3,   2,   3,   3,   3,   2,   4,   2,   3,   2,   3,   2],
  /*ENTP*/[4,   4,   4,   3,   5,   3,   3,   4,   2,   2,   3,   2,   3,   2,   3,   3],
  /*INFJ*/[4,   3,   3,   5,   3,   4,   4,   4,   2,   3,   2,   3,   2,   3,   2,   3],
  /*INFP*/[3,   3,   2,   3,   4,   3,   5,   4,   2,   3,   2,   3,   3,   4,   2,   3],
  /*ENFJ*/[3,   3,   3,   3,   4,   5,   3,   4,   3,   4,   3,   4,   2,   4,   2,   3],
  /*ENFP*/[5,   4,   3,   4,   4,   4,   4,   3,   2,   3,   2,   3,   3,   3,   3,   4],
  /*ISTJ*/[3,   2,   3,   2,   2,   2,   3,   2,   3,   4,   4,   3,   4,   3,   3,   5],
  /*ISFJ*/[2,   2,   2,   2,   3,   3,   4,   3,   4,   3,   3,   4,   3,   4,   5,   4],
  /*ESTJ*/[3,   3,   4,   3,   2,   2,   3,   2,   4,   3,   3,   4,   4,   5,   4,   3],
  /*ESFJ*/[2,   2,   2,   2,   3,   3,   4,   3,   3,   4,   4,   3,   5,   4,   3,   4],
  /*ISTP*/[3,   4,   3,   3,   2,   3,   2,   3,   4,   3,   4,   5,   3,   4,   4,   4],
  /*ISFP*/[2,   3,   2,   2,   3,   4,   4,   3,   3,   4,   5,   4,   4,   3,   4,   4],
  /*ESTP*/[2,   3,   3,   3,   2,   2,   2,   3,   3,   5,   4,   3,   4,   4,   3,   4],
  /*ESFP*/[3,   2,   2,   3,   3,   3,   3,   4,   5,   4,   3,   4,   4,   4,   4,   3],
];

const SCORE_INFO = {
  5: { label: '천생연분 💘', cls: 'score-5' },
  4: { label: '찰떡 궁합 💖', cls: 'score-4' },
  3: { label: '괜찮은 궁합 💜', cls: 'score-3' },
  2: { label: '도전적인 궁합 💙', cls: 'score-2' },
  1: { label: '어려운 궁합 🩶', cls: 'score-1' },
};

// Detailed descriptions for all unique pairs
const PAIR_DATA = {
  'INTJ-ENFP': {
    desc: '지적 자극과 따뜻한 감성이 만나는 최고의 궁합! INTJ는 ENFP의 창의적 에너지에 매력을 느끼고, ENFP는 INTJ의 깊이 있는 통찰력에 끌립니다. 서로의 부족한 면을 채워주는 이상적인 파트너입니다.',
    strengths: ['지적 대화와 깊은 자극', '서로의 약점을 보완', '성장을 이끄는 관계'],
    challenges: ['감정 표현 방식의 차이', '내성적 vs 사교적 욕구 충돌', 'INTJ의 독립심 vs ENFP의 애정 표현'],
  },
  'INTP-ENTJ': {
    desc: '논리와 전략이 완벽하게 맞물리는 파워 커플! INTP의 번뜩이는 아이디어와 ENTJ의 탁월한 실행력이 결합하면 무엇이든 가능해집니다.',
    strengths: ['지적 시너지와 목표 공유', '서로의 역량을 극대화', '깊은 논리적 대화'],
    challenges: ['INTP의 우유부단 vs ENTJ의 결단력', '감정 소통 부족', 'ENTJ의 강한 주도권'],
  },
  'ENTP-INFJ': {
    desc: '가장 깊은 차원에서 서로를 이해하는 영혼의 짝. ENTP의 혁신적 사고와 INFJ의 통찰력이 만나 놀라운 시너지를 냅니다. 서로에게 세상을 새롭게 보는 시각을 선물합니다.',
    strengths: ['지적 깊이와 강한 유대감', '서로의 세계관 확장', '창의적 영감을 주고받음'],
    challenges: ['ENTP의 논쟁 성향 vs INFJ의 감수성', '에너지 레벨 차이', 'INFJ의 감정 소진'],
  },
  'INFP-ENFJ': {
    desc: '감성과 이상이 완벽하게 공명하는 아름다운 관계. ENFJ는 INFP를 진심으로 이해하고 이끌어주며, INFP는 ENFJ의 삶에 깊은 감동과 의미를 더합니다.',
    strengths: ['깊은 감정적 연결', '공통된 가치관과 이상', '서로를 성장시키는 관계'],
    challenges: ['감정 과부하 가능성', 'ENFJ의 기대 vs INFP의 독립 욕구', '현실적 문제 회피'],
  },
  'ISTJ-ESFP': {
    desc: '든든한 안정과 생기 넘치는 활력이 만나는 궁합! ISTJ의 믿음직한 지지와 ESFP의 밝은 에너지가 서로를 완성시킵니다. 함께라면 책임감과 즐거움 모두 얻을 수 있어요.',
    strengths: ['상호 보완적인 강점', '안정감과 즐거움의 균형', '서로에게 새로운 세계'],
    challenges: ['생활 방식과 속도감 차이', 'ISTJ의 계획성 vs ESFP의 즉흥성', '장기 계획 관점 충돌'],
  },
  'ISFJ-ESTP': {
    desc: '헌신적인 보호자와 대담한 모험가의 매혹적인 만남. ISFJ의 따뜻한 배려와 ESTP의 활동적인 에너지가 조화를 이루며 서로의 삶을 더욱 풍요롭게 합니다.',
    strengths: ['서로의 세계를 풍요롭게', 'ISFJ의 안정감 + ESTP의 흥미진진함', '상호 존중과 성장'],
    challenges: ['속도감과 신중함의 차이', 'ESTP의 충동적 결정 vs ISFJ의 신중함', '감정 표현 방식'],
  },
  'ESTJ-ISFP': {
    desc: '구조와 자유가 만나는 매력적인 관계. ESTJ의 리더십이 ISFP에게 안정감을 주고, ISFP는 ESTJ의 삶에 아름다운 색채와 감성을 더합니다. 균형 잡힌 커플입니다.',
    strengths: ['명확한 역할 분담', '서로의 세계를 자극하고 성장', '안정적이고 현실적인 기반'],
    challenges: ['의사결정 방식의 차이', 'ESTJ의 강한 의지 vs ISFP의 유연함', '감수성 이해 부족'],
  },
  'ESFJ-ISTP': {
    desc: '따뜻한 돌봄과 독립적 자유가 만나는 균형 잡힌 궁합. ESFJ의 사랑 넘치는 보살핌과 ISTP의 실용적이고 조용한 지지가 아름다운 조화를 이룹니다.',
    strengths: ['상호 보완적 강점', 'ESFJ의 감성 + ISTP의 논리', '실용적이고 따뜻한 관계'],
    challenges: ['ESFJ의 감정 표현 욕구 vs ISTP의 독립성', '사교 활동에 대한 시각 차이', '감정 vs 논리 갈등'],
  },
};

// Generic descriptions by score
const GENERIC_DATA = {
  5: {
    desc: '두 분은 최고의 궁합입니다! 서로의 다른 점이 오히려 강력한 매력이 되어 깊고 풍요로운 관계를 만들어갑니다.',
    strengths: ['강한 상호 보완성', '서로에게 영감을 줌', '깊은 유대감 형성'],
    challenges: ['서로 다른 생활 방식 조율', '의사소통 스타일 차이', '상대방의 필요를 이해하는 노력'],
  },
  4: {
    desc: '좋은 궁합입니다! 비슷한 가치관과 서로를 이해하는 마음이 있어 안정적이고 따뜻한 관계를 만들 수 있습니다.',
    strengths: ['공통된 관심사와 가치관', '편안하고 자연스러운 소통', '서로를 이해하는 공감대'],
    challenges: ['유사한 약점 보완 필요', '지루함을 피하는 노력', '성장을 위한 자극 만들기'],
  },
  3: {
    desc: '노력하면 충분히 좋은 관계가 될 수 있습니다. 서로의 차이를 이해하고 존중하는 마음이 중요합니다.',
    strengths: ['서로에게 새로운 시각 제공', '차이에서 오는 성장 기회', '다양성 속의 조화'],
    challenges: ['의사소통 방식 차이', '우선순위 조율 필요', '서로의 필요를 적극적으로 표현'],
  },
  2: {
    desc: '쉽지 않은 궁합이지만, 서로에 대한 깊은 이해와 배려가 있다면 불가능하지 않습니다. 차이가 성장의 기회가 될 수 있어요.',
    strengths: ['서로를 도전하며 성장', '다름에서 오는 배움', '강한 인연이라면 극복 가능'],
    challenges: ['근본적인 가치관 차이', '의사소통에 많은 노력 필요', '상대방 이해에 시간 투자'],
  },
  1: {
    desc: '많은 노력이 필요한 궁합입니다. 그러나 진심어린 사랑과 서로를 이해하려는 의지가 있다면 모든 것을 이겨낼 수 있습니다.',
    strengths: ['역경을 통한 깊은 유대감', '서로에게 배우는 귀한 기회', '강한 의지로 만드는 관계'],
    challenges: ['가치관과 생활방식의 큰 차이', '지속적인 소통 노력 필요', '서로의 세계를 이해하는 인내'],
  },
};

function getPairData(typeA, typeB) {
  const key1 = `${typeA}-${typeB}`;
  const key2 = `${typeB}-${typeA}`;
  return PAIR_DATA[key1] || PAIR_DATA[key2] || null;
}

function getScore(typeA, typeB) {
  const i = TYPES.indexOf(typeA);
  const j = TYPES.indexOf(typeB);
  return MATRIX[i][j];
}

// ── Theme ────────────────────────────────────────────────

const themeBtn = document.getElementById('theme-btn');

function initTheme() {
  const saved = localStorage.getItem('mbti-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  themeBtn.textContent = saved === 'light' ? '🌙' : '☀️';
}

themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('mbti-theme', next);
  themeBtn.textContent = next === 'light' ? '🌙' : '☀️';
});

initTheme();

// ── Populate Dropdowns ───────────────────────────────────

const mySelect = document.getElementById('my-mbti');
const partnerSelect = document.getElementById('partner-mbti');

TYPES.forEach(type => {
  const opt1 = document.createElement('option');
  opt1.value = type;
  opt1.textContent = type;
  mySelect.appendChild(opt1);

  const opt2 = document.createElement('option');
  opt2.value = type;
  opt2.textContent = type;
  partnerSelect.appendChild(opt2);
});

// ── Live Badge Updates ───────────────────────────────────

function updateBadge(selectEl, badgeId, descId) {
  const type = selectEl.value;
  const badge = document.getElementById(badgeId);
  const desc = document.getElementById(descId);

  if (type) {
    badge.textContent = type;
    badge.classList.add('active');
    desc.textContent = TYPE_INFO[type].desc;
  } else {
    badge.textContent = '?';
    badge.classList.remove('active');
    desc.textContent = '';
  }
}

mySelect.addEventListener('change', () => updateBadge(mySelect, 'my-badge', 'my-desc'));
partnerSelect.addEventListener('change', () => updateBadge(partnerSelect, 'partner-badge', 'partner-desc'));

// ── Check Compatibility ──────────────────────────────────

document.getElementById('check-btn').addEventListener('click', () => {
  const typeA = mySelect.value;
  const typeB = partnerSelect.value;

  if (!typeA || !typeB) {
    alert('두 MBTI 유형을 모두 선택해주세요!');
    return;
  }

  const score = getScore(typeA, typeB);
  const scoreInfo = SCORE_INFO[score];
  const pairData = getPairData(typeA, typeB) || GENERIC_DATA[score];

  // Result pair label
  document.getElementById('result-pair').textContent =
    `${TYPE_INFO[typeA].emoji} ${typeA}  ×  ${typeB} ${TYPE_INFO[typeB].emoji}`;

  // Hearts
  const heartsEl = document.getElementById('hearts-display');
  heartsEl.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.style.animationDelay = `${i * 0.1}s`;
    heart.textContent = i < score ? '❤️' : '🩶';
    heartsEl.appendChild(heart);
  }

  // Badge
  document.getElementById('result-badge').innerHTML =
    `<span class="result-badge-inner ${scoreInfo.cls}">${scoreInfo.label}</span>`;

  // Description
  document.getElementById('result-desc').textContent = pairData.desc;

  // Strengths
  const strengthsList = document.getElementById('strengths-list');
  strengthsList.innerHTML = pairData.strengths.map(s => `<li>${s}</li>`).join('');

  // Challenges
  const challengesList = document.getElementById('challenges-list');
  challengesList.innerHTML = pairData.challenges.map(c => `<li>${c}</li>`).join('');

  // Show result
  const resultEl = document.getElementById('result');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

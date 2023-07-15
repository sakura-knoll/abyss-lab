import { AttributeType, CharacterType, SkillType, StigmaType, TagType, WeaponType } from './types'

export function getAttributeLabel(type: AttributeType, locale: string) {
  if (locale === 'en-US') {
    switch (type) {
      case 'bio':
        return 'Biologic'
      case 'psy':
        return 'Psychic'
      case 'mech':
        return 'Mecha'
      case 'qua':
        return 'Quantum'
      case 'img':
        return 'IMG'
      case 'none':
        return 'None'
      default:
        return `Unknown Attribute Type (${type})`
    }
  }
  switch (type) {
    case 'bio':
      return '생물'
    case 'psy':
      return '이능'
    case 'mech':
      return '기계'
    case 'qua':
      return '양자'
    case 'img':
      return '허수'
    case 'none':
      return '무속성'
    default:
      return `Unknown Attribute Type (${type})`
  }
}

export function getWeaponTypeLabel(type: WeaponType, locale: string) {
  if (locale === 'en-US') {
    switch (type) {
      case 'pistols':
        return 'Pistols'
      case 'katana':
        return 'Blade'
      case 'cannon':
        return 'Heavy'
      case 'cross':
        return 'Cross'
      case '2-handed':
        return '2-Handed'
      case 'scythe':
        return 'Scythe'
      case 'lance':
        return 'Lance'
      case 'fists':
        return 'Fists'
      case 'bow':
        return 'Bow'
      case 'chakram':
        return 'Chakram'
      case 'javelin':
        return 'Javelin'
      default:
        return `Unknown Weapon Type (${type})`
    }
  }
  switch (type) {
    case 'pistols':
      return '쌍권총'
    case 'katana':
      return '태도'
    case 'cannon':
      return '대포'
    case 'cross':
      return '십자가'
    case '2-handed':
      return '대검'
    case 'scythe':
      return '낫'
    case 'lance':
      return '랜스'
    case 'fists':
      return '건틀릿'
    case 'bow':
      return '활'
    case 'chakram':
      return '차크람'
    case 'javelin':
      return '재블린'
    default:
      return `Unknown Weapon Type (${type})`
  }
}

export function getStigmaTypeLabel(type: StigmaType, locale: string) {
  if (locale === 'en-US') {
    switch (type) {
      case 'top':
        return 'Top'
      case 'mid':
        return 'Mid'
      case 'bot':
        return 'Bot'
      default:
        return `Unknown Stigma Type (${type})`
    }
  }
  switch (type) {
    case 'top':
      return '상단'
    case 'mid':
      return '중단'
    case 'bot':
      return '하단'
    default:
      return `Unknown Stigma Type (${type})`
  }
}

export function getSkillTypeLabel(type: SkillType, locale: string) {
  if (locale === 'en-US') {
    switch (type) {
      case 'leader':
        return 'Leader Skill'
      case 'passive':
        return 'Passive'
      case 'evasion':
        return 'Evade'
      case 'special':
        return 'Special Attack'
      case 'ultimate':
        return 'Ultimate'
      case 'basic':
        return 'Basic Skill'
      case 'sp':
        return 'SP Skill'
      case 'none':
        return 'None'
      default:
        return `Unknown Skill Type (${type})`
    }
  }
  switch (type) {
    case 'leader':
      return '리더 스킬'
    case 'passive':
      return '패시브 스킬'
    case 'evasion':
      return '회피'
    case 'special':
      return '특수 공격'
    case 'ultimate':
      return '필살기'
    case 'basic':
      return '기본 공격'
    case 'sp':
      return 'SP 스킬'
    case 'none':
      return '미분류'
    default:
      return `Unknown Skill Type (${type})`
  }
}

export function getCharacterTypeLabel(type: CharacterType, locale: string) {
  if (locale === 'en-US') {
    switch (type) {
      case 'kiana':
        return 'Kiana'
      case 'mei':
        return 'Mei'
      case 'bronya':
        return 'Bronya'
      case 'himeko':
        return 'Himeko'
      case 'theresa':
        return 'Theresa'
      case 'fuhua':
        return 'Fu Hua'
      case 'rita':
        return 'Rita'
      case 'sakura':
        return 'Sakura'
      case 'kallen':
        return 'Kallen'
      case 'olenyevas':
        return 'Olenyevas'
      case 'seele':
        return 'Seele'
      case 'durandal':
        return 'Durandal'
      case 'fischl':
        return 'Fischl'
      case 'elysia':
        return 'Elysia'
      case 'mobius':
        return 'Mobius'
      case 'raven':
        return 'Raven'
      case 'carole':
        return 'Carole'
      case 'pardofelis':
        return 'Pardofelis'
      case 'aponia':
        return 'Aponia'
      case 'eden':
        return 'Eden'
      case 'griseo':
        return 'Griseo'
      case 'vill-v':
        return 'Vill V'
      case 'sushang':
        return 'Sushang'
      case 'ai':
        return 'AI'
      case 'susannah':
        return 'Susannah'
      case 'hare':
        return 'Hare'
      case 'prometheus':
        return 'Prometheus'
      case 'kira':
        return 'Kira'
      case 'asuka':
        return 'Asuka'

      // Event Only
      case 'keqing':
        return 'Keqing'

      // APHO

      case 'apho-mei':
        return '후서 메이'
      case 'apho-adam':
        return '후서 아담'
      case 'apho-carol':
        return '후서 캐롤'
      case 'apho-bronya':
        return '후서 브로냐'
      case 'apho-timido':
        return '후서 티미도'

      default:
        return `Unknown Character Type (${type})`
    }
  }
  switch (type) {
    case 'kiana':
      return '키아나'
    case 'mei':
      return '메이'
    case 'bronya':
      return '브로냐'
    case 'himeko':
      return '히메코'
    case 'theresa':
      return '테레사'
    case 'fuhua':
      return '후카'
    case 'rita':
      return '리타'
    case 'sakura':
      return '사쿠라'
    case 'kallen':
      return '카렌'
    case 'olenyevas':
      return '아린 자매'
    case 'seele':
      return '제레'
    case 'durandal':
      return '듀란달'
    case 'fischl':
      return '피슬'
    case 'elysia':
      return '엘리시아'
    case 'mobius':
      return '뫼비우스'
    case 'raven':
      return '레이븐'
    case 'carole':
      return '캐롤'
    case 'pardofelis':
      return '파르도펠리스'
    case 'aponia':
      return '아포니아'
    case 'eden':
      return '에덴'
    case 'griseo':
      return '그리세오'
    case 'vill-v':
      return '빌브이'
    case 'sushang':
      return '소상'
    case 'ai':
      return '아이'
    case 'susannah':
      return '수잔나'
    case 'hare':
      return '래빗'
    case 'prometheus':
      return '프로메테우스'
    case 'kira':
      return '키라'
    case 'asuka':
      return '아스카'

    // Event Only
    case 'keqing':
      return '각청'

    // APHO

    case 'apho-mei':
      return '후서 메이'
    case 'apho-adam':
      return '후서 아담'
    case 'apho-carol':
      return '후서 캐롤'
    case 'apho-bronya':
      return '후서 브로냐'
    case 'apho-timido':
      return '후서 티미도'

    default:
      return `Unknown Character Type (${type})`
  }
}

export function getTagTypeLabel(type: TagType, locale: string) {
  if (locale === 'en-US') {
    switch (type) {
      case 'branch':
        return 'Branch'
      case 'charge':
        return 'Charge'
      case 'physical-dmg':
        return 'Physical DMG'
      case 'fire-dmg':
        return 'Fire DMG'
      case 'ice-dmg':
        return 'Ice DMG'
      case 'lightning-dmg':
        return 'Lightning DMG'
      case 'freeze':
        return 'Freeze'
      case 'paralyze':
        return 'Paralyze'
      case 'stun':
        return 'Stun'
      case 'ignite':
        return 'Ignite'
      case 'bleed':
        return 'Bleed'
      case 'heavy-atk':
        return 'Heavy ATK'
      case 'weaken':
        return 'Weaken'
      case 'impair':
        return 'Impair'
      case 'float':
        return 'Float'
      case 'slow-down':
        return 'Slow Down'
      case 'time-mastery':
        return 'Time Mastery'
      case 'gather':
        return 'Gather'
      case 'heal':
        return 'Heal'
      case 'fast-atk':
        return 'Fast ATK'
      case 'aerial':
        return 'Aerial'
      case 'burst':
        return 'Burst'
      case 'shield':
        return 'Shield'
      case 'meele':
        return 'Meele'
      case 'ranged':
        return 'Ranged'
      default:
        return `Unknown Tag Type (${type})`
    }
  }
  switch (type) {
    case 'branch':
      return '분기'
    case 'charge':
      return '차지'
    case 'physical-dmg':
      return '물리'
    case 'fire-dmg':
      return '화염 대미지'
    case 'ice-dmg':
      return '빙결 대미지'
    case 'lightning-dmg':
      return '뇌전 대미지'
    case 'freeze':
      return '빙결'
    case 'paralyze':
      return '마비'
    case 'stun':
      return '기절'
    case 'ignite':
      return '점화'
    case 'bleed':
      return '출혈'
    case 'heavy-atk':
      return '강타'
    case 'weaken':
      return '허약'
    case 'impair':
      return '취약'
    case 'float':
      return '띄움'
    case 'slow-down':
      return '감속'
    case 'time-mastery':
      return '시공'
    case 'gather':
      return '흡인'
    case 'heal':
      return '치료'
    case 'fast-atk':
      return '높은 빈도'
    case 'aerial':
      return '대공'
    case 'burst':
      return '버스트'
    case 'shield':
      return '실드'
    case 'meele':
      return '근접'
    case 'ranged':
      return '원거리'
    default:
      return `Unknown Tag Type (${type})`
  }
}

export function getErSignetTypeLabel(quality: number, locale: string) {
  if (locale === 'en-US') {
    switch (quality) {
      case 1:
        return 'Normal Signet'
      case 2:
        return 'Enhanced Signet'
      case 3:
        return 'Core Signet'
      case 4:
        return 'Exclusive Signet'
      default:
        return `Unknown (${quality})`
    }
  }
  switch (quality) {
    case 1:
      return '일반 각인'
    case 2:
      return '증폭 각인'
    case 3:
      return '코어 각인'
    case 4:
      return '전용 각인'
    default:
      return `Unknown Signet Type(${quality})`
  }
}

export function getSignetGroupLabel(id: string, locale: string) {
  if (locale === 'en-US') {
    switch (id) {
      case '1':
        return 'Deliverance'
      case '2':
        return 'Gold'
      case '3':
        return 'Decimation'
      case '4':
        return 'Bodhi'
      case '5':
        return 'Setsuna'
      case '6':
        return 'Infinity'
      case '7':
        return 'Vicissitude'
      case '8':
        return '■■'
      case '9':
        return '■■'
      case '10':
        return 'Discipline'
      case '11':
        return 'Helix'
      case '12':
        return 'Daybreak'
      case '13':
        return 'Stars'
      case '14':
        return 'Reverie'
      default:
        return `Unknown Signet Group (${id})`
    }
  }
  switch (id) {
    case '1':
      return '[구원]의 각인'
    case '2':
      return '[황금]의 각인'
    case '3':
      return '[오멸]의 각인'
    case '4':
      return '[천혜]의 각인'
    case '5':
      return '[찰나]의 각인'
    case '6':
      return '[무한]의 각인'
    case '7':
      return '[부생]의 각인'
    case '8':
      return '[■■]의 각인'
    case '9':
      return '[■■]의 각인'
    case '10':
      return '[계율]의 각인'
    case '11':
      return '[나선]의 각인'
    case '12':
      return '[욱광]의 각인'
    case '13':
      return '[번성]의 각인'
    case '14':
      return '[환몽]의 각인'
    default:
      return `Unknown Signet Group (${id})`
  }
}

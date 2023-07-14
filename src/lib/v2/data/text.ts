import { AttributeType, CharacterType, SkillType, StigmaType, TagType, WeaponType } from './types'

export function getAttributeLabel(type: AttributeType) {
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

export function getWeaponTypeLabel(type: WeaponType) {
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

export function getStigmaTypeLabel(type: StigmaType) {
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

export function getSkillTypeLabel(type: SkillType) {
  switch (type) {
    case 'leader':
      return '리더 스킬'
    case 'passive':
      return '패시브 스킬'
    case 'evasion':
      return '회피'
    case 'special':
      return '기본 공격'
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

export function getCharacterTypeLabel(type: CharacterType) {
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

export function getTagTypeLabel(type: TagType) {
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
      return '버스트'
    case 'burst':
      return '실드'
    case 'shield':
      return '대공'
    case 'meele':
      return '근접'
    case 'ranged':
      return '원거리'
    default:
      return `Unknown Tag Type (${type})`
  }
}

export function getErSignetTypeLabel(quality: number) {
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
      return `Unknown (${quality})`
  }
}

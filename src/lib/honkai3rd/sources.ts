export type SourceType =
  | 'pri-weapon-foundry'
  | 'focused-supply'
  | 'spirit-weapon-foundry'
  | 'weapon-exchange'
  | 'stigmata-exchange'
  | 'dorm-equipment-supply'
  | 'special-divine-key-supply'

export interface SourceData {
  type: SourceType
}

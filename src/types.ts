import { ActionType } from 'logic/reducer/action'
import { View } from 'logic/view'
import { MouseEvent } from 'react'

export type Position = [number, number]

export enum FieldStatus {
  NONE = 'none',
  ACTUAL = 'actual',
  AVAILABLE = 'available',
  NECESSARY = 'necessary',
  KILLABLE = 'killable',
  NECESSARY_NEXT = 'necessary-next',
}

export enum Color {
  WHITE = 'white',
  BLACK = 'black',
}

export type FieldClickFn = (
  position: string,
  type: ActionType.FIELD_LEFT_CLICK | ActionType.FIELD_RIGHT_CLICK
) => (event: MouseEvent<HTMLDivElement>) => void

export enum Status {
  NONE = 'none',
  PLAYER_VS_PLAYER = 'player-vs-player',
}

export interface Figure {
  king: boolean
  color: Color
}

export interface Field {
  status: FieldStatus
  count?: number
  killPosition?: string
}

export interface Fields {
  [position: string]: Field
}

export interface Figures {
  [position: string]: Figure
}
export interface Views {
  [position: string]: View
}

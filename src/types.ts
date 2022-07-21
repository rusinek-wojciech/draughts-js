import { MouseEvent } from 'react'

export type Position = [number, number]

export enum Figure {
  NONE = 'none',
  WHITE = 'white',
  BLACK = 'black',
  WHITE_KING = 'white-king',
  BLACK_KING = 'black-king',
}

export enum FieldStatus {
  NONE = 'none',
  ACTUAL = 'actual',
  AVAILABLE = 'available',
  NECESSARY = 'necessary',
  KILLABLE = 'killable',
}

export enum Color {
  WHITE = 'white',
  BLACK = 'black',
}

export type FieldClickFn = (
  position: string,
  type: 'left' | 'right'
) => (event: MouseEvent<HTMLDivElement>) => void

export type GameState = 'idle' | 'complete' | 'running-black' | 'running-white'

export interface Fields {
  [position: string]: {
    color: Color
    figure: Figure
    position: Position
  }
}

export interface View {
  [position: string]: {
    position: Position
    status: FieldStatus
  }
}

export interface Views {
  [position: string]: {
    position: Position
    view: View
  }
}

export interface State {
  rightClickPosition: string | null
  isBoardRotated: boolean
  turn: Color
  fields: Fields
  views: Views
}

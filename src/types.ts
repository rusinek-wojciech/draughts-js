import { ActionType } from 'logic/reducer/action'
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

export interface Fields {
  [position: string]: {
    color: Color
    figure: Figure
  }
}

export interface View {
  [position: string]: {
    status: FieldStatus
    count?: number
    killPosition?: string
  }
}

export interface Views {
  [position: string]: {
    view: View
    kills: number
  }
}

export enum Status {
  NONE = 'none',
  PLAYER_VS_PLAYER = 'player-vs-player',
}

export interface State {
  rightClickPosition: string | null
  disableRightClick: boolean
  isBoardRotated: boolean
  isWhiteTurn: boolean
  fields: Fields
  views: Views
  status: Status
}

import { Status } from 'types'

export enum ActionType {
  SET_STATUS = 'set-status',
  RESET = 'reset',
  ROTATE = 'rotate',
  FIELD_RIGHT_CLICK = 'field-right-click',
  FIELD_LEFT_CLICK = 'field-left-click',
}

export type Action =
  | { type: ActionType.RESET }
  | { type: ActionType.ROTATE }
  | { type: ActionType.FIELD_RIGHT_CLICK; clickPosition: string }
  | { type: ActionType.FIELD_LEFT_CLICK; clickPosition: string }
  | { type: ActionType.SET_STATUS; status: Status }

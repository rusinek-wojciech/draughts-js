type Action =
  | { type: 'reset' }
  | { type: 'rotate' }
  | { type: 'field-right-click'; clickPosition: string }
  | { type: 'field-left-click'; clickPosition: string }

export default Action

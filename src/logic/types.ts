export type Support = 'none' | 'actual' | 'available' | 'necessary' | 'killable'
export type Supports = Support[][]

export type Figure = 'none' | 'white' | 'black' | 'white-king' | 'black-king'
export type Figures = Figure[][]

export type Field = 'black' | 'white'
export type Fields = Field[][]

export interface Position {
  x: number
  y: number
}

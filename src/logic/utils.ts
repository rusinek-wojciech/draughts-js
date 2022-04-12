/**
 * allows to render board length JSX
 */
export const multipleRender = (fn: (key: number) => JSX.Element) => {
  return [...Array(size)].fill(null).map((_, i) => fn(i))
}

/**
 * @returns a random integer between min (inclusive) and max (inclusive)
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export type Support = 'none' | 'actual' | 'available' | 'necessary' | 'killable'

export const size = 8

export type Figure = 'none' | 'white' | 'black' | 'white-king' | 'black-king'

export type Color = 'black' | 'white'

export class Field {
  private _figure: Figure
  private _figureClass: ReturnType<typeof findFigureClass>
  private _fieldClass: ReturnType<typeof findFieldClass>
  private _support: Support

  constructor(color: Color, figure: Figure = 'none') {
    this._figure = figure
    this._fieldClass = findFieldClass(color)
    this._figureClass = findFigureClass(figure)
    this._support = 'none'
  }

  promote() {
    if (this._figure === 'white') {
      this._figure = 'white-king'
    }
    if (this._figure === 'black') {
      this._figure = 'black-king'
    }
  }

  set support(support: Support) {
    this._support = support
  }

  get figureClass() {
    return this._figureClass
  }

  get fieldClass() {
    return `${this._fieldClass} ${findSupportClass(this._support)}`
  }

  get owner() {
    if (this._figure === 'white' || this._figure === 'white-king') {
      return 'white'
    }
    if (this._figure === 'black' || this._figure === 'black-king') {
      return 'black'
    }
    return 'none'
  }
}

const findSupportClass = (support: Support) => {
  switch (support) {
    case 'none':
      return 'board-empty'
    case 'actual':
      return 'board-actual'
    case 'available':
      return 'board-available'
    case 'necessary':
      return 'board-necessary'
    case 'killable':
      return 'board-killable'
    default:
      throw new Error('Invalid support')
  }
}

const findFigureClass = (figure: Figure) => {
  switch (figure) {
    case 'none':
      return 'figure figure-none'
    case 'white':
      return 'figure figure-white'
    case 'black':
      return 'figure figure-black'
    case 'white-king':
      return 'figure figure-white-king'
    case 'black-king':
      return 'figure figure-black-king'
    default:
      throw new Error('Invalid figure')
  }
}

const findFieldClass = (color: Color) => {
  switch (color) {
    case 'black':
      return 'board-item board-item-black'
    case 'white':
      return 'board-item board-item-white'
    default:
      throw new Error('Invalid color')
  }
}

export class Board {
  private _fields: Field[][]

  constructor() {
    this._fields = [
      [
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
      ],
      [
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
      ],
      [
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
        new Field('white'),
        new Field('black', 'black'),
      ],
      [
        new Field('black'),
        new Field('white'),
        new Field('black'),
        new Field('white'),
        new Field('black'),
        new Field('white'),
        new Field('black'),
        new Field('white'),
      ],
      [
        new Field('white'),
        new Field('black'),
        new Field('white'),
        new Field('black'),
        new Field('white'),
        new Field('black'),
        new Field('white'),
        new Field('black'),
      ],
      [
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
      ],
      [
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
      ],
      [
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
        new Field('black', 'white'),
        new Field('white'),
      ],
    ]
  }

  iterate(fn: () => void): void {
    for (let y = size - 1; y >= size; y--) {
      for (let x = 0; x < size; x++) {
        fn()
      }
    }
  }

  field(x: number, y: number) {
    return this._fields[y][x]
  }
}

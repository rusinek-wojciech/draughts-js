import { str2pos } from 'logic/utils'
import { View } from 'logic/view'
import { Color, FieldStatus, Figure, Figures, Views } from 'types'

export class Board {
  private _views: Views
  private _figures: Figures

  constructor(color: Color) {
    this._figures = this._initFigures()
    this._views = this.generateViews(color)
  }

  public generateViews(color: Color): Views {
    return Object.entries(this._figures)
      .filter(([_, figure]) => figure.color === color)
      .map(([position, _]) => {
        return {
          [position]: new View(str2pos(position), this._figures),
        }
      })
      .reduce((acc, curr) => {
        return {
          ...acc,
          ...curr,
        }
      })
  }

  public move(from: string, to: string, turn: Color): boolean {
    const view = this.view(from)!
    const field = view.field(to)

    if (
      field.status !== FieldStatus.AVAILABLE &&
      field.status !== FieldStatus.NECESSARY
    ) {
      return false
    }

    this._figures[to] = { ...this._figures[from] }

    if (
      (turn === Color.WHITE && to.startsWith('0')) ||
      (turn === Color.BLACK && to.startsWith('7'))
    ) {
      this._figures[to].king = true
    }

    delete this._figures[from]

    if (field.status === FieldStatus.AVAILABLE) {
      this.generateViews(turn === Color.WHITE ? Color.BLACK : Color.WHITE)
      return true
    } else if (field.status === FieldStatus.NECESSARY) {

      this._figures

    }

    return false
  }

  public figure(position: string): Figure | null {
    return this._figures[position] ?? null
  }

  public removeFigure(position: string): void {
    delete this._figures[position]
  }

  public figureStyle(position: string): string | null {
    const figureField = this.figure(position)
    return figureField
      ? `figure-${figureField.color}-${figureField.king ? 'king' : 'pawn'}`
      : null
  }

  public view(position: string): View | null {
    return this._views[position] ?? null
  }

  private _initFigures() {
    return {
      '0-1': {
        king: false,
        color: Color.BLACK,
      },
      '0-3': {
        king: false,
        color: Color.BLACK,
      },
      '0-5': {
        king: false,
        color: Color.BLACK,
      },
      '0-7': {
        king: false,
        color: Color.BLACK,
      },
      '1-0': {
        king: false,
        color: Color.BLACK,
      },
      '1-2': {
        king: false,
        color: Color.BLACK,
      },
      '1-4': {
        king: false,
        color: Color.BLACK,
      },
      '1-6': {
        king: false,
        color: Color.BLACK,
      },
      '2-1': {
        king: false,
        color: Color.BLACK,
      },
      '2-3': {
        king: false,
        color: Color.BLACK,
      },
      '2-5': {
        king: false,
        color: Color.BLACK,
      },
      '2-7': {
        king: false,
        color: Color.BLACK,
      },
      '5-0': {
        king: false,
        color: Color.WHITE,
      },
      '5-2': {
        king: false,
        color: Color.WHITE,
      },
      '5-4': {
        king: false,
        color: Color.WHITE,
      },
      '5-6': {
        king: false,
        color: Color.WHITE,
      },
      '6-1': {
        king: false,
        color: Color.WHITE,
      },
      '6-3': {
        king: false,
        color: Color.WHITE,
      },
      '6-5': {
        king: false,
        color: Color.WHITE,
      },
      '6-7': {
        king: false,
        color: Color.WHITE,
      },
      '7-0': {
        king: false,
        color: Color.WHITE,
      },
      '7-2': {
        king: false,
        color: Color.WHITE,
      },
      '7-4': {
        king: false,
        color: Color.WHITE,
      },
      '7-6': {
        king: false,
        color: Color.WHITE,
      },
    }
  }
}

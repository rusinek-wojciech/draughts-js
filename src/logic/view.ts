import { movements } from 'logic/movements'
import { pos2str, flatIters2D } from 'logic/utils'
import { FieldStatus, Position, Field, Fields, Figure, Figures } from 'types'

export class View {
  private _fields: Fields
  private _availableKills: number
  private _viewOwner: Figure

  constructor(position: Position, figures: Figures) {
    this._fields = this._initFields()
    this._availableKills = 0

    const positionStr = pos2str(position)
    this._viewOwner = figures[positionStr]

    this._fields[positionStr].status = FieldStatus.ACTUAL

    this._viewOwner.king
      ? this._markKillsFieldsForKing(position, figures)
      : this._markKillsFieldsForPawn(position, figures)

    if (this._availableKills !== 0) {
      return
    }

    this._viewOwner.king
      ? this._markAvailableFieldsForKing(position, figures)
      : this._markAvailableFieldsForPawn(position, figures)
  }

  public field(position: string): Field {
    return this._fields[position]
  }

  public get availableKills() {
    return this._availableKills
  }

  private _markAvailableFieldsForKing(
    position: Position,
    figures: Figures
  ): void {
    movements.each().forEach((fn) => {
      let p: Position = [...position]
      while (true) {
        const dp = fn(p)

        if (!dp) {
          return
        }

        const dpStr = pos2str(dp)

        if (figures[dpStr] != null) {
          return
        }

        if (this._fields[dpStr].status !== FieldStatus.NONE) {
          return
        }

        this._fields[dpStr].status = FieldStatus.AVAILABLE
        p = dp
      }
    })
  }

  private _markAvailableFieldsForPawn(
    position: Position,
    figures: Figures
  ): void {
    movements.eachByTurn(this._viewOwner.color).forEach((fn) => {
      const dp = fn(position)

      if (!dp) {
        return
      }

      const dpStr = pos2str(dp)

      if (figures[dpStr] != null) {
        return
      }

      if (this._fields[dpStr].status !== FieldStatus.NONE) {
        return
      }

      this._fields[dpStr].status = FieldStatus.AVAILABLE
    })
  }

  private _markKillsFieldsForKing(position: Position, figures: Figures): void {
    const markKillsFieldsForKingRecursive = (
      position: Position,
      count: number = 0
    ) => {
      movements.each().forEach((fn) => {
        let p: Position = [position[0], position[1]]
        while (true) {
          const dp = fn(p)

          if (!dp) {
            return
          }

          const dpStr = pos2str(dp)

          if (
            !figures[dpStr] ||
            this._viewOwner.color === figures[dpStr].color
          ) {
            p = dp
            continue
          }

          const ddp = fn(dp)

          if (!ddp) {
            return
          }

          const ddpStr = pos2str(ddp)

          if (figures[ddpStr] != null) {
            return
          }

          if (this._fields[dpStr].status !== FieldStatus.NONE) {
            return
          }

          this._fields[dpStr].status = FieldStatus.KILLABLE
          this._fields[ddpStr].status =
            count === 0 ? FieldStatus.NECESSARY : FieldStatus.NECESSARY_NEXT
          this._fields[ddpStr].count = count + 1
          this._fields[ddpStr].killPosition = dpStr

          this._availableKills++
          markKillsFieldsForKingRecursive(ddp, count + 1)
          break
        }
      })
    }

    markKillsFieldsForKingRecursive(position)
  }

  private _markKillsFieldsForPawn(position: Position, figures: Figures): void {
    const markKillsFieldsForPawnRecursive = (
      position: Position,
      count: number = 0
    ) => {
      movements.each().forEach((fn) => {
        let p: Position = [...position]

        const dp = fn(p)
        if (!dp) {
          return
        }
        const dpStr = pos2str(dp)

        if (!figures[dpStr] || this._viewOwner.color === figures[dpStr].color) {
          return
        }

        const ddp = fn(dp)
        if (!ddp) {
          return
        }
        const ddpStr = pos2str(ddp)

        if (figures[ddpStr] != null) {
          return
        }

        if (this._fields[dpStr].status !== FieldStatus.NONE) {
          return
        }

        this._fields[dpStr].status = FieldStatus.KILLABLE
        this._fields[ddpStr].status =
          count === 0 ? FieldStatus.NECESSARY : FieldStatus.NECESSARY_NEXT
        this._fields[ddpStr].count = count + 1
        this._fields[ddpStr].killPosition = dpStr

        this._availableKills++
        markKillsFieldsForPawnRecursive(ddp, count + 1)
      })
    }

    markKillsFieldsForPawnRecursive(position)
  }

  private _initFields() {
    return flatIters2D
      .map((position) => {
        return {
          [position]: {
            status: FieldStatus.NONE,
          },
        }
      })
      .reduce((acc, curr) => {
        return {
          ...acc,
          ...curr,
        }
      })
  }
}

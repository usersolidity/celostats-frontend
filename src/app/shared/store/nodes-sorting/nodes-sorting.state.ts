import { EthstatsNode } from 'src/app/shared/store/ethstats'
import { color } from 'src/app/shared'

export type sortingDirection = -1 | 1

export interface Context {
  block: number
  node: EthstatsNode
  time: number
}

type columnValues = string | number | boolean | number[]

export interface Column {
  name: string
  icon: string
  default?: sortingDirection
  first?: sortingDirection
  type?: 'icon' | 'address' | 'chart'
  variants?: ('xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'address' | 'sticky' | 'pre')[],
  accessor: (node: EthstatsNode, context: Context) => columnValues
  link?: (value: columnValues, context: Context) => string
  show?: (value: columnValues, context: Context) => columnValues
  color?: (value: columnValues, context: Context) => color
}

export interface Sorting {
  direction: sortingDirection
  column: Column
}

export interface State {
  columns: Column[]
  sorting: Sorting
  default: Sorting
}

export interface AppState {
  nodesSorting: State
}

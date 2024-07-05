import { Operation } from '../../constants/types'

export interface ChooseOperationsPageProps {
  pathPrefix: string
  operations: Record<string, Operation>
}

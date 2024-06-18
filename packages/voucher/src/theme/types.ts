import type {
  MultiStyleConfig,
  PartsStyleFunction,
  PartsStyleObject,
} from '@chakra-ui/theme-tools'
import type {Dict} from '@chakra-ui/utils'

// eslint-disable-next-line prettier/prettier
interface Anatomy { __type: string;  get keys(): string[] }

// Taken from FormSG - https://github.com/opengovsg/FormSG/blob/form-v2/develop/frontend/src/theme/types.ts
// For stronger typings when creating new MultiStyleConfigs
// TODO: Deprecate over https://github.com/chakra-ui/chakra-ui/pull/6221
export interface ComponentMultiStyleConfigWithParts<T extends Anatomy = Anatomy>
  extends Omit<MultiStyleConfig<T>, 'baseStyle'> {
  baseStyle?: PartsStyleObject<T> | PartsStyleFunction<T>
  parts: T['keys']
  defaultProps?: MultiStyleConfig<T>['defaultProps'] & Dict
}

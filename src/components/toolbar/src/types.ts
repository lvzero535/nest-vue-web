import { DefaultIconsType } from '@/components/icon';
import { ButtonProps, InputProps } from 'ant-design-vue';
import { ExtractPropTypes, PropType, VNode } from 'vue';

export interface XToolbarButtonItem extends ButtonProps {
  icon?: DefaultIconsType | VNode;
  menus?: ButtonType[];
}

export const BarDivider = '|';

export type ButtonType = XToolbarButtonItem | typeof BarDivider;

/**
 * LdToolbarOptions 接口定义了工具栏组件的配置选项
 * 它提供了工具栏的自定义文本、数量和按钮或下拉菜单的数组
 */
export interface XToolbarButtons {
  // 可选的更多文本，默认值为空
  // 可选的数量，默认值为0
  number?: number;
  commonProps?: ButtonProps;
  moreProps?: ButtonProps;
  // 可选的按钮或下拉菜单数组，默认值为空数组
  items: Array<ButtonType>;
}

export const toolbarProps = {
  buttons: {
    type: Object as PropType<XToolbarButtons>,
    required: true,
    default: () => {
      return {};
    },
  },
  searchProps: {
    type: Object as PropType<
      InputProps & { onSearch?: (value: string) => void }
    >,
    default: () => null,
  },
} as const;

export type XToolbarProps = Partial<ExtractPropTypes<typeof toolbarProps>>;

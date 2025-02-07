import { JSX } from 'vue/jsx-runtime';
import { ModalProps, SpinProps } from 'ant-design-vue';

export interface ModalExtra extends ModalProps {
  _isConfirmLoading?: boolean;
  _isSpin?: boolean;
  content: string | JSX.Element | (() => JSX.Element);
  contentProps?: Record<string, SafeAny>;
  spin?: boolean | SpinProps;
  key?: string;
  onOk?: (e?: MouseEvent) => Undefinable<Promise<boolean | undefined>>;
}

export interface XModalProvideRef {
  open: (modalProps: ModalExtra) => void;
  update: (modalProps: ModalExtra) => void;
}

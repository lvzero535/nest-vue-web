import { Spin, SpinProps } from 'ant-design-vue';
import { cloneVNode, defineComponent, isVNode, provide, shallowRef } from 'vue';
import { XModalProvideRef, ModalExtra } from './types';
import { isFunction, isObject } from 'lodash-es';
import { XMODAL_PROVIDER_TOKEN } from './token';
import { uniqueId } from '@/utils/util';
import DraggerModal from './DraggerModal.vue';

export default defineComponent({
  name: 'XModalProvider',
  setup(_, { slots, expose }) {
    const modals = shallowRef<ModalExtra[]>([]);

    const getCurrentIndex = (props: ModalExtra) => {
      return modals.value.findIndex((item) => item.key === props.key);
    };

    const open = (props: ModalExtra) => {
      props._isConfirmLoading = !!props.confirmLoading;
      delete props.confirmLoading;

      if (isObject(props.spin)) {
        props._isSpin = true;
        props.spin.spinning = false;
      } else {
        // undefined 也是 显示spin
        props._isSpin = props.spin !== false;
        props.spin = {
          spinning: false,
        };
      }

      const currentIndex = getCurrentIndex(props) ?? -1;

      const tempModals = [...modals.value];
      if (currentIndex > -1) {
        tempModals.splice(currentIndex, 1, props);
      } else {
        props.key = props.key ?? uniqueId('x-modal');
        tempModals.push(props);
      }

      modals.value = tempModals;
    };

    const update = (props: ModalExtra) => {
      const currentIndex = getCurrentIndex(props);
      if (currentIndex > -1) {
        const tempModals = [...modals.value];
        tempModals[currentIndex] = { ...tempModals[currentIndex], ...props };
        modals.value = tempModals;
      }
    };

    const apis: XModalProvideRef = {
      open,
      update,
    };

    provide(XMODAL_PROVIDER_TOKEN, apis);
    expose(apis);

    return () => {
      const modalList = modals.value.map((item) => {
        const {
          content,
          contentProps,
          onOk,
          _isConfirmLoading = false,
          spin,
          ...modalProps
        } = item;

        const spinProps = spin as SpinProps;

        const { open = true, destroyOnClose = true } = modalProps;

        const updateOpen = (value: boolean) => {
          update({ ...item, open: value });
        };

        const mergedModalProps = {
          'onUpdate:open': updateOpen,
          onOk: async (e: MouseEvent) => {
            if (item._isSpin) {
              spinProps.spinning = true;
            }

            if (_isConfirmLoading) {
              update({ ...item, spin: spinProps, confirmLoading: true });
            }

            const result = await onOk?.(e);

            if (item._isSpin) {
              spinProps.spinning = false;
            }

            if (_isConfirmLoading) {
              update({ ...item, spin: spinProps, confirmLoading: false });
            }

            if (result === true) {
              updateOpen(false);
            }
          },
        };

        const children = isFunction(content)
          ? content()
          : isVNode(content)
            ? cloneVNode(content, contentProps)
            : content;

        return (
          <DraggerModal
            {...modalProps}
            {...mergedModalProps}
            destroyOnClose={destroyOnClose}
            open={open}
          >
            {{
              default: () => <Spin {...spinProps}>{children}</Spin>,
              title: () => {
                return <>{item.title}</>;
              },
            }}
          </DraggerModal>
        );
      });
      return (
        // @ts-expect-error TODO 不在Vue中引入h函数会报错 Using JSX fragments requires fragment factory 'h' to be in scope, but it could not be found.
        <>
          {slots.default?.()}
          {modalList}
        </>
      );
    };
  },
});

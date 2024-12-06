import { Modal, Spin, SpinProps } from 'ant-design-vue';
import { cloneVNode, defineComponent, isVNode, provide, shallowRef } from 'vue';
import { LdModalProvideRef, ModalExtra } from './types';
import { isFunction, isObject } from 'lodash-es';
import { LD_MODAL_PROVIDER_TOKEN } from './token';
import { uniqueId } from '@/utils/util';

export default defineComponent({
  name: 'LdModalProvider',
  setup(_, { slots, expose }) {
    const modals = shallowRef<ModalExtra[]>([]);

    const getCurrentIndex = (props: ModalExtra) => {
      return modals.value.findIndex(
        (item) => item.key === props.key || item.title === props.title,
      );
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
        props.key = props.key ?? uniqueId('ld-modal');
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

    const apis: LdModalProvideRef = {
      open,
      update,
    };

    provide(LD_MODAL_PROVIDER_TOKEN, apis);
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
            item._isSpin && (spinProps.spinning = true);
            _isConfirmLoading &&
              update({ ...item, spin: spinProps, confirmLoading: true });

            const result = await onOk?.(e);

            item._isSpin && (spinProps.spinning = false);
            _isConfirmLoading &&
              update({ ...item, spin: spinProps, confirmLoading: false });

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
          <Modal
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
          </Modal>
        );
      });
      return (
        <>
          {slots.default?.()}
          {modalList}
        </>
      );
    };
  },
});

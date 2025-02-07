import { Directive } from 'vue';

export const dragger: Directive = {
  mounted(el) {
    console.log(el);
    el.style.cursor = 'move';
    // el.onmousedown = (e: MouseEvent) => {};
  },
};

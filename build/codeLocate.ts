// const { parse, compileTemplate } = require('@vue/compiler-sfc');
import { parse, compileTemplate } from 'vue/compiler-sfc';

export function vitePluginCodeLocation() {
  return {
    name: 'vite-plugin-code-location',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.vue')) {
        return null;
      }

      const { descriptor } = parse(code);
      if (descriptor.template) {
        const { code: templateCode } = compileTemplate({
          source: descriptor.template.content,
          id,
          filename: id,
          compilerOptions: {
            nodeTransforms: [
              (node) => {
                if (node.type === 1) {
                  node.props.push({
                    type: 7,
                    name: 'code-location',
                    value: {
                      type: 4,
                      content: id,
                    },
                    loc: {
                      source: '',
                    },
                  });
                }
              },
            ],
          },
        });

        const script = descriptor.script ? descriptor.script.content : '';
        const scriptSetup = descriptor.scriptSetup
          ? descriptor.scriptSetup.content
          : '';
        const newCode = `<script ${descriptor.script?.lang ? `lang="${descriptor.script.lang}"` : ''}>${script}</script>
<script setup ${descriptor.scriptSetup?.lang ? `lang="${descriptor.scriptSetup.lang}"` : ''}>${scriptSetup}</script>
<template>${templateCode}</template>`;
        return {
          code: newCode,
          map: null,
        };
      }
      return null;
    },
  };
}

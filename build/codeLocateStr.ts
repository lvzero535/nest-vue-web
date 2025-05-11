import { Plugin, HtmlTagDescriptor } from 'vite';
import { exec } from 'child_process';
function openFileInVSCode(filePath: string) {
  const command = `code ${filePath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令时出错: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`命令执行的错误输出: ${stderr}`);
      return;
    }
    console.log(`成功使用 VSCode 打开文件: ${filePath}`);
  });
}

// 示例：指定要打开的文件路径

export function codeLocationStr(): Plugin {
  return {
    name: 'transform-file',
    enforce: 'pre',

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.originalUrl === '/api/code-loc') {
          console.log('请求路径：11', req.originalUrl);
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              // 假设 preload 数据在 data.preload 中
              console.log('Preload data:', data);
              const filePath = data.codeLoc;
              if (filePath) {
                openFileInVSCode(filePath);
              }
              // 这里可以进行其他处理，比如返回响应
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Preload data received' }));
            } catch (error) {
              console.error('Error parsing JSON:', error);
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
          });
        } else {
          next();
        }
      });
    },
    transform(code, id) {
      if (id.endsWith('.vue')) {
        const regex = /<template>([\s\S]*)<\/template>/;
        const match = code.match(regex);
        console.log('id:', id);
        if (match) {
          const templateContent = match[1].trim();
          console.log('模板内容：');
          // console.log(templateContent);
          const lines = templateContent.split(/\r?\n/).map((line, index) => {
            return line.replace(/<[a-zA-Z][a-zA-Z0-9-.]*[\s|>]?/g, (match) => {
              console.log(`第 ${index + 1} 行: ${line} ==> ${match}`);
              if (match.includes('code-loc')) {
                return match;
              }
              if (match.includes('<template')) {
                return match;
              }
              if (match.endsWith('>')) {
                return `${match.slice(0, -1)} code-loc="${id}">`;
              }
              return `${match} code-loc="${id}" `;
            });
          });
          // 替换原始模板内容
          const updatedCode = code.replace(
            regex,
            `<template>${lines.join('\n')}</template>`,
          );
          console.log('添加 code-loc 属性后的模板内容：');
          console.log(updatedCode);
          return {
            code: updatedCode,
            map: null,
          };
        }
      }
    },
    transformIndexHtml(): HtmlTagDescriptor[] {
      return [
        {
          tag: 'script',
          children: `
            // 监听 document 的点击事件
            document.addEventListener('click', function (event) {
                // 检查是否按下了 Alt 键
                if (event.altKey) {
                    const target = event.target;
                    // 检查点击的元素是否有 code-loc 属性
                    if (target.hasAttribute('code-loc')) {
                        const codeLocValue = target.getAttribute('code-loc');
                        // 这里假设后端接口地址为 /api/code-loc
                        const apiUrl = '/api/code-loc';
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ codeLoc: codeLocValue })
                        };

                        // 发起请求
                        fetch(apiUrl, requestOptions)
                          .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                          .then(data => {
                                console.log('请求成功:', data);
                            })
                          .catch(error => {
                                console.error('请求出错:', error);
                            });
                    }
                }
            });
    
          `,
        },
      ];
    },
  };
}

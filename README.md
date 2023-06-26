# [Quill Rich Text Edito](https://quilljs.com "Quill Editor")

## Demo

![quill](https://github.com/max12311023/Quill_Editor/assets/24786119/8957e8dd-ac8f-4a39-bfca-c8773f7e2721)

## 用法
       
CDN 包含圖片resize、quill table ui module

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.min.js" type="text/javascript"></script>
<script src="https://unpkg.com/quill-table-ui@1.0.5/dist/umd/index.js" type="text/javascript"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.snow.min.css" rel="stylesheet">
<link href="https://unpkg.com/quill-table-ui@1.0.5/dist/index.css" rel="stylesheet">
<script src="js/quill-resize-module.js"></script>)
 ```
初始化
```js
 var editor = new Quill('#editor', {
        bounds: '#editor',
        modules: {
           resize: {locale: {
                       center: "center",
                              },
                    },
           table: true,
           tableUI: true,
            toolbar: {
                container:'#toolbar-container',
                handlers: {
                'hr': customHrHandler
                }
            }
        },
        placeholder: 'Free Write...',
        theme: 'snow'       
});  
 ```
Custom button
```html
<button id="custom-table">TEST</button>
 ```
```js
var customButton = document.querySelector('#custom-table');
  customButton.addEventListener('click', function() {
  table.insertTable(3, 3);
});
 ```

- 上傳圖片需要透過AJAX寫入後端放置file server or DB 
- 水平線、圖片resize、table需要註冊module 才能實現
- table module 最常見就是table ui、 better-table 

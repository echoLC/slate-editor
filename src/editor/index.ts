import { Editor, Element, NodeEntry, Node, Range, Text, Transforms, Path } from 'slate'

class SlateEditor {
  selector: string

  constructor(selector: string) {
    this.selector = selector

    this.createDom()
  }

  private createDom() {
    const element = document.querySelector(this.selector)

    if (element == null) {
      throw new Error(`找不到选择器为 ${this.selector} 的元素`)
    }

    const toolbar = this.createToolbar()
    const editable = this.createContentEditable()
    element.appendChild(toolbar)
    element.appendChild(editable)
    if (element.className) {
      element.className += ' slate-editor'
    } else {
      element.className = 'slate-editor'
    }
    element.setAttribute('data-slate-editor', 'true')
    element.setAttribute('data-slate-node', 'value')
  }

  private createContentEditable() {
    const div = document.createElement('div')
    div.contentEditable = 'true'
    div.setAttribute('data-slate-editable', 'true')
    div.className = 'slate-editable'

    return div
  }

  private createToolbar() {
    const toolbarList = [
      {
        label: '标题',
        key: 'h',
      },
      {
        label: '加粗',
        key: 'bold',
      },
      {
        label: '插入链接',
        key: 'link',
      },
    ]

    const toolbarContainer = document.createElement('ul')
    toolbarContainer.className = 'slate-toolbar'
    toolbarList.forEach(item => {
      const li = document.createElement('li')
      li.className = 'slate-toolbar-item'
      li.setAttribute('slate-toolbar-item-key', item.key)
      li.innerText = item.label
      toolbarContainer.appendChild(li)
    })
    return toolbarContainer
  }
}

export default SlateEditor

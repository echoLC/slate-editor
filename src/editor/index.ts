import EditorElement, { Element } from '../views/Element'

type EditorOption = {
  initValue?: Element[]
}

class SlateEditor {
  selector: string
  private options: EditorOption | undefined

  constructor(selector: string, options?: EditorOption) {
    this.selector = selector
    this.options = options

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

    if (this.options?.initValue) {
      this.options.initValue.forEach(value => {
        const element = new EditorElement(value)
        div.appendChild(element.$el)
      })
    }

    return div
  }

  private createToolbar() {
    const toolbarList = [
      {
        label: 'H1',
        key: 'h1',
      },
      {
        label: 'H2',
        key: 'h2',
      },
      {
        label: '加粗',
        key: 'bold',
      },
      {
        label: '引用',
        key: 'block-quote',
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

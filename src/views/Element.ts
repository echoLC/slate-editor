import EditorLeaf, { Leaf } from './Leaf'

enum ElementType {
  h1 = 'h1',
  h2 = 'h2',
  paragraph = 'p',
  blockQuote = 'block-quote',
}

export type Element = {
  type: keyof typeof ElementType
  children: Leaf[]
}

class EditorElement {
  value: Element
  $el: HTMLElement

  constructor(value: Element) {
    this.value = value

    this.$el = this.createElement()
  }

  private createElement() {
    const tag = ElementType[this.value.type]
    const element = document.createElement(tag)
    element.setAttribute('data-slate-element', 'true')
    if (this.value.children.length > 0) {
      this.value.children.forEach(child => {
        const leaf = new EditorLeaf(child)
        element.appendChild(leaf.$el)
      })
    }
    return element
  }
}

export default EditorElement

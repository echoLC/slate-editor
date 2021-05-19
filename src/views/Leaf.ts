export type Leaf = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
}

class EditorLeaf {
  value: Leaf
  $el: HTMLElement

  constructor(value: Leaf) {
    this.value = value

    this.$el = this.createLeaf()
  }

  private createLeaf() {
    const span = document.createElement('span')
    span.setAttribute('data-slate-leaf', 'true')
    if (this.value.bold) {
      const b = document.createElement('b')
      b.innerText = this.value.text
      span.appendChild(b)
    } else if (this.value.italic) {
      const i = document.createElement('i')
      i.innerText = this.value.text
      span.appendChild(i)
    } else if (this.value.code) {
      const code = document.createElement('code')
      code.innerText = this.value.text
      span.appendChild(code)
    } else {
      span.innerText = this.value.text
    }

    return span
  }
}

export default EditorLeaf

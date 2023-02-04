import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('child-element')
export class ChildElement extends LitElement {
    static styles = css`
        :host {
        padding: 2rem;
        }
    `

    @property()
    childId: string | undefined

    render() {
        return html`
            <h1>Child Element ${this.childId}</h1>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'child-element': ChildElement
    }
  }
import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import 'router-slot'
import { IRoutingInfo } from 'router-slot';
import { ChildElement } from './child-element';


@customElement('my-element')
export class MyElement extends LitElement {

  @state()
  itemId: string | undefined

  private _routes = [
    {
      path: "home/about",
      component: () => {
        const $div = document.createElement("div");
        $div.innerHTML = `<h1>About</h1>`;
        return $div;
      }
    },
    {
      path: "home/:id",
      resolve: (info: IRoutingInfo) => {
        this.itemId = info.match.params.id
      }
    },
    {
      path: "home",
      component: () => {
        const $div = document.createElement("div");
        $div.innerHTML = `<h1>Home</h1>`;
        return $div;
      }
    },
    {
      path: "child/:id",
      component: ChildElement,
      setup: (component: ChildElement, info: IRoutingInfo) => {
        component.childId = info.match.params.id
      }
    },
    {
      path: "**",
      component: () => {
        const $div = document.createElement("div");
        $div.innerHTML = `<h1>Not Found</h1>`;
        return $div;
      }
    }
  ];

  render() {
    return html`
      <div id="content">
        <nav>
          <ol>
            <li>
              <a href="/home">Home</a>
              <ol>
                <li><a href="/home/about">About</a></li>
                <li><a href="/home/123">Setting itemId=123</a></li>
              </ol>
            </li>
            <li><a href="/child/abc-321">Child Component with id</a></li>
          </ol>
          <p>
            itemId: ${this.itemId}
          </p>
        </nav>
        <router-slot .routes="${this._routes}" @changestate="${(e: CustomEvent) => this.resetItmeId(e)}">
          <h1>Start</h1>
        </router-slot>
      </div>
    `
  }

  private resetItmeId(e: CustomEvent) {
    if (!e?.detail?.match.params.id) {
      this.itemId = ''
    }
  }


  static styles = css`
    :host {
      padding: 2rem;
    }
    #content {
      display:flex;
    }
    nav {
      padding: 2rem;
      flex: 1;
    }
    router-slot {
      padding: 2rem;
      flex: 3;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}

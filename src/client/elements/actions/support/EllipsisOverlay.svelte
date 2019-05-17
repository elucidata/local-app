<script context="module">
  import { observable } from "../../../lib/observables.js";

  export let css = observable("");
  export let content = observable("");
  export let visible = observable(false);
  export let position = observable(null);

  function extractComputedStyles(el, styles) {
    const style = getComputedStyle(el);
    return styles
      .map(name => {
        return `${name}: ${style.getPropertyValue(name)};`;
      })
      .join(" ");
  }

  export function invalidateCSS(source) {
    delete source.dataset.cachedCss;
  }

  export function show(source) {
    let cssText = source.dataset.cachedCss;
    if (!cssText) {
      cssText = extractComputedStyles(source, [
        "padding-left",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "font-family",
        "font-size"
      ]);
      source.dataset.cachedCss = cssText;
    }
    css.set(cssText);
    content.set(source.innerHTML);
    position.set(source.getBoundingClientRect());
    visible.set(true);
  }

  export function hide() {
    visible.set(false);
  }
</script>

{#if $visible}
<div class="overlay" style="top: {$position.top}px; left: {$position.left}px;">
  <div class="content" style={$css}>{@html $content}</div>
</div>
{/if}

<style>
  .overlay {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 9999;
    pointer-events: none;
  }
  .content {
    display: inline-block;
    z-index: 9999;
    color: black;
    background: lightgoldenrodyellow;
    box-shadow: 1px 1px 4px #0003;
  }
</style>
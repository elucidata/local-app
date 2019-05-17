<script context="module">
  import { observable } from "../../../lib/observables.js";

  export let visible = observable(false);
  export let content = observable("");
  export let top = observable(200);
  export let left = observable(200);

  let timer;

  export function show(el, newContent, defer = true) {
    clearTimeout(timer);

    adjust(el, newContent);

    if (defer && !visible.snapshot)
      timer = setTimeout(() => {
        visible.set(true);
      }, 750);
    else visible.set(true);
  }

  export function hide() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      visible.set(false);
    }, 250);
  }

  export function adjust(el, newContent) {
    content.set(newContent);
    const rect = el.getBoundingClientRect();
    top.set(rect.bottom + 4);
    left.set(rect.right - rect.width / 2);
  }
</script>

<script>
  let posLeft, middle, center, container;

  $: if(container) middle = container.offsetWidth / 2
  $: posLeft = ($left - middle) < 0 ? middle : $left
</script>

{#if $visible}
<div class="tooltip" style="top: {$top}px; left: {posLeft}px;">
  <div class="arrow"></div>
  <div bind:this={container} class="content" style="margin-left: -{middle}px;">{$content}</div>
</div>
{/if}


<style>
  .tooltip {
    position: absolute;
    z-index: 999;
    pointer-events: none;
    transition: left ease-in-out 100ms, top ease-out 100ms;
  }

  .content {
    position: relative;
    background: #00000099;
    color: white;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 80%;
    box-sizing: border-box;
  }

  .arrow {
    position: absolute;
    content: "";
    top: -12px;
    width: 0px;
    height: 0px;
    border: 6px solid transparent;
    border-bottom-color: #00000099;
    box-sizing: border-box;
    margin-left: -6px;
  }
</style>
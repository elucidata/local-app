<script context="module">
  import { observable } from "../util/observables";

  let messageList = observable([]);

  /**
   * @param {string} message
   * @param {"info"|"error"|"warning"} type
   */
  export function notify(message, type = "info") {
    messageList.update(msgs => {
      msgs.push({ id: Date.now(), message, type });
    });
  }

  window["notify"] = notify;
</script>

<div class="Notifications">
  {#each $messageList as item (item.id)}
  <div class="box is-{item.type}" transition:slide>
    <div class="body">
      <div class="message">{item.message}</div>
      <div class="btn" on:click={() => remove(item.id)}>
        <CloseIcon rotate />
      </div>
    </div>
  </div>
  {/each}
</div>

<script>
import { slide } from 'svelte/transition'
import CloseIcon from '../elements/icons/Add.svelte'

function remove(id) {
  messageList.update(msgs => msgs.filter(n => n.id != id))
}
</script>

<style>
  .Notifications {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 24px;
    left: 0px;
    right: 0px;
    pointer-events: none;
    z-index: 9999;
  }

  .box {
    padding: 6px;
  }

  .body {
    padding-right: 8px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    pointer-events: initial;
  }
  .box.is-info .body {
    background-color: #0072bbdf;
    /* background-color: LightGoldenRodYellow; */
    color: white;
  }
  .box.is-error .body {
    background-color: crimson;
    color: white;
  }
  .box.is-warning .body {
    background-color: orange;
    color: white;
  }

  .message {
    flex: 1;
    padding: 6px 12px;
    padding-right: 6px;
    width: 25vw;
  }
  .btn {
    cursor: pointer;
    /* transform: rotate(45deg); */
    opacity: 0.4;
  }
  .btn:hover {
    opacity: 0.7;
  }
  .btn:active {
    opacity: 1;
  }
</style>

<main>
  <nav>
    <ul>
      <li><strong>[Local App]</strong></li>
    </ul>
    <span></span>
    <ul>
      <li><a href="#/">Home</a></li>
    </ul>
  </nav>

  <article>
    <Router {routes} />
  </article>
</main>

<script>
  import Router from "svelte-spa-router";
  import routes from './routes.js'
</script>

<style>

  main {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  nav {
    display: flex;
    border-bottom: 1px solid gainsboro;
  }

  nav span {
    flex: 1;
  }

  nav ul {
    display: flex;
    list-style: none;
  }
  nav li {
    padding: 4px 12px;
    flex: 1;
    display: flex;
  }
  nav li a {
    padding: 2px 6px;
    border-radius: 3px;
    flex: 1;
  }

  nav li :global(a.active:hover) {
    text-decoration: none;
  }

  article {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

</style>

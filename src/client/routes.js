import HomeView from './views/home/HomeView.svelte'
import NotFound from './views/404/NotFound.svelte'

export default {
  '/': HomeView,
  '*': NotFound,
}

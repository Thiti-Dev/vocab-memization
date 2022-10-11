<script lang="ts">
	import Router from 'svelte-spa-router'

	import NotFound from "./components/common/NotFound.svelte"
	import Landing from "./components/common/Landing.svelte"
    import Register from './components/hash-routes/register/register.svelte'
    import Login from './components/hash-routes/login/login.svelte'

	const routes = {
		// Exact path
		'/register': Register,
		'/login': Login,

		// Catch-all route last
		'*': location.href.includes('#') ? NotFound : Landing,
	}
	
</script>

<main>
    <Router {routes}/>
</main>
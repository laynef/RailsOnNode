<script>

const redux = /* CLI: Redux */;
window.STORE = redux;

export default class Application {
    el: '#app',
    render: h => h(this),
    state: redux,
    // needs hot reloading
    template: `
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.min.js" async><script>
    `,
}
</script>


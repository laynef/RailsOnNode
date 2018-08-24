<script>
// Route Path
import createStore from '// Redux here';
const redux = createStore(window.STORAGE);

export default class Application {
    el: '#app',
    render: h => h(this),
    state: redux,
    template: `<h1 style="text-align: center;">Hello World</h1>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.min.js" async><script>`,
    // needs hot reloading
}
</script>

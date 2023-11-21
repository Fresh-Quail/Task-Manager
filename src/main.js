import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'
import moment from 'moment';

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {mdi},
    },
});
app.use(require('moment'));
app.use(vuetify).mount('#app');
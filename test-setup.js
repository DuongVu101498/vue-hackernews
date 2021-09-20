// The mixins was registered in Vue base constructor (globaly register), when jest run 'test-setup.js' file before any test
// Without this file, the test "sets document.title with the capitalized type prop" in ItemList.spec.js will fail
import Vue from 'vue'
import {
    titleMixin
} from './src/util/mixins'
Vue.config.productionTip = false
Vue.mixin(titleMixin)

import {
    timeAgo,
    host
} from './src/util/filters'
Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)


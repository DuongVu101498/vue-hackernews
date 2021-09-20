import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ItemList from '../../views/ItemList.vue'
import flushPromises from 'flush-promises'
const localVue = createLocalVue()
localVue.use(Vuex)
//const store = new Vuex.Store(storeConfig)
const $bar = {
    start: jest.fn(),
    finish: jest.fn(),
    fail: jest.fn()
}
const $route = {
    params: {
        type: 'top'
    }
}
const $store = {
    getters:{
        displayItems: []
    },
    dispatch: jest.fn(() => Promise.resolve())
}

test('abc', async () => {
    //jest.spyOn(store, 'dispatch')
    const wrapper = shallowMount(ItemList, {
        mocks: { $bar, $route,$store },
        localVue,
        //store
    })
    await flushPromises()
    expect($bar.start).toHaveBeenCalled()
    expect($store.dispatch).toHaveBeenCalledWith('fetchListData', {
        type: 'top'
    })
    expect($bar.finish).toHaveBeenCalled()
})
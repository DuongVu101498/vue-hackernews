import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import mergeWith from 'lodash.mergewith'



function customizer(objValue, srcValue) {
    if (Array.isArray(srcValue)) {
        return srcValue
    }
    if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
        return srcValue
    }
}

function createStore(overrides) {
    const defaultStoreConfig = {
        getters: {
            displayItems: jest.fn()
        },
        actions: {
            fetchListData: jest.fn(() => Promise.resolve())
        }
    }
    return new Vuex.Store(
        mergeWith(defaultStoreConfig, overrides, customizer)
    )

}

function createWrapper(overrides) {
    const defaultMountingOptions = {
        mocks: {
            $bar: {
                start: jest.fn(),
                finish: jest.fn(),
                fail: jest.fn()
            },
            $route: {
                params: { type: 'top' }
            }
        },
        stubs: {
            RouterLink: RouterLinkStub
        },
        localVue,
        store: createStore()
    }
    return shallowMount(
        ItemList,
        mergeWith(
            defaultMountingOptions,
            overrides,
            customizer
        )
    )
}
const localVue = createLocalVue()
localVue.use(Vuex)
describe('ItemList.vue', () => {

    test('renders an Item with data for each item in displayItems', () => {
        const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
        const store = createStore({
            getters: {
                displayItems: () => items
            }
        })
        const wrapper = createWrapper({ store })
        const Items = wrapper.findAllComponents(Item)
        expect(Items).toHaveLength(items.length)
        Items.wrappers.forEach((wrapper, i) => {
            expect(wrapper.vm.item).toBe(items[i])
        })

    })

    test('calls $bar start on load', () => {
        const wrapper = createWrapper()
        expect(wrapper.vm.$bar.start).toHaveBeenCalled()
    })
    test('calls $bar finish when load successful', async () => {
        expect.assertions(1)
        const wrapper = createWrapper()
        await flushPromises()
        expect(wrapper.vm.$bar.finish).toHaveBeenCalled()
    })
    test('dispatches fetchListData with $route.params.type', async () => {
        expect.assertions(1)
        const store = createStore()
        store.dispatch = jest.fn(() => Promise.resolve())
        const wrapper = createWrapper({ store })
        await flushPromises()
        expect(store.dispatch).toHaveBeenCalledWith('fetchListData', { type: wrapper.vm.$route.params.type })
    })

    test('calls $bar fail when fetchListData throws', async () => {
        expect.assertions(1)
        const store = createStore({
            actions: { fetchListData: jest.fn(() => Promise.reject()) }
        })
        const wrapper = createWrapper({ store })
        await flushPromises()
        expect(wrapper.vm.$bar.fail).toHaveBeenCalled()
    })
    test('renders 1/5 when on page 1 of 5', () => {
        const store = createStore({
            getters: {
                maxPage: () => 5
            }
        })
        const wrapper = createWrapper({ store })
        expect(wrapper.text()).toContain('1/5')
    })
    test('calls $router.replace when the page parameter is greater than the max page count',
        async () => {
            expect.assertions(1)
            const store = createStore({
                getters: {
                    maxPage: () => 5
                }
            })
            const mocks = {
                $route: {
                    params: {
                        page: '1000'
                    }
                },
                $router: {
                    replace: jest.fn()
                }
            }
            createWrapper({ mocks, store })
            await flushPromises()
            expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1')
        })
    test('renders a RouterLink with the previous page if one exists', () => {
        const mocks = {
            $route: {
                params: { page: '2' }
            }
        }
        const wrapper = createWrapper({ mocks })
        expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/top/1')
        expect(wrapper.findComponent(RouterLinkStub).text()).toBe('< prev')
    })
    test('renders a RouterLink with the next page if one exists', () => {
        const store = createStore({
            getters: {
                maxPage: () => 3
            }
        })
        const mocks = {
            $route: {
                params: { page: '1' }
            }
        }
        const wrapper = createWrapper({ store, mocks })
        expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/top/2')
        expect(wrapper.findComponent(RouterLinkStub).text()).toBe('more >')
    })
    test('renders a RouterLink with the next page when no page param exists', () => {
        const store = createStore({
            getters: {
                maxPage: () => 3
            }
        })
        const wrapper = createWrapper({
            store
        })
        expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/top/2')
        expect(wrapper.findComponent(RouterLinkStub).text()).toBe('more >')
    })

    test('renders an <a> element without an href if there are no previous pages', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('a').attributes().href).toBe(undefined)
        expect(wrapper.find('a').text()).toBe('< prev')
    })
    test('renders an <a> element without an href if there are no next pages', () => {
        const store = createStore({
            getters: {
                maxPage: () => 1
            }
        })
        const wrapper = createWrapper({ store })
        expect(wrapper.findAll('a').at(1).attributes().href).toBe(undefined)
        expect(wrapper.findAll('a').at(1).text()).toBe('more >')
    })
    test('sets document.title with the capitalized type prop', () => {
        createWrapper({
            mocks: {
                $route: { params: { type: 'top' } }
            }
        })
        expect(document.title).toBe('Vue HN | Top')
    })
})


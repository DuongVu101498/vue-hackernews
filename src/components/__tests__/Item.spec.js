import Item from '../Item.vue'
import { shallowMount } from '@vue/test-utils'
describe('Item.vue', () => {
    test('renders  item.author, item.score', () => {
        const item = {
            by: 'John', //author
            score: 10
        }
        const wrapper = shallowMount(Item, {
            propsData: { item }
        })
        expect(wrapper.text()).toContain(item.by)
        expect(wrapper.text()).toContain(item.score)
    })
    test('renders a link to the item.url with item.title as text',
        () => {
            const item = {
                url: 'http://some-url.com',
                title: 'some-title'
            }
            const wrapper = shallowMount(Item, {
                propsData: { item }
            })
            const a = wrapper.find('a')
            expect(a.text()).toBe(item.title)
            expect(a.attributes().href).toBe(item.url)
        })
    test('renders the time since the last post', () => {
        const dateNow = jest.spyOn(Date, 'now')
        const dateNowTime = new Date('2018')
        dateNow.mockImplementation(() => dateNowTime)
        const item = {
            time: (dateNowTime / 1000) - 600
        }
        const wrapper = shallowMount(Item, {
            propsData: {
                item
            }
        })
        dateNow.mockRestore()
        expect(wrapper.text()).toContain('10 minutes ago')
    })
    test('renders the hostname', () => {
        const item = {
            url: 'https://www.some-url.com/with-paths'
        }
        const wrapper = shallowMount(Item, {
            propsData: {
                item
            }
        })
        expect(wrapper.text()).toContain('(some-url.com)')
    })
    
    // snapshot test
    test('renders correctly', () => {
        const dateNow = jest.spyOn(Date, 'now')
        const dateNowTime = new Date('2019')
        dateNow.mockImplementation(() => dateNowTime)
        const item = {
            by: 'eddyerburgh',
            id: 11122233,
            score: 10,
            time: (dateNowTime / 1000) - 600,
            title: 'vue-test-utils is released',
            type: 'story',
            url: 'https://vue-test-utils.vuejs.org/',
            type: 'top'
        }
        const wrapper = shallowMount(Item, {
            propsData: {
                item
            }
        })
        dateNow.mockRestore()
        debugger 
        expect(wrapper.element).toMatchSnapshot()
    })
    test('renders correctly as job', () => {
        const dateNow = jest.spyOn(Date, 'now')
        const dateNowTime = new Date('2019')
        dateNow.mockImplementation(() => dateNowTime)
        const item = {
            by: 'eddyerburgh',
            id: 11122233,
            score: 10,
            time: (dateNowTime / 1000) - 600,
            title: 'vue-test-utils is released',
            type: 'story',
            url: 'https://vue-test-utils.vuejs.org/',
            type: 'job'
        }
        const wrapper = shallowMount(Item, {
            propsData: {
                item
            }
        })
        dateNow.mockRestore()
        expect(wrapper.element).toMatchSnapshot()
    })


})
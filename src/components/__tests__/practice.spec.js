import { shallowMount } from '@vue/test-utils'
import TestComponent from './TestComponent.vue'
import TestComponent2 from './TestComponent2.vue'
import TestComponent3 from './TestComponent3.vue'
import Child from "./Child.vue"
describe('TestComponen.vue', () => {
    test('render Child component correct test-prop = "some-value:"', () => {
        const wrapper = shallowMount( TestComponent )
        // cach 1
        const child_list = wrapper.findAllComponents(Child)
        expect(child_list.length).toBeGreaterThan(0)
        expect(child_list.at(0).props().testProp).toBe('some-value')

        // cach 2
        const child=wrapper.findComponent(Child)
        expect(child.exists()).toBe(true)
        expect(child.props().testProp).toBe('some-value')
    })
})
describe('TestComponen2.vue', () => {
    test('<a> tag has an href with the value of https://google.com', () => {
        const wrapper = shallowMount( TestComponent2 )
        expect(wrapper.find('a').attributes().href).toBe('https://google.com')
    })
})
describe('TestComponen3.vue', () => {
    test('<p> tag has a color style with the value of red', () => {
        const wrapper = shallowMount( TestComponent3 )
        expect(wrapper.find('p').element.style.color).toBe('red')
    })
})
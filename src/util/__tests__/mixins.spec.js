import { mount } from '@vue/test-utils'
import { titleMixin } from '../mixins'
// methods in mixins use 'this' variable , 'this' according to some context (current vue component instance)
// so to be able to test mixins, we need to provide context
// Meaning we need to mount a component that use the mixins.
// Keep the component at minimal configuration, just enough for mixins to work correctly
// 
// Note: remove all line "mixins: [titleMixin]" in this file, all these test still pass because,
// the mixins was registered in Vue base constructor (globaly register), when jest run 'test-setup.js' file before any test
describe('titleMixin', () => {
    beforeEach(() => {
        document.title = 'some title'
    })
    test('set document.title using component title property', () => {
        const Component = {
            render() { },
            title: 'dummy title',
            mixins: [titleMixin]
        }
        mount(Component)
        expect(document.title).toBe('Vue HN | dummy title')
    })
    test('does not set document.title if title property does not exist', () => {
        const Component = {
            render() { },
            mixins: [titleMixin]
        }
        mount(Component)
        expect(document.title).toBe('some title')
    })
    test(' sets document.title using result of title if it is a function ', () => {
        const Component = {
            render() { },
            data() {
                return {
                    titleValue: 'another dummy title'
                }
            },
            title() {
                return this.titleValue
            },
            mixins: [titleMixin]
        }
        mount(Component)
        expect(document.title).toBe('Vue HN | another dummy title') 
    })

})
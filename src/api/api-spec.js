// this file check API call to real server, to run change file name from "api-spec.js" to "api.spec.js"
import { fetchListData } from './api'
//import flushPromises from 'flush-promises'
describe('api', () => {
    test('return array and contain some data', async() =>  {
        //expect.assertions(1)
        const type = 'top'
        var Items
        expect(Items).toBeUndefined()
        Items = await fetchListData(type)
        //Items =  fetchListData(type)
        //await flushPromises()  // dùng flushPromises ở đây không đồng bộ hóa được ???
        expect(Items).toBeInstanceOf(Array)
        expect(Items.length).toBeGreaterThan(0)
        //expect(Items.slice(0, 1)).toBe([])
        //expect(Items[0]).toBe({})
    })
})
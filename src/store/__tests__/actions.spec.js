import actions from '../actions'
import { fetchListData } from '../../api/api'
import flushPromises from 'flush-promises'
jest.mock('../../api/api')
describe('actions', () => {
    test('fetchListData calls commit with the result of fetchListData',
        async () => {
            //expect.assertions(2)
            const items = [{}, {}]
            const type = 'top'
            
            fetchListData.mockImplementationOnce(calledWith => {
                return calledWith === type
                    ? Promise.resolve(items)
                    : Promise.resolve()
            })
            /*
            fetchListData.mockImplementationOnce( calledWith => {
                return calledWith === type
                    ?  new Promise((resolve, reject) => {
                        setTimeout(() => {
                          resolve(items);
                        }, 300);
                      })
                    : Promise.resolve()
            })*/
            const context = {
                commit: jest.fn()
            }
            actions.fetchListData(context, { type })
            await flushPromises()
            expect(fetchListData).toBeCalledWith(type)
            expect(context.commit).toHaveBeenCalledWith('setItems', { items })
        })
})

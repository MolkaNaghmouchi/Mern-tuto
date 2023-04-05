import { useReducer } from 'react';
/**
 * combine reducer functionality into one 'store' and one dispatch function
 * @param  {...function} reducers any number of reducer functions to combine; should have prototype (state, action) => {}
 */
export default function useReducers(...reducers) {
    let dispatches = []
    const store = Object.assign(...reducers.map(reducer => {
        const [state, dispatch] = useReducer(reducer);
        dispatches.push(dispatch);
        return {[reducer.name]: state};
    }))
    const dispatchAll = async (action) => {
        dispatches.forEach(d => d(action));
    }
    return [store, dispatchAll]
}

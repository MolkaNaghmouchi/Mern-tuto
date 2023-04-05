# useReducers
A React Hook to combine multiple reducers (similar to Redux's `combineReducers`)

React Hooks is here and it's awesome. React have provided a `useReducer` function with Hooks to use Redux-style reducer logic with Hooks. However, Redux also has a convenient `combineReducers` function which provides a dispatch which sends each action through all reducers so that one action can impact many parts of the state tree.

`useReducers` is an implementation of this functionality using React Hooks and the `useReducer` hook. 

Usage: 
```
const TestComponent = () => {
  function reducer1() {console.log('reducer 1 fired!');}
  function reducer2() {console.log('reducer 2 fired!');}

  [store, dispatch] = useReducers(reducer1, reducer2);

  useEffect(dispatch({}), []);
  
  return (
    <div />
  );
}
```
Output: 
```
reducer 1 fired!
reducer 2 fired!
```

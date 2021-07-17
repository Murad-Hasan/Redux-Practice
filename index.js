const redux = require('redux');
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;


//action on Redux
//action is an object that has a type property
//an action creator is a function that returns an function
//action only describes what to do, not how to do it
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM'

//action Creator
function buyCake() {
    return {
        type: BUY_CAKE,
        info:'Cakes'
    };
}
function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info:'iceCream'
    };
}


//reducer on Redux
//reducer describes how to update state
//reducer is a function that accepts previous state and action as arguments, and returns next/new state
//(previousState, action) => nextState

// const initialState = {   //example of single reducer
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

// const reducer = (state = initialState, action) => { //example of single reducer
//     switch (action.type) {
//         case BUY_CAKE:
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes - 1
//             };
//         case BUY_ICECREAM:
//             return {
//                 ...state,
//                 numOfIceCreams: state.numOfIceCreams - 1
//             };
//         default:
//             return state;
//     }
// }



//combine Reducer


const cakesInitialState = {
    numberOfCakes : 10
}
const iceCreamInitialState = {
    numbersOfIceCream : 20
}

const cakeReducer = (state= cakesInitialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                    ...state,
                    numberOfCakes: state.numberOfCakes - 1
                    }
        default:
            return state;
    }
}

const iceCreamReducer = (state= iceCreamInitialState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                    ...state,
                    numbersOfIceCream: state.numbersOfIceCream - 1
                    }
        default:
            return state;
    }
}



// store on Redux
// one store for all reducers
// Responsibilities:
// holds application state
// allows access to state vai getState()
// allows state to be updated via dispatch(action)
// registers listeners vai subscribe(listener)
// handles unregistering listeners via unsubscribe(listener)

const rootReducer = combineReducer ({   //example for combine reducers
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer);    // use only reducer as a parameter when you use single reducer & rootReducer for combineReducer
console.log('initial state', store.getState());
store.subscribe (() => console.log('Update state', store.getState()));
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
store.dispatch(buyIceCream())

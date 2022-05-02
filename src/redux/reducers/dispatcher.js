import store from "../store/store";

const Dispatcher = (func, data) => new Promise((resolve, reject) => {
    
    store.dispatch(func(data));
    resolve();

})

export default Dispatcher;
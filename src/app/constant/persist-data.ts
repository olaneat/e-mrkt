export const loadState = (): {cart?:any, user?:any}| undefined =>{
    try{
        const serializedState = localStorage.getItem('reduxState');
        console.log(serializedState, 'state data')
        if(serializedState===null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        return undefined
    }
};


export const saveState = (state:{cart:any, user:any})=>{
    try{
        const stateToPersist = {
            cart:state.cart,
            user: state.user
        }
        const serializedState = JSON.stringify(stateToPersist);
        localStorage.setItem('reduxState', serializedState);

    }catch(err){
        console.log(err, 'err')
    }
}
export const loadState = (): {cart?:any}| undefined =>{
    try{
        const serializedState = localStorage.getItem('reduxState');
        if(serializedState===null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        return undefined
    }
};


export const saveState = (state:{cart:any})=>{
    try{
        const stateToPersist = {
            cart:state.cart
        }
        const serializedState = JSON.stringify(stateToPersist);
        localStorage.setItem('reduxState', serializedState);

    }catch(err){
        console.log(err, 'err')
    }
}
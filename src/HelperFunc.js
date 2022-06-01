const random = (arr_old) => {
    let arr = [...arr_old];
    const newArr = [];
    let length =  arr.length;
    for(let i=0; i< length; i++) {
        const index = Math.floor(Math.random() * arr.length);
        newArr.push(arr[index]);
        arr.splice(index, 1);
    }
    return newArr ;
}

export default random;
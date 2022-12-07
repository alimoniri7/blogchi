const dateSeprator= (stringDate, temp ,temp1)=>{
    console.log(stringDate);
    let dateStr = stringDate.replaceAll('T' , '-').replaceAll('.' , '-').split('-')
    temp = dateStr.pop()
    temp1 = dateStr.pop()
    let dateNum = dateStr.map(date=> Number(date))
    return dateNum;
    
}

export default dateSeprator
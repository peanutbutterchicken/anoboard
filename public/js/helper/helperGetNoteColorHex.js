export default function getNoteColorHex(strColor){
    return (strColor === 'yellow') ? '#FEF9C3' :
        (strColor === 'blue') ? '#E1F5FE' : 
        (strColor === 'green') ? '#F1F8E9' :
        (strColor === 'red') ? '#FCE4EC' : 
        (strColor === 'purple') ? '#E8EAF6' : '';
}
interface  KeyPair<T, U>{
    name:  string;
    key:  T;
    value:  U;
}

let kv1: KeyPair<number,string>  = {name: "iman",key : 123,value:"iman"};
let kv2: KeyPair<number,number> =  {name: "iman",key:1, value:123};

interface  proc<T,U>
{
    (key: T, val:U): void;
}
type  ContactName  = string

interface Contact{
    id: number;
    name:  ContactName;
}

interface  ContactUser
{
    id: number;
    name:  ContactName;
    mobile:  string;
    age:  number;
}


function clone<T1,T2 extends T1>(source:  T1):  T2
{
     return Object.apply({},source);
}

const  a: Contact = {id:  123, name: "Iman Madaeny"};
const b = clone<Contact,ContactUser>(a);

const  dateRange  = {startDate:  Date.now(), endDate: Date.now()};
const dateRangeCopy  = clone(dateRange);
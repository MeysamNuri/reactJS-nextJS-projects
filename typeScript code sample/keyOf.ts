type ContactName  = string
type ContactStatusAlias  = "active" |  "inactive"  |  "new";
type contactBirthDate = Date | number | string;

interface Contact {
    id: number;
    name:  ContactName;
    birthDate?: contactBirthDate ;
    status?: ContactStatusAlias;
    email?:  string;
}

let myContact:  Contact  =  {
    id:  123,
    name:  "Iman",
    status  :  "active"
}

type ContactFields  = keyof Contact;

const field: ContactFields = "email";

function getValue<T,U  extends keyof T>(source:  T,propertyName: U)
{
    return  source[propertyName];
}

const  value  = getValue({name:  "iman",age:  23},"name");


type  ContactName  = string

enum  ContactStatus
{
    Active = "active",
    Inactive =  "inactive",
    New  =  "new"
}

type ContactStatusAlias  = "active" |  "inactive"  |  "new";

type contactBirthDate = Date | number | string;

let myContact:  Contact  =  {
    id:  123,
    name:  "Iman",
    status  :  "new"
}

interface Contact {
    id: number;
    name:  ContactName;
    birthDate?: contactBirthDate ;
    status?: ContactStatusAlias;
}

interface Address {
    line1: string;
    province: string;
    region: string;
}

type AddressWithContact =  Contact  & Address;



function getBirthDate(contact:  Contact)
{
    if(typeof  contact.birthDate ===  "number")
    {
        return new  Date(contact.birthDate);
    }  
    else  if(typeof contact.birthDate  ===  "string")
    {
        return  Date.parse(contact.birthDate);
    }
    else
    {
        return  contact.birthDate;
    }
}

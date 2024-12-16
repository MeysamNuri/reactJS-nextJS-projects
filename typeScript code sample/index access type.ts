
type ContactStatusAlias = "active" | "inactive" | "new";

interface Contact {
    id: number;
    name: string;
    status?: ContactStatusAlias;
    address: Address;
}

interface Address {
    street: string;
    province: string;
    postalCode: string;
    city: City;
}

interface City {
    cityId: Contact["id"];
    cityName: string;
    cityCode: string;
}

type myType = Contact["address"]["street"];
type MyCityType = Contact["address"]["city"]["cityName"];

type Test = Contact["name"];


interface ContactEvent {
    contactId: Contact["id"];
}

interface ContactStatusChangeEvent extends ContactEvent {
    oldStatuse: Contact["status"];
    newStatuse: Contact["status"];
}
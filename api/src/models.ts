export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    imageUrl: string;
    availableQuantity: number;
    price: number;
}

export interface Quote {
    paymentMethod: string;
    numberOfPayments: number;
    phoneNumber: number;
    carId: number;
}

export interface HookedCar {
    clientId: string;
    id: number;
}

export interface User {
    name: string;
    email: string;
    password: string;
    hooked_cars: HookedCar[] | null;
}
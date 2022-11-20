export class Viaje {
    id: number;
    conductor: string;
    capacidad: string;
    precio: number;
    destino: string;
    lng: number;
    lat: number;
    vehiculo: Vehiculo;

}
export class Vehiculo{ 
    patente: string;
    capacidad : number;
    nombre: string;
    dueno: string;
}

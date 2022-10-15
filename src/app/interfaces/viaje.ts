export interface Viaje {
    strconductor: String;
    strdestino: string;
}


export interface respuestaCredenciales{
    alumnos : Credenciales[];
}

export interface Credenciales{
    id: Number;
    nombre: String;
    username: String;
    password: String;    
        
    
}
class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(p => p.id === id)[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(p => p.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(p => p.id !== id);
        return personaBorrada;
    }

    // filtrar usuarios que cincidan 'literal' con un textode busqueda en una sala determinada  
    filtrarPesonasPorTexto(txtFiltro, sala) {
        // si la busqueda esen blanco retornar listado general de usuarios en la sala
        if (txtFiltro === '') return this.getPersonasPorSala(sala);

        //obtener las personas de la sala a filtrar
        let personasPorSala = this.getPersonasPorSala(sala);

        //si hay un texto de busqueda usarlo para filtrar y retornar el array
        let personasFiltradas = personasPorSala.filter(persona => persona.nombre.toLowerCase().includes(txtFiltro.toLowerCase()));
        return personasFiltradas;
    }
}

module.exports = {
    Usuarios
}
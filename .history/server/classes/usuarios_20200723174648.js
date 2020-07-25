class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre) {
        let persona = {
            id,
            nombre
        };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(p => p.id === id)[0];

        return persona;
    }
}

module.exports = {
    Usuarios
}
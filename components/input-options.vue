<template>
    <div class="form-row">
        <label :for="tipo">{{ tipo }}</label>
        <select @value="updateValue" :id="tipo" required>
            <option value="" disabled selected hidden>Seleziona uno studente</option>
            <option v-for="studente in studenti" :key="studente.id" :value="studente.id">
                {{ studente.nome }} {{ studente.cognome }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        tipo: String,
        studenti: Array
    },
    methods: {
        updateValue(event) {
            // validazione: faccio questa serie in if per controllare se il value esiste evitando che all'utente crashi la pagina
            if(!event && !event.target && !event.target.value) return 
            this.$emit('input', event.target.value);
            console.log("Evento: ", event.target.value)
        }
    }
}
</script>

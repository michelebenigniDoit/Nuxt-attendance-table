<template>
    <div class="form-row">
        <label :for="tipo">{{ tipo }}</label>
        <input type="datetime-local" :id="tipo" @value="updateValue" required />
    </div>
</template>

<script>
export default {
    props: {
        tipo: String
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

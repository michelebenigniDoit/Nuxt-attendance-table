<template>
        <label>{{ tipo }}</label>
        <input :type="tipo" @input="updateValue" required />
</template>

<script>
export default { 
    props: {
        tipo: String,
    },
    methods: {
        updateValue(event){
            this.$emit('input', event.target.value);
        }
    }
}
</script>
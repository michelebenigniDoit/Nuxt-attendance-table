<template>
    <div>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Entrata</th>
          <th>Uscita</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="presenza in presenze" :key="presenza.id">
          <td v-if="presenza && presenza.studente && presenza.studente.nome">{{ presenza.studente.nome }}</td>
          <td v-if="presenza && presenza.studente && presenza.studente.cognome">{{ presenza.studente.cognome }}</td>
          <td>{{ $formatDateHour(presenza.entrata) }}</td>
          <td>{{ $formatDateHour(presenza.uscita) }}</td>
          <!-- <td><button-custom nome="Modifica"  @click="modificaPresenza(presenza.id)"/></td> -->
          <td><button-custom nome="Modifica"  @click="modificaPresenza(presenza.id)"/>&nbsp;&nbsp;&nbsp;
          <button-custom nome="Cancella"  @click="cancellaPresenza(presenza.id)"/></td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script>
/* const { $formatDateHour } = useNuxtApp(); */
export default {
  props: {
    presenze: Array
  },
  methods:{
    modificaPresenza(id){
        this.$emit('modificaPresenza', id);
    },
    cancellaPresenza(id){
        this.$emit('cancellaPresenza', id);
        console.log("Cancella: ", id)
    },
  }
};
</script>
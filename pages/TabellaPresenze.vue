<template>
  <div>
    <Navbar :namepage="'Tabella Presenze'"/>
        <!-- Form per la creazione di una nuova presenza -->
        <form @submit.prevent="createPresenza" class="form-presenza">
          <h2 class="form-title">Nuova Presenza</h2>
          <div class="form-horizontal form-row">
          <input-options tipo="Studente" :studenti="studenti" @input="setStudente" />
          <input-datetime tipo="Entrata" @input="setEntrata" />
          <input-datetime tipo="Uscita" @input="setUscita" />
          <button type="submit">Crea Presenza</button>
          </div>
        </form>

    <!-- <h1>Tabella Presenze</h1> -->
    <TabellaPresenze :presenze="presenze" @modificaPresenza="modificaPresenza" @cancellaPresenza="cancellaPresenza" />



    <!-- Form per la modifica di una presenza esistente -->
    <transition name="modal">
      <div class="modal" v-if="modificaPresenzaData.id">
        <h2>Modifica Presenza</h2>
        <form @submit.prevent="salvaModificaPresenza">
          <!-- <h2 v-if="modificaPresenzaData.id">Modifica Presenza</h2> -->
            <label for="entrata-mod">Entrata</label>
            <input type="datetime-local" v-model="modificaPresenzaData.entrata" id="entrata-mod"  />

            <label for="uscita-mod">Uscita</label>
            <input type="datetime-local" v-model="modificaPresenzaData.uscita" id="uscita-mod"  />

            <button type="submit">Salva Modifiche</button>
          <button @click="chiudiModificaPresenza">Annulla</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      presenze: [],
      studenti: [],
      selectedStudente: null,
      entrata: '',
      uscita: '',
      modificaPresenzaData: {
        id: null,
        studenteId: null,
        entrata: '',
        uscita: '',
      },
    };
  },
  async mounted() {
    try {
      const token = Cookies.get('access_token');
      if (token) {
        // Includi il token nell'header "Authorization" delle richieste
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      // Carica le presenze e gli studenti
      await this.loadPresenze();
      await this.loadStudenti();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    setEntrata(event){
      if(!event && !event.target && !event.target.value) return 
      this.entrata=event.target.value
      console.log("Entrata: ", event.target.value)
    },
    setUscita(event){
      if(!event && !event.target && !event.target.value) return 
      this.uscita=event.target.value
      console.log("Uscita: ", event.target.value)
    },
    setStudente(event){
      if(!event && !event.target && !event.target.value) return 
      this.selectedStudente=event.target.value
      console.log("Studente: ", event.target.value)
    },
    async loadPresenze() {
      const response = await axios.get('http://localhost:4000/tabella-presenze');
      this.presenze = response.data;
      this.studenti = response.data;
      console.log("Presenze: ",this.presenze)
    },
    async loadStudenti() {
      const response = await axios.get('http://localhost:4000/studenti');
      this.studenti = response.data;
    },
    async createPresenza() {
      try {
        const token = Cookies.get('access_token');
        if (token) {
          // Includi il token nell'header "Authorization" delle richieste
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // Invia la richiesta per creare una nuova presenza
        await axios.post('http://localhost:4000/tabella-presenze', {
          studenteId: this.selectedStudente,
          entrata: this.entrata,
          uscita: this.uscita,
        });

        // Aggiorna la lista delle presenze
        await this.loadPresenze();
        await this.loadStudenti();

        alert('Presenza creata con successo!');
      } catch (error) {
        console.error(error);
        alert('Si è verificato un errore durante la creazione della presenza.');
      }
    },

    async cancellaPresenza(presenzaId) {
      console.log("Cancella2: ", presenzaId)
        try {
          const token = Cookies.get('access_token');
          if (token) {
            // Includi il token nell'header "Authorization" delle richieste
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }

          // Invia la richiesta per cancellare la presenza con l'id specificato
          await axios.delete(`http://localhost:4000/tabella-presenze/${presenzaId}`);

          // Aggiorna la lista delle presenze
          await this.loadPresenze();
          await this.loadStudenti();
          

        } catch (error) {
          console.error(error);
          alert('Si è verificato un errore durante la cancellazione della presenza.');
        }
      },

      async modificaPresenza(presenzaId) {
        try {
          // Trova la presenza selezionata nell'array delle presenze
          const presenza = this.presenze.find((p) => p.id === presenzaId);
          if (presenza) {
            // Imposta i dati della presenza da modificare
            this.modificaPresenzaData.id = presenza.id;
            this.modificaPresenzaData.studenteId = presenza.studente.id;
            this.modificaPresenzaData.entrata = presenza.entrata;
            this.modificaPresenzaData.uscita = presenza.uscita;
          }
        } catch (error) {
          console.error(error);
          alert('Si è verificato un errore durante la modifica della presenza.');
        }

      },
      

      async salvaModificaPresenza() {
        try {
          const token = Cookies.get('access_token');
          if (token) {
            // Includi il token nell'header "Authorization" delle richieste
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }

          // Invia la richiesta per salvare le modifiche della presenza
          await axios.put(`http://localhost:4000/tabella-presenze/${this.modificaPresenzaData.id}`, {
            studenteId: this.modificaPresenzaData.studenteId,
            entrata: this.modificaPresenzaData.entrata,
            uscita: this.modificaPresenzaData.uscita,
          });

          // Reimposta i dati di modificaPresenzaData per nascondere il form di modifica
          this.modificaPresenzaData.id = null;
          this.modificaPresenzaData.studenteId = null;
          this.modificaPresenzaData.entrata = '';
          this.modificaPresenzaData.uscita = '';

          // Aggiorna la lista delle presenze
          await this.loadPresenze();
          await this.loadStudenti();

          alert('Presenza modificata con successo!');
        } catch (error) {
          console.error(error);
          alert('Si è verificato un errore durante il salvataggio delle modifiche della presenza.');
        }
      },

    /* formatDateTime(dateTime) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateTime).toLocaleString(undefined, options);
    }, */
  },
};
</script>


<style>
  
</style>






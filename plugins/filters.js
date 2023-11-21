export default defineNuxtPlugin(() => {
    return {
        provide: {
             formatDateHour: (value) =>{ return new Date(value).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' })}
        }
    }
})

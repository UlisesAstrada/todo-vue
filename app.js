const app = new Vue({
  el: '#app',
  data: {
    title: 'GYM con Vue!',
    activities: [],
    newActivity: ''
  },
  methods: {
    addActivity() {
      if(this.newActivity === '') {
        Swal.fire({
          icon: 'error',
          text: 'Add an activity first'
        })
      } else {
        this.activities.push(
          {name: this.newActivity, state: false}
        );
        this.newActivity = '';
        localStorage.setItem('gymLocal', JSON.stringify(this.activities))
      }
    },
    activityDone(index) {
      this.activities[index].state = true
      localStorage.setItem('gymLocal', JSON.stringify(this.activities))
    },
    pendingActivity(index) {
      this.activities[index].state = false
      localStorage.setItem('gymLocal', JSON.stringify(this.activities))
    },
    deleteActivity(index) {
      Swal.fire({
        title: 'Wait!',
        text: 'Do you really want to delete the activity?',
        icon: 'warning',
        confirmButtonColor: 'green',
        confirmButtonText: 'YES',
        denyButtonText: 'NO',
        denyButtonColor: 'red',
        showDenyButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          this.activities.splice(index, 1)
          localStorage.setItem('gymLocal', JSON.stringify(this.activities))
        } else if(result.isDenied) {
            localStorage.setItem('gymLocal', JSON.stringify(this.activities))
        }
      })
    }
  },
  created() {
    let datosDB = JSON.parse(localStorage.getItem('gymLocal'))
    datosDB === null ? this.activities = [] : this.activities = datosDB
  }
})
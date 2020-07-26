<template>
  <v-data-table
    :headers="headers"
    :items="appointments"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {text: 'First Name', value: 'fName'},
                {text: 'Last Name', value: 'lName'},
                {text: 'Email', value: 'email'},
                {text: 'Phone Number', value: 'phoneNo'},
                {text: 'Token Number', value: 'tokenNo'},
                {text: 'Date', value: 'date'},
                {text: 'Status', value: 'status'}
            ],
            appointments: [
              {
                fName: 'Adarsh',
                lName: 'Vijay',
                email: 'blads@fdsf.com',
                phoneNo: '9454353424',
                tokenNo: '1',
                date: '25th August 2020',
                status: 'Pending'
              }
            ]
            
        }
    }
}
</script>

<style>
</style>
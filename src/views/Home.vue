<template>
  <v-row>
    <v-col cols="12" class="my-5 b">
      <v-card style="margin: 0 100px; padding: 20px;">
        <v-row justify="space-around">
          <v-col cols="4">
            <span class="caption grey--text text--darken-2" style="line-height: 0.01rem;">Your Name</span>
            <br />
            <span
              class="text-h5"
              style="line-height: 1.5rem !important;"
            >{{consultee.first_name + ' ' + consultee.last_name}}</span>
          </v-col>
          <v-col cols="4">
            <span class="caption grey--text text--darken-2" style="line-height: 0.01rem;">Your Email</span>
            <br />
            <span class="text-h5" style="line-height: 1.5rem !important;">{{consultee.email}}</span>
          </v-col>
          <v-col cols="3">
            <span class="caption grey--text text--darken-2" style="line-height: 0.01rem;">Phone No</span>
            <br />
            <span class="text-h5" style="line-height: 1.5rem !important;">{{consultee.phone_no}}</span>
          </v-col>
        </v-row>
      </v-card>
      <v-divider class="mt-5" />
    </v-col>
    <v-col cols="12">
      <span class="text-overline mx-5" style="font-size: 2rem !important;">Consultants</span>
    </v-col>
    <v-col cols="1"></v-col>
    <v-col cols="7">
      <v-container v-for="consultant in consultants" :key="consultant._id">
        <Profile @bookClick="bookModalShow(consultant)" :profile="consultant" />
        <v-divider />
      </v-container>
    </v-col>
    <v-divider vertical />
    <v-col cols="3"></v-col>
    <v-overlay :value="book_modal">
      <v-card style="width: 60vw; margin: 0 100px; padding: 20px;" class="white" light>
        <v-col cols="12">
          <v-row justify="end">
            <v-icon @click="book_modal=false">mdi-close</v-icon>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row justify="space-between">
            <v-col cols="4">
              <span
                class="caption grey--text text--darken-2"
                style="line-height: 0.01rem;"
              >Your Name</span>
              <br />
              <v-text-field
                class="text-h5"
                v-model="consultee.first_name"
                style="line-height: 1.5rem !important; display: inline;"
              ></v-text-field>
              <v-text-field
                class="text-h5"
                v-model="consultee.last_name"
                style="line-height: 1.5rem !important;"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <span
                class="caption grey--text text--darken-2"
                style="line-height: 0.01rem;"
              >Your Email</span>
              <br />
              <v-text-field
                v-model="consultee.email"
                class="text-h5"
                style="line-height: 1.5rem !important;"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <span class="caption grey--text text--darken-2" style="line-height: 0.01rem;">Phone No</span>
              <br />
              <v-text-field
                v-model="consultee.phone_no"
                class="text-h5"
                style="line-height: 1.5rem !important;"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-divider class="mt-5" />
        <v-col cols="12">
          <v-row justify="space-between" align="center">
            <v-col cols="4">
              <span
                class="caption grey--text text--darken-2"
                style="line-height: 0.01rem;"
              >Consultant Name</span>
              <br />
              <span
                class="text-h5"
                style="line-height: 1.5rem !important;"
              >{{booking_consultant.first_name + ' ' + booking_consultant.last_name}}</span>
            </v-col>
            <v-col cols="4">
              <span class="caption grey--text text--darken-2" style="line-height: 0.01rem;">Field</span>
              <br />
              <span
                class="text-h5"
                style="line-height: 1.5rem !important;"
              >{{booking_consultant.field}}</span>
            </v-col>
            <v-col cols="3">
              <v-dialog
                ref="dialog"
                v-model="date_modal"
                :return-value.sync="booking_date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="text-h5"
                    style="line-height: 1.5rem !important; letter-spacing: 0.25rem !important; margin-top: 2rem !important;"
                    v-model="booking_date"
                    label
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  >
                    <template v-slot:label>
                      <span
                        class="caption grey--text text--darken-2"
                        style="line-height: 0.01rem; font-size: 1rem !important;"
                      >Date</span>
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="booking_date"
                  color="cyan darken-3"
                  :allowed-dates="allowedDates"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="date_modal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(booking_date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row justify="end">
            <v-btn @click="makeAppointment()">Confirm Booking</v-btn>
          </v-row>
        </v-col>
      </v-card>
    </v-overlay>
  </v-row>
</template>

<script>
import api from "@/api/index";
import Profile from "@/components/Profile.vue";
export default {
  async created() {
    let result = await api.getAllConsultants();
    this.consultants = result;
    this.consultee = this.$store.state.consultee;
  },
  components: {
    Profile,
  },
  data() {
    return {
      consultants: [],
      consultee: {
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
      },
      book_modal: false,
      booking_consultant: {
        first_name: "",
        last_name: "",
        field: "",
      },
      booking_date: null,
      date_modal: false,
    };
  },
  methods: {
    bookModalShow(consultant) {
      this.booking_consultant = consultant;
      this.book_modal = true;
    },
    allowedDates(date) {
      let nDate = new Date(date);
      return (
        this.booking_consultant.active_days.indexOf(nDate.getDay()) !== -1 &&
        nDate > Date.now() &&
        nDate < Date.now() + 2592000000
      );
    },
    async makeAppointment() {
      let result = await api.makeAppointment({
        consultant_id: this.booking_consultant._id,
        first_name: this.consultee.first_name,
        last_name: this.consultee.last_name,
        email: this.consultee.email,
        phone_no: this.consultee.phone_no,
        date: new Date(this.booking_date)
      });
      console.log(result);
    },
  },
};
</script>

<style>
</style>
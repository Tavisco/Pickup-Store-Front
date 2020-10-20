<template>
  <q-page padding>
    <h3 class="text-weight-light">Submit a new car</h3>
    <!-- content -->
    <div class="row justify-center">

      <q-banner
        inline-actions
        rounded
        class="warn-banner text-white bg-red"
        v-if="error"
      >
        <strong>Oops! Something went wrong!</strong> {{this.error}}
        <template v-slot:action>
          <q-btn flat color="white" label="Dismiss" @click="error = ''"/>
        </template>
      </q-banner>

      <div class="col-md-6">
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
        >
          <q-step
            :name="1"
            title="Basic information"
            icon="settings"
            :done="step > 1"
          >
            <q-form
                class="q-gutter-md"
                ref="basicInfoForm"
              >
                <q-input
                  filled
                  v-model="name"
                  label="Car name *"
                  hint="ie: Dr. Grudge"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  v-model="description"
                  label="Car description *"
                  hint="ie: Dr. Grudge is a stock Re-Volt car"
                  filled
                  autogrow
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <!-- <q-file
                  v-model="file"
                  label="Pick car .zip file"
                  filled
                  counter
                  :counter-label="counterLabelFn"
                  max-files="1"
                  accept=".zip"
                  style="width: 97%"
                  lazy-rules
                  :rules="[ val => val || 'Please select a file']"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                  <template v-if="file" v-slot:append>
                    <q-icon name="cancel" @click.stop.prevent="file = null" class="cursor-pointer" />
                  </template>
                </q-file> -->

                <div v-for="(author, index) in authors" v-bind:key="index">
                  <q-input
                    v-model="author.name"
                    :label="'Car author ' + (index+1) + ' *'"
                    hint="ie: Acclaim"
                    filled
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    bottom-slots
                  >
                  <template v-slot:append>
                    <q-icon v-if="index !== 0" name="delete_forever" class="cursor-pointer" @click="authors.splice(index, 1)" />
                  </template>
                  <template v-slot:after>
                    <q-icon v-if="index === authors.length-1 && author.name !== null" name="add" class="cursor-pointer" @click="addAuthor()" />
                  </template>
                  </q-input>
                </div>
              </q-form>
          </q-step>

          <q-step
            :name="2"
            title="Upload zip file"
            icon="cloud_upload"
            :done="step > 2"
          >
            An ad group contains one or more ads which target a shared set of keywords.
          </q-step>

          <q-step
            :name="3"
            title="Review"
            icon="assignment"
          >
            This step won't show up because it is disabled.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="step === 1" flat color="primary" @click="onReset()" label="Reset" class="q-ml-sm"/>
              <q-btn @click="onNextStep(step)" color="primary" :label="getLabel(step)" />
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>

    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  // name: 'PageName',
  data () {
    return {
      name: null,
      description: null,
      authors: [],
      file: null,
      uploading: false,
      step: 1,
      error: '',
      errorVisible: false
    }
  },
  created () {
    this.authors = [
      {
        name: this.$store.state.store.activeUser.given_name
      }
    ]
  },

  methods: {
    async onSubmit () {
      this.uploading = true

      /*
        Make the request to the POST /single-file URL
      */
      let accessToken = await this.$auth.getAccessToken()

      axios.post(process.env.CARS_API + '/cars',
        this.uploading,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(response => { this.$refs.stepper.next() })
        .catch(error => this.handleError(error))
    },

    onReset () {
      this.name = null
      this.description = null
      this.authors = [
        {
          name: this.$store.state.store.activeUser.given_name
        }
      ]
      this.file = null
      this.$refs.basicInfoForm.resetValidation()
    },

    addAuthor () {
      this.authors.push(
        {
          name: null
        })
    },

    counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} file of ${maxFiles} | ${totalSize}`
    },

    getLabel (step) {
      switch (step) {
        case 1:
          if (this.uploading) {
            return 'Uploading...'
          } else {
            return 'Save and continue'
          }
        case 3:
          return 'Finish'

        default:
          return 'Continue'
      }
    },

    onNextStep (step) {
      if (step === 1) {
        this.$refs.basicInfoForm.validate().then(success => {
          if (success) {
            this.onSubmit()
          }
        })
      }

      // this.$refs.stepper.next()
    },

    handleError (error) {
      console.log('Failure!!! ' + error)
      this.error = error
      this.uploading = false
    }
  }
}
</script>

<style lang="sass" scoped>
  .warn-banner
    margin-bottom: 20px;
</style>

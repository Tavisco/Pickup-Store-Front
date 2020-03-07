<template>
  <q-page padding>
    <h3 class="text-weight-light">Submit a new car</h3>
    <!-- content -->
    <div class="row justify-center">
      <q-card class="col-md-6 " flat bordered>
        <q-card-section>
          <div class="text-h6">Car details</div>
        </q-card-section>

        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
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

            <q-file
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
            </q-file>

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

            <q-separator inset />

            <q-card-actions align="right">
              <q-btn flat label="Reset" type="reset" color="primary" class="q-ml-sm" />
              <q-btn :loading="uploading" label="Submit" type="submit" color="primary" style="width: 150px">
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                  Uploading...
                </template>
              </q-btn>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      name: null,
      description: null,
      authors: [],
      file: null,
      uploading: false
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
    onSubmit () {
      this.uploading = true

      // this.$q.notify({
      //   color: 'green-4',
      //   textColor: 'white',
      //   icon: 'cloud_done',
      //   message: 'Submitted'
      // })
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
    },

    addAuthor () {
      this.authors.push(
        {
          name: null
        })
    },
    counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} file of ${maxFiles} | ${totalSize}`
    }
  }
}
</script>

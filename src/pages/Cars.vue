<template>
  <q-page>
    <!-- content -->
    <h3 class="text-weight-light">Cars</h3>

    <div v-if="activeUser" class="q-pa-md q-gutter-y-md column items-start">
      <q-btn-group outline>
        <q-btn outline color="primary" label="Publish new car" icon="library_add" to="cars/new"/>
        <q-btn outline color="secondary" label="Manage" icon="library_books" />
      </q-btn-group>
    </div>

    <q-card flat bordered class="latest-cars-card">
      <q-card-section>
        <div class="text-h6">Latest cars</div>
      </q-card-section>

      <q-card-section class="q-pt-none row no-wrap latest-section">
          <q-card class="q-ma-sm car-card" v-for="car in latestCars" v-bind:key="car.name" style="flex-shrink: 0">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              :ratio="1"
            >
              <div class="absolute-bottom">
                <div class=" text-h6">
                  {{car.name}}
                </div>
                <div class="text-subtitle2">by John Doe</div>
              </div>
            </q-img>
          </q-card>
      </q-card-section>

    </q-card>

    <div class="q-pa-md">
      <q-table
        title="Cars"
        :data="data"
        :columns="columns"
        row-key="name"
        :filter="filter"
        grid
        hide-header
      >
        <template v-slot:top-right>
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-6 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
          <q-responsive :ratio="1" class="col">
            <q-card>
              <q-card-section>
                <!-- <q-checkbox dense v-model="props.selected" :label="props.row.name" /> -->
                <div class="text-h6 text-weight-light text-no-wrap" style="overflow-x: auto">{{ props.row.name }}</div>
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-responsive>
          </div>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Cars',
  computed: {
    activeUser: {
      get () {
        return this.$store.state.store.activeUser
      }
    }
  },
  data () {
    return {
      latestCars: [
        {
          name: 'Car 1'
        },
        {
          name: 'Car 2'
        },
        {
          name: 'Car 3'
        },
        {
          name: 'Car 4'
        },
        {
          name: 'Car 5'
        },
        {
          name: 'Car 6'
        },
        {
          name: 'Car 7'
        },
        {
          name: 'Car 8'
        },
        {
          name: 'Car 9'
        },
        {
          name: 'Car 10'
        }
      ],
      filter: '',
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49
        }
      ]

    }
  }
}
</script>

<style lang="sass" scoped>
  .latest-cars-card
    margin-right: 40px;
    margin-left: 40px;
  .car-card
    width: 192px;
    height: 192px;
  .latest-section
    overflow-x: scroll;
    margin-left: 16px;
    margin-right: 16px;
    padding-left: 0px;
    padding-bottom: 0px;
    padding-right: 0px;
</style>

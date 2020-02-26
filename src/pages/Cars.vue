<template>
  <q-page>
    <!-- content -->
    <h3 class="text-weight-light">Cars</h3>

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
              <div class="absolute-bottom text-h6">
                {{car.name}}
              </div>
            </q-img>
          </q-card>
      </q-card-section>

    </q-card>

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
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

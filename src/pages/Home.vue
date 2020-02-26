<template>
  <q-page>
    <h3 class="text-weight-light">Home</h3>

    <div class="q-pa-md q-gutter-sm row">

      <q-banner rounded class="bg-grey-3 col-3">
        <template v-slot:avatar>
          <q-icon name="star" color="black" />
        </template>
        <strong>
        Not much to see here for now. <br />
        </strong>
        Try using the menu on the left!
      </q-banner>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome'
}
</script>

<style scoped>

</style>

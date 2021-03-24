<template>
  <div>
    <div>{{ myState }}</div>
    <div>{{ GlobalState }}</div>
  </div>
</template>

<script>
// non-namespaced version
// import { mapGetters } from "vuex";

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('ext')

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters(["myState"]),
    ...mapState(["GlobalState"])
  },
};
</script>

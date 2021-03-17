<template>
  <div>{{ myState }}</div>
</template>

<script>
// non-namespaced version
// import { mapGetters } from "vuex";

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('ext')

export default {
  computed: {
    ...mapGetters(["myState"]),
  },
};
</script>

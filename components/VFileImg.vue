<template>
  <div>
    <v-file-input
      :accept="accept"
      show-size
      counter
      truncate-length="50"
      placeholder="Upload screenshot"
      prepend-icon="mdi-camera-image"
      label="Image"
      outlined
      @change="loadImg"
    ></v-file-input>
    <v-progress-linear
      :active="isLoading"
      :indeterminate="isLoading"
      bottom
      absolute
      color="deep-purple accent-4"
    ></v-progress-linear>
    <v-img v-if="image.link && image.id" :src="image.link" width="150"></v-img>
  </div>
</template>

<script>
const defaultItem = {
  id: '',
  link: '',
}
export default {
  name: 'VFileImg',
  props: {
    image: {
      type: Object,
      default() {
        return defaultItem
      },
    },
    accept: {
      type: String,
      default: 'image/png, image/jpeg',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    loadImg(file) {
      const formData = new FormData()
      formData.append('file', file)

      this.$axios.post(`${this.$config.apiEndpoint}/image`, formData).then(result => {
        this.$emit('uploadedImage', { ...result.data.data.image })
      })
    },
  },
}
</script>

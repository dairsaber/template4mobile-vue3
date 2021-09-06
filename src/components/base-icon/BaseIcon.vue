<script lang="tsx">
  import { computed, CSSProperties, defineComponent } from 'vue'

  export default defineComponent({
    props: { icon: { type: String, required: true } },
    setup(props, { attrs }) {
      const iconName = computed(() => `#svg-${props.icon}`)

      return () => (
        <svg style={attrs.style as CSSProperties | string} class="svg-icon">
          <use xlinkHref={iconName.value} fill="currentColor" />
        </svg>
      )
    },
  })
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    display: inline;
  }
</style>

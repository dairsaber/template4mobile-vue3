<script lang="tsx">
  import { computed, CSSProperties, defineComponent, h } from 'vue'
  import { Icon } from 'vant'
  export default defineComponent({
    props: { icon: { type: String, required: true } },
    setup(props, { attrs }) {
      const isSvgIcon = computed(() => props.icon.startsWith('svg-'))
      const svgIconName = computed(() => `#${props.icon}`)

      return () =>
        isSvgIcon.value ? (
          <svg style={attrs.style as CSSProperties | string} class="svg-icon">
            <use xlinkHref={svgIconName.value} fill="currentColor" />
          </svg>
        ) : (
          h(Icon, { name: props.icon, ...attrs })
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

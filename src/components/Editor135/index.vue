<template>
  <div>
    <textarea id="editor"></textarea>
    <br>
    <Button type="error" @click='clear_135()' icon='md-trash'>清空编辑器</Button>
    <Button type="error" @click='get_135()' icon='md-trash'>获取编辑器</Button>
  </div>
</template>
<script>
export default {
  name: 'Editor135',
  data() {
    return {
      show_135: false
    }
  },
  props: {
    editor_135: {
      type: Object,
      default: () => {
        return {
          the_editor_content: null
        }
      }
    }
  },
  watch: {
    'editor_135.the_editor_content': {
      handler(newName, oldName) {
        console.log(newName, oldName)
        alert("11")
        if (newName != null) {
          if (this.show_135 != true) {
            this.show_135 = true
            this.set_up_135()
          }
          current_editor.ready(() => {
            current_editor.setContent(newName)
            this.editor_135.the_editor_content = null
          })
        }
      },
      immediate: false,
      deep: true
    }
  },
  mounted() {

  },
  created() {

  },
  methods: {
    open_135() {
      this.set_up_135()
    },
    get_135() {
      console.log(current_editor.getContentTxt())
    },
    clear_135() {
      current_editor.execCommand('cleardoc');
    },
  },
  mounted() { }
}

</script>
<style lang="css" scoped>
</style>

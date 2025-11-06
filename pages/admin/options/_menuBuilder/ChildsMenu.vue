
<template>
   <edit-link
      v-if="showEditForm"
      :link="editableLink" 
      :editing-mode="editingMode"
      @update="updateLink" 
      @save="saveLink"
      @cancel="showEditForm = false"
    ></edit-link>
  <v-list>
  <draggable
    v-model="linkss"
    item-key="title"
    :component-data="{
      tag: 'ul',
      name: !drag ? 'flip-list' : null,
    }"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element, index }">
      <v-list-item
        v-bind="props"
        :prepend-icon="element.icon"
        class="bg-grey-lighten-3"
      >
        <v-list-item-title>
          {{ element.title }}
        </v-list-item-title>
        <template v-slot:append>
          <v-btn
            density="compact"
            icon="mdi-pencil"
            variant="text"
            @click.stop="editLink(index)"
          ></v-btn>
          <v-btn
            class="elementor-delete-element"
            density="compact"
            icon="mdi-delete"
            variant="text"
            @click.stop="removeLink(index)"
          ></v-btn>
        </template>
        <template v-slot:prepend>
          <v-btn
            density="compact"
            icon="mdi-drag"
            variant="text"
            @click.stop=""
          ></v-btn>
        </template>
      </v-list-item>
    </template>
  </draggable>
  </v-list>
</template>


<script>
import EditLink from "./EditLink.vue";
import draggable from "vuedraggable";

export default {
  components: { EditLink, draggable },
  props: ["modelValue"],
  data() {
    return {
      editableLink: {},
      showEditForm: false,
      linkss: [],
      selected: null,
      editingMode:false,
      drag: false,
      dragChild: false,
    };
  },
  watch: {
    linkss: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.$emit("update:modelValue", newVal);
      },
    },
    modelValue: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.linkss = newVal; //JSON.parse(JSON.stringify(newVal));
        // this.$emit("update:modelValue", newVal);
      },
    },
  },
  methods: {
    newMainLink() {
      (this.selected = null), (this.editableLink = {});
      this.showEditForm = true;
    },
    addChildMenu(link) {
      this.selected = link;
      this.editableLink = {};
      this.showEditForm = true;
      this.editingMode=false;
    },
    editLink(link){
      this.selected = this.linkss[link];
      this.editableLink = this.linkss[link];
      this.editingMode=true;
      this.showEditForm = true;
    },
    saveLink(link) {
      if (this.selected) {
        if (this.selected.childs == undefined) this.selected.childs = [];
        this.selected.childs.push(link);
      } else {
        this.linkss.push(link);
      }
      this.showEditForm = false;
    },
    updateLink(updatedLink){
       
     const index = this.linkss.findIndex((link) => link === this.editableLink);
     
     if (index !== -1) {
       // this.$set(this.linkss, index, updatedLink);
       this.linkss[index] = updatedLink;
       this.showEditForm = false;
     }
    },
    removeLink(index) {
      this.linkss.splice(index, 1);
    },
    save() {
      this.$emit("update:modelValue", this.linkss);
    },
  
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  mounted() {
    this.linkss = this.modelValue;
  },
};
</script>

<style scoped>
</style>
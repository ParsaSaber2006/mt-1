
<template>
  <div>
    <edit-link
      v-if="showEditForm"
      :link="editableLink" 
      :editing-mode="editingMode"
      @update="updateLink" 
      @save="saveLink"
      @cancel="showEditForm = false"
    ></edit-link>
    <v-container class="home" v-if="!showEditForm">
      <v-row>
        <v-col>
          <v-list open-strategy="single" nav>
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
                <v-list-group>
                  <template v-slot:activator="{ props, isOpen }">
                    <v-list-item
                      v-bind="props"
                      :prepend-icon="element.icon"
                      class="bg-grey-lighten-2"
                    >
                      <v-list-item-title>
                        {{ element.title }}
                      </v-list-item-title>
                      <template v-slot:append>
                        <v-btn
                          density="compact"
                          icon="mdi-pencil"
                          variant="text"
                          @click.stop="editChildMenu(index)"
                        ></v-btn>
                        <v-btn
                          class="elementor-delete-element"
                          density="compact"
                          icon="mdi-delete"
                          variant="text"
                          @click.stop="removeLink(index)"
                        ></v-btn>
                        <v-btn
                          density="compact"
                          @click="addChildMenu(element)"
                          icon="mdi-plus"
                          variant="text"
                        ></v-btn>
                        <v-btn
                          density="compact"
                          :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                          variant="text"
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
                  <div
                    class="text-center"
                    v-if="!element.childs || element.childs.length == 0"
                  >
                    هیچ زیر منویی اضافه نشده است
                  </div>
                  <childs-menu
                    v-model="element.childs"
                    class="pa-0 pb-1 mx-1"
                  ></childs-menu>
                </v-list-group>
              </template>
            </draggable>

            <v-list-group
              v-for="(link, i) in linkss"
              :key="link.title"
              v-if="false"
            >
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :prepend-icon="link.icon">
                  <v-list-item-title>
                    {{ link.title }}
                  </v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item>
                <v-btn
                  @click="swapTop(linkss, i)"
                  icon="mdi-arrow-up"
                  density="compact"
                  variant="tonal"
                  color="red"
                  class="me-1"
                  :disabled="i == 0"
                />
                <v-btn
                  @click="swapBottom(linkss, i)"
                  icon="mdi-arrow-down"
                  density="compact"
                  variant="tonal"
                  color="red"
                  class="me-1"
                  :disabled="i == linkss.length - 1"
                ></v-btn>
                <v-btn
                  @click="linkss.splice(i, 1)"
                  icon="mdi-close"
                  density="compact"
                  variant="tonal"
                  color="red"
                  class="me-1"
                ></v-btn>
              </v-list-item>
              <v-list-item
                v-for="(child, order) in link.childs"
                :key="child"
                :prepend-icon="child.icon"
              >
                <v-list-item-title>
                  {{ child.title }}
                </v-list-item-title>
                <template v-slot:append>
                  <v-btn
                    @click="swapTop(link.childs, order)"
                    icon="mdi-arrow-up"
                    density="compact"
                    variant="tonal"
                    class="me-1"
                    :disabled="order == 0"
                  />
                  <v-btn
                    @click="swapBottom(link.childs, order)"
                    icon="mdi-arrow-down"
                    density="compact"
                    variant="tonal"
                    class="me-1"
                    :disabled="order == link.childs.length - 1"
                  ></v-btn>
                  <v-btn
                    @click="link.childs.splice(order, 1)"
                    icon="mdi-close"
                    density="compact"
                    variant="tonal"
                    class="me-1"
                  ></v-btn>
                </template>
              </v-list-item>
              <v-list-item>
                <v-btn
                  variant="text"
                  prepend-icon="mdi-plus"
                  @click="addChildMenu(link)"
                  >افزودن زیر منو جدید</v-btn
                >
              </v-list-item>
            </v-list-group>
          </v-list>
          <div class="text-center">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-plus"
              @click="newMainLink"
              >ایجاد لینک جدید</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import EditLink from "./EditLink.vue";
import draggable from "vuedraggable";
import ChildsMenu from "./ChildsMenu.vue";

export default {
  components: { EditLink, draggable, ChildsMenu },
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
      this.editingMode=false;
      this.showEditForm = true;
    },editChildMenu(link) {
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
    updateLink(updatedLink) {
     
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
    swapTop(array, order) {
      if (order == 0) return;
      this.swap(array, order, order - 1);
    },
    swapBottom(array, order) {
      if (order == array.length - 1) return;
      this.swap(array, order, order + 1);
    },
    swap(arr, index1, index2) {
      [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
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
    dragOptionsChild() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  mounted() {
    // this.linkss = this.modelValue;
  },
};
</script>

<style scoped>
</style>
<template>
  <v-container>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="جستجو در کدها"
          variant="outlined"
          density="compact"
          class="mr-4"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="openCreateModal">ایجاد کد تخفیف</v-btn>
        <v-btn color="primary" @click="fetchDiscounts">بارگذاری مجدد</v-btn>
      </v-card-title>

      <!-- Modal -->
      <v-dialog v-model="dialog" max-width="600">
        <v-card class="rounded-xl">
          <v-card-title class="text-h6">
            ایجاد کد تخفیف جدید
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <discount-form
            :mode="editMode ? 'edit' : 'create'"
            :discountData="selectedDiscount"
            @success="onFormSuccess"
            @cancel="dialog = false"
            
          />

          </v-card-text>
        </v-card>
      </v-dialog>

      <v-data-table
        :headers="headers"
        :items="discounts"
        :search="search"
        :items-per-page="5"
        dense
        item-value="id"
        class="elevation-1"
      >
     

        <template #item.actions="{ item }">
          <v-btn icon color="blue" @click="editDiscount(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="deleteDiscount(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import DiscountForm from "./DiscountForm.vue";

export default {
  name: "Discounts",
  components: { DiscountForm },
  data() {
    return {
      search: "",
      discounts: [],
      dialog: false,
      editMode: false,
      selectedDiscount: null,
      headers: [
      { title: "کد تخفیف", key: "code" },
      { title: "نوع", key: "type" },
      { title: "مقدار", key: "value" },
      { title: "حداکثر تخفیف", key: "max_discount" },
      { title: "حداقل مبلغ", key: "min_amount" },
      { title: "محدودیت استفاده", key: "usage_limit" },
      { title: "تعداد استفاده شده", key: "used_count" },
      { title: "تاریخ شروع", key: "valid_from" },
      { title: "تاریخ انقضا", key: "valid_until" },
      { title: "عملیات", key: "actions", sortable: false },
    ]
    };
  },
  methods: {
    fetchDiscounts() {
      axios
        .get("/api/discounts")
        .then((response) => {
          this.discounts = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching discounts:", error);
        });
    },
    onFormSuccess(){
      // this.$toast.success("کد تخفیف با موفقیت ذخیره شد.");
  this.dialog = false; // مودال رو ببند
  this.fetchDiscounts(); 
  emitter.emit("notif");

    },
    editDiscount(discount) {
      this.editMode = true;
      
      this.selectedDiscount = { ...discount };
      console.log(this.selectedDiscount)
      this.dialog = true;
      //this.$router.push({ name: "EditDiscount", params: { id: discount.id } });
    },
    openCreateModal() {
  this.editMode = false;
  this.selectedDiscount = null;
  this.dialog = true;
},

    deleteDiscount(id) {
      if (confirm("آیا از حذف این کد تخفیف مطمئن هستید؟")) {
        axios
          .delete(`/api/discounts/${id}`)
          .then(() => {
            this.fetchDiscounts();
          })
          .catch((error) => {
            console.error("Error deleting discount:", error);
          });
      }
    },
    onDiscountCreated() {
      this.dialog = false;
      this.fetchDiscounts();
    },
  },
  mounted() {
    this.fetchDiscounts();
  },
};
</script>

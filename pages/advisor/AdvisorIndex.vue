<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8" md="6" >
          <card title="مشاور">
            <v-list nav>
              <v-list-item-subtitle>
                  تماس ها و مراجعات
              </v-list-item-subtitle>
              <v-list-item
                color="primary"
                :to="{ name: 'advisor.calls' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-format-list-bulleted-type"
                title="تماس های من"
              />
              <v-list-item
                color="primary"
                :to="{ name: 'advisor.myContacts' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-format-list-bulleted-type"
                title="مخاطبین من"
              />
              <v-list-item
                color="primary"
                :to="{ name: 'advisor.callRequests' }"
                append-icon="mdi-chevron-left"
                prepend-icon="mdi-format-list-bulleted-type"
                title="درخواست های تماس"
              />
            </v-list>
          </card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scope>
.v-list > .v-list-item-subtitle{
    font-size: 1rem;
    margin-top: 20px;
    margin-bottom: 5px;
    display: none;
}
</style>
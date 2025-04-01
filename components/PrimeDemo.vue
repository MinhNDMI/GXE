<template>
  <div class="p-4">
    <!-- Global Components -->
    <Toast position="bottom-right" />
    <ConfirmDialog />
    <DynamicDialog />

    <h1 class="text-4xl font-bold mb-6">PrimeVue Components Demo</h1>

    <!-- Menu Demo -->
    <div class="mb-8">
      <Menubar :model="menuItems">
        <template #end>
          <InputText placeholder="Search" type="text" />
        </template>
      </Menubar>
    </div>

    <TabView>
      <!-- Form Controls -->
      <TabPanel header="Form Controls">
        <div class="grid">
          <!-- Basic Inputs -->
          <div class="col-12 md:col-6 lg:col-4 mb-4">
            <Card>
              <template #title>Basic Inputs</template>
              <template #content>
                <div class="flex flex-column gap-3">
                  <div>
                    <label class="block mb-2">Input Text</label>
                    <InputText v-model="formData.input" class="w-full" />
                  </div>

                  <div>
                    <label class="block mb-2">Password</label>
                    <Password
                      v-model="formData.password"
                      toggleMask
                      class="w-full"
                    />
                  </div>

                  <div>
                    <label class="block mb-2">Textarea</label>
                    <Textarea
                      v-model="formData.textarea"
                      rows="3"
                      class="w-full"
                    />
                  </div>

                </div>
              </template>
            </Card>
          </div>

          <!-- Selection -->
          <div class="col-12 md:col-6 lg:col-4 mb-4">
            <Card>
              <template #title>Selection</template>
              <template #content>
                <div class="flex flex-column gap-3">
                  <div>
                    <label class="block mb-2">Dropdown</label>
                    <Dropdown
                      v-model="formData.dropdown"
                      :options="dropdownOptions"
                      optionLabel="name"
                      class="w-full"
                    />
                  </div>

                  <div>
                    <label class="block mb-2">MultiSelect</label>
                    <MultiSelect
                      v-model="formData.multiselect"
                      :options="dropdownOptions"
                      optionLabel="name"
                      class="w-full"
                    />
                  </div>

                  <div class="flex flex-column gap-2">
                    <label>Checkboxes</label>
                    <div
                      v-for="opt in checkboxOptions"
                      :key="opt.id"
                      class="flex align-items-center"
                    >
                      <Checkbox
                        v-model="formData.checkboxes"
                        :value="opt.id"
                        :inputId="'cb' + opt.id"
                      />
                      <label :for="'cb' + opt.id" class="ml-2">{{
                        opt.name
                      }}</label>
                    </div>
                  </div>

                  <div class="flex flex-column gap-2">
                    <label>Radio Buttons</label>
                    <div
                      v-for="opt in radioOptions"
                      :key="opt.id"
                      class="flex align-items-center"
                    >
                      <RadioButton
                        v-model="formData.radio"
                        :value="opt.id"
                        :inputId="'rb' + opt.id"
                      />
                      <label :for="'rb' + opt.id" class="ml-2">{{
                        opt.name
                      }}</label>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <!-- Advanced Inputs -->
          <div class="col-12 md:col-6 lg:col-4 mb-4">
            <Card>
              <template #title>Advanced Inputs</template>
              <template #content>
                <div class="flex flex-column gap-3">
                  <div>
                    <label class="block mb-2">Calendar</label>
                    <Calendar v-model="formData.date" showIcon class="w-full" />
                  </div>

                  <div>
                    <label class="block mb-2">Color Picker</label>
                    <ColorPicker v-model="formData.color" class="w-full" />
                  </div>

                  <div>
                    <label class="block mb-2">Slider</label>
                    <Slider v-model="formData.slider" class="w-full" />
                  </div>

                  <div>
                    <label class="block mb-2">Rating</label>
                    <Rating v-model="formData.rating" />
                  </div>

                  <div>
                    <label class="block mb-2">Knob</label>
                    <Knob v-model="formData.knob" />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </TabPanel>

      <!-- Data Display -->
      <TabPanel header="Data Display">
        <div class="grid">
          <!-- DataTable -->
          <div class="col-12 mb-4">
            <Card>
              <template #title>DataTable</template>
              <template #content>
                <DataTable
                  :value="tableData"
                  v-model:selection="selectedProducts"
                  :paginator="true"
                  :rows="5"
                  filterDisplay="menu"
                  :globalFilterFields="['name', 'category', 'status']"
                >
                  <template #header>
                    <div class="flex justify-content-between">
                      <Button
                        icon="pi pi-plus"
                        label="New"
                        @click="showDialog = true"
                      />
                      <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText
                          v-model="tableFilters.global"
                          placeholder="Search..."
                        />
                      </span>
                    </div>
                  </template>

                  <Column selectionMode="multiple" headerStyle="width: 3rem" />
                  <Column field="name" header="Name" sortable />
                  <Column field="category" header="Category" sortable />
                  <Column field="price" header="Price" sortable>
                    <template #body="slotProps">
                      {{ formatCurrency(slotProps.data.price) }}
                    </template>
                  </Column>
                  <Column field="status" header="Status">
                    <template #body="slotProps">
                      <Tag
                        :value="slotProps.data.status"
                        :severity="getSeverity(slotProps.data.status)"
                      />
                    </template>
                  </Column>
                  <Column :exportable="false" style="min-width: 8rem">
                    <template #body="slotProps">
                      <Button
                        icon="pi pi-pencil"
                        rounded
                        outlined
                        class="mr-2"
                        @click="editProduct(slotProps.data)"
                      />
                      <Button
                        icon="pi pi-trash"
                        rounded
                        outlined
                        severity="danger"
                        @click="confirmDelete(slotProps.data)"
                      />
                    </template>
                  </Column>
                </DataTable>
              </template>
            </Card>
          </div>

          <!-- Other Data Displays -->
          <div class="col-12 md:col-6 mb-4">
            <Card>
              <template #title>Timeline</template>
              <template #content>
                <Timeline :value="timelineEvents">
                  <template #content="slotProps">
                    <div class="flex flex-column gap-2">
                      <span class="font-bold">{{ slotProps.item.status }}</span>
                      <small>{{ slotProps.item.date }}</small>
                      <p>{{ slotProps.item.description }}</p>
                    </div>
                  </template>
                </Timeline>
              </template>
            </Card>
          </div>

          <div class="col-12 md:col-6 mb-4">
            <Card>
              <template #title>Tree</template>
              <template #content>
                <Tree
                  :value="treeNodes"
                  selectionMode="checkbox"
                  v-model:selectionKeys="selectedTreeNodes"
                />
              </template>
            </Card>
          </div>
        </div>
      </TabPanel>

      <!-- Overlays -->
      <TabPanel header="Overlays">
        <div class="grid">
          <div class="col-12 md:col-4 mb-4">
            <Card>
              <template #title>Dialogs</template>
              <template #content>
                <div class="flex flex-column gap-2">
                  <Button
                    label="Show Dialog"
                    icon="pi pi-external-link"
                    @click="showDialog = true"
                  />
                  <Button
                    label="Show Confirm"
                    icon="pi pi-check"
                    @click="confirmDialog()"
                  />
                  <Button
                    label="Show Toast"
                    icon="pi pi-bell"
                    @click="showToast()"
                  />
                </div>

                <Dialog
                  v-model:visible="showDialog"
                  modal
                  header="Product Details"
                >
                  <div class="flex flex-column gap-3">
                    <InputText v-model="dialogData.name" placeholder="Name" />
                    <InputNumber
                      v-model="dialogData.price"
                      placeholder="Price"
                      mode="currency"
                      currency="USD"
                    />
                    <Dropdown
                      v-model="dialogData.category"
                      :options="categories"
                      optionLabel="name"
                      placeholder="Category"
                    />
                  </div>
                  <template #footer>
                    <Button
                      label="Cancel"
                      icon="pi pi-times"
                      @click="showDialog = false"
                      text
                    />
                    <Button
                      label="Save"
                      icon="pi pi-check"
                      @click="saveDialog"
                      autofocus
                    />
                  </template>
                </Dialog>
              </template>
            </Card>
          </div>

          <div class="col-12 md:col-4 mb-4">
            <Card>
              <template #title>Overlay Panels</template>
              <template #content>
                <div class="flex flex-column gap-3">
                  <Button
                    label="Toggle Menu"
                    icon="pi pi-bars"
                    @click="toggleMenu"
                  />
                  <Menu ref="menu" :model="menuItems" :popup="true" />

                  <Button
                    label="Show OverlayPanel"
                    icon="pi pi-search"
                    @click="toggleOverlayPanel"
                  />
                  <OverlayPanel ref="op">
                    <DataTable
                      :value="tableData.slice(0, 3)"
                      style="min-width: 300px"
                    >
                      <Column field="name" header="Name" />
                      <Column field="price" header="Price">
                        <template #body="slotProps">
                          {{ formatCurrency(slotProps.data.price) }}
                        </template>
                      </Column>
                    </DataTable>
                  </OverlayPanel>
                </div>
              </template>
            </Card>
          </div>

          <div class="col-12 md:col-4 mb-4">
            <Card>
              <template #title>Sidebar</template>
              <template #content>
                <Button
                  label="Show Sidebar"
                  icon="pi pi-arrow-right"
                  @click="showSidebar = true"
                />
                <Sidebar v-model:visible="showSidebar" position="right">
                  <h3>Sidebar Content</h3>
                  <p>
                    This is a customizable sidebar that can contain any content.
                  </p>
                </Sidebar>
              </template>
            </Card>
          </div>
        </div>
      </TabPanel>

      <!-- Media -->
      <!-- <TabPanel header="Media">
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-4 mb-4">
            <Card>
              <template #title>Image Gallery</template>
              <template #content>
                <Galleria
                  :value="images"
                  :responsiveOptions="galleriaResponsiveOptions"
                  :numVisible="5"
                  containerStyle="max-width: 640px"
                >
                  <template #item="slotProps">
                    <img
                      :src="slotProps.item.itemImageSrc"
                      :alt="slotProps.item.alt"
                      style="width: 100%"
                    />
                  </template>
                  <template #thumbnail="slotProps">
                    <img
                      :src="slotProps.item.thumbnailImageSrc"
                      :alt="slotProps.item.alt"
                    />
                  </template>
                </Galleria>
              </template>
            </Card>
          </div>

          <div class="col-12 md:col-6 lg:col-4 mb-4">
            <Card>
              <template #title>Carousel</template>
              <template #content>
                <Carousel :value="images" :numVisible="1" :numScroll="1">
                  <template #item="slotProps">
                    <div class="text-center">
                      <img
                        :src="slotProps.data.itemImageSrc"
                        :alt="slotProps.data.name"
                        class="w-full shadow-2"
                      />
                    </div>
                  </template>
                </Carousel>
              </template>
            </Card>
          </div>
        </div>
      </TabPanel> -->
    </TabView>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { FilterMatchMode } from "primevue/api";
import Textarea from 'primevue/textarea'

const toast = useToast();
const confirm = useConfirm();
const menu = ref();
const op = ref();

// Form Data
const formData = ref({
  input: "",
  password: "",
  textarea: "",
  number: 0,
  dropdown: null,
  multiselect: [],
  checkboxes: [],
  radio: null,
  date: null,
  color: null,
  slider: 50,
  rating: 0,
  knob: 0,
});

// Options for dropdowns
const dropdownOptions = [
  { name: "Option 1", id: 1 },
  { name: "Option 2", id: 2 },
  { name: "Option 3", id: 3 },
];

const checkboxOptions = [
  { name: "Option 1", id: 1 },
  { name: "Option 2", id: 2 },
  { name: "Option 3", id: 3 },
];

const radioOptions = [
  { name: "Option 1", id: 1 },
  { name: "Option 2", id: 2 },
  { name: "Option 3", id: 3 },
];

// Menu Items
const menuItems = ref([
  {
    label: "File",
    items: [
      { label: "New", icon: "pi pi-plus" },
      { label: "Open", icon: "pi pi-folder-open" },
      { label: "Save", icon: "pi pi-save" },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Cut", icon: "pi pi-cut" },
      { label: "Copy", icon: "pi pi-copy" },
      { label: "Paste", icon: "pi pi-paste" },
    ],
  },
]);

// Table Data
const tableData = ref([
  {
    id: 1,
    name: "Product 1",
    category: "Electronics",
    price: 899,
    status: "IN STOCK",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Clothing",
    price: 49,
    status: "LOW STOCK",
  },
  {
    id: 3,
    name: "Product 3",
    category: "Electronics",
    price: 1299,
    status: "OUT OF STOCK",
  },
  {
    id: 4,
    name: "Product 4",
    category: "Fitness",
    price: 199,
    status: "IN STOCK",
  },
  {
    id: 5,
    name: "Product 5",
    category: "Books",
    price: 29,
    status: "IN STOCK",
  },
]);

const selectedProducts = ref([]);
const tableFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Timeline Events
const timelineEvents = ref([
  { status: "Ordered", date: "15/10/2023", description: "Order submitted" },
  {
    status: "Processing",
    date: "16/10/2023",
    description: "Payment confirmed",
  },
  { status: "Shipped", date: "17/10/2023", description: "Package sent" },
  { status: "Delivered", date: "18/10/2023", description: "Product delivered" },
]);

// Tree Data
const treeNodes = ref([
  {
    key: "0",
    label: "Documents",
    children: [
      {
        key: "0-0",
        label: "Work",
        children: [
          { key: "0-0-0", label: "Reports" },
          { key: "0-0-1", label: "Proposals" },
        ],
      },
      {
        key: "0-1",
        label: "Personal",
        children: [
          { key: "0-1-0", label: "Photos" },
          { key: "0-1-1", label: "Documents" },
        ],
      },
    ],
  },
]);

const selectedTreeNodes = ref({});

// Dialog
const showDialog = ref(false);
const dialogData = ref({
  name: "",
  price: null,
  category: null,
});

// Sidebar
const showSidebar = ref(false);

// Gallery
const images = ref([
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg",
    alt: "Description for Image 2",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg",
    alt: "Description for Image 3",
  },
]);

const galleriaResponsiveOptions = ref([
  {
    breakpoint: "991px",
    numVisible: 4,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
]);

// Methods
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const getSeverity = (status) => {
  switch (status) {
    case "IN STOCK":
      return "success";
    case "LOW STOCK":
      return "warning";
    case "OUT OF STOCK":
      return "danger";
    default:
      return null;
  }
};

const showToast = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Message Content",
    life: 3000,
  });
};

const confirmDialog = () => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const toggleOverlayPanel = (event) => {
  op.value.toggle(event);
};

const editProduct = (product) => {
  dialogData.value = { ...product };
  showDialog.value = true;
};

const saveDialog = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Data Saved",
    life: 3000,
  });
  showDialog.value = false;
};

const confirmDelete = (product) => {
  confirm.require({
    message: `Are you sure you want to delete ${product.name}?`,
    header: "Confirm Delete",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      tableData.value = tableData.value.filter((p) => p.id !== product.id);
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Product deleted",
        life: 3000,
      });
    },
  });
};
</script>

<style scoped>
.p-card {
  margin-bottom: 2rem;
}

.custom-marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}

::v-deep(.p-timeline-event-content),
::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
}
</style>

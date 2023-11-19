import Vue from 'vue';
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const CountryFlagCellRenderer = {
  template: 
    `
      <span>
        <img :src="'https://www.ag-grid.com/example-assets/flags/' + cellValue + '-flag-sm.png'" height="30" />
      </span>
    `,
  data: function () {
    return {
        cellValue: ''
    };
  },
  beforeMount() {
      this.cellValue = this.params.value.toLowerCase();
  },
};

const App = {
  template: 
    `
    <ag-grid-vue
        style="width: 100%; height: 100%"
        class="ag-theme-quartz-dark"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :defaultColDef="defaultColDefs"
        :pagination="true"
        @cell-value-changed="onCellValueChanged"
    >
    </ag-grid-vue>
    `,
  components: {
    AgGridVue,
    countryFlagCellRenderer: CountryFlagCellRenderer
  },
  data() {
    return {
      // Row Data: The data to be displayed.
      rowData: [        
        {company: "CASC", country: "China", date: "2022-07-24", mission: "Wentian", price: 2150000, successful: true},
        {company: "SpaceX", country: "USA", date: "2022-07-24", mission: "Starlink Group 4-25", price: 3230000, successful: true},
        {company: "SpaceX", country: "USA", date: "2022-07-22", mission: "Starlink Group 3-2", price: 8060000, successful: true}
      ],
      // Column Definitions: Defines & controls grid columns.
      columnDefs: [
          { field: "mission", resizable: true },
          { field: "country", cellRenderer: "countryFlagCellRenderer" },
          { field: "successful" },
          { field: "date" },
          { field: "price", valueFormatter: (params) => { return '£' + params.value.toLocaleString(); } },
          { field: "company" }
      ],
      defaultColDefs: {
        resizable: true,
        editable: true
      }
    };
  },
  methods: {
    fetchData: async function() {
      const response = await fetch('https://downloads.jamesswinton.com/space-mission-data.json');
      return response.json();
    },
    onCellValueChanged(event) {
      console.log(`New Cell Value: ${event.value}`);
    },
  },
  mounted: async function() {
    this.rowData = await this.fetchData();
  },
};

// Create the Vue instance and mount the component
new Vue({
  render: h => h(App),
}).$mount('#app');

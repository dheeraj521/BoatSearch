import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    
    // Private
    error = undefined;
    
    searchOptions;
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
      boatTypes({ error, data }) {
      if (data) {
        this.searchOptions = data.map(type => {
          // TODO: complete the logic
          //type.label
          //type.value
          //console.log(type);
          return {label: type.Name,value: type.Id};
        });
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        console.log('selectedBoatTypeId='+selectedBoatTypeId);
      // Create the const searchEvent
      // searchEvent must be the new custom event search
      const searchEvent = new CustomEvent('search',{
        detail: {boatTypeId: this.selectedBoatTypeId}
      });
      searchEvent;
      this.dispatchEvent(searchEvent);
    }
  }
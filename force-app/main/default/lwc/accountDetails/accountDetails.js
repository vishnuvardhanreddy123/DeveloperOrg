import { LightningElement,wire,track } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from
'lightning/uiRecordApi';
import FIELD_Name from '@salesforce/schema/Case.Account.Name';
import FIELD_Industry from
'@salesforce/schema/Case.Account.Industry';
import FIELD_AnnualRevenue from '@salesforce/schema/Case.Account.AnnualRevenue';
import FIELD_Phone from '@salesforce/schema/Case.Account.Phone';
const fields = [FIELD_Name, FIELD_Industry, FIELD_AnnualRevenue,
    FIELD_Phone];
export default class AccountDetails extends LightningElement {
    @track caseId;
    @wire(getRecord, { recordId: '$caseId', fields })
    wiredStudent;
    
    get name() {
        return this._getDisplayValue(this.wiredStudent.data,
        FIELD_Name);
        }
        get industry() {
        return this._getDisplayValue(this.wiredStudent.data,
        FIELD_Industry);
        }
        get phone() {
        return this._getDisplayValue(this.wiredStudent.data,
        FIELD_Phone);
        }
        get annualRevenue() {
        return this._getDisplayValue(this.wiredStudent.data,
        FIELD_AnnualRevenue);
        }
        _getDisplayValue(data, field) {
        return getFieldDisplayValue(data, field) ?
        getFieldDisplayValue(data, field) : getFieldValue(data,
        field);
        }
}
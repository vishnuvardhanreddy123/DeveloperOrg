import { LightningElement, track, wire } from 'lwc';
import { registerListener } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord, getFieldValue, getFieldDisplayValue } from
'lightning/uiRecordApi';
import FIELD_Name from '@salesforce/schema/Contact.Name';
import FIELD_Title from
'@salesforce/schema/Contact.Title';
import FIELD_Email from '@salesforce/schema/Contact.Email';
import FIELD_Phone from '@salesforce/schema/Contact.Phone';
const fields = [FIELD_Name, FIELD_Title, FIELD_Email,
FIELD_Phone];
import { NavigationMixin } from 'lightning/navigation';

export default class StudentDetail extends NavigationMixin(LightningElement) {
    @track studentId;
    @wire(CurrentPageReference) pageRef;
    @wire(getRecord, { recordId: '$studentId', fields })
    wiredStudent;
    connectedCallback() {
        registerListener('studentChange', this.handleStudentChange,
        this);
    }
    handleStudentChange(event) {
        this.studentId = event.studentId;
    }
    onGoToRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.studentId,
                objectApiName: 'Contact',
                actionName: 'view'
            }
            });
    }
    get name() {
        return this._getDisplayValue(this.wiredStudent.data,
        FIELD_Name);
        }
        get title() {
        return this._getDisplayValue(this.wiredStudent.data,
        FIELD_Title);
        }
        get phone() {
        return this._getDisplayValue(this.wiredStudent.data,
        FIELD_Phone);
        }
        get email() {
        return this._getDisplayValue(this.wiredStudent.data,
        FIELD_Email);
        }
        _getDisplayValue(data, field) {
        return getFieldDisplayValue(data, field) ?
        getFieldDisplayValue(data, field) : getFieldValue(data,
        field);
        }
}
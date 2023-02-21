import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      myGroup: this.fb.group({
        input1: ['', Validators.required],
        select1: ['', Validators.required],
        dynamicInputs: this.fb.array([])
      })
    });
  }

  get dynamicInputs() {
    return this.myForm.get('myGroup.dynamicInputs') as FormArray;
  }

  addDynamicInput() {
    this.dynamicInputs.push(this.fb.group({
      value: ['', Validators.required]
    }));
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

}

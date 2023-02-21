import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form', () => {
    expect(component.myForm).toBeDefined();
  });

  it('should validate required fields', () => {
    const input1 = component.myForm.controls['myGroup']['controls']['input1'];
    input1.setValue('');
    expect(input1.errors['required']).toBeTruthy();

    const select1 = component.myForm.controls['myGroup']['controls']['select1'];
    select1.setValue('');
    expect(select1.errors['required']).toBeTruthy();
  });

  it('should add dynamic inputs', () => {
    const dynamicInputs = component.myForm.controls['myGroup']['controls']['dynamicInputs'] as FormArray;
    component.addDynamicInput();
    expect(dynamicInputs.length).toBe(1);
  });

  it('should submit the form', () => {
    const onSubmitSpy = jest.spyOn(component, 'onSubmit');
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(onSubmitSpy).toHaveBeenCalled();
  });
});

import { Router } from '@angular/router';
import { CategoryService } from './../../../shared/services/category.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  fetching = false;
  error: string = null;

  constructor(private categoryService: CategoryService, private router: Router) { }

  onSubmit() {
    this.fetching = true;
    this.categoryService.addCategory(
      this.form.value.name,
      this.form.value.color,
    ).subscribe((id: number) => {
      this.fetching = false;
      this.error = null;
      this.router.navigate(['/dashboard', 'categories'], { queryParams: { new: id } });
    }, (error: any) => {
      this.fetching = false;
      this.error = error.error.message;
    });
  }
}

import { Category } from './../../../shared/models/util.models';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../shared/services/category.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  category: Category;
  fetching = false;
  success = false;
  error: string = null;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params.id;

    this.categoryService.getCategory(id).subscribe((category: Category) => {
      this.category = category;
    }, () => {
      this.router.navigate(['/dashboard', 'categories']);
    });
  }

  onSubmit() {
    this.fetching = true;
    this.success = false;

    this.categoryService.updateCategory(
      this.category.id,
      this.form.value.name,
      this.form.value.color,
    ).subscribe(() => {
      this.fetching = false;
      this.success = true;
      this.error = null;
    }, (error: any) => {
      this.fetching = false;
      this.success = false;
      this.error = error.error.message;
    });
  }
}

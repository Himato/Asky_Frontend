import { CategoryService } from './../../../shared/services/category.service';
import { AdminCategory } from './../../../shared/models/util.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: AdminCategory[];
  fetching = true;
  id: number;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.queryParams.new;

    this.categoryService.getAdminCategories().subscribe((categories: AdminCategory[]) => {
      this.categories = categories;
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }

}

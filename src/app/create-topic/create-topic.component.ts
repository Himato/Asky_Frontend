import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from './../shared/services/topic.service';
import { CategoryService } from './../shared/services/category.service';
import { NgForm } from '@angular/forms';
import { Category, UserTopic } from './../shared/models/util.models';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { lookup } from 'dns';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  @ViewChild('content', { static: false }) content: ElementRef;
  categories: Category[];
  topic: UserTopic;
  fetching = false;
  submitting = false;
  succeed = false;
  error: string = null;

  constructor(
    private categoryService: CategoryService,
    private topicService: TopicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    if (!!id) {
      this.fetching = true;
      this.topicService.getUserTopic(id).subscribe((topic: UserTopic) => {
        this.topic = topic;

        this.fetching = false;
      }, () => {
        this.router.navigate(['/notfound']);
      });
    }

    this.categoryService.categories.subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    this.submitting = true;
    this.succeed = false;
    this.error = null;

    if (!!this.topic) {
      this.topicService.updateTopic(
        this.topic.id,
        this.getContent(),
        this.form.value.categoryId
      ).subscribe(() => {
        this.submitting = false;
        this.succeed = true;
      }, (error: any) => {
        this.submitting = false;
        this.error = error.error.message;
      });
    } else {
      this.topicService.addTopic(
        this.form.value.title,
        this.getContent(),
        this.form.value.categoryId
      ).subscribe((uri: string) => {
        this.submitting = false;
        this.error = null;
        this.router.navigate(['t', uri]);
      }, (error: any) => {
        this.submitting = false;
        this.error = error.error.message;
      });
    }
  }

  onSelect(command: string) {
    document.execCommand(command);
  }

  getContent(): string {
    // const ele = (this.content.nativeElement as Element).cloneNode(true) as Element;

    // const loop = (node: Element) => {
    //   if (node.childNodes.length === 0) {
    //     node.innerHTML = this.clean(node.textContent);
    //   } else {
    //     node.childNodes.forEach(loop);
    //   }
    // };

    // ele.childNodes.forEach(loop);

    return this.content.nativeElement.innerHTML;
  }

  clean(str: string): string {
    return str
      .replace(/(<[a-zA-Z/]+>)/g, `<code>$1</code>`);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.submitting) {
      return true;
    }

    const content = this.getContent();

    if (!!this.topic && (this.topic.categoryId !== this.form.value.categoryId || this.topic.content !== content)) {
      return window.confirm('Do you want to discard the changes?');
    } else if (!this.topic && content !== '') {
      return window.confirm('Do you want to discard the changes?');
    }

    return true;
  }
}

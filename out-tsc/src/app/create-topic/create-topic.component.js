import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let CreateTopicComponent = class CreateTopicComponent {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    ngOnInit() {
        this.categoryService.categories.subscribe((categories) => {
            this.categories = categories;
        });
    }
    onSubmit() {
        console.log(this.form.value);
        console.log(this.content.nativeElement.innerHTML);
    }
    onSelect($tag) {
        this.content.nativeElement.focus();
        if (typeof window.getSelection !== 'undefined') {
            const selection = window.getSelection();
            if (selection.rangeCount) {
                const range = selection.getRangeAt(0);
                const isSingleElement = range.startContainer === range.endContainer;
                // Checks if there's actually a selected text
                if (range.startOffset === range.endOffset
                    && isSingleElement) {
                    return;
                }
                // Checks if the selected text inside the content-form
                if (!this.content.nativeElement.contains(range.commonAncestorContainer)) {
                    return;
                }
                const contents = range.cloneContents();
                const container = document.createElement($tag);
                container.appendChild(contents);
                container.querySelectorAll($tag).forEach((ele) => {
                    ele.outerHTML = ele.innerHTML;
                });
                if (isSingleElement) {
                    const parent = range.startContainer.parentElement;
                    // Checks if we're dealing with the whole element
                    if (parent.innerHTML.length === range.endOffset - range.startOffset) {
                        // Checks if the selected text has the same tag
                        if (parent.tagName.toLowerCase() === $tag) {
                            parent.outerHTML = parent.innerHTML;
                        }
                    }
                    else {
                        let content = '';
                        content = parent.innerHTML.substring(0, range.startOffset);
                        try {
                            content += this.createInner($tag, parent.innerHTML.substring(range.startOffset, range.endOffset), parent, []);
                        }
                        catch (e) {
                            content += e;
                        }
                        content += parent.innerHTML.substring(range.endOffset, parent.innerHTML.length);
                        const index = parent.outerHTML.indexOf(parent.innerHTML);
                        // parent.outerHTML = parent.outerHTML.substring(0, index) + content +
                        //   parent.outerHTML.substring(index + parent.innerHTML.length);
                        parent.innerHTML = content;
                    }
                }
                else {
                    range.deleteContents();
                    range.insertNode(container);
                }
            }
            selection.removeAllRanges();
        }
    }
    createStartTag(tag) {
        return `<${tag}>`;
    }
    createEndTag(tag) {
        return `</${tag}>`;
    }
    createInner(tag, content, currentParent, currentTags) {
        if (currentParent.classList.contains('content-form')) {
            throw this.createStartTag(tag) + content + this.createEndTag(tag);
        }
        const tagName = currentParent.tagName.toLowerCase();
        if (tagName === tag) {
            let startTags = '';
            let endTags = '';
            currentTags.forEach((value) => {
                startTags += this.createStartTag(value);
                endTags = this.createEndTag(value) + endTags;
            });
            return this.createEndTag(tagName) +
                startTags + content + endTags +
                this.createStartTag(tagName);
        }
        currentTags.push(tagName);
        return this.createEndTag(tagName) +
            this.createInner(tag, content, currentParent.parentElement, currentTags) +
            this.createStartTag(tagName);
    }
};
__decorate([
    ViewChild('form', { static: false })
], CreateTopicComponent.prototype, "form", void 0);
__decorate([
    ViewChild('content', { static: false })
], CreateTopicComponent.prototype, "content", void 0);
CreateTopicComponent = __decorate([
    Component({
        selector: 'app-create-topic',
        templateUrl: './create-topic.component.html',
        styleUrls: ['./create-topic.component.css']
    })
], CreateTopicComponent);
export { CreateTopicComponent };
//# sourceMappingURL=create-topic.component.js.map
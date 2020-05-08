import AbstractComponent from "./abstract-component.js";

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  _createFilterMarkup(filter, isChecked) {
    const {title, count} = filter;

    return (
      `<input
        type="radio"
        id="filter__${title}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${title}" class="filter__label">
        ${title} <span class="filter__${title}-count">${count}</span>
      </label>`
    );
  }

  getTemplate() {
    const filtersMarkup = this._filters
      .map((it, i) => this._createFilterMarkup(it, i === 0))
      .join(`\n`);

    return (
      `<section class="main__filter filter container">
        ${filtersMarkup}
      </section>`
    );
  }

  setFilterChangeHandler(cb) {

  }
}

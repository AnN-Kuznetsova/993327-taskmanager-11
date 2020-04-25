import AbstractComponent from "./abstract-component.js";

const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return (
      `<div class="board__filter-list">
        <a href="#" class="board__filter" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
        <a href="#" class="board__filter" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
        <a href="#" class="board__filter" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
      </div>`
    );
  }

  getSortType() {
    return this._currentSortType;
  }

  setOnSortTypeChange(cb) {
    const onSortTypeButtonClick = (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      cb(this._currentSortType);
    };

    this.getElement().addEventListener(`click`, onSortTypeButtonClick);
  }

  getSortedTasks(tasks, from, to) {
    const sortType = this._currentSortType;
    let sortedTasks = [];
    const showingTasks = tasks.slice();

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = showingTasks;
        break;
      default:
    }

    return sortedTasks.slice(from, to);
  }
}

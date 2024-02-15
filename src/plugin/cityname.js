import { geonames } from "../api";
import events from "minivents";
import debounce from "debounce";
import assign from "core-js/library/fn/object/assign";
import find from "core-js/library/fn/array/find";
import escapeRegexp from "core-js/library/fn/regexp/escape";

const Key = { BACK: 8, TAB: 9, ENTER: 13, UP: 38, DOWN: 40 };
const CONTAINER_TEMPLATE =
  '<div class="tp-autocomplete"><ul class="tp-ac__list"></ul></div>';
const INPUT_CLASS = "tp-ac__input";
const itemWrapperTemplate = (item) => `<li class="tp-ac__item">${item}</li>`;
const NO_RESULTS_TEMPLATE =
  '<li class="tp-ac__item no-results">No matches</li>';
const GEOLOCATE_TEMPLATE =
  '<li class="tp-ac__item geolocate">Detect my current location</li>';

// Default item template, wraps title matches
const ITEM_TEMPLATE = function renderItem(item) {
  return this.wrapMatches(item.name);
};
HTMLElement.prototype.on = HTMLElement.prototype.addEventListener;
HTMLElement.prototype.off = HTMLElement.prototype.removeEventListener;

class GeoNamesAutocomplete {
  get query() {
    return this._query;
  }
  set query(query) {
    if (query === this._query) return query;

    this._query = query;
    this.el.value = query;
    this.emit("querychange", query);
  }
  constructor({
    el = null,
    maxItems = 10,
    itemTemplate = ITEM_TEMPLATE,
    geoLocate = true,
    query = "",
  } = {}) {
    events(this);

    const elem = typeof el === "string" ? document.querySelector(el) : el;
    this.setupInput(elem);

    assign(this, {
      maxItems,
      geoLocate,
      results: [],
      itemTemplate,
      _activeIndex: 0,
      _cache: {},
      _query: this.query,
    });

    this.getCities = debounce(this.getCities, 200);
    return this;
  }

  static init(el, options = {}) {
    const opt =
      typeof el === "string" || el instanceof HTMLInputElement
        ? assign(options, { el })
        : el;
    return new GeoNamesAutocomplete(opt);
  }

  destroy() {
    this.el.off("input", this.oninput);
    this.el.off("keydown", this.onkeydown);
    this.el.off("focus", this.onfocus);
    this.el.off("blur", this.onblur);
    this.el.off("click", this.onclick);

    this.el.classList.remove(INPUT_CLASS);

    const containerParent = this.container.parentNode;
    containerParent.replaceChild(
      this.el.parentNode.removeChild(this.el),
      this.container
    );
  }

  async clear() {
    this.results = [];
    await this.selectByIndex(0);
  }

  setupInput(el) {
    if (!el || !(el instanceof HTMLInputElement))
      throw new Error("Invalid element given");

    el.insertAdjacentHTML("beforebegin", CONTAINER_TEMPLATE);
    Object.defineProperty(this, "container", { value: el.previousSibling });
    Object.defineProperty(this, "list", { value: this.container.firstChild });

    const input = this.container.insertBefore(
      el.parentNode.removeChild(el),
      this.list
    );
    input.classList.add(INPUT_CLASS);

    Object.defineProperty(this, "el", { enumerable: true, value: input });

    this.el.on("input", this.oninput.bind(this));
    this.el.on("keydown", this.onkeydown.bind(this));
    this.el.on("focus", this.onfocus.bind(this));
    this.el.on("blur", this.onblur.bind(this));
    this.el.on("click", this.onclick.bind(this));

    this.list.on("mousedown", this.onlistclick.bind(this));
  }

  async onlistclick(event) {
    const index = [].indexOf.call(
      this.list.children,
      event.target.closest(".tp-ac__item")
    );
   await this.selectByIndex(index);
  }

  onclick() {
    this.el.select();
  }

  onfocus() {
    this.renderList();
  }

  onblur() {
    this.list.innerHTML = "";
  }

  oninput() {
    this._query = this.el.value;
    this.fetchResults(() => this.renderList());
  }

  async onkeydown(event) {
    const code = event.keyCode;

    if ([Key.UP, Key.DOWN].indexOf(code) !== -1) event.preventDefault();

    switch (code) {
      case Key.BACK:
        if (this.value || this.query.length === 1) this.clear();
        break;
      case Key.ENTER:
        if (!this.value && this.query) event.preventDefault();
       await this.selectByIndex(this.activeIndex);
        break;
      case Key.TAB:
        if (!this.value) await this.selectByIndex(this.activeIndex);
        break;
      case Key.UP:
        this.activeIndex = Math.max(0, this.activeIndex - 1);
        break;
      case Key.DOWN:
        this.activeIndex = Math.min(
          this.results.length - 1,
          this.activeIndex + 1
        );
        break;
    }
  }

  async selectByIndex(index) {
    this.activeIndex = index;
    const oldValue = this.value;
    this.value = this.results[index] || null;

    const isGeolocate =
      this.list.firstChild &&
      this.list.firstChild.classList.contains("geolocate");
    if (isGeolocate) {
      try {
        const result = await this.currentLocation();
        if (result && this.value !== result) {
          this.value = result;
          this.emit("change", this.value);
        }
        this.list.innerHTML = "";
        this.query =
          this.value &&
          `${this.value.name}, ${this.value.adminName1}, ${this.value.countryCode}`;
      } catch (error) {
        console.error("Error detecting location:", error);
        // Handle the error appropriately
      }
    } else {
      try {
        const timezone = await this.getTzData(this.value);
        this.value.timezone = timezone;
        this.results[index] = this.value;
      } catch (error) {
        console.error("Error fetching timezone data:", error);
      }
    }

    if (oldValue !== this.value && !isGeolocate)
      this.emit("change", this.value);

    this.list.innerHTML = "";
    this.query = this.value
      ? this.value.name +
        " , " +
        this.value.adminName1 +
        " , " +
        this.value.countryCode
      : "";
  }

  wrapMatches(str = "") {
    let res = str;

    this.query
      .split(/[\,\s]+/)
      .filter((qr) => !!qr)
      .forEach((query) => {
        const matcher = new RegExp(
          escapeRegexp(query) + "(?![^<]*>|[^<>]*</)",
          "gi"
        );
        res = res.replace(matcher, "<span>$&</span>");
      });

    return res;
  }

  renderList({ geoLocate = this.geoLocate } = {}) {
    if (this.results) {
      let results = this.results
        .map((res) => {
          res.title =
            res.name + " , " + res.adminName1 + " , " + res.countryCode;
          return itemWrapperTemplate(this.itemTemplate(res));
        })
        .slice(0, this.maxItems)
        .join("");
      if (!results && this.query !== "" && !this.value)
        results = NO_RESULTS_TEMPLATE;
      if (this.query === "" && geoLocate) results = GEOLOCATE_TEMPLATE;
      this.list.innerHTML = results;

      this.activeIndex = 0;
    }
  }

  getResultByTitle(title) {
    if (!this.results || !title) return null;
    return find(this.results, (res) => res.title.indexOf(title) !== -1);
  }

  async fetchResults(cb = function noop() {}) {
    const query = this.query ? this.query.trim() : "";
    if (query === "") {
      this.results = [];
      this.renderList();
      return;
    }

    try {
      const results = await geonames.search({
        q: query,
        maxRows: this.maxItems,
      });
      this.results = results.geonames;
      //   console.log(this.results);
      cb();
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }

  async getTzData(selectedItem) {
    return geonames
      .timezone({
        lat: selectedItem.lat,
        lng: selectedItem.lng,
      })
      .then((response) => {
        // Extract timezone data from the response
        const timezone = response.timezoneId;
        return timezone;
      })
      .catch((error) => {
        console.error("Error fetching timezone data:", error);
        throw error;
      });
  }

  async currentLocation() {
    return new Promise((resolve, reject) => {
      this.oldPlaceholder = this.el.placeholder;
      this.el.placeholder = "Detecting location...";
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const results = await geonames.findNearby({
              lat: `${latitude}`,
              lng: `${longitude}`,
              maxRows: this.maxItems,
            });
            this.results = results.geonames[0];
            this.results.title =
              this.results.name +
              " , " +
              this.results.adminName1 +
              " , " +
              this.results.countryCode;
              const timezone = await this.getTzData(this.results);
              this.results.timezone = timezone;
              this.el.value = this.results.title;
              resolve(this.results);
          } catch (error) {
            console.error("Error fetching results:", error);
          }
        },
        (error) => {
          reject(error);
        },
        { timeout: 5000 }
      );
    });
  }
}
export default GeoNamesAutocomplete;

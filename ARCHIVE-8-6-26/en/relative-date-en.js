/*

<relative-date datetime="1971-09-03" prefix="Posted" suffix="ago"/>

Outputs:

<relative-date>Posted 52 years ago</relative-date>
src = https://gist.github.com/deanebarker/aeaa0485cf2cbc6c068dd65ba49ae500
*/

class RelativeDate extends HTMLElement {

    static get observedAttributes() {
        return ["datetime", "prefix", "suffix"];
    }

    get datetime() {
        return this.getAttribute("datetime");
    }

    set datetime(value) {
        this.setAttribute("datetime", value);
    }

    get prefix() {
        return this.getAttribute("prefix") ?? '';
    }

    set prefix(value) {
        this.setAttribute("prefix", value);
    }

    get suffix() {
        return this.getAttribute("suffix") ?? '';
    }

    set suffix(value) {
        this.setAttribute("suffix", value);
    }

    set title(value) {
        this.setAttribute("title", value);
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.calculate();
    }

    attributeChangedCallback() {
        this.calculate();
    }

    calculate() {
        let date = Date.parse(this.datetime);
        this.innerHTML = this.getRelativeDate(date);
    }

    format(count, singular, plural = null) {

        let prefix = this.prefix.length == 0 ? '' : this.prefix + ' ';
        let suffix = this.suffix.length == 0 ? '' : ' ' + this.suffix;
        let unit = count == 1 ? singular : !plural ? singular + "s" : plural; // NOTE: technically I don't do anything but add an s...

        return prefix + count + " " + unit + suffix;
    }

    getRelativeDate(date) {

        var delta = Math.round((Date.now() - date) / 1000);

        var minute = 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7,
            month = day * 30,
            year = day * 365;

        // This will bail out at the first one it matches...
        if (delta < day) {
            return this.prefix.length == 0 ? this.prefix + " today" : this.prefix + " today";
        } else if (delta < 2 * day) {
            return this.prefix.length == 0 ? this.prefix + " yesterday" : this.prefix + " yesterday";
        } else if (delta < week) {
            return this.format(Math.floor(delta / day), "day", null);
        } else if (delta < month * 1.5) {
            return this.format(Math.floor(delta / week), "week", null);
        } else if (delta < year) {
            return this.format(Math.floor(delta / month), "month", null);
        } else {
            return this.format(Math.floor(delta / year), "year", null);
        }
    }
}
customElements.define("relative-date", RelativeDate);

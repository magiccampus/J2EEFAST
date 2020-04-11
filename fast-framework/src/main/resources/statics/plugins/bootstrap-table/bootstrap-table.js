/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * version: 1.11.0
 * https://github.com/wenzhixin/bootstrap-table/
 */

/*!
 * 基于源码修改
 * @author ZhouHuan
 * @version 2020-02-10
 * --------------------------------------------------
 * 1.后台分页时前台删除最后一页所有数据refresh刷新后无数据问题
 * 2.新增表格头自动居中适配问题
 * 3.新增columns 列 class:'action' 样式适配图标按钮
 * 4.修改点击toolbar 视图切换 -->浮动提示框特效
 * 5.修改记住我选择实例组 删除BUG问题
 * --------------------------------------------------
 */
(function (j) {
    var k = null;
    var m = function (u) {
        var s = arguments,
            r = true,
            t = 1;
        u = u.replace(/%s/g, function () {
            var v = s[t++];
            if (typeof v === "undefined") {
                r = false;
                return ""
            }
            return v
        });
        return r ? u : ""
    };
    var c = function (t, v, u, s) {
        var r = "";
        j.each(t, function (w, x) {
            if (x[v] === s) {
                r = x[u];
                return false
            }
            return true
        });
        return r
    };
    var i = function (s, t) {
        var r = -1;
        j.each(s, function (u, v) {
            if (v.field === t) {
                r = u;
                return false
            }
            return true
        });
        return r
    };
    var l = function (u) {
        var y, x, w, A = 0,
            B = [];
        for (y = 0; y < u[0].length; y++) {
            A += u[0][y].colspan || 1
        }
        for (y = 0; y < u.length; y++) {
            B[y] = [];
            for (x = 0; x < A; x++) {
                B[y][x] = false
            }
        }
        for (y = 0; y < u.length; y++) {
            for (x = 0; x < u[y].length; x++) {
                var s = u[y][x],
                    v = s.rowspan || 1,
                    t = s.colspan || 1,
                    z = j.inArray(false, B[y]);
                if (t === 1) {
                    s.fieldIndex = z;
                    if (typeof s.field === "undefined") {
                        s.field = z
                    }
                }
                for (w = 0; w < v; w++) {
                    B[y + w][z] = true
                }
                for (w = 0; w < t; w++) {
                    B[y][z + w] = true
                }
            }
        }
    };
    var a = function () {
        if (k === null) {
            var t = j("<p/>").addClass("fixed-table-scroll-inner"),
                u = j("<div/>").addClass("fixed-table-scroll-outer"),
                s, r;
            u.append(t);
            j("body").append(u);
            s = t[0].offsetWidth;
            u.css("overflow", "scroll");
            r = t[0].offsetWidth;
            if (s === r) {
                r = u[0].clientWidth
            }
            u.remove();
            k = s - r
        }
        return k
    };
    var q = function (s, u, t, r) {
        var v = u;
        if (typeof u === "string") {
            var w = u.split(".");
            if (w.length > 1) {
                v = window;
                j.each(w, function (x, y) {
                    v = v[y]
                })
            } else {
                v = window[u]
            }
        }
        if (typeof v === "object") {
            return v
        }
        if (typeof v === "function") {
            return v.apply(s, t)
        }
        if (!v && typeof u === "string" && m.apply(this, [u].concat(t))) {
            return m.apply(this, [u].concat(t))
        }
        return r
    };
    var f = function (s, r, w) {
        var x = Object.getOwnPropertyNames(s),
            u = Object.getOwnPropertyNames(r),
            v = "";
        if (w) {
            if (x.length !== u.length) {
                return false
            }
        }
        for (var t = 0; t < x.length; t++) {
            v = x[t];
            if (j.inArray(v, u) > -1) {
                if (s[v] !== r[v]) {
                    return false
                }
            }
        }
        return true
    };
    var p = function (r) {
        if (typeof r === "string") {
            return r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/`/g, "&#x60;")
        }
        return r
    };
    var d = function (s) {
        var r = 0;
        s.children().each(function () {
            if (r < j(this).outerHeight(true)) {
                r = j(this).outerHeight(true)
            }
        });
        return r
    };
    var g = function (t) {
        for (var r in t) {
            var s = r.split(/(?=[A-Z])/).join("-").toLowerCase();
            if (s !== r) {
                t[s] = t[r];
                delete t[r]
            }
        }
        return t
    };
    var o = function (t, w, s) {
        var u = t;
        if (typeof w !== "string" || t.hasOwnProperty(w)) {
            return s ? p(t[w]) : t[w]
        }
        var r = w.split(".");
        for (var v in r) {
            u = u && u[r[v]]
        }
        return s ? p(u) : u
    };
    var b = function () {
        return !!(navigator.userAgent.indexOf("MSIE ") > 0 || !! navigator.userAgent.match(/Trident.*rv\:11\./))
    };
    var h = function () {
        if (!Object.keys) {
            Object.keys = (function () {
                var t = Object.prototype.hasOwnProperty,
                    u = !({
                        toString: null
                    }).propertyIsEnumerable("toString"),
                    s = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                    r = s.length;
                return function (x) {
                    if (typeof x !== "object" && (typeof x !== "function" || x === null)) {
                        throw new TypeError("Object.keys called on non-object")
                    }
                    var v = [],
                        y, w;
                    for (y in x) {
                        if (t.call(x, y)) {
                            v.push(y)
                        }
                    }
                    if (u) {
                        for (w = 0; w < r; w++) {
                            if (t.call(x, s[w])) {
                                v.push(s[w])
                            }
                        }
                    }
                    return v
                }
            }())
        }
    };
    var e = function (s, r) {
        this.options = r;
        this.$el = j(s);
        this.$el_ = this.$el.clone();
        this.timeoutId_ = 0;
        this.timeoutFooter_ = 0;
        this.init()
    };
    e.DEFAULTS = {
        classes: "table table-hover",
        locale: undefined,
        height: undefined,
        undefinedText: "-",
        emptyText:"-",
        sortName: undefined,
        sortOrder: "asc",
        sortStable: false,
        striped: false,
        columns: [
            []
        ],
        data: [],
        dataField: "rows",
        method: "get",
        url: undefined,
        ajax: undefined,
        cache: true,
        contentType: "application/json",
        dataType: "json",
        ajaxOptions: {},
        queryParams: function (r) {
            return r
        },
        queryParamsType: "limit",
        responseHandler: function (r) {
            return r
        },
        pagination: false,
        onlyInfoPagination: false,
        sidePagination: "client",
        totalRows: 0,
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        paginationHAlign: "right",
        paginationVAlign: "bottom",
        paginationDetailHAlign: "left",
        paginationPreText: "&lsaquo;",
        paginationNextText: "&rsaquo;",
        search: false,
        searchOnEnterKey: false,
        strictSearch: false,
        searchAlign: "right",
        selectItemName: "btSelectItem",
        showHeader: true,
        showFooter: false,
        showColumns: false,
        showSearch: false,
        showPageGo: false,
        showPaginationSwitch: false,
        showRefresh: false,
        showToggle: false,
        buttonsAlign: "right",
        smartDisplay: true,
        escape: false,
        firstLoad: true,
        minimumCountColumns: 1,
        idField: undefined,
        uniqueId: undefined,
        cardView: false,
        detailView: false,
        detailFormatter: function (r, s) {
            return ""
        },
        trimOnSearch: true,
        clickToSelect: false,
        singleSelect: false,
        toolbar: undefined,
        toolbarAlign: "left",
        checkboxHeader: true,
        sortable: true,
        silentSort: true,
        maintainSelected: false,
        searchTimeOut: 500,
        searchText: "",
        iconSize: undefined,
        buttonsClass: "default",
        iconsPrefix: "glyphicon",
        icons: {
            search: "glyphicon-search",
            paginationSwitchDown: "glyphicon-collapse-down icon-chevron-down",
            paginationSwitchUp: "glyphicon-collapse-up icon-chevron-up",
            refresh: "glyphicon-refresh icon-refresh",
            toggle: "glyphicon-list-alt icon-list-alt",
            columns: "glyphicon-th icon-th",
            detailOpen: "glyphicon-plus icon-plus",
            detailClose: "glyphicon-minus icon-minus"
        },
        customSearch: j.noop,
        customSort: j.noop,
        rowStyle: function (s, r) {
            return {}
        },
        rowAttributes: function (s, r) {
            return {}
        },
        footerStyle: function (s, r) {
            return {}
        },
        onAll: function (s, r) {
            return false
        },
        onClickCell: function (t, s, u, r) {
            return false
        },
        onDblClickCell: function (t, s, u, r) {
            return false
        },
        onClickRow: function (s, r) {
            return false
        },
        onDblClickRow: function (s, r) {
            return false
        },
        onSort: function (s, r) {
            return false
        },
        onCheck: function (r) {
            return false
        },
        onUncheck: function (r) {
            return false
        },
        onCheckAll: function (r) {
            return false
        },
        onUncheckAll: function (r) {
            return false
        },
        onCheckSome: function (r) {
            return false
        },
        onUncheckSome: function (r) {
            return false
        },
        onLoadSuccess: function (r) {
            return false
        },
        onLoadError: function (r) {
            return false
        },
        onColumnSwitch: function (s, r) {
            return false
        },
        onPageChange: function (s, r) {
            return false
        },
        onSearch: function (r) {
            return false
        },
        onShowSearch: function () {
            return false
        },
        onToggle: function (r) {
            return false
        },
        onPreBody: function (r) {
            return false
        },
        onPostBody: function () {
            return false
        },
        onPostHeader: function () {
            return false
        },
        onExpandRow: function (r, t, s) {
            return false
        },
        onCollapseRow: function (r, s) {
            return false
        },
        onRefreshOptions: function (r) {
            return false
        },
        onRefresh: function (r) {
            return false
        },
        onResetView: function () {
            return false
        }
    };
    e.LOCALES = {};
    e.LOCALES["en-US"] = e.LOCALES.en = {
        formatLoadingMessage: function () {
            return "Loading, please wait..."
        },
        formatRecordsPerPage: function (r) {
            return m("%s rows per page", r)
        },
        formatShowingRows: function (t, r, s) {
            return m("Showing %s to %s of %s rows", t, r, s)
        },
        formatPageGo: function () {
            return "跳转"
        },
        formatDetailPagination: function (r) {
            return m("Showing %s rows", r)
        },
        formatSearch: function () {
            return "Search"
        },
        formatNoMatches: function () {
            return "No matching records found"
        },
        formatPaginationSwitch: function () {
            return "Hide/Show pagination"
        },
        formatRefresh: function () {
            return "Refresh"
        },
        formatToggle: function () {
            return "Toggle"
        },
        formatColumns: function () {
            return "Columns"
        },
        formatAllRows: function () {
            return "All"
        }
    };
    j.extend(e.DEFAULTS, e.LOCALES["en-US"]);
    e.COLUMN_DEFAULTS = {
        radio: false,
        checkbox: false,
        checkboxEnabled: true,
        field: undefined,
        title: undefined,
        titleTooltip: undefined,
        "class": undefined,
        align: undefined,
        halign: undefined,
        hbgr: undefined,
        falign: undefined,
        valign: undefined,
        width: undefined,
        sortable: false,
        order: "asc",
        visible: true,
        switchable: true,
        clickToSelect: true,
        formatter: undefined,
        footerFormatter: undefined,
        events: undefined,
        sorter: undefined,
        sortName: undefined,
        cellStyle: undefined,
        searchable: true,
        searchFormatter: true,
        cardVisible: true
    };
    e.EVENTS = {
        "all.bs.table": "onAll",
        "click-cell.bs.table": "onClickCell",
        "dbl-click-cell.bs.table": "onDblClickCell",
        "click-row.bs.table": "onClickRow",
        "dbl-click-row.bs.table": "onDblClickRow",
        "sort.bs.table": "onSort",
        "check.bs.table": "onCheck",
        "uncheck.bs.table": "onUncheck",
        "check-all.bs.table": "onCheckAll",
        "uncheck-all.bs.table": "onUncheckAll",
        "check-some.bs.table": "onCheckSome",
        "uncheck-some.bs.table": "onUncheckSome",
        "load-success.bs.table": "onLoadSuccess",
        "load-error.bs.table": "onLoadError",
        "column-switch.bs.table": "onColumnSwitch",
        "page-change.bs.table": "onPageChange",
        "search.bs.table": "onSearch",
        "toggle.bs.table": "onToggle",
        "show-search.bs.table": "onShowSearch",
        "pre-body.bs.table": "onPreBody",
        "post-body.bs.table": "onPostBody",
        "post-header.bs.table": "onPostHeader",
        "expand-row.bs.table": "onExpandRow",
        "collapse-row.bs.table": "onCollapseRow",
        "refresh-options.bs.table": "onRefreshOptions",
        "reset-view.bs.table": "onResetView",
        "refresh.bs.table": "onRefresh"
    };
    e.prototype.init = function () {
        this.initLocale();
        this.initContainer();
        this.initTable();
        this.initHeader();
        this.initData();
        this.initFooter();
        this.initToolbar();
        this.initPagination();
        this.initBody();
        this.initSearchText();
        this.initServer()
    };
    e.prototype.initLocale = function () {
        if (this.options.locale) {
            var r = this.options.locale.split(/-|_/);
            r[0].toLowerCase();
            if (r[1]) {
                r[1].toUpperCase()
            }
            if (j.fn.bootstrapTable.locales[this.options.locale]) {
                j.extend(this.options, j.fn.bootstrapTable.locales[this.options.locale])
            } else {
                if (j.fn.bootstrapTable.locales[r.join("-")]) {
                    j.extend(this.options, j.fn.bootstrapTable.locales[r.join("-")])
                } else {
                    if (j.fn.bootstrapTable.locales[r[0]]) {
                        j.extend(this.options, j.fn.bootstrapTable.locales[r[0]])
                    }
                }
            }
        }
    };
    e.prototype.initContainer = function () {
        this.$container = j(['<div class="bootstrap-table">', '<div class="fixed-table-toolbar"></div>', this.options.paginationVAlign === "top" || this.options.paginationVAlign === "both" ? '<div class="fixed-table-pagination" style="clear: both;"></div>' : "", '<div class="fixed-table-container">', '<div class="fixed-table-header"><table></table></div>', '<div class="fixed-table-body">', '<div class="fixed-table-loading">', this.options.formatLoadingMessage(), "</div>", "</div>", '<div class="fixed-table-footer"><table><tr></tr></table></div>', this.options.paginationVAlign === "bottom" || this.options.paginationVAlign === "both" ? '<div class="fixed-table-pagination"></div>' : "", "</div>", "</div>"].join(""));
        this.$container.insertAfter(this.$el);
        this.$tableContainer = this.$container.find(".fixed-table-container");
        this.$tableHeader = this.$container.find(".fixed-table-header");
        this.$tableBody = this.$container.find(".fixed-table-body");
        this.$tableLoading = this.$container.find(".fixed-table-loading");
        this.$tableFooter = this.$container.find(".fixed-table-footer");
        this.$toolbar = this.$container.find(".fixed-table-toolbar");
        this.$pagination = this.$container.find(".fixed-table-pagination");
        this.$tableBody.append(this.$el);
        this.$container.after('<div class="clearfix"></div>');
        this.$el.addClass(this.options.classes);
        if (this.options.striped) {
            this.$el.addClass("table-striped")
        }
        if (j.inArray("table-no-bordered", this.options.classes.split(" ")) !== -1) {
            this.$tableContainer.addClass("table-no-bordered")
        }
    };
    e.prototype.initTable = function () {
        var t = this,
            s = [],
            u = [];
        this.$header = this.$el.find(">thead");
        if (!this.$header.length) {
            this.$header = j("<thead></thead>").appendTo(this.$el)
        }
        this.$header.find("tr").each(function () {
            var v = [];
            j(this).find("th").each(function () {
                if (typeof j(this).data("field") !== "undefined") {
                    j(this).data("field", j(this).data("field") + "")
                }
                v.push(j.extend({}, {
                    title: j(this).html(),
                    "class": j(this).attr("class"),
                    titleTooltip: j(this).attr("title"),
                    rowspan: j(this).attr("rowspan") ? +j(this).attr("rowspan") : undefined,
                    colspan: j(this).attr("colspan") ? +j(this).attr("colspan") : undefined
                }, j(this).data()))
            });
            s.push(v)
        });
        if (!j.isArray(this.options.columns[0])) {
            this.options.columns = [this.options.columns]
        }
        this.options.columns = j.extend(true, [], s, this.options.columns);
        this.columns = [];
        l(this.options.columns);
        j.each(this.options.columns, function (w, v) {
            j.each(v, function (x, y) {
                y = j.extend({}, e.COLUMN_DEFAULTS, y);
                if (typeof y.fieldIndex !== "undefined") {
                    t.columns[y.fieldIndex] = y
                }
                t.options.columns[w][x] = y
            })
        });
        if (this.options.data.length) {
            return
        }
        var r = [];
        this.$el.find(">tbody>tr").each(function (w) {
            var v = {};
            v._id = j(this).attr("id");
            v._class = j(this).attr("class");
            v._data = g(j(this).data());
            j(this).find(">td").each(function (z) {
                var E = j(this),
                    B = +E.attr("colspan") || 1,
                    C = +E.attr("rowspan") || 1,
                    A, y;
                for (; r[w] && r[w][z]; z++) {}
                for (A = z; A < z + B; A++) {
                    for (y = w; y < w + C; y++) {
                        if (!r[y]) {
                            r[y] = []
                        }
                        r[y][A] = true
                    }
                }
                var D = t.columns[z].field;
                v[D] = j(this).html();
                v["_" + D + "_id"] = j(this).attr("id");
                v["_" + D + "_class"] = j(this).attr("class");
                v["_" + D + "_rowspan"] = j(this).attr("rowspan");
                v["_" + D + "_colspan"] = j(this).attr("colspan");
                v["_" + D + "_title"] = j(this).attr("title");
                v["_" + D + "_data"] = g(j(this).data())
            });
            u.push(v)
        });
        this.options.data = u;
        if (u.length) {
            this.fromHtml = true
        }
    };
    e.prototype.initHeader = function () {
        var t = this,
            r = {},
            s = [];
        this.header = {
            fields: [],
            styles: [],
            classes: [],
            formatters: [],
            events: [],
            sorters: [],
            sortNames: [],
            cellStyles: [],
            searchables: []
        };
        j.each(this.options.columns, function (v, u) {
            s.push("<tr>");
            if (v === 0 && !t.options.cardView && t.options.detailView) {
                s.push(m('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>', t.options.columns.length))
            }
            j.each(u, function (B, A) {
                var F = "",
                    C = "",
                    E = "",
                    w = "",
                    D = m(' class="%s"', A["class"]),
                    z = t.options.sortOrder || A.order,
                    y = "px",
                    x = A.width,
                    Q = "";
                if (A.width !== undefined && (!t.options.cardView)) {
                    if (typeof A.width === "string") {
                        if (A.width.indexOf("%") !== -1) {
                            y = "%"
                        }
                    }
                }
                if (A.width && typeof A.width === "string") {
                    x = A.width.replace("%", "").replace("px", "")
                }
                C = m("text-align: %s; ", A.halign ? A.halign : A.align);
                E = m("text-align: %s; ", A.align);
                Q = A.hbgr ? m("background-color: %s; ", A.hbgr) : '';
                w = m("vertical-align: %s; ", A.valign);
                w += m("width: %s; ", (A.checkbox || A.radio) && !x ? "36px" : (x ? x + y : undefined));
                if (typeof A.fieldIndex !== "undefined") {
                    t.header.fields[A.fieldIndex] = A.field;
                    t.header.styles[A.fieldIndex] = E + w;
                    t.header.classes[A.fieldIndex] = D;
                    t.header.formatters[A.fieldIndex] = A.formatter;
                    t.header.events[A.fieldIndex] = A.events;
                    t.header.sorters[A.fieldIndex] = A.sorter;
                    t.header.sortNames[A.fieldIndex] = A.sortName;
                    t.header.cellStyles[A.fieldIndex] = A.cellStyle;
                    t.header.searchables[A.fieldIndex] = A.searchable;
                    if (!A.visible) {
                        return
                    }
                    if (t.options.cardView && (!A.cardVisible)) {
                        return
                    }
                    r[A.field] = A
                }
                s.push("<th" + m(' title="%s"', A.titleTooltip), A.checkbox || A.radio ? m(' class="bs-checkbox %s"', A["class"] || "") : D, m(' style="%s"', C + w + Q), m(' rowspan="%s"', A.rowspan), m(' colspan="%s"', A.colspan), m(' data-field="%s"', A.field), "tabindex='0'", ">");
                s.push(m('<div class="th-inner %s">', t.options.sortable && A.sortable ? "sortable both" : ""));
                F = A.title;
                if (A.checkbox) {
                    if (!t.options.singleSelect && t.options.checkboxHeader) {
                        F = '<input name="btSelectAll" type="checkbox" />'
                    }
                    t.header.stateField = A.field
                }
                if (A.radio) {
                    F = "";
                    t.header.stateField = A.field;
                    t.options.singleSelect = true
                }
                s.push(F);
                s.push("</div>");
                s.push('<div class="fht-cell"></div>');
                s.push("</div>");
                s.push("</th>")
            });
            s.push("</tr>")
            //console.log("--->:"+s.join(""));
        });
        this.$header.html(s.join(""));
        this.$header.find("th[data-field]").each(function (u) {
            j(this).data(r[j(this).data("field")])
        });
        this.$container.off("click", ".th-inner").on("click", ".th-inner", function (u) {
            var v = j(this);
            if (t.options.detailView) {
                if (v.closest(".bootstrap-table")[0] !== t.$container[0]) {
                    return false
                }
            }
            if (t.options.sortable && v.parent().data().sortable) {
                t.onSort(u)
            }
        });
        this.$header.children().children().off("keypress").on("keypress", function (v) {
            if (t.options.sortable && j(this).data().sortable) {
                var u = v.keyCode || v.which;
                if (u == 13) {
                    t.onSort(v)
                }
            }
        });
        j(window).off("resize.bootstrap-table");
        if (!this.options.showHeader || this.options.cardView) {
            this.$header.hide();
            this.$tableHeader.hide();
            this.$tableLoading.css("top", 0)
        } else {
            this.$header.show();
            this.$tableHeader.show();
            this.$tableLoading.css("top", this.$header.outerHeight() + 1);
            this.getCaret();
            j(window).on("resize.bootstrap-table", j.proxy(this.resetWidth, this))
        }
        this.$selectAll = this.$header.find('[name="btSelectAll"]');
        this.$selectAll.off("click").on("click", function () {
            var u = j(this).prop("checked");
            t[u ? "checkAll" : "uncheckAll"]();
            t.updateSelected()
        })
    };
    e.prototype.initFooter = function () {
        if (!this.options.showFooter || this.options.cardView) {
            this.$tableFooter.hide()
        } else {
            this.$tableFooter.show()
        }
    };
    e.prototype.initData = function (s, r) {
        if (r === "append") {
            this.data = this.data.concat(s)
        } else {
            if (r === "prepend") {
                this.data = [].concat(s).concat(this.data)
            } else {
                this.data = s || this.options.data
            }
        }
        if (r === "append") {
            this.options.data = this.options.data.concat(s)
        } else {
            if (r === "prepend") {
                this.options.data = [].concat(s).concat(this.options.data)
            } else {
                this.options.data = this.data
            }
        }
        if (this.options.sidePagination === "server") {
            return
        }
        this.initSort()
    };
    e.prototype.initSort = function () {
        var u = this,
            t = this.options.sortName,
            r = this.options.sortOrder === "desc" ? -1 : 1,
            s = j.inArray(this.options.sortName, this.header.fields);
        if (this.options.customSort !== j.noop) {
            this.options.customSort.apply(this, [this.options.sortName, this.options.sortOrder]);
            return
        }
        if (s !== -1) {
            if (this.options.sortStable) {
                j.each(this.data, function (v, w) {
                    if (!w.hasOwnProperty("_position")) {
                        w._position = v
                    }
                })
            }
            this.data.sort(function (w, v) {
                if (u.header.sortNames[s]) {
                    t = u.header.sortNames[s]
                }
                var y = o(w, t, u.options.escape),
                    z = o(v, t, u.options.escape),
                    x = q(u.header, u.header.sorters[s], [y, z]);
                if (x !== undefined) {
                    return r * x
                }
                if (y === undefined || y === null) {
                    y = ""
                }
                if (z === undefined || z === null) {
                    z = ""
                }
                if (u.options.sortStable && y === z) {
                    y = w._position;
                    z = v._position
                }
                if (j.isNumeric(y) && j.isNumeric(z)) {
                    y = parseFloat(y);
                    z = parseFloat(z);
                    if (y < z) {
                        return r * -1
                    }
                    return r
                }
                if (y === z) {
                    return 0
                }
                if (typeof y !== "string") {
                    y = y.toString()
                }
                if (y.localeCompare(z) === -1) {
                    return r * -1
                }
                return r
            })
        }
    };
    e.prototype.onSort = function (r) {
        var t = r.type === "keypress" ? j(r.currentTarget) : j(r.currentTarget).parent(),
            s = this.$header.find("th").eq(t.index());
        this.$header.add(this.$header_).find("span.order").remove();
        if (this.options.sortName === t.data("field")) {
            this.options.sortOrder = this.options.sortOrder === "asc" ? "desc" : "asc"
        } else {
            this.options.sortOrder = t.data("order") === "asc" ? "desc" : "asc"
        }
        this.options.sortName = t.data("sortName") ? t.data("sortName") : t.data("field");
        this.trigger("sort", this.options.sortName, this.options.sortOrder);
        t.add(s).data("order", this.options.sortOrder);
        this.getCaret();
        if (this.options.sidePagination === "server") {
            this.initServer(this.options.silentSort);
            return
        }
        this.initSort();
        this.initBody()
    };
    e.prototype.initToolbar = function () {
        var u = this,
            t = [],
            w = 0,
            s, v, r = 0;
        if (this.$toolbar.find(".bs-bars").children().length) {
            j("body").append(j(this.options.toolbar))
        }
        this.$toolbar.html("");
        if (typeof this.options.toolbar === "string" || typeof this.options.toolbar === "object") {
            j(m('<div class="bs-bars pull-%s"></div>', this.options.toolbarAlign)).appendTo(this.$toolbar).append(j(this.options.toolbar))
        }
        t = [m('<div class="columns columns-%s btn-group pull-%s">', this.options.buttonsAlign, this.options.buttonsAlign)];
        if (typeof this.options.icons === "string") {
            this.options.icons = q(null, this.options.icons)
        }
        if (this.options.showSearch) {
            t.push(m('<button class="btn' + m(" btn-%s", this.options.buttonsClass) + m(" btn-%s", this.options.iconSize) + '" type="button" name="showSearch" title="%s">', this.options.formatSearch()), m('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.search), "</button>")
        }
        if (this.options.showPaginationSwitch) {
            t.push(m('<button class="btn' + m(" btn-%s", this.options.buttonsClass) + m(" btn-%s", this.options.iconSize) + '" type="button" name="paginationSwitch" title="%s">', this.options.formatPaginationSwitch()), m('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown), "</button>")
        }
        if (this.options.showRefresh) {
            t.push(m('<button class="btn' + m(" btn-%s", this.options.buttonsClass) + m(" btn-%s", this.options.iconSize) + '" type="button" name="refresh" title="%s">', this.options.formatRefresh()), m('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh), "</button>")
        }
        if (this.options.showToggle) {
            t.push(m('<button class="btn' + m(" btn-%s", this.options.buttonsClass) + m(" btn-%s", this.options.iconSize) + '" type="button" name="toggle" title="%s">', this.options.formatToggle()), m('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle), "</button>")
        }
        if (this.options.showColumns) {
            t.push(m('<div class="keep-open btn-group" title="%s">', this.options.formatColumns()), '<button type="button" class="btn' + m(" btn-%s", this.options.buttonsClass) + m(" btn-%s", this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', m('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns), ' <span class="caret"></span>', "</button>", '<ul class="dropdown-menu" role="menu">');
            j.each(this.columns, function (x, y) {
                if (y.radio || y.checkbox) {
                    return
                }
                if (u.options.cardView && !y.cardVisible) {
                    return
                }
                var z = y.visible ? ' checked="checked"' : "";
                if (y.switchable) {
                    t.push(m("<li>" + '<label><input type="checkbox" data-field="%s" value="%s"%s> %s</label>' + "</li>", y.field, x, z, y.title));
                    r++
                }
            });
            t.push("</ul>", "</div>")
        }
        t.push("</div>");
        if (this.showToolbar || t.length > 2) {
            this.$toolbar.append(t.join(""))
        }
        if (this.options.showPaginationSwitch) {
            this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click", j.proxy(this.togglePagination, this))
        }
        if (this.options.showRefresh) {
            this.$toolbar.find('button[name="refresh"]').off("click").on("click", j.proxy(this.refresh, this))
        }
        if (this.options.showToggle) {
            this.$toolbar.find('button[name="toggle"]').off("click").on("click", function () {
                u.toggleView()
            })
        }
        if (this.options.showSearch) {
            this.$toolbar.find('button[name="showSearch"]').off("click").on("click", function () {
                j(this).parents(".select-table").siblings().slideToggle()
            })
        }
        if (this.options.showColumns) {
            s = this.$toolbar.find(".keep-open");
            if (r <= this.options.minimumCountColumns) {
                s.find("input").prop("disabled", true)
            }
            s.find("li").off("click").on("click", function (x) {
                x.stopImmediatePropagation()
            });
            s.find("input").off("click").on("click", function () {
                var x = j(this);
                u.toggleColumn(j(this).val(), x.prop("checked"), false);
                u.trigger("column-switch", j(this).data("field"), x.prop("checked"))
            })
        }
        if (this.options.search) {
            t = [];
            t.push('<div class="pull-' + this.options.searchAlign + ' search">', m('<input class="form-control' + m(" input-%s", this.options.iconSize) + '" type="text" placeholder="%s">', this.options.formatSearch()), "</div>");
            this.$toolbar.append(t.join(""));
            v = this.$toolbar.find(".search input");
            v.off("keyup drop").on("keyup drop", function (x) {
                if (u.options.searchOnEnterKey && x.keyCode !== 13) {
                    return
                }
                if (j.inArray(x.keyCode, [37, 38, 39, 40]) > -1) {
                    return
                }
                clearTimeout(w);
                w = setTimeout(function () {
                    u.onSearch(x)
                }, u.options.searchTimeOut)
            });
            if (b()) {
                v.off("mouseup").on("mouseup", function (x) {
                    clearTimeout(w);
                    w = setTimeout(function () {
                        u.onSearch(x)
                    }, u.options.searchTimeOut)
                })
            }
        }
    };
    e.prototype.onSearch = function (r) {
        var s = j.trim(j(r.currentTarget).val());
        if (this.options.trimOnSearch && j(r.currentTarget).val() !== s) {
            j(r.currentTarget).val(s)
        }
        if (s === this.searchText) {
            return
        }
        this.searchText = s;
        this.options.searchText = s;
        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination();
        this.trigger("search", s)
    };
    e.prototype.initSearch = function () {
        var t = this;
        if (this.options.sidePagination !== "server") {
            if (this.options.customSearch !== j.noop) {
                this.options.customSearch.apply(this, [this.searchText]);
                return
            }
            var r = this.searchText && (this.options.escape ? p(this.searchText) : this.searchText).toLowerCase();
            var u = j.isEmptyObject(this.filterColumns) ? null : this.filterColumns;
            this.data = u ? j.grep(this.options.data, function (w, v) {
                for (var s in u) {
                    if (j.isArray(u[s]) && j.inArray(w[s], u[s]) === -1 || w[s] !== u[s]) {
                        return false
                    }
                }
                return true
            }) : this.options.data;
            this.data = r ? j.grep(this.data, function (A, x) {
                for (var v = 0; v < t.header.fields.length; v++) {
                    if (!t.header.searchables[v]) {
                        continue
                    }
                    var w = j.isNumeric(t.header.fields[v]) ? parseInt(t.header.fields[v], 10) : t.header.fields[v];
                    var z = t.columns[i(t.columns, w)];
                    var B;
                    if (typeof w === "string") {
                        B = A;
                        var y = w.split(".");
                        for (var s = 0; s < y.length; s++) {
                            B = B[y[s]]
                        }
                        if (z && z.searchFormatter) {
                            B = q(z, t.header.formatters[v], [B, A, x], B)
                        }
                    } else {
                        B = A[w]
                    }
                    if (typeof B === "string" || typeof B === "number") {
                        if (t.options.strictSearch) {
                            if ((B + "").toLowerCase() === r) {
                                return true
                            }
                        } else {
                            if ((B + "").toLowerCase().indexOf(r) !== -1) {
                                return true
                            }
                        }
                    }
                }
                return false
            }) : this.data
        }
    };
    e.prototype.initPagination = function () {
        if (!this.options.pagination) {
            this.$pagination.hide();
            return
        } else {
            this.$pagination.show()
        }
        var v = this,
            x = [],
            r = false,
            A, z, s, w, G, I, E, y, u, J = this.getData(),
            t = this.options.pageList;
        if (this.options.sidePagination !== "server") {
            this.options.totalRows = J.length
        }
        this.totalPages = 0;
        if (this.options.totalRows) {
            if (this.options.pageSize === this.options.formatAllRows()) {
                this.options.pageSize = this.options.totalRows;
                r = true
            } else {
                if (this.options.pageSize === this.options.totalRows) {
                    var H = typeof this.options.pageList === "string" ? this.options.pageList.replace("[", "").replace("]", "").replace(/ /g, "").toLowerCase().split(",") : this.options.pageList;
                    if (j.inArray(this.options.formatAllRows().toLowerCase(), H) > -1) {
                        r = true
                    }
                }
            }
            this.totalPages = ~~ ((this.options.totalRows - 1) / this.options.pageSize) + 1;
            this.options.totalPages = this.totalPages
        }
        if (this.totalPages > 0 && this.options.pageNumber > this.totalPages) {
            this.options.pageNumber = this.totalPages
        }
        this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1;
        this.pageTo = this.options.pageNumber * this.options.pageSize;
        if (this.pageTo > this.options.totalRows) {
            this.pageTo = this.options.totalRows
        }
        x.push('<div class="pull-' + this.options.paginationDetailHAlign + ' pagination-detail">', '<span class="pagination-info">', this.options.onlyInfoPagination ? this.options.formatDetailPagination(this.options.totalRows) : this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows), "</span>");
        if (!this.options.onlyInfoPagination) {
            x.push('<span class="page-list">');
            var F = [m('<span class="btn-group %s">', this.options.paginationVAlign === "top" || this.options.paginationVAlign === "both" ? "dropdown" : "dropup"), '<button type="button" class="btn' + m(" btn-%s", this.options.buttonsClass) + m(" btn-%s", this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', '<span class="page-size">', r ? this.options.formatAllRows() : this.options.pageSize, "</span>", ' <span class="caret"></span>', "</button>", '<ul class="dropdown-menu" role="menu">'];
            if (typeof this.options.pageList === "string") {
                var D = this.options.pageList.replace("[", "").replace("]", "").replace(/ /g, "").split(",");
                t = [];
                j.each(D, function (K, L) {
                    t.push(L.toUpperCase() === v.options.formatAllRows().toUpperCase() ? v.options.formatAllRows() : +L)
                })
            }
            j.each(t, function (K, L) {
                if (!v.options.smartDisplay || K === 0 || t[K - 1] <= v.options.totalRows) {
                    var M;
                    if (r) {
                        M = L === v.options.formatAllRows() ? ' class="active"' : ""
                    } else {
                        M = L === v.options.pageSize ? ' class="active"' : ""
                    }
                    F.push(m('<li%s><a href="javascript:void(0)">%s</a></li>', M, L))
                }
            });
            F.push("</ul></span>");
            x.push(this.options.formatRecordsPerPage(F.join("")));
            x.push("</span>");
            x.push("</div>", '<div class="pull-' + this.options.paginationHAlign + ' pagination">', '<ul class="pagination' + m(" pagination-%s", this.options.iconSize) + '">', '<li class="page-pre"><a href="javascript:void(0)">' + this.options.paginationPreText + "</a></li>");
            if (this.totalPages < 5) {
                z = 1;
                s = this.totalPages
            } else {
                z = this.options.pageNumber - 2;
                s = z + 4;
                if (z < 1) {
                    z = 1;
                    s = 5
                }
                if (s > this.totalPages) {
                    s = this.totalPages;
                    z = s - 4
                }
            }
            if (this.totalPages >= 6) {
                if (this.options.pageNumber >= 3) {
                    x.push('<li class="page-first' + (1 === this.options.pageNumber ? " active" : "") + '">', '<a href="javascript:void(0)">', 1, "</a>", "</li>");
                    z++
                }
                if (this.options.pageNumber >= 4) {
                    if (this.options.pageNumber == 4 || this.totalPages == 6 || this.totalPages == 7) {
                        z--
                    } else {
                        x.push('<li class="page-first-separator disabled">', '<a href="javascript:void(0)">...</a>', "</li>")
                    }
                    s--
                }
            }
            if (this.totalPages >= 7) {
                if (this.options.pageNumber >= (this.totalPages - 2)) {
                    z--
                }
            }
            if (this.totalPages == 6) {
                if (this.options.pageNumber >= (this.totalPages - 2)) {
                    s++
                }
            } else {
                if (this.totalPages >= 7) {
                    if (this.totalPages == 7 || this.options.pageNumber >= (this.totalPages - 3)) {
                        s++
                    }
                }
            }
            for (A = z; A <= s; A++) {
                x.push('<li class="page-number' + (A === this.options.pageNumber ? " active" : "") + '">', '<a href="javascript:void(0)">', A, "</a>", "</li>")
            }
            if (this.totalPages >= 8) {
                if (this.options.pageNumber <= (this.totalPages - 4)) {
                    x.push('<li class="page-last-separator disabled">', '<a href="javascript:void(0)">...</a>', "</li>")
                }
            }
            if (this.totalPages >= 6) {
                if (this.options.pageNumber <= (this.totalPages - 3)) {
                    x.push('<li class="page-last' + (this.totalPages === this.options.pageNumber ? " active" : "") + '">', '<a href="javascript:void(0)">', this.totalPages, "</a>", "</li>")
                }
            }
            x.push('<li class="page-next"><a href="javascript:void(0)">' + this.options.paginationNextText + "</a></li>", "</ul>", "</div>")
        }
        this.$pagination.html(x.join(""));
        if (!this.options.onlyInfoPagination) {
            w = this.$pagination.find(".page-list a");
            G = this.$pagination.find(".page-first");
            I = this.$pagination.find(".page-pre");
            E = this.$pagination.find(".page-next");
            y = this.$pagination.find(".page-last");
            u = this.$pagination.find(".page-number");
            if (this.options.smartDisplay) {
                if (this.totalPages <= 1) {
                    this.$pagination.find("div.pagination").hide()
                }
                if (t.length < 2 || this.options.totalRows <= t[0]) {
                    this.$pagination.find("span.page-list").hide()
                }
                this.$pagination[this.getData().length ? "show" : "hide"]()
            }
            if (r) {
                this.options.pageSize = this.options.formatAllRows()
            }
            w.off("click").on("click", j.proxy(this.onPageListChange, this));
            G.off("click").on("click", j.proxy(this.onPageFirst, this));
            I.off("click").on("click", j.proxy(this.onPagePre, this));
            E.off("click").on("click", j.proxy(this.onPageNext, this));
            y.off("click").on("click", j.proxy(this.onPageLast, this));
            u.off("click").on("click", j.proxy(this.onPageNumber, this))
        }
        if (this.options.showPageGo) {
            var v = this,
                C = this.$pagination.find("ul.pagination"),
                B = C.find("li.pageGo");
            if (!B.length) {
                B = j(['<li class="pageGo">', m('<input type="text" class="form-control" value="%s">', this.options.pageNumber), '<button class="btn' + m(" btn-%s", this.options.buttonsClass) + m(" btn-%s", this.options.iconSize) + '" title="' + this.options.formatPageGo() + '" ' + ' type="button">' + this.options.formatPageGo(), "</button>", "</li>"].join("")).appendTo(C);
                B.find("button").click(function () {
                    var K = parseInt(B.find("input").val()) || 1;
                    if (K < 1 || K > v.options.totalPages) {
                        K = 1
                    }
                    v.selectPage(K)
                })
            }
        }
    };
    e.prototype.updatePagination = function (r) {
        if (r && j(r.currentTarget).hasClass("disabled")) {
            return
        }
        if (!this.options.maintainSelected) {
            this.resetRows()
        }
        this.initPagination();
        if (this.options.sidePagination === "server") {
            this.initServer()
        } else {
            this.initBody()
        }
        this.trigger("page-change", this.options.pageNumber, this.options.pageSize)
    };
    e.prototype.onPageListChange = function (r) {
        var s = j(r.currentTarget);
        s.parent().addClass("active").siblings().removeClass("active");
        this.options.pageSize = s.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +s.text();
        this.$toolbar.find(".page-size").text(this.options.pageSize);
        this.updatePagination(r)
    };
    e.prototype.onPageFirst = function (r) {
        this.options.pageNumber = 1;
        this.updatePagination(r)
    };
    e.prototype.onPagePre = function (r) {
        if ((this.options.pageNumber - 1) === 0) {
            this.options.pageNumber = this.options.totalPages
        } else {
            this.options.pageNumber--
        }
        this.updatePagination(r)
    };
    e.prototype.onPageNext = function (r) {
        if ((this.options.pageNumber + 1) > this.options.totalPages) {
            this.options.pageNumber = 1
        } else {
            this.options.pageNumber++
        }
        this.updatePagination(r)
    };
    e.prototype.onPageLast = function (r) {
        this.options.pageNumber = this.totalPages;
        this.updatePagination(r)
    };
    e.prototype.onPageNumber = function (r) {
        if (this.options.pageNumber === +j(r.currentTarget).text()) {
            return
        }
        this.options.pageNumber = +j(r.currentTarget).text();
        this.updatePagination(r)
    };
    e.prototype.initBody = function (x) {
        var z = this,
            y = [],
            v = this.getData();
        this.trigger("pre-body", v);
        this.$body = this.$el.find(">tbody");
        if (!this.$body.length) {
            this.$body = j("<tbody></tbody>").appendTo(this.$el)
        }
        if (!this.options.pagination || this.options.sidePagination === "server") {
            this.pageFrom = 1;
            this.pageTo = v.length
        }
        for (var w = this.pageFrom - 1; w < this.pageTo; w++) {
            var B, C = v[w],
                r = {},
                s = [],
                t = "",
                u = {},
                A = [];
            r = q(this.options, this.options.rowStyle, [C, w], r);
            if (r && r.css) {
                for (B in r.css) {
                    s.push(B + ": " + r.css[B])
                }
            }
            u = q(this.options, this.options.rowAttributes, [C, w], u);
            if (u) {
                for (B in u) {
                    A.push(m('%s="%s"', B, p(u[B])))
                }
            }
            if (C._data && !j.isEmptyObject(C._data)) {
                j.each(C._data, function (E, D) {
                    if (E === "index") {
                        return
                    }
                    t += m(' data-%s="%s"', E, D)
                })
            }
            y.push("<tr", m(" %s", A.join(" ")), m(' id="%s"', j.isArray(C) ? undefined : C._id), m(' class="%s"', r.classes || (j.isArray(C) ? undefined : C._class)), m(' data-index="%s"', w), m(' data-uniqueid="%s"', C[this.options.uniqueId]), m("%s", t), ">");
            if (this.options.cardView) {
                y.push(m('<td colspan="%s"><div class="card-views">', this.header.fields.length))
            }
            if (!this.options.cardView && this.options.detailView) {
                y.push("<td>", '<a class="detail-icon" href="javascript:">', m('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen), "</a>", "</td>")
            }
            j.each(this.header.fields, function (I, L) {
                var P = "",
                    M = o(C, L, z.options.escape),
                    K = "",
                    E = {},
                    Q = "",
                    J = z.header.classes[I],
                    G = "",
                    O = "",
                    R = "",
                    H = "",
                    F = z.columns[I];
                if (z.fromHtml && typeof M === "undefined") {
                    return
                }
                if (!F.visible) {
                    return
                }
                if (z.options.cardView && !F.cardVisible) {
                    return
                }
                r = m('style="%s"', s.concat(z.header.styles[I]).join("; "));
                if (C["_" + L + "_id"]) {
                    Q = m(' id="%s"', C["_" + L + "_id"])
                }
                if (C["_" + L + "_class"]) {
                    J = m(' class="%s"', C["_" + L + "_class"])
                }
                if (C["_" + L + "_rowspan"]) {
                    O = m(' rowspan="%s"', C["_" + L + "_rowspan"])
                }
                if (C["_" + L + "_colspan"]) {
                    R = m(' colspan="%s"', C["_" + L + "_colspan"])
                }
                if (C["_" + L + "_title"]) {
                    H = m(' title="%s"', C["_" + L + "_title"])
                }
                E = q(z.header, z.header.cellStyles[I], [M, C, w, L], E);
                if (E.classes) {
                    J = m(' class="%s"', E.classes)
                }
                if (E.css) {
                    var D = [];
                    for (var N in E.css) {
                        D.push(N + ": " + E.css[N])
                    }
                    r = m('style="%s"', D.concat(z.header.styles[I]).join("; "))
                }
                M = q(F, z.header.formatters[I], [M, C, w], M);
                if (C["_" + L + "_data"] && !j.isEmptyObject(C["_" + L + "_data"])) {
                    j.each(C["_" + L + "_data"], function (T, S) {
                        if (T === "index") {
                            return
                        }
                        G += m(' data-%s="%s"', T, S)
                    })
                }
                if (F.checkbox || F.radio) {
                    K = F.checkbox ? "checkbox" : K;
                    K = F.radio ? "radio" : K;
                    P = [m(z.options.cardView ? '<div class="card-view %s">' : '<td class="bs-checkbox %s">', F["class"] || ""), "<input" + m(' data-index="%s"', w) + m(' name="%s"', z.options.selectItemName) + m(' type="%s"', K) + m(' value="%s"', C[z.options.idField]) + m(' checked="%s"', M === true || (M && M.checked) ? "checked" : undefined) + m(' disabled="%s"', !F.checkboxEnabled || (M && M.disabled) ? "disabled" : undefined) + " />", z.header.formatters[I] && typeof M === "string" ? M : "", z.options.cardView ? "</div>" : "</td>"].join("");
                    C[z.header.stateField] = M === true || (M && M.checked)
                } else {
                    M = typeof M === "undefined" || M === null ? z.options.undefinedText : M;
                    M = M === "" ? z.options.emptyText : M;
                    P = z.options.cardView ? ['<div class="card-view">', z.options.showHeader ? m('<span class="title" %s>%s</span>', r, c(z.columns, "field", "title", L)) : "", m('<span %s>%s</span>',(J===""?'class="value"':J), M), "</div>"].join("") : [m("<td%s %s %s %s %s %s %s>", Q, J, r, G, O, R, H), M, "</td>"].join("");
                    if (z.options.cardView && z.options.smartDisplay && M === "") {
                        P = '<div class="card-view"></div>'
                    }
                }
                y.push(P)
            });
            if (this.options.cardView) {
                y.push("</div></td>")
            }
            y.push("</tr>")
        }
        if (!y.length) {
            y.push('<tr class="no-records-found">', m('<td colspan="%s">%s</td>', this.$header.find("th").length, this.options.formatNoMatches()), "</tr>")
        }
        this.$body.html(y.join(""));
        if (!x) {
            this.scrollTo(0)
        }
        this.$body.find("> tr[data-index] > td").off("click dblclick").on("click dblclick", function (J) {
            var D = j(this),
                F = D.parent(),
                M = z.data[F.data("index")],
                H = D[0].cellIndex,
                G = z.getVisibleFields(),
                K = G[z.options.detailView && !z.options.cardView ? H - 1 : H],
                E = z.columns[i(z.columns, K)],
                L = o(M, K, z.options.escape);
            if (D.find(".detail-icon").length) {
                return
            }
            z.trigger(J.type === "click" ? "click-cell" : "dbl-click-cell", K, L, M, D);
            z.trigger(J.type === "click" ? "click-row" : "dbl-click-row", M, F, K);
            if (J.type === "click" && z.options.clickToSelect && E.clickToSelect) {
                var I = F.find(m('[name="%s"]', z.options.selectItemName));
                if (I.length) {
                    I[0].click()
                }
            }
        });
        this.$body.find("> tr[data-index] > td > .detail-icon").off("click").on("click", function () {
            var H = j(this),
                G = H.parent().parent(),
                E = G.data("index"),
                I = v[E];
            if (G.next().is("tr.detail-view")) {
                H.find("i").attr("class", m("%s %s", z.options.iconsPrefix, z.options.icons.detailOpen));
                G.next().remove();
                z.trigger("collapse-row", E, I)
            } else {
                H.find("i").attr("class", m("%s %s", z.options.iconsPrefix, z.options.icons.detailClose));
                G.after(m('<tr class="detail-view"><td colspan="%s"></td></tr>', G.find("td").length));
                var D = G.next().find("td");
                var F = q(z.options, z.options.detailFormatter, [E, I, D], "");
                if (D.length === 1) {
                    D.append(F)
                }
                z.trigger("expand-row", E, I, D)
            }
            z.resetView()
        });
        this.$selectItem = this.$body.find(m('[name="%s"]', this.options.selectItemName));
        this.$selectItem.off("click").on("click", function (E) {
            E.stopImmediatePropagation();
            var F = j(this),
                D = F.prop("checked"),
                G = z.data[F.data("index")];
            if (z.options.maintainSelected && j(this).is(":radio")) {
                j.each(z.options.data, function (H, I) {
                    I[z.header.stateField] = false
                })
            }
            G[z.header.stateField] = D;
            if (z.options.singleSelect) {
                z.$selectItem.not(this).each(function () {
                    z.data[j(this).data("index")][z.header.stateField] = false
                });
                z.$selectItem.filter(":checked").not(this).prop("checked", false)
            }
            z.updateSelected();
            z.trigger(D ? "check" : "uncheck", G, F)
        });
        j.each(this.header.events, function (G, F) {
            if (!F) {
                return
            }
            if (typeof F === "string") {
                F = q(null, F)
            }
            var H = z.header.fields[G],
                D = j.inArray(H, z.getVisibleFields());
            if (z.options.detailView && !z.options.cardView) {
                D += 1
            }
            for (var E in F) {
                z.$body.find(">tr:not(.no-records-found)").each(function () {
                    var M = j(this),
                        N = M.find(z.options.cardView ? ".card-view" : "td").eq(D),
                        J = E.indexOf(" "),
                        I = E.substring(0, J),
                        K = E.substring(J + 1),
                        L = F[E];
                    N.find(K).off(I).on(I, function (Q) {
                        var O = M.data("index"),
                            R = z.data[O],
                            P = R[H];
                        L.apply(this, [Q, P, R, O])
                    })
                })
            }
        });
        this.updateSelected();
        this.resetView();
        this.trigger("post-body", v)
    };
    e.prototype.initServer = function (r, w, s) {
        var u = this,
            v = {},
            x = {
                searchText: this.searchText,
                sortName: this.options.sortName,
                sortOrder: this.options.sortOrder
            },
            t;
        if (this.options.pagination) {
            x.pageSize = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
            x.pageNumber = this.options.pageNumber
        }
        if (!this.options.firstLoad && isFirstLoad) {
            isFirstLoad = false;
            return
        }
        if (!(s || this.options.url) && !this.options.ajax) {
            return
        }
        if (this.options.queryParamsType === "limit") {
            x = {
                search: x.searchText,
                sort: x.sortName,
                order: x.sortOrder
            };
            if (this.options.pagination) {
                x.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1);
                x.limit = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize
            }
        }
        if (!(j.isEmptyObject(this.filterColumnsPartial))) {
            x.filter = JSON.stringify(this.filterColumnsPartial, null)
        }
        v = q(this.options, this.options.queryParams, [x], v);
        j.extend(v, w || {});
        if (v === false) {
            return
        }
        if (!r) {
            this.$tableLoading.show()
        }
        t = j.extend({}, q(null, this.options.ajaxOptions), {
            type: this.options.method,
            url: s || this.options.url,
            data: this.options.contentType === "application/json" && this.options.method === "post" ? JSON.stringify(v) : v,
            cache: this.options.cache,
            contentType: this.options.contentType,
            dataType: this.options.dataType,
            success: function (y) {
                /**TODO:2020-03-09 新加的代码,处理页码错误问题开始*/
                // if(y.page.totalCount){
                //     if(u.options.pagination &&(y.code==='00000') && (y.page.totalCount>0) && (y.page.list.length === 0)){//总记录数大于0,但当前页记录数为0,则此时页码超过了最大页码误
                //         u.options.pageNumber = Math.ceil(y.page.totalCount/u.options.pageSize);//最后一页(总页数)
                //         u.initServer();
                //         return;
                //     }
                // }
                if(y.data.totalCount){
                    if(u.options.pagination &&(y.code==='00000') && (y.data.totalCount>0) && (y.data.list.length === 0)){//总记录数大于0,但当前页记录数为0,则此时页码超过了最大页码误
                        u.options.pageNumber = Math.ceil(y.page.totalCount/u.options.pageSize);//最后一页(总页数)
                        u.initServer();
                        return;
                    }
                }
                y = q(u.options, u.options.responseHandler, [y], y);
                u.load(y);
                u.trigger("load-success", y);
                if (!r) {
                    u.$tableLoading.hide()
                }

            },
            error: function (y) {
                u.trigger("load-error", y.status, y);
                if (!r) {
                    u.$tableLoading.hide()
                }
            }
        });
        if (this.options.ajax) {
            q(this, this.options.ajax, [t], null)
        } else {
            if (this._xhr && this._xhr.readyState !== 4) {
                this._xhr.abort()
            }
            this._xhr = j.ajax(t)
        }
    };
    e.prototype.initSearchText = function () {
        if (this.options.search) {
            if (this.options.searchText !== "") {
                var r = this.$toolbar.find(".search input");
                r.val(this.options.searchText);
                this.onSearch({
                    currentTarget: r
                })
            }
        }
    };
    e.prototype.getCaret = function () {
        var r = this;
        j.each(this.$header.find("th"), function (s, t) {
            j(t).find(".sortable").removeClass("desc asc").addClass((j(t).data("field") === r.options.sortName || j(t).data("sortName") === r.options.sortName) ? r.options.sortOrder : "both")
        })
    };
    e.prototype.updateSelected = function () {
        var r = this.$selectItem.filter(":enabled").length && this.$selectItem.filter(":enabled").length === this.$selectItem.filter(":enabled").filter(":checked").length;
        var s = j(".left-fixed-table-columns input[name=btSelectItem]");
        if (s.length > 0) {
            r = this.$selectItem.filter(":enabled").length && this.$selectItem.filter(":enabled").length === s.filter(":enabled").filter(":checked").length
        }
        this.$selectAll.add(this.$selectAll_).prop("checked", r);
        this.$selectItem.each(function () {
            j(this).closest("tr")[j(this).prop("checked") ? "addClass" : "removeClass"]("selected")
        })
    };
    e.prototype.updateRows = function () {
        var r = this;
        this.$selectItem.each(function () {
            r.data[j(this).data("index")][r.header.stateField] = j(this).prop("checked")
        })
    };
    e.prototype.resetRows = function () {
        var r = this;
        j.each(this.data, function (s, t) {
            r.$selectAll.prop("checked", false);
            r.$selectItem.prop("checked", false);
            if (r.header.stateField) {
                t[r.header.stateField] = false
            }
        })
    };
    e.prototype.trigger = function (s) {
        var r = Array.prototype.slice.call(arguments, 1);
        s += ".bs.table";
        this.options[e.EVENTS[s]].apply(this.options, r);
        this.$el.trigger(j.Event(s), r);
        this.options.onAll(s, r);
        this.$el.trigger(j.Event("all.bs.table"), [s, r])
    };
    e.prototype.resetHeader = function () {
        clearTimeout(this.timeoutId_);
        this.timeoutId_ = setTimeout(j.proxy(this.fitHeader, this), this.$el.is(":hidden") ? 100 : 0)
    };
    e.prototype.fitHeader = function () {
        var t = this,
            u, r, x, y;
        if (t.$el.is(":hidden")) {
            t.timeoutId_ = setTimeout(j.proxy(t.fitHeader, t), 100);
            return
        }
        u = this.$tableBody.get(0);
        r = u.scrollWidth > u.clientWidth && u.scrollHeight > u.clientHeight + this.$header.outerHeight() ? a() : 0;
        this.$el.css("margin-top", -this.$header.outerHeight());
        x = j(":focus");
        if (x.length > 0) {
            var z = x.parents("th");
            if (z.length > 0) {
                var A = z.attr("data-field");
                if (A !== undefined) {
                    var s = this.$header.find("[data-field='" + A + "']");
                    if (s.length > 0) {
                        s.find(":input").addClass("focus-temp")
                    }
                }
            }
        }
        this.$header_ = this.$header.clone(true, true);
        this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
        this.$tableHeader.css({
            "margin-right": r
        }).find("table").css("width", this.$el.outerWidth()).html("").attr("class", this.$el.attr("class")).append(this.$header_);
        y = j(".focus-temp:visible:eq(0)");
        if (y.length > 0) {
            y.focus();
            this.$header.find(".focus-temp").removeClass("focus-temp")
        }
        this.$header.find("th[data-field]").each(function (B) {
            t.$header_.find(m('th[data-field="%s"]', j(this).data("field"))).data(j(this).data())
        });
        var w = this.getVisibleFields(),
            v = this.$header_.find("th");
        this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function (C) {
            var E = j(this),
                B = C;
            if (t.options.detailView && !t.options.cardView) {
                if (C === 0) {
                    t.$header_.find("th.detail").find(".fht-cell").width(E.innerWidth())
                }
                B = C - 1
            }
            var D = t.$header_.find(m('th[data-field="%s"]', w[B]));
            if (D.length > 1) {
                D = j(v[E[0].cellIndex])
            }
            //console.log(E.innerWidth())
            D.find(".fht-cell").width(E.innerWidth())
        });
        this.$tableBody.off("scroll").on("scroll", function () {
            t.$tableHeader.scrollLeft(j(this).scrollLeft());
            if (t.options.showFooter && !t.options.cardView) {
                t.$tableFooter.scrollLeft(j(this).scrollLeft())
            }
        });
        t.trigger("post-header")
    };
    e.prototype.resetFooter = function () {
        var s = this,
            t = s.getData(),
            r = [];
        if (!this.options.showFooter || this.options.cardView) {
            return
        }
        if (!this.options.cardView && this.options.detailView) {
            r.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>')
        }
        j.each(this.columns, function (x, z) {
            var w, B = "",
                v = "",
                A = [],
                y = {},
                u = m(' class="%s"', z["class"]);
            if (!z.visible) {
                return
            }
            if (s.options.cardView && (!z.cardVisible)) {
                return
            }
            B = m("text-align: %s; ", z.falign ? z.falign : z.align);
            v = m("vertical-align: %s; ", z.valign);
            y = q(null, s.options.footerStyle);
            if (y && y.css) {
                for (w in y.css) {
                    A.push(w + ": " + y.css[w])
                }
            }
            r.push("<td", u, m(' style="%s"', B + v + A.concat().join("; ")), ">");
            r.push('<div class="th-inner">');
            r.push(q(z, z.footerFormatter, [t], "&nbsp;") || "&nbsp;");
            r.push("</div>");
            r.push('<div class="fht-cell"></div>');
            r.push("</div>");
            r.push("</td>")
        });
        this.$tableFooter.find("tr").html(r.join(""));
        this.$tableFooter.show();
        clearTimeout(this.timeoutFooter_);
        this.timeoutFooter_ = setTimeout(j.proxy(this.fitFooter, this), this.$el.is(":hidden") ? 100 : 0)
    };
    e.prototype.fitFooter = function () {
        var u = this,
            r, t, s;
        clearTimeout(this.timeoutFooter_);
        if (this.$el.is(":hidden")) {
            this.timeoutFooter_ = setTimeout(j.proxy(this.fitFooter, this), 100);
            return
        }
        t = this.$el.css("width");
        s = t > this.$tableBody.width() ? a() : 0;
        this.$tableFooter.css({
            "margin-right": s
        }).find("table").css("width", t).attr("class", this.$el.attr("class"));
        r = this.$tableFooter.find("td");
        this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function (v) {
            var w = j(this);
            r.eq(v).find(".fht-cell").width(w.innerWidth() + 1)
        })
    };
    e.prototype.toggleColumn = function (r, s, u) {
        if (r === -1) {
            return
        }
        this.columns[r].visible = s;
        this.initHeader();
        this.initSearch();
        this.initPagination();
        this.initBody();
        if (this.options.showColumns) {
            var t = this.$toolbar.find(".keep-open input").prop("disabled", false);
            if (u) {
                t.filter(m('[value="%s"]', r)).prop("checked", s)
            }
            if (t.filter(":checked").length <= this.options.minimumCountColumns) {
                t.filter(":checked").prop("disabled", true)
            }
        }
    };
    e.prototype.toggleRow = function (r, t, s) {
        if (r === -1) {
            return
        }
        this.$body.find(typeof r !== "undefined" ? m('tr[data-index="%s"]', r) : m('tr[data-uniqueid="%s"]', t))[s ? "show" : "hide"]()
    };
    e.prototype.getVisibleFields = function () {
        var s = this,
            r = [];
        j.each(this.header.fields, function (t, v) {
            var u = s.columns[i(s.columns, v)];
            if (!u.visible) {
                return
            }
            r.push(v)
        });
        return r
    };
    e.prototype.resetView = function (u) {
        var s = 0;
        if (u && u.height) {
            this.options.height = u.height
        }
        this.$selectAll.prop("checked", this.$selectItem.length > 0 && this.$selectItem.length === this.$selectItem.filter(":checked").length);
        if (this.options.height) {
            var t = d(this.$toolbar),
                v = d(this.$pagination),
                r = this.options.height - t - v;
            this.$tableContainer.css("height", r + "px")
        }
        if (this.options.cardView) {
            this.$el.css("margin-top", "0");
            this.$tableContainer.css("padding-bottom", "0");
            this.$tableFooter.hide();
            return
        }
        if (this.options.showHeader && this.options.height) {
            this.$tableHeader.show();
            this.resetHeader();
            s += this.$header.outerHeight()
        } else {
            this.$tableHeader.hide();
            this.trigger("post-header")
        }
        if (this.options.showFooter) {
            this.resetFooter();
            if (this.options.height) {
                s += this.$tableFooter.outerHeight() + 1
            }
        }
        this.getCaret();
        this.$tableContainer.css("padding-bottom", s + "px");
        this.trigger("reset-view")
    };
    e.prototype.getData = function (r) {
        return (this.searchText || !j.isEmptyObject(this.filterColumns) || !j.isEmptyObject(this.filterColumnsPartial)) ? (r ? this.data.slice(this.pageFrom - 1, this.pageTo) : this.data) : (r ? this.options.data.slice(this.pageFrom - 1, this.pageTo) : this.options.data)
    };
    e.prototype.load = function (s) {
        var r = false;
        if (this.options.sidePagination === "server") {
            this.options.totalRows = s.total;
            r = s.fixedScroll;
            s = s[this.options.dataField]
        } else {
            if (!j.isArray(s)) {
                r = s.fixedScroll;
                s = s.data
            }
        }
        this.initData(s);
        this.initSearch();
        this.initPagination();
        this.initBody(r)
    };
    e.prototype.append = function (r) {
        this.initData(r, "append");
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true)
    };
    e.prototype.prepend = function (r) {
        this.initData(r, "prepend");
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true)
    };
    e.prototype.remove = function (u) {
        var r = this.options.data.length,
            s, t;
        if (!u.hasOwnProperty("field") || !u.hasOwnProperty("values")) {
            return
        }
        for (s = r - 1; s >= 0; s--) {
            t = this.options.data[s];
            if (!t.hasOwnProperty(u.field)) {
                continue
            }
            if (j.inArray(t[u.field], u.values) !== -1) {
                this.options.data.splice(s, 1)
            }
        }
        if (r === this.options.data.length) {
            return
        }
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true)
    };
    e.prototype.removeAll = function () {
        if (this.options.data.length > 0) {
            this.options.data.splice(0, this.options.data.length);
            this.initSearch();
            this.initPagination();
            this.initBody(true)
        }
    };
    e.prototype.getRowByUniqueId = function (x) {
        var w = this.options.uniqueId,
            r = this.options.data.length,
            s = null,
            t, v, u;
        for (t = r - 1; t >= 0; t--) {
            v = this.options.data[t];
            if (v.hasOwnProperty(w)) {
                u = v[w]
            } else {
                if (v._data.hasOwnProperty(w)) {
                    u = v._data[w]
                } else {
                    continue
                }
            }
            if (typeof u === "string") {
                x = x.toString()
            } else {
                if (typeof u === "number") {
                    if ((Number(u) === u) && (u % 1 === 0)) {
                        x = parseInt(x)
                    } else {
                        if ((u === Number(u)) && (u !== 0)) {
                            x = parseFloat(x)
                        }
                    }
                }
            }
            if (u === x) {
                s = v;
                break
            }
        }
        return s
    };
    e.prototype.removeByUniqueId = function (t) {
        var r = this.options.data.length,
            s = this.getRowByUniqueId(t);
        if (s) {
            this.options.data.splice(this.options.data.indexOf(s), 1)
        }
        if (r === this.options.data.length) {
            return
        }
        this.initSearch();
        this.initPagination();
        this.initBody(true)
    };
    e.prototype.updateByUniqueId = function (t) {
        var r = this;
        var s = j.isArray(t) ? t : [t];
        j.each(s, function (u, w) {
            var v;
            if (!w.hasOwnProperty("id") || !w.hasOwnProperty("row")) {
                return
            }
            v = j.inArray(r.getRowByUniqueId(w.id), r.options.data);
            if (v === -1) {
                return
            }
            j.extend(r.options.data[v], w.row)
        });
        this.initSearch();
        this.initSort();
        this.initBody(true)
    };
    e.prototype.insertRow = function (r) {
        if (!r.hasOwnProperty("index") || !r.hasOwnProperty("row")) {
            return
        }
        this.data.splice(r.index, 0, r.row);
        this.initSearch();
        this.initPagination();
        this.initSort();
        this.initBody(true)
    };
    e.prototype.updateRow = function (t) {
        var r = this;
        var s = j.isArray(t) ? t : [t];
        j.each(s, function (u, v) {
            if (!v.hasOwnProperty("index") || !v.hasOwnProperty("row")) {
                return
            }
            j.extend(r.options.data[v.index], v.row)
        });
        this.initSearch();
        this.initSort();
        this.initBody(true)
    };
    e.prototype.showRow = function (r) {
        if (!r.hasOwnProperty("index") && !r.hasOwnProperty("uniqueId")) {
            return
        }
        this.toggleRow(r.index, r.uniqueId, true)
    };
    e.prototype.hideRow = function (r) {
        if (!r.hasOwnProperty("index") && !r.hasOwnProperty("uniqueId")) {
            return
        }
        this.toggleRow(r.index, r.uniqueId, false)
    };
    e.prototype.getRowsHidden = function (r) {
        var t = j(this.$body[0]).children().filter(":hidden"),
            s = 0;
        if (r) {
            for (; s < t.length; s++) {
                j(t[s]).show()
            }
        }
        return t
    };
    e.prototype.mergeCells = function (z) {
        var y = z.index,
            t = j.inArray(z.field, this.getVisibleFields()),
            u = z.rowspan || 1,
            s = z.colspan || 1,
            w, v, x = this.$body.find(">tr"),
            r;
        if (this.options.detailView && !this.options.cardView) {
            t += 1
        }
        r = x.eq(y).find(">td").eq(t);
        if (y < 0 || t < 0 || y >= this.data.length) {
            return
        }
        for (w = y; w < y + u; w++) {
            for (v = t; v < t + s; v++) {
                x.eq(w).find(">td").eq(v).hide()
            }
        }
        r.attr("rowspan", u).attr("colspan", s).show()
    };
    e.prototype.updateCell = function (r) {
        if (!r.hasOwnProperty("index") || !r.hasOwnProperty("field") || !r.hasOwnProperty("value")) {
            return
        }
        this.data[r.index][r.field] = r.value;
        if (r.reinit === false) {
            return
        }
        this.initSort();
        this.initBody(true)
    };
    e.prototype.getOptions = function () {
        return this.options
    };
    e.prototype.getSelections = function () {
        var r = this;
        return j.grep(this.options.data, function (s) {
            return s[r.header.stateField]
        })
    };
    e.prototype.getAllSelections = function () {
        var r = this;
        return j.grep(this.options.data, function (s) {
            return s[r.header.stateField]
        })
    };
    e.prototype.checkAll = function () {
        this.checkAll_(true)
    };
    e.prototype.uncheckAll = function () {
        this.checkAll_(false)
    };
    e.prototype.checkInvert = function () {
        var s = this;
        var t = s.$selectItem.filter(":enabled");
        var r = t.filter(":checked");
        t.each(function () {
            j(this).prop("checked", !j(this).prop("checked"))
        });
        s.updateRows();
        s.updateSelected();
        s.trigger("uncheck-some", r);
        r = s.getSelections();
        s.trigger("check-some", r)
    };
    e.prototype.checkAll_ = function (r) {
        var s;
        if (!r) {
            s = this.getSelections()
        }
        this.$selectAll.add(this.$selectAll_).prop("checked", r);
        this.$selectItem.filter(":enabled").prop("checked", r);
        this.updateRows();
        if (r) {
            s = this.getSelections()
        }
        this.trigger(r ? "check-all" : "uncheck-all", s)
    };
    e.prototype.check = function (r) {
        this.check_(true, r)
    };
    e.prototype.uncheck = function (r) {
        this.check_(false, r)
    };
    e.prototype.check_ = function (t, r) {
        var s = this.$selectItem.filter(m('[data-index="%s"]', r)).prop("checked", t);
        this.data[r][this.header.stateField] = t;
        this.updateSelected();
        this.trigger(t ? "check" : "uncheck", this.data[r], s)
    };
    e.prototype.checkBy = function (r) {
        this.checkBy_(true, r)
    };
    e.prototype.uncheckBy = function (r) {
        this.checkBy_(false, r)
    };
    e.prototype.checkBy_ = function (s, u) {
        if (!u.hasOwnProperty("field") || !u.hasOwnProperty("values")) {
            return
        }
        var r = this,
            t = [];
        j.each(this.options.data, function (v, x) {
            if (!x.hasOwnProperty(u.field)) {
                return false
            }
            if (j.inArray(x[u.field], u.values) !== -1) {
                var w = r.$selectItem.filter(":enabled").filter(m('[data-index="%s"]', v)).prop("checked", s);
                x[r.header.stateField] = s;
                t.push(x);
                r.trigger(s ? "check" : "uncheck", x, w)
            }
        });
        this.updateSelected();
        this.trigger(s ? "check-some" : "uncheck-some", t)
    };
    e.prototype.destroy = function () {
        this.$el.insertBefore(this.$container);
        j(this.options.toolbar).insertBefore(this.$el);
        this.$container.next().remove();
        this.$container.remove();
        this.$el.html(this.$el_.html()).css("margin-top", "0").attr("class", this.$el_.attr("class") || "")
    };
    e.prototype.showLoading = function () {
        this.$tableLoading.show()
    };
    e.prototype.hideLoading = function () {
        this.$tableLoading.hide()
    };
    e.prototype.togglePagination = function () {
        this.options.pagination = !this.options.pagination;
        var r = this.$toolbar.find('button[name="paginationSwitch"] i');
        if (this.options.pagination) {
            r.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown)
        } else {
            r.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp)
        }
        this.updatePagination()
    };
    e.prototype.refresh = function (r) {
        if (r && r.url) {
            this.options.pageNumber = 1
        }
        // opt.table.rememberSelecteds = {};
        // opt.table.rememberSelectedIds = {};
        this.initServer(r && r.silent, r && r.query, r && r.url);
        this.trigger("refresh", r)
    };
    e.prototype.resetWidth = function () {
        if (this.options.showHeader && this.options.height) {
            this.fitHeader()
        }
        if (this.options.showFooter) {
            this.fitFooter()
        }
    };
    e.prototype.showColumn = function (r) {
        this.toggleColumn(i(this.columns, r), true, true)
    };
    e.prototype.hideColumn = function (r) {
        this.toggleColumn(i(this.columns, r), false, true)
    };
    e.prototype.getHiddenColumns = function () {
        return j.grep(this.columns, function (r) {
            return !r.visible
        })
    };
    e.prototype.getVisibleColumns = function () {
        return j.grep(this.columns, function (r) {
            return r.visible
        })
    };
    e.prototype.toggleAllColumns = function (r) {
        j.each(this.columns, function (t, u) {
            this.columns[t].visible = r
        });
        this.initHeader();
        this.initSearch();
        this.initPagination();
        this.initBody();
        if (this.options.showColumns) {
            var s = this.$toolbar.find(".keep-open input").prop("disabled", false);
            if (s.filter(":checked").length <= this.options.minimumCountColumns) {
                s.filter(":checked").prop("disabled", true)
            }
        }
    };
    e.prototype.showAllColumns = function () {
        this.toggleAllColumns(true)
    };
    e.prototype.hideAllColumns = function () {
        this.toggleAllColumns(false)
    };
    e.prototype.filterBy = function (r) {
        this.filterColumns = j.isEmptyObject(r) ? {} : r;
        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination()
    };
    e.prototype.scrollTo = function (r) {
        if (typeof r === "string") {
            r = r === "bottom" ? this.$tableBody[0].scrollHeight : 0
        }
        if (typeof r === "number") {
            this.$tableBody.scrollTop(r)
        }
        if (typeof r === "undefined") {
            return this.$tableBody.scrollTop()
        }
    };
    e.prototype.getScrollPosition = function () {
        return this.scrollTo()
    };
    e.prototype.selectPage = function (r) {
        if (r > 0 && r <= this.options.totalPages) {
            this.options.pageNumber = r;
            this.updatePagination()
        }
    };
    e.prototype.prevPage = function () {
        if (this.options.pageNumber > 1) {
            this.options.pageNumber--;
            this.updatePagination()
        }
    };
    e.prototype.nextPage = function () {
        if (this.options.pageNumber < this.options.totalPages) {
            this.options.pageNumber++;
            this.updatePagination()
        }
    };
    e.prototype.toggleView = function () {
        this.options.cardView = !this.options.cardView;
        //console.log("---->>>切换");

        this.initHeader();

        this.initBody();
        // 浮动提示框特效
        $("[data-toggle='tooltip']").tooltip();
        $('[data-toggle="popover"]').popover();

        this.trigger("toggle", this.options.cardView)
    };
    e.prototype.refreshOptions = function (r) {
        if (f(this.options, r, true)) {
            return
        }
        this.options = j.extend(this.options, r);
        this.trigger("refresh-options", this.options);
        this.destroy();
        this.init()
    };
    e.prototype.resetSearch = function (s) {
        var r = this.$toolbar.find(".search input");
        r.val(s || "");
        this.onSearch({
            currentTarget: r
        })
    };
    e.prototype.expandRow_ = function (s, r) {
        var t = this.$body.find(m('> tr[data-index="%s"]', r));
        if (t.next().is("tr.detail-view") === (s ? false : true)) {
            t.find("> td > .detail-icon").click()
        }
    };
    e.prototype.expandRow = function (r) {
        this.expandRow_(true, r)
    };
    e.prototype.collapseRow = function (r) {
        this.expandRow_(false, r)
    };
    e.prototype.expandAllRows = function (r) {
        if (r) {
            var w = this.$body.find(m('> tr[data-index="%s"]', 0)),
                x = this,
                u = null,
                v = false,
                s = -1;
            if (!w.next().is("tr.detail-view")) {
                w.find("> td > .detail-icon").click();
                v = true
            } else {
                if (!w.next().next().is("tr.detail-view")) {
                    w.next().find(".detail-icon").click();
                    v = true
                }
            }
            if (v) {
                try {
                    s = setInterval(function () {
                        u = x.$body.find("tr.detail-view").last().find(".detail-icon");
                        if (u.length > 0) {
                            u.click()
                        } else {
                            clearInterval(s)
                        }
                    }, 1)
                } catch (z) {
                    clearInterval(s)
                }
            }
        } else {
            var y = this.$body.children();
            for (var t = 0; t < y.length; t++) {
                this.expandRow_(true, j(y[t]).data("index"))
            }
        }
    };
    e.prototype.collapseAllRows = function (s) {
        if (s) {
            this.expandRow_(false, 0)
        } else {
            var r = this.$body.children();
            for (var t = 0; t < r.length; t++) {
                this.expandRow_(false, j(r[t]).data("index"))
            }
        }
    };
    e.prototype.updateFormatText = function (r, s) {
        if (this.options[m("format%s", r)]) {
            if (typeof s === "string") {
                this.options[m("format%s", r)] = function () {
                    return s
                }
            } else {
                if (typeof s === "function") {
                    this.options[m("format%s", r)] = s
                }
            }
        }
        this.initToolbar();
        this.initPagination();
        this.initBody()
    };
    var n = ["getOptions", "getSelections", "getAllSelections", "getData", "load", "append", "prepend", "remove", "removeAll", "insertRow", "updateRow", "updateCell", "updateByUniqueId", "removeByUniqueId", "getRowByUniqueId", "showRow", "hideRow", "getRowsHidden", "mergeCells", "checkAll", "uncheckAll", "checkInvert", "check", "uncheck", "checkBy", "uncheckBy", "refresh", "resetView", "resetWidth", "destroy", "showLoading", "hideLoading", "showColumn", "hideColumn", "getHiddenColumns", "getVisibleColumns", "showAllColumns", "hideAllColumns", "filterBy", "scrollTo", "getScrollPosition", "selectPage", "prevPage", "nextPage", "togglePagination", "toggleView", "refreshOptions", "resetSearch", "expandRow", "collapseRow", "expandAllRows", "collapseAllRows", "updateFormatText"];
    j.fn.bootstrapTable = function (s) {
        var t, r = Array.prototype.slice.call(arguments, 1);
        this.each(function () {
            var w = j(this),
                v = w.data("bootstrap.table"),
                u = j.extend({}, e.DEFAULTS, w.data(), typeof s === "object" && s);
            if (typeof s === "string") {
                if (j.inArray(s, n) < 0) {
                    throw new Error("Unknown method: " + s)
                }
                if (!v) {
                    return
                }
                t = v[s].apply(v, r);
                if (s === "destroy") {
                    w.removeData("bootstrap.table")
                }
            }
            if (!v) {
                w.data("bootstrap.table", (v = new e(this, u)))
            }
        });
        return typeof t === "undefined" ? this : t
    };
    j.fn.bootstrapTable.Constructor = e;
    j.fn.bootstrapTable.defaults = e.DEFAULTS;
    j.fn.bootstrapTable.columnDefaults = e.COLUMN_DEFAULTS;
    j.fn.bootstrapTable.locales = e.LOCALES;
    j.fn.bootstrapTable.methods = n;
    j.fn.bootstrapTable.utils = {
        sprintf: m,
        getFieldIndex: i,
        compareObjects: f,
        calculateObjectValue: q,
        getItemField: o,
        objectKeys: h,
        isIEBrowser: b
    };
    j(function () {
        j('[data-toggle="table"]').bootstrapTable()
    })
})(jQuery);
var TABLE_EVENTS = "all.bs.table click-cell.bs.table dbl-click-cell.bs.table click-row.bs.table dbl-click-row.bs.table sort.bs.table check.bs.table uncheck.bs.table onUncheck check-all.bs.table uncheck-all.bs.table check-some.bs.table uncheck-some.bs.table load-success.bs.table load-error.bs.table column-switch.bs.table page-change.bs.table search.bs.table toggle.bs.table show-search.bs.table expand-row.bs.table collapse-row.bs.table refresh-options.bs.table reset-view.bs.table refresh.bs.table";
var isFirstLoad = true;
//TODO 修改记住我删除BUG
var union = function (b, a,k) {
    if ($.isArray(a)) {
        $.each(a, function (c, d) {
            if ($.inArray(d, b) == -1) {
                b[b.length] = d
            }
        })
    } else {
        if(b.length === 0){
            b[b.length] = a
        }else{
            if(!array_isf(b,a,k)){
                b[b.length] = a
            }
        }
    }
    return b
};
var difference = function (c, b,k) {
    if ($.isArray(b)) { //是否是数组
        $.each(b, function (e, f) {
            opt.debug(f);
            var d = $.inArray(f, c); //搜索指定的值,并返回其索引值
            if (d != -1) {
                c.splice(d, 1)
            }
        })
    } else {
        array_diff(c,b,k);
    }
    return c
};
var array_diff = function(a, b,c) {
    for (var j = 0; j < a.length; j++) {
        if(opt.common.getJsonValue(a[j],c) === opt.common.getJsonValue(b,c)){
            a.splice(j, 1);
            j = j - 1;
        }
    }
    return a;
}
var array_isf = function(a, b,c) {
    var f = false;
    for (var j = 0; j < a.length; j++) {
        if(opt.common.getJsonValue(a[j],c) === opt.common.getJsonValue(b,c)){
           f = true;
        }
    }
    return f;
}
var _ = {
    "union": union,
    "difference": difference
};
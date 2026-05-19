import { t as __commonJSMin } from "./chunk-CqwQKh_b.js";
import { t as require_lodash } from "./lodash.js";
//#region node_modules/reborn-util/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getPageOffset = exports.downloadDataUrlFromJavascript = exports.getMeta = exports.convertToId = exports.convertToFileName = exports.getCookie = exports.formatCurrency = exports.getStandardPhone = exports.getMaxPage = exports.getNVL = exports.getSearchParameters = exports.convertParamsToString = exports.getParentByClassName = exports.getOffsetTop = exports.getOffsetHeight = exports.isDifferenceObj = exports.differenceObj = exports.filterObj = exports.convertObjectToProps = exports.isObjEmpty = exports.animate = exports.easeInOutExpo = exports.scrollTo = exports.fadeOut = exports.fadeIn = exports.createArrayFromToR = exports.createArrayFromTo = exports.getMaxDay = exports.getCurrentTime = exports.getDayOfWeek = exports.getFileType = exports.checkHostMedia = exports.isRemoteResource = exports.getDomain = exports.getUri = exports.getSeoDescription = exports.getSeoTitle = exports.getSeoLink = exports.getCharByCode = exports.handleize = exports.capitalize = exports.ignoreSpaces = exports.removeAccents = exports.trimContentByWord = exports.truncate = exports.trimContent = exports.removeHtmlTags = void 0;
	var lodash_1 = require_lodash();
	/**
	* Loại bỏ các thẻ html
	* @param {*} html
	* @returns
	*/
	var removeHtmlTags = (html) => {
		if (!html) return "";
		html = html.replace(/<p[^>]*>/g, "").replace(/<\/p>/g, " ");
		html = html.replace(/(<style[\w\W]+style>)/g, "");
		html = html.replace(/<[^>]*>?/gm, " ");
		return html.replace(/[ +]/gm, " ");
	};
	exports.removeHtmlTags = removeHtmlTags;
	/**
	* Trim text theo só ký tự thêm dấu 3 chấm
	* @param {string} content
	* @param {number} maxLength
	* @param {boolean} isHtml
	* @param {boolean} ellipsis
	* @returns {string}
	*/
	var trimContent = (content, maxLength = 20, isHtml = false, ellipsis = true) => {
		if (!content) return "";
		isHtml = isHtml || false;
		if (isHtml) content = (0, exports.removeHtmlTags)(content);
		content = content.trim();
		if (content.length <= maxLength) return content;
		content = content.substring(0, maxLength);
		let pos = content.lastIndexOf(" ");
		content = content.substring(0, pos);
		return content.trim() + (ellipsis ? " ..." : "");
	};
	exports.trimContent = trimContent;
	/**
	* Trim tối đa x kí tự
	* @param {*} str
	* @param {number} max
	* @param {boolean} hasEllipse
	*/
	var truncate = (str, max, hasEllipse = false) => {
		if (!str) return "";
		return str.length > max ? str.substring(0, max - 1) + (hasEllipse ? "..." : "") : str;
	};
	exports.truncate = truncate;
	/**
	* Cắt nội dung theo độ dài, làm tròn tới mức độ từ
	* @param {*} content
	* @param {number} maxLength
	* @param {boolean} isHtml true - nếu nội dung là dạng source html, false - nếu nội dung là thuần dạng văn bản
	* @returns
	*/
	var trimContentByWord = (content, maxLength, isHtml = false) => {
		if (!content) return "";
		isHtml = isHtml || false;
		if (isHtml) content = (0, exports.removeHtmlTags)(content);
		content = content.trim();
		if (content.length <= maxLength) return content;
		content = content.substring(0, maxLength);
		let pos = content.lastIndexOf(" ");
		content = content.substring(0, pos);
		return content.trim();
	};
	exports.trimContentByWord = trimContentByWord;
	/**
	* Xóa dấu
	* @param {string} str
	* @returns {string}
	*/
	var removeAccents = (str) => {
		const AccentsMap = [
			"aàảãáạăằẳẵắặâầẩẫấậ",
			"AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
			"dđ",
			"DĐ",
			"eèẻẽéẹêềểễếệ",
			"EÈẺẼÉẸÊỀỂỄẾỆ",
			"iìỉĩíị",
			"IÌỈĨÍỊ",
			"oòỏõóọôồổỗốộơờởỡớợ",
			"OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
			"uùủũúụưừửữứự",
			"UÙỦŨÚỤƯỪỬỮỨỰ",
			"yỳỷỹýỵ",
			"YỲỶỸÝỴ"
		];
		for (let i = 0; i < AccentsMap.length; i++) {
			const re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
			const char = AccentsMap[i][0];
			str = str.replace(re, char);
		}
		return str;
	};
	exports.removeAccents = removeAccents;
	/**
	* Xóa các dấu space thừa
	* @param {string} str
	* @returns {string}
	*/
	var ignoreSpaces = (str) => {
		return str.trim().replace(/\s+/g, " ");
	};
	exports.ignoreSpaces = ignoreSpaces;
	/**
	* Upper kí tự đầu tiên của từng word, ví dụ: phAn DUC DunG => Phan Duc Dung
	* @param {*} str
	* @returns
	*/
	var capitalize = (str) => {
		if (!str) return "";
		const arrOfWords = str.split(" ");
		const arrOfWordsCased = [];
		for (let i = 0; i < arrOfWords.length; i++) {
			let word = arrOfWords[i];
			if (!word || !word.trim()) continue;
			word = word.trim();
			if (word.length == 1) {
				arrOfWordsCased.push(word[0].toUpperCase());
				continue;
			}
			arrOfWordsCased.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
		}
		return arrOfWordsCased.join(" ");
	};
	exports.capitalize = capitalize;
	/**
	* Handleize chuỗi string (Ví dụ hay dùng để tạo url thân thiện máy tìm kiếm | đặt tên cho các field)
	* @param {string} str
	* @returns {string}
	*/
	var handleize = (str) => {
		str = str.toLowerCase();
		const toReplace = [
			"\"",
			"'",
			"\\",
			"(",
			")",
			"[",
			"]"
		];
		for (let i = 0; i < toReplace.length; ++i) str = str.replace(toReplace[i], "");
		str = str.replace(/\W+/g, "-");
		if (str.charAt(str.length - 1) === "-") str = str.replace(/-+\z/, "");
		if (str.charAt(0) === "-") str = str.replace(/\A-+/, "");
		return str;
	};
	exports.handleize = handleize;
	/**
	* Lấy kí tự bởi code
	* @param {string} str
	* @param {number} position
	* @returns {string}
	*/
	var getCharByCode = (str, position) => {
		return String.fromCharCode(str.charCodeAt(0) + position);
	};
	exports.getCharByCode = getCharByCode;
	var seoMaxLength = {
		title: 60,
		description: 160,
		link: 75
	};
	/**
	* Lấy độ dài tiêu đề chuẩn SEO từ 1 đoạn văn bản nhập vào (Ví dụ lấy độ dài)
	* @param {*} content
	* @param {boolean} isHtml
	* @returns
	*/
	var getSeoLink = (content, isHtml) => {
		return (0, exports.trimContentByWord)(content, seoMaxLength.link, isHtml);
	};
	exports.getSeoLink = getSeoLink;
	/**
	* Cắt theo tiêu chuẩn của seo cho title
	* @param {*} content
	* @param {boolean} isHtml
	* @returns
	*/
	var getSeoTitle = (content, isHtml) => {
		return (0, exports.trimContentByWord)(content, seoMaxLength.title, isHtml);
	};
	exports.getSeoTitle = getSeoTitle;
	/**
	* Cắt theo tiêu chuẩn của seo đối với description
	* @param {*} content
	* @param {boolean} isHtml
	* @returns
	*/
	var getSeoDescription = (content, isHtml) => {
		if (!content) return "";
		isHtml = isHtml || false;
		if (isHtml) content = (0, exports.removeHtmlTags)(content);
		content = content.trim();
		if (content.length <= seoMaxLength.description) return content;
		content = content.substring(0, seoMaxLength.description);
		let pos = content.lastIndexOf(" ");
		content = content.substring(0, pos);
		return content.trim();
	};
	exports.getSeoDescription = getSeoDescription;
	/**
	* Lấy ra uri của một liên kết
	* @param {*} link
	* @returns
	*/
	var getUri = (link) => {
		if (!link) return "";
		return link.substring(link.indexOf("/", 8));
	};
	exports.getUri = getUri;
	/**
	* Lấy tên miền từ một liên kết
	* @param {string} link
	* @returns
	*/
	var getDomain = (link) => {
		if (!link) return "";
		if ((0, exports.isRemoteResource)(link)) return new URL(link).hostname;
		return "";
	};
	exports.getDomain = getDomain;
	/**
	* Kiểm tra 1 link có phải external link
	* @param {any} link
	* @returns
	*/
	var isRemoteResource = (link) => {
		if (!link) return false;
		return link.startsWith("https://") || link.startsWith("http://");
	};
	exports.isRemoteResource = isRemoteResource;
	/**
	* Chuyển link media từ host cdn.ereka.vn sang cdn.noron.vn
	* @param {any} link
	* @returns
	*/
	var checkHostMedia = (link) => {
		if (!link) return "";
		link = link.replace("cdn.ereka.vn", "cdn.noron.vn");
		return link;
	};
	exports.checkHostMedia = checkHostMedia;
	/**
	* Kiểm tra là ảnh hay là video
	* @param {*} file
	* @returns
	*/
	var getFileType = (file) => {
		if (file.type.match("image.*")) return "image";
		if (file.type.match("video.*")) return "video";
		return false;
	};
	exports.getFileType = getFileType;
	/**
	* Lấy ngày trong tuần sang tên gọi tương ứng
	* @param {number} day
	* @returns
	*/
	var getDayOfWeek = (day) => {
		switch (day) {
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7: return "Thứ " + day;
			case 0: return "Chủ nhật";
			default: return "";
		}
	};
	exports.getDayOfWeek = getDayOfWeek;
	/**
	* Trả về cấu trúc Ngày | Tháng | Năm của thời gian hiện tại
	* @returns
	*/
	var getCurrentTime = () => {
		let date = /* @__PURE__ */ new Date();
		return {
			currentYear: date.getFullYear(),
			currentMonth: date.getMonth(),
			currentDay: date.getDate()
		};
	};
	exports.getCurrentTime = getCurrentTime;
	/**
	* Lấy ngày cuối cùng của tháng
	* @param {number} year
	* @param {number} month
	* @returns
	*/
	var getMaxDay = (year, month) => {
		switch (month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12: return 31;
			case 2:
				if (year % 400 == 0) return 29;
				if (year % 100 == 0) return 28;
				if (year % 4 == 0) return 29;
				return 28;
			default: return 30;
		}
	};
	exports.getMaxDay = getMaxDay;
	/**
	* Tạo ra 1 mảng từ điểm bắt đầu tới điểm kết thúc
	* @param {number} start
	* @param {number} end
	* @returns
	*/
	var createArrayFromTo = (start, end) => {
		let arr = [];
		for (let index = start; index <= end; index++) arr.push(index);
		return arr;
	};
	exports.createArrayFromTo = createArrayFromTo;
	/**
	* Đảo ngược của createArrayFromTo
	* @param {number} start
	* @param {number} end
	*/
	var createArrayFromToR = (end, start) => {
		let arr = [];
		for (let index = end; index >= start; index--) arr.push(index);
		return arr;
	};
	exports.createArrayFromToR = createArrayFromToR;
	/**
	* Tạo hiệu ứng FadeIn element
	* @param {HTMLElement} element
	*/
	var fadeIn = (element) => {
		element.style.display = "block";
		element.style.opacity = 0;
		(function fade() {
			let val = parseFloat(element.style.opacity);
			const proceed = (val += .07678) > 1 ? false : true;
			if (val + .07678 > 1) element.style.opacity = 1;
			if (proceed) {
				element.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	};
	exports.fadeIn = fadeIn;
	/**
	* Tạo hiệu ứng FadeOut element
	* @param {HTMLElement} element
	*/
	var fadeOut = (element) => {
		element.style.opacity = 1;
		(function fade() {
			let val = parseFloat(element.style.opacity);
			const proceed = (val -= .07678) < 0 ? false : true;
			if (val - .07678 <= 0) {
				element.style.display = "none";
				element.style.opacity = 0;
			}
			if (proceed) {
				element.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	};
	exports.fadeOut = fadeOut;
	/**
	* Cuộn tới vị trí [to] với khoảng thời gian là [duration]
	* @param {number} to
	* @param {number} duration
	* @returns
	*/
	var scrollTo = (to = 0, duration = 200) => {
		const element = document.scrollingElement || document.documentElement, start = element.scrollTop, change = to - start, startDate = +/* @__PURE__ */ new Date(), easeInOutQuad = function(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		}, animateScroll = function() {
			const currentTime = +/* @__PURE__ */ new Date() - startDate;
			element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
			if (currentTime < duration) requestAnimationFrame(animateScroll);
			else element.scrollTop = to;
		};
		animateScroll();
	};
	exports.scrollTo = scrollTo;
	var easeInOutExpo = (x, t, b, c, d) => {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	};
	exports.easeInOutExpo = easeInOutExpo;
	/**
	* Tạo hiệu ứng
	* @param {number} start
	* @param {number} duration
	* @param {number} from
	* @param {number} to
	* @param {*} element
	* @param {*} style
	*/
	var animate = (start, duration, from, to, element, style) => {
		var now = (/* @__PURE__ */ new Date()).getTime() - start;
		var ease = (0, exports.easeInOutExpo)(0, now, 0, 1, duration);
		element.style[style] = from + (to - from) * ease + "px";
		if (now < duration) setTimeout(element, 1e3 / 60);
	};
	exports.animate = animate;
	/**
	*  Kiểm tra obj có phải là {} hay không
	*/
	var isObjEmpty = (obj) => {
		for (let key in obj) if (obj.hasOwnProperty(key)) return false;
		return true;
	};
	exports.isObjEmpty = isObjEmpty;
	/**
	* Chuyển đổi thuộc tính đối tượng sang chuỗi [thuộc tính=giá trị]
	*/
	var convertObjectToProps = (obj) => {
		let result = "";
		for (let prop in obj) result += ` ${prop}={${obj[prop]}} `;
		return result;
	};
	exports.convertObjectToProps = convertObjectToProps;
	/**
	* Filter object
	* @param {*} orgObj
	* @param {*} keyFilter
	* @param {*} includes
	* @returns {boolean}
	*/
	var filterObj = (orgObj, keyFilter, includes) => {
		return Object.keys(orgObj).filter((key) => includes === "no" ? !key.includes(keyFilter) : key.includes(keyFilter)).reduce((obj, key) => {
			obj[key] = orgObj[key];
			return obj;
		}, {});
	};
	exports.filterObj = filterObj;
	/**
	* Kiểm tra 2 object có khác nhau hay ko?
	* @param {*} orgObj
	* @param {*} newObj
	* @returns {}
	*/
	var differenceObj = (orgObj, newObj) => {
		function changes(newObj, orgObj) {
			let arrayIndexCounter = 0;
			return (0, lodash_1.transform)(newObj, function(result, value, key) {
				if (value != orgObj[key]) {
					const resultKey = (0, lodash_1.isArray)(orgObj) ? arrayIndexCounter++ : key;
					result[resultKey] = (0, lodash_1.isObject)(value) && (0, lodash_1.isObject)(orgObj[key]) ? changes(value, orgObj[key]) : value;
				}
			});
		}
		function changesReverse(orgObj, newObj) {
			let arrayIndexCounter = 0;
			return (0, lodash_1.transform)(orgObj, function(result, value, key) {
				if (value != newObj[key]) {
					const resultKey = (0, lodash_1.isArray)(newObj) ? arrayIndexCounter++ : key;
					result[resultKey] = (0, lodash_1.isObject)(value) && (0, lodash_1.isObject)(newObj[key]) ? changesReverse(value, newObj[key]) : value;
				}
			});
		}
		if (!newObj && !orgObj) return {};
		if (!newObj) return orgObj;
		if (!orgObj) return newObj;
		return Object.assign(Object.assign({}, changes(newObj, orgObj)), changesReverse(orgObj, newObj));
	};
	exports.differenceObj = differenceObj;
	/**
	* Kiểm tra 2 object có khác biệt nhau ko?
	* @param {*} orgObj
	* @param {*} newObj
	* @returns {boolean}
	*/
	var isDifferenceObj = (orgObj, newObj) => {
		return Object.keys((0, exports.differenceObj)(orgObj, newObj)).length > 0;
	};
	exports.isDifferenceObj = isDifferenceObj;
	/**
	* Lấy về offsetHeight an toàn
	* @param {HTMLElement} item
	* @returns {number}
	*/
	var getOffsetHeight = (item) => {
		if (!item) return 0;
		return item.offsetHeight ? item.offsetHeight : 0;
	};
	exports.getOffsetHeight = getOffsetHeight;
	/**
	* Lấy về offset top của một item
	* @param {HTMLElement} item
	* @returns {number}
	*/
	var getOffsetTop = (item) => {
		let offsetTop = 0;
		do
			if (!isNaN(item.offsetTop)) offsetTop += item.offsetTop;
		while (item = item.offsetParent);
		return offsetTop;
	};
	exports.getOffsetTop = getOffsetTop;
	/**
	* Lấy element parent bởi class
	* @param {any} elem
	* @param {string} cls
	* @returns {HTMLElement}
	*/
	var getParentByClassName = (elem, cls) => {
		for (; elem && elem !== document; elem = elem.parentNode) if (elem.classList.contains(cls)) return elem;
	};
	exports.getParentByClassName = getParentByClassName;
	/**
	* Tạo string từ param
	* @param {object} params
	* @return {string}
	*/
	var convertParamsToString = (params) => {
		if (params && Object.keys(params).length > 0) return `?${Object.keys(params).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])).join("&")}`;
		return "";
	};
	exports.convertParamsToString = convertParamsToString;
	/**
	* Xử lý get params
	* @param {string} prmstr
	* @return {object} params
	*/
	var transformToAssocArray = (prmstr) => {
		const params = {};
		const prmarr = prmstr.split("&");
		for (let i = 0; i < prmarr.length; i++) {
			const tmparr = prmarr[i].split("=");
			params[tmparr[0]] = tmparr[1];
		}
		return params;
	};
	/**
	* Lấy search parameter
	* @return {object} params
	*/
	var getSearchParameters = () => {
		const prmstr = window.location.search.substr(1);
		return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
	};
	exports.getSearchParameters = getSearchParameters;
	/**
	* Nếu là số 0 thì trả về giá trị mặc định
	* @param {*} value
	* @param {*} defaultVal
	* @returns
	*/
	var getNVL = (value, defaultVal) => {
		if (!value) return defaultVal;
		if (defaultVal instanceof Number) {
			if (Number(value) <= 0) return defaultVal;
		}
		return value;
	};
	exports.getNVL = getNVL;
	/**
	* Lấy số trang cuối cùng
	* @param {number} total
	* @param {number} limit
	* @returns
	*/
	var getMaxPage = (total, limit) => {
		limit = limit || 10;
		total = total || 0;
		if (total == 0) return 0;
		if (total % limit == 0) return total / limit;
		return Math.floor(total / limit) + 1;
	};
	exports.getMaxPage = getMaxPage;
	/**
	* Lấy ra số điện thoại chuẩn quốc tế (đầu +84, ví dụ dùng cho firebase send sms otp)
	* @param {*} phone Đầu vào là sđt hợp lệ, ví dụ 0973090393 | 84973090393 | +84973090393
	*/
	var getStandardPhone = (phone) => {
		if (phone.startsWith("0")) return "+84" + phone.substring(1);
		if (phone.startsWith("84")) return "+" + phone;
		return phone;
	};
	exports.getStandardPhone = getStandardPhone;
	/**
	* Format tiền tệ
	* @param {*} num
	* @param {*} suffixes
	* @param {*} positionSuffixes
	* @param {*} separate
	* @returns {string|number}
	*/
	var formatCurrency = (num, separate = ",", suffixes = "đ", positionSuffixes = "right") => {
		if (num) {
			const s = parseInt(num).toString();
			const regex = /\B(?=(\d{3})+(?!\d))/g;
			return positionSuffixes === "right" ? s.replace(regex, separate) + suffixes : suffixes + s.replace(regex, separate);
		} else return 0;
	};
	exports.formatCurrency = formatCurrency;
	/**
	* Lấy cookie
	* @param {string|number} name
	* @return {string|null}
	*/
	var getCookie = (name) => {
		for (let t, r = name + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) {
			for (t = u[i]; t.charAt(0) == " ";) t = t.substring(1);
			if (t.indexOf(r) == 0) return t.substring(r.length, t.length);
		}
		return null;
	};
	exports.getCookie = getCookie;
	/**
	* Đổi string sang kiểu tên file
	* @param {string} str
	* @returns {string}
	*/
	var convertToFileName = (str) => {
		return (0, exports.removeAccents)(str === null || str === void 0 ? void 0 : str.replace(/ [a-z]/g, (a) => a.toUpperCase()).replace(/[ \r\t\n]/g, ""));
	};
	exports.convertToFileName = convertToFileName;
	/**
	* Đổi string sang kiểu Id html
	* @param {string} str
	* @returns {string}
	*/
	var convertToId = (str) => {
		return (0, exports.removeAccents)(str === null || str === void 0 ? void 0 : str.replace(/[-_]/g, " ").replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase()).replace(/[ \r\t\n]/g, ""));
	};
	exports.convertToId = convertToId;
	/**
	* Đọc lấy thông tin metadata của ảnh
	* @param url
	* @param cb
	*/
	var getMeta = (url, cb) => {
		const img = new Image();
		img.onload = () => cb(null, img);
		img.onerror = (err) => cb(err);
		img.src = url;
	};
	exports.getMeta = getMeta;
	/**
	* Xuất file tự động từ trình duyệt
	* @param filename
	* @param dataUrl
	*/
	var downloadDataUrlFromJavascript = (filename, dataUrl) => {
		let link = document.createElement("a");
		link.download = filename;
		link.target = "_blank";
		link.href = dataUrl;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	exports.downloadDataUrlFromJavascript = downloadDataUrlFromJavascript;
	/**
	* Trả về bắt đầu của trang mới
	* @param params
	*/
	var getPageOffset = (params) => {
		let page = ((params === null || params === void 0 ? void 0 : params.page) || 1) - 1;
		let limit = (params === null || params === void 0 ? void 0 : params.limit) || 10;
		return (page < 0 ? 0 : page) * (limit < 0 ? 0 : limit);
	};
	exports.getPageOffset = getPageOffset;
}));
//#endregion
export default require_dist();

//# sourceMappingURL=reborn-util.js.map
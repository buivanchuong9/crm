import { t as __commonJSMin } from "./chunk-CqwQKh_b.js";
//#region node_modules/reborn-validation/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getYoutubeId = exports.parserYoutubeLink = exports.validateIsPosInteger = exports.validateIsInteger = exports.validateTime = exports.validateDate = exports.validateDomain = exports.validateURL = exports.validatePassword = exports.validateEmail = exports.validateMaxLength = exports.validatePhone = exports.validateMinLength = exports.validateNumber = exports.validateIsEmpty = void 0;
	if (!String.prototype.trim) String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
	};
	/**
	- Kiểm tra text undefined, chuỗi rỗng thì trả về true
	- Validate các kiểu input như sau
	- Empty
	- Trường điện thoại
	- Email
	- Độ dài min/max
	- Password
	- Dung lượng ảnh, kích cỡ (width, height)
	- URL
	- Ngày (date)
	- Ngày giờ (datetime)
	- Họ tên (Nếu cần thiết)
	* @param {*} text
	* @returns
	*/
	var validateIsEmpty = (text) => {
		if (text === void 0 || text === null) return true;
		text = text.trim();
		return !text;
	};
	exports.validateIsEmpty = validateIsEmpty;
	/**
	* Nhập từ input vào luôn là số dạng chuỗi
	* 0. Không phải kiểu số => false
	* 1. Là null/undefined (tương ứng kiểu object, undefined) => false
	* 2. Là NaN/Infinity/-Infinity => false
	* 3. Số (Nguyên âm/nguyên dương/Thực) => true
	* @param {*} num
	* @returns
	*/
	var validateNumber = (num) => {
		if (typeof num !== "number") if (typeof num == "string") {
			if (isNaN(Number(num))) return false;
		} else return false;
		num = Number(num);
		if (isNaN(num) || num === Infinity || num === -Infinity) return false;
		return true;
	};
	exports.validateNumber = validateNumber;
	/**
	* Kiểm tra độ dài tối thiểu của text
	* @param {*} text Text cần kiểm tra
	* @param {*} min Độ dài tối thiểu cần vượt qua
	*/
	var validateMinLength = (text, min) => {
		if ((0, exports.validateIsEmpty)(text)) return min === 0;
		text = text.trim();
		return text.length >= min;
	};
	exports.validateMinLength = validateMinLength;
	/**
	* Kiểm tra số điện thoại có đúng định dạng mobile phone
	* (+84|84|0)[\d]{9}
	* @param {*} phone
	*/
	var validatePhone = (phone) => {
		if ((0, exports.validateIsEmpty)(phone)) return false;
		phone = phone.trim();
		var re = /^(\+84|84|0)\d{9,10}$/;
		if (re.test(phone)) return true;
		re = /^\d{8}$/;
		return re.test(phone);
	};
	exports.validatePhone = validatePhone;
	/**
	* Trả về true nếu text có độ dài thỏa mãn (nhỏ hơn max)
	* @param {*} text Text cần vượt qua
	* @param {*} max Độ dài tối đa được phép
	*/
	var validateMaxLength = (text, max) => {
		if ((0, exports.validateIsEmpty)(text)) return max >= 0;
		text = text.trim();
		return text.length <= max;
	};
	exports.validateMaxLength = validateMaxLength;
	/**
	* Kiểm tra địa chỉ email có hợp lệ không
	* @param {*} email
	*/
	var validateEmail = (email) => {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
	};
	exports.validateEmail = validateEmail;
	/**
	* Kiểm tra tính hợp lệ của mật khẩu
	* 1. Độ dài tối thiểu 6 kí tự
	* 2. Có chứa ít nhất một kí tự số và một kí tự chữ (Hoa hoặc thường)
	* @param {*} password
	*/
	var validatePassword = (password) => {
		if (!(0, exports.validateMinLength)(password, 6)) return false;
		if (password.trim().length == 10 || password.trim().length == 11) return true;
		password = password.trim();
		return /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
	};
	exports.validatePassword = validatePassword;
	/**
	* Kiểm tra đầu vào có đúng định dạng link không
	* re lấy từ https://www.regextester.com/96928
	* @param {*} link
	*/
	var validateURL = (link) => {
		if ((0, exports.validateIsEmpty)(link)) return false;
		return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g.test(link);
	};
	exports.validateURL = validateURL;
	/**
	* Kiểm tra domain nhập vào có hợp lệ
	* @param domain
	* @returns
	*/
	var validateDomain = (domain) => {
		if ((0, exports.validateIsEmpty)(domain)) return false;
		return /^([a-zA-Z0-9]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)?([a-zA-Z0-9]{1,2}([-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.([a-zA-Z]{2,63})$/.test(domain);
	};
	exports.validateDomain = validateDomain;
	/**
	* Kiểm tra đầu vào có đúng định dạng ngày của người Việt dd/mm/yyyy hoặc dd-mm-yyyy hoặc dd.mm.yyyy
	* @param {*} date
	*/
	var validateDate = (date) => {
		if ((0, exports.validateIsEmpty)(date)) return false;
		return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(date);
	};
	exports.validateDate = validateDate;
	/**
	* Kiểm tra thời gian (giờ:phút), sử dụng trong Đặt lịch hẹn
	* @param {*} time
	*/
	var validateTime = (time) => {
		if ((0, exports.validateIsEmpty)(time)) return false;
		return /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/.test(time);
	};
	exports.validateTime = validateTime;
	/**
	* 1. Là kiểu số
	* 2. Chỉ chấp nhận kiểu số nguyên (âm hoặc dương, không chấp nhận số thực)
	* @param {*} num
	*/
	var validateIsInteger = (num) => {
		if (!(0, exports.validateNumber)(num)) return false;
		num = Number(num);
		return Number.isInteger(num);
	};
	exports.validateIsInteger = validateIsInteger;
	/**
	* Kiểm tra có phải số nguyên dương (chấp nhận cả số 0 (min = 0), lớn hơn số nào đó thì là min)
	* @param {*} num
	* @param {*} num
	* @returns
	*/
	var validateIsPosInteger = (num, min = 0) => {
		if (!(0, exports.validateNumber)(num)) return false;
		num = Number(num);
		return Number.isInteger(num) && num >= min;
	};
	exports.validateIsPosInteger = validateIsPosInteger;
	/**
	* Trả về 1 object
	* @param {*} link
	* @returns
	*/
	var parserYoutubeLink = (link) => {
		if ((0, exports.validateIsEmpty)(link)) return false;
		let result = /^https:\/\/(.*?)\/(.*?)$/.exec(link);
		if (result.length < 2) return false;
		let domain = result[1];
		let id = result[2];
		if (id.indexOf("embed/") > -1) id = id.replace("embed/", "");
		domain = domain || "";
		if (domain == "youtu.be" || domain == "www.youtu.be" || domain == "youtube.com" || domain == "www.youtube.com") return {
			link: "https://www.youtube.com/embed/" + id,
			thumbnail: `https://img.youtube.com/vi/${id}/sddefault.jpg`
		};
		return false;
	};
	exports.parserYoutubeLink = parserYoutubeLink;
	/**
	* Trả về videoId
	* @param {*} link
	* @returns
	*/
	var getYoutubeId = (link) => {
		if ((0, exports.validateIsEmpty)(link)) return false;
		let position = link.indexOf("embed/");
		if (position == -1) return false;
		return link.substring(position + 6, link.length);
	};
	exports.getYoutubeId = getYoutubeId;
}));
//#endregion
export default require_dist();

//# sourceMappingURL=reborn-validation.js.map
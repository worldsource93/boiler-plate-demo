/**
 * 바이트 사이즈
 * decimal >> 7 은 getByte 함수의 unicodeDecimalValue가 0 ~ 127 범위에 있는 수인지 확인하는 코드
 * 10진수(decimal)를 파라미터로 받아서 2진수로 변환 뒤 7자리를 오른쪽으로 움직이라는 의미
 * >> 시프트 연산자: a >> b => a / (2**b)
 * decimal이 0부터 127이면 ASCII 영역에 해당되며 1바이트를 사용한다. 128부터는 2바이트로 계산한다.
 */
const getByteLength = (decimal) => {
	return (decimal >> 7) ? 2 : 1;
};

/**
 * 바이트 계산
 */
const getByte = (str) => {
	return str
		.split('')
		.map((s) => s.charCodeAt(0)) // String.prototype.charCodeAt(index): 인덱스에 해당하는 UTF-16의 유니코드 값을 10진수로 반환
		.reduce((prev, unicodeDecimalValue) => prev + getByteLength(unicodeDecimalValue), 0);
};

/**
 * 사용자 아이디 - 영문 소문자, 숫자만 포함 4자리이상 12자리 이하
 * @param {*} value
 * @returns
 */
const testUsername = (value) => {
	return new RegExp('^[a-z0-9]{4,12}$').test(value);
};

/**
 * 사용자 패스워드 - 영문,숫자,특수문자 포함 8자리이상 20자리 이하, 공백없음
 * @param {*} value
 * @returns
 */
const testPassword = (value) => {
	return new RegExp('^.*(?=^.{8,20}$)(?=\\S+$)(?=.*[a-zA-Z])(?=.*[!@#$%^&*/]).*$').test(value);
};

/**
 * 이메일 - 최대 64자리
 * @param {*} value
 * @returns
 */
const testEmail = (value) => {
	if (value) {
		if (value.length > 64) {
			return false;
		}
	}

	return new RegExp('^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$').test(value);
};

/**
 * 이름(성,이름) - 영문,한글 포함 1자리 이상 20자리 이하
 * @param {*} value
 * @returns
 */
const testName = (value) => {
	return new RegExp('^[A-Z|a-z|가-힣]{1,20}$').test(value);
};


/**
 * 제목 - 영문,한글,숫자,특수문자(_!?.),공백 포함 1자리 이상 50자리 이하
 * @param {*} value
 * @returns
 */
const testTitle = (value) => {
	return new RegExp('^[0-9A-Z|a-z|가-힣\\s_!?.,-|/\'"]{1,50}$').test(value);
};

/**
 * 설명 - 모든 문자열 가능 최대 200자리 이하
 * @param {*} value
 * @returns
 */
const testDesc = (value) => {
	try {
		if (value.length > 200) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		return true;
	}
};

/**
 * 쿼리 - 모든 문자열 가능 최대 20자리 이하
 * @param {*} value
 * @returns
 */
const testQuery = (value) => {
	try {
		const len = value.length;
		if (len > 20) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		return true;
	}
};

/**
 * 컬럼명 - 영어 소문자로 시작하며 영어 소문자, 숫자만 사용가능(5~10자리)
 * @param {*} value
 * @returns
 */
const testColumnName = (value) => {
	return new RegExp('^[a-z][_a-z0-9+]{4,9}$').test(value); // {3 -> {4로 변경
};

/**
 * 컬럼별칭 - 영문,숫자,한글,공백포함, 최대 20자리 << 주석버전
 * 컬럼별칭 - 문자열이 64Byte를 넘지 않도록
 * @param {*} value
 * @returns
 */
const testColumnAlias = (value) => {
	const maxByte = 64;
	const characters = value.split('');
	let totalByte = 0;
	let result = true;
	for (let i = 0; i < characters.length; i += 1) {
		const character = characters[i];
		const decimal = character.charCodeAt(0);
		const byte = getByteLength(decimal);
		if (totalByte + byte <= maxByte) {
			totalByte += byte;
		} else {
			result = false;
			break;
		}
	}
	return result;
	// return new RegExp('^[0-9A-Z|a-z|가-힣\\s]{0,20}$').test(value);
};

/**
 * 입력받는 문자열의 Length만 확인
 * @param {*} value
 * @param {*} len
 * @returns
 */
const testPlainText = (value, len) => {
	return new RegExp('^(?=.{1,' + len + '}$).*').test(value);
};

/**
 * 정수형 Integer
 */
const testInteger = (value) => {
	if (value !== 0 && !value) return true;

	if (new RegExp('^(0|[-]?[1-9]\\d*)$').test(value)) {
		const _value = Number(value);
		const minIntegerValue = Number(process.env.MIN_INTEGER_VALUE);
		const maxIntegerValue = Number(process.env.MAX_INTEGER_VALUE);
		if (minIntegerValue <= _value <= maxIntegerValue) {
			return true;
		}
	}

	return false;
};

/**
 * 실수형 Double
 */
const testDouble = (value) => {
	if (value !== 0 && !value) return true;

	if (new RegExp('^([1-9]{1}\\d{0,}|0{1})(\\.{1}[0-9]\\d{0,}|)([eE]|)([+-][1-9]{1}\\d{0,}|0{1}|[1-9]{1}\\d{0,}|0{1})?$').test(value)) {
		const _value = Number(value);
		const minDoubleValue = Number(process.env.MIN_DOUBLE_VALUE);
		const maxDoubleValue = Number(process.env.MAX_DOUBLE_VALUE);
		if (
			isFinite(_value) &&
			(minDoubleValue < _value || isDoubleSame(minDoubleValue, _value) || // double 최소값보다 크거나 같을 때,
			_value < maxDoubleValue || isDoubleSame(maxDoubleValue, _value)) 	 // double 최댓값보다 작거나 같을 때
		) {
			return true;
		}
	}
	return false;
};

/**
 * Double 등호 비교시 사용 함수
 */
function isDoubleSame (a, b, epsilon) {
	if (!epsilon) epsilon = 0.000001;

	return Math.abs(a - b) < epsilon;
}

const testMinMaxInterval = (min, max, interval) => {
	if (min < max && interval < max) return true;

	return false;
};

export {
	testUsername,
	testPassword,
	testEmail,
	testName,
	testTitle,
	testDesc,
	testQuery,

	testColumnName,
	testColumnAlias,
	testPlainText,

	testInteger,
	testDouble,
	testMinMaxInterval,
};
